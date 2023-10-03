const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require("body-parser");
const https = require('https');
var bcrypt = require('bcrypt');
var jimp = require('jimp');
var authModule = require('/home/modules/auth.js');
var resourceModule = require('/home/modules/resources.js');
var mailModule = require('/home/modules/mail.js');
var requestValidator = require("/home/modules/requestValidator.js");
var dbModule = require('/home/modules/database.js');
var billingModule = require('/home/modules/billing.js');
var fs = require('fs');

var request = require('request');

app.use(express.static('static'));

app.use("/landing", express.static("landing"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));

dbModule.initDB();

const ssl = {
  key: fs.readFileSync('/etc/letsencrypt/live/prod.bastionfit.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/prod.bastionfit.com/fullchain.pem')
};

app.get("/blog*", async function(req, res){
	
	var newUrl = "https://blog.bastionfit.com" + req.originalUrl.substring(5);
	req.pipe(request(newUrl)).pipe(res);
	//res.sendStatus(200);
	
});





app.use((req, res, next) => {
  //console.log(req.originalUrl);
  var valid = requestValidator.validateRequest(req.originalUrl, req.body);
  if (!valid){
	  res.sendStatus(400);
	  return;
  }
  next();
});

var desc1 = "Expert 1-on-1 coaching, customized workouts, personalized meal plans, daily access to your own fitness and well coach.";
var desc2 = "Expert 1-on-1 coaching, customized workouts, personalized meal plans, daily access to your own fitness and well coach and weekly zoom calls.";

app.post("/createAccount", async function(req, res){
	var token = await authModule.register(req.body.email, req.body.password, req.body.isCoach, req.body.surveyAnswers);
	if (!token){
		res.sendStatus(409);
		return;
	}
	//this is a bad way to do this, fix 
	var userID = await dbModule.dbGet('SELECT ID, NAME FROM USER ORDER BY ID DESC;', []);
	var userName = userID.NAME;
	userID = userID.ID;
	for (var i = 0; i < req.body.surveyAnswers.length; i++){
		var currentAnswer = req.body.surveyAnswers[i];
		dbModule.dbRun('INSERT INTO SURVEY (USERID, PROMPT, QUESTIONTYPE, INPUTANSWER, MULTISELECTANSWER) VALUES (?, ?, ?, ?, ?);',
			[userID, currentAnswer.prompt, currentAnswer.type, currentAnswer.inputAnswer, currentAnswer.multiselectAnswer]);
	}
	
	if (req.body.isCoach){
		dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);',
			[userID, "Basic Membership", desc1, 100]);
		dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);',
			[userID, "Intermediate Membership", desc2, 130]);
	}
	billingModule.createCustomer(userID);
	mailModule.sendThankYou(userName, req.body.email);
	res.send(token);
});

app.post("/login", async function(req, res){
	var token = await authModule.login(req.body.email, req.body.password);
	if (token){
		res.send(token);
		return;
	}
	res.sendStatus(401);
});

app.post("/updateProfilePicture", async function(req, res){
	var picture = req.body.picture;
	picture = picture.split(';base64,').pop();
	
	console.log(req.body.options);
	jimp.read(Buffer.from(picture, "base64")).then(image => {
		console.log('loaded image');
		var options = req.body.options;
		image.crop(options.x, options.y, options.width, options.height);
		image.resize(512, 512);
		image.getBase64Async(jimp.MIME_PNG).then(async final => {
			picture = final.split(';base64,').pop();
			var fileName = authModule.generateToken() + ".png";
			var filePath = await resourceModule.uploadProfilePicture(picture);
			dbModule.dbRun('UPDATE USER SET PROFILEPICTURE = ? WHERE TOKEN LIKE ?;', [filePath, req.headers.token]);
			res.send(filePath);
		});
		
	});
	
	/*
	var fileName = authModule.generateToken() + ".png";
	var filePath = await resourceModule.uploadProfilePicture(picture);
	dbModule.dbRun('UPDATE USER SET PROFILEPICTURE = ? WHERE TOKEN LIKE ?;', [filePath, req.headers.token]);
	res.send(filePath);
	*/
});

app.post("/forgotPassword", async function(req, res){
	console.log(req.body.email);
	var userRow = await dbModule.dbGet("SELECT ID FROM USER WHERE EMAIL LIKE ?;", [req.body.email]);
	if (!userRow){
		res.sendStatus(200);
		return;
	}
	var resetToken = authModule.generateToken();
	var expiresTime = Math.floor(Date.now() / 1000) + 1800;
	await dbModule.dbRun('INSERT INTO RESETPASSWORD (USERID, RESETTOKEN, EXPIRES) VALUES (?, ?, ?);', [userRow.ID, resetToken, expiresTime]);
	mailModule.sendResetPassword(req.body.email, resetToken);
	res.sendStatus(200);
});

app.post("/resetPassword", async function(req, res){
	var resetRow = await dbModule.dbGet("SELECT * FROM RESETPASSWORD WHERE RESETTOKEN LIKE ?;", [req.body.resetToken]);
	if (!resetRow){
		res.sendStatus(400);
		return;
	}
	if (Math.floor(Date.now() / 1000) > resetRow.EXPIRES){
		res.sendStatus(400);
		return;
	}
	authModule.resetPassword(resetRow.USERID, req.body.password);
	res.sendStatus(200);
});

app.post("/updateAbout", async function(req, res){
	var about = req.body.about;
	console.log(about);
	var resultCode = await dbModule.dbRun('UPDATE USER SET ABOUT = ? WHERE TOKEN LIKE ?;', [about, req.headers.token]);
	if (!resultCode){
		res.sendStatus(400);
		return;
	}
	res.sendStatus(201);
});

app.get("/getProfileInfo", async function(req, res){
	var result = await dbModule.dbGet('SELECT ID, NAME, ADMIN, PROFILEPICTURE, LOCATION, ISCOACH, COACHID, ABOUT FROM USER WHERE TOKEN LIKE ?;', [req.headers.token]);
	if (!result){
		res.sendStatus(401);
		return;
	}
	res.send(result);
});

app.get("/getPricings", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll("SELECT * FROM PRICINGS WHERE COACHID = ?;", [userID]);
	for (var i=0; i<result.length; i++){
		result[i].FEATURES = await dbModule.dbAll('SELECT FEATURE FROM PRICINGS_FEATURES WHERE PRICINGID = ?;', [result[i].ID]);
	}
	res.send(result);
});

app.post("/updatePricings", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID || userID != req.body.COACHID){
		res.sendStatus(401);
		return;
	}
	//Confirm acting user owns the pricing they're trying to update
	var previousPricing = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [req.body.ID]);
	if (!previousPricing){
		res.sendStatus(400);
		return;
	}
	if (previousPricing.COACHID != userID){
		res.sendStatus(403);
		return;
	}
	await dbModule.dbRun("UPDATE PRICINGS SET TITLE = ?, DESCRIPTION = ?, PRICE = ? WHERE ID = ?;", [req.body.TITLE, req.body.DESCRIPTION, req.body.PRICE, req.body.ID]);
	await dbModule.dbRun("DELETE FROM PRICINGS_FEATURES WHERE PRICINGID = ?;", [req.body.ID]);
	for (var feature of req.body.FEATURES){
		if (feature.FEATURE == ""){
			continue;
		}
		await dbModule.dbRun('INSERT INTO PRICINGS_FEATURES (PRICINGID, FEATURE) VALUES (?, ?);', [req.body.ID, feature.FEATURE]);
	}
	try{
		await billingModule.updateSubscriptionPrice(req.body.ID, req.body.PRICE);
	}
	catch(err){}
	res.sendStatus(201);
});

app.get("/requestPasswordReset", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var userRow = await dbModule.dbGet('SELECT EMAIL FROM USER WHERE ID = ?;', [userID]);
	
	
	var resetToken = authModule.generateToken();
	var expiresTime = Math.floor(Date.now() / 1000) + 1800;
	
	await dbModule.dbRun('INSERT INTO RESETPASSWORD (USERID, RESETTOKEN, EXPIRES) VALUES (?, ?, ?);', [userID, resetToken, expiresTime]);
	
	mailModule.sendResetPassword(userRow.EMAIL, resetToken);
	
	
	res.sendStatus(200);
});

app.get("/createPricing", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	await dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);', [userID, "New Membership", "An editable bastion membership.", 100.00]);
	var pricingRow = await dbModule.dbGet('SELECT ID FROM PRICINGS ORDER BY ID DESC LIMIT 5', []);
	var cpRow = await dbModule.dbGet('SELECT * FROM COACH_PRODUCT WHERE COACHID = ?;', [userID]);
	
	var price = await billingModule.createPrice(10000, cpRow.PRODUCTID);

	await dbModule.dbRun("INSERT INTO PRICINGS_STRIPE (PRICINGID, STRIPEPRODUCTID, STRIPEPRICEID) VALUES (?, ?, ?);", [pricingRow.ID, cpRow.PRODUCTID, price.id]);
	
	res.sendStatus(200);
	
});


app.get("/getOpenClients", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll("SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE (COACHID IS NULL OR COACHID = -1) AND ISCOACH != 1;", []);
	var activeOffers = await dbModule.dbAll("SELECT CLIENTID FROM OFFERS WHERE COACHID = ?;", [userID]);
	activeOffers = activeOffers.map(o => o.CLIENTID);
	console.log(activeOffers);
	
	var newResult = [];
	
	for (var localUser of result){
		if (activeOffers.includes(localUser.ID)){
			continue;
		}
		newResult.push(localUser);
	}
	var assignedClients = await dbModule.dbAll("SELECT * FROM ASSIGNCOACHES WHERE COACHID = ?;", [userID]);
	assignedClients = assignedClients.map(o => o.CLIENTID);
	
	newResult = newResult.filter(client => assignedClients.includes(client.ID));
	
	
	res.send(newResult);
});

app.get("/getMyClients", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll("SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE COACHID = ? AND ISCOACH != 1;", [userID]);
	if (!result){
		res.sendStatus(400);
		return;
	}
	for (var i = 0; i<result.length; i++){
		//result[i].PLANID = (await dbModule.dbGet('SELECT ID FROM PLAN WHERE CLIENTID = ? AND COACHID = ?;', [result[i].ID, userID])).ID;
		
		var planRow = await dbModule.dbGet('SELECT ID FROM PLAN WHERE CLIENTID = ? AND COACHID = ? AND ACTIVE = 1;', [result[i].ID, userID]);
		if (!planRow){
			continue;
		}
		result[i].PLANID = planRow.ID;
		console.log(result[i]);
	}
	res.send(result);
});


app.post("/updateCertifications", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	//Verify requesting user is a coach
	var coachRow = await dbModule.dbGet('SELECT ISCOACH FROM USER WHERE ID = ?', [userID]);
	if (!coachRow.ISCOACH){
		res.sendStatus(403);
		return;
	}
	
	dbModule.dbRun('DELETE FROM CERTIFICATIONS WHERE COACHID = ?;', [userID]);
	for (var cert of req.body.certifications){
		dbModule.dbRun('INSERT INTO CERTIFICATIONS (COACHID, CERTIFICATION, RESOURCE, APPROVED, COMPLETIONDATE) VALUES (?, ?, ?, ?, ?);', [userID, cert.CERTIFICATION, cert.RESOURCE, 0, cert.COMPLETIONDATE]);
		console.log("added cert " + cert.CERTIFICATION);
	}
	res.sendStatus(200);
});

app.get("/getCertifications", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){ 
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll('SELECT * FROM CERTIFICATIONS WHERE COACHID = ?;', [userID]);
	res.send(result);
});

app.get('/clientPreview/:clientID', async function(req, res){
	if (isNaN(req.params.clientID)){
		res.sendStatus(400);
		return;
	}
	var resultObject = {};
	resultObject.surveyAnswers = await dbModule.dbAll('SELECT * FROM SURVEY WHERE USERID = ?;', [req.params.clientID]);
	
	var result = await dbModule.dbGet("SELECT NAME, PROFILEPICTURE, COACHID FROM USER WHERE ID = ?;", [req.params.clientID]);
	if (!result){
		res.sendStatus(400);
		return;
	}
	resultObject.name = result.NAME;
	resultObject.ProfilePicture = result.PROFILEPICTURE;
	resultObject.CoachID = result.COACHID;
	res.send(resultObject);
});

app.get('/offerPricings', async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	
	var result = await dbModule.dbAll('SELECT ID, TITLE, PRICE FROM PRICINGS WHERE COACHID = ?;', [userID]);
	res.send(result);
});

app.post("/sendOffer", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	//Confirm the requesting account is a coach
	var coachRow = await dbModule.dbGet('SELECT ISCOACH FROM USER WHERE ID = ?', [userID]);
	if (!coachRow.ISCOACH){
		res.sendStatus(403);
		return;
	}
	
	var accountIsActive = await billingModule.checkActive(userID);
	if (!accountIsActive){
		//generate an onloarding link
		var obLink = await billingModule.generateOnboardingLink(userID);
		res.status(307).send(obLink);
		return; 
	}
	var userRow = await dbModule.dbGet("SELECT NAME, EMAIL FROM USER WHERE ID = ?;", [req.body.clientID]);
	mailModule.sendOfferEmail(userRow.NAME, userRow.EMAIL);
	
	dbModule.dbRun('INSERT INTO OFFERS (CLIENTID, COACHID, PRICINGID) VALUES (?, ?, ?);', [req.body.clientID, userID, req.body.planID]);
	dbModule.dbRun('INSERT INTO MESSAGES (FROMID, TOID, MESSAGE) VALUES (?, ?, ?);', [userID, req.body.clientID, req.body.greeting]);
	res.sendStatus(200);
});

app.get("/getMessageHeaders", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var responseArray = [];
	var rows = await dbModule.dbAll('SELECT DISTINCT FROMID, MESSAGE FROM MESSAGES WHERE TOID = ? ORDER BY ID DESC;', [userID]);
	for (var row of rows){
		var returnArray = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;', [row.FROMID]);
		if (!returnArray){
			res.sendStatus(400);
			return;
		}
		var responseObject = {
			name: returnArray.NAME,
			profilePicture: returnArray.PROFILEPICTURE,
			message: row.MESSAGE,
			fromID: row.FROMID
		};
		responseArray.push(responseObject);
	}
	res.send(responseArray);
});

app.get("/getMessages/:chatID", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll('SELECT * FROM MESSAGES WHERE (FROMID = ? AND TOID = ?) OR (FROMID = ? AND TOID = ?);', [userID, req.params.chatID, req.params.chatID, userID]);
	res.send(result);
});

app.get("/getChatInfo/:userID", async function(req, res){
	var result = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;', [req.params.userID]);
	res.send(result);
});

app.post("/sendMessage", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	dbModule.dbRun('INSERT INTO MESSAGES (FROMID, TOID, MESSAGE) VALUES (?, ?, ?);', [userID, req.body.toID, req.body.message]);
	res.sendStatus(200);
});

app.post("/leaveReview", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	
	var before = req.body.before;
	if (before){
		before = before.split(';base64,').pop();
		before = await resourceModule.uploadPicture(before);
	}
	var after = req.body.after;
	if (after){
		after = after.split(';base64,').pop();
		after = await resourceModule.uploadPicture(after);
	}
	
	var userRow = await dbModule.dbGet("SELECT COACHID FROM USER WHERE ID = ?;", [userID]);
	
	await dbModule.dbRun('INSERT INTO REVIEWS (COACHID, CLIENTID, REVIEW, BEFORERESOURCE, AFTERRESOURCE) VALUES (?, ?, ?, ?, ?);', [userRow.COACHID, userID, req.body.review, before, after]);
	res.sendStatus(200);
	
});

app.get("/getReviews/:coachid", async function(req, res){
	/*
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	*/
	var reviews = await dbModule.dbAll("SELECT * FROM REVIEWS WHERE COACHID = ?;", [req.params.coachid]);
	for (var i=0; i<reviews.length; i++){
		var userRow = await dbModule.dbGet("SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;", [reviews[i].CLIENTID]);
		reviews[i].reviewInfo = userRow;
	}
	res.send(reviews);
	
});

app.get("/getOffers", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll('SELECT * FROM OFFERS WHERE CLIENTID LIKE ?;', [userID]);
	res.send(result);
});

app.get("/getOffersDisplay", async function(req, res){
	var responseObject = [];
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var rows = await dbModule.dbAll('SELECT * FROM OFFERS WHERE CLIENTID LIKE ?;', [userID]);
	for (var row of rows){
		var payload = {ID: row.ID};
		var check1 = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?', [row.COACHID]);
		if (!check1){
			res.sendStatus(500);
			return;
		}
		payload.name = check1.NAME;
		payload.profilePicture = check1.PROFILEPICTURE;
		
		var check2 = await dbModule.dbGet('SELECT TITLE, PRICE FROM PRICINGS WHERE ID = ?', [row.PRICINGID]);
		if (!check2){
			res.sendStatus(500);
			return;
		}
		payload.title = check2.TITLE;
		payload.price = check2.PRICE;
		
		responseObject.push(payload);
	}
	res.send(responseObject);
	//I need the profile picture, the name, the plan title, and the plan price for each coach
});

app.get("/getOffer/:offerid", async function(req, res){
	//I need the name, the profile picture, everything from the pricings table, the about, and everything from the certifications table
	var offer = await dbModule.dbGet('SELECT * FROM OFFERS WHERE ID = ?;', [req.params.offerid]);
	if (!offer){
		res.sendStatus(400);
		return;
	}
	var payload = {};
	payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, LOCATION, ABOUT FROM USER WHERE ID = ?;', [offer.COACHID]);
	payload.profileInfo.ATTRIBUTES = await dbModule.dbGet('SELECT * FROM COACHATTRIBUTES WHERE COACHID = ?;', [offer.COACHID]);
	payload.profileInfo.EXPERTISE  = await new Promise(async function(resolve, reject){
		var resultArray = [];
		var comps = await dbModule.dbAll('SELECT COMP FROM COACHCOMP WHERE COACHID = ?;', [offer.COACHID]);
		var circs = await dbModule.dbAll('SELECT CIRC FROM COACHCIRC WHERE COACHID = ?;', [offer.COACHID]);
		for (var obj of comps){
			resultArray.push(obj.COMP);
		}
		for (var obj of circs){
			resultArray.push(obj.CIRC);
		}
		resolve(resultArray);
	});
	payload.profileInfo.LANGUAGES = await dbModule.dbAll('SELECT * FROM COACHLANGUAGES WHERE COACHID = ?;', [offer.COACHID]);
	
	payload.pricingInfo = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [offer.PRICINGID]);
	payload.pricingInfo.FEATURES = await dbModule.dbAll('SELECT * FROM PRICINGS_FEATURES WHERE PRICINGID = ?;', [offer.PRICINGID]);
	payload.certifications = await dbModule.dbAll('SELECT CERTIFICATION FROM CERTIFICATIONS WHERE COACHID = ?', [offer.COACHID]);
	res.send(payload);
});

app.get("/getCoachDisplay/:coachid", async function(req, res){
	var payload = {};
	payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, LOCATION, ABOUT FROM USER WHERE ID = ?;', [req.params.coachid]);
	payload.profileInfo.ATTRIBUTES = await dbModule.dbGet('SELECT * FROM COACHATTRIBUTES WHERE COACHID = ?;', [req.params.coachid]);
	payload.profileInfo.EXPERTISE  = await new Promise(async function(resolve, reject){
		var resultArray = [];
		var comps = await dbModule.dbAll('SELECT COMP FROM COACHCOMP WHERE COACHID = ?;', [req.params.coachid]);
		var circs = await dbModule.dbAll('SELECT CIRC FROM COACHCIRC WHERE COACHID = ?;', [req.params.coachid]);
		for (var obj of comps){
			resultArray.push(obj.COMP);
		}
		for (var obj of circs){
			resultArray.push(obj.CIRC);
		}
		resolve(resultArray);
	});
	payload.profileInfo.LANGUAGES = await dbModule.dbAll('SELECT * FROM COACHLANGUAGES WHERE COACHID = ?;', [req.params.coachid]);
	
	payload.certifications = await dbModule.dbAll('SELECT CERTIFICATION FROM CERTIFICATIONS WHERE COACHID = ?;', [req.params.coachid]);
	res.send(payload);
});

app.post("/startCoaching", async function(req, res){
	// Need the pricingID
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var hasPaymentMethod = await billingModule.checkPaymentMethod(userID);
	if (!hasPaymentMethod){
		//var setupURL = await billingModule.createSetupSession(userID, "https://dev.bastionfit.com/#/coachOffer/" + req.body.offerID);
		var setupURL = await billingModule.createSetupSession(userID, "https://bastionfit.com/#/offers");
		res.status(307).send(setupURL);
		return;
	}
	//needs error checking
	//Verify the user sending the request is the actual user for the offer, and that the offer exists and is valid.
	
	var offerEntry = await dbModule.dbGet("SELECT * FROM OFFERS WHERE ID = ?;", [req.body.offerID]);
	if (!offerEntry){
		res.sendStatus(400);
		return;
	}
	if (offerEntry.CLIENTID != userID){
		res.sendStatus(401);
		return;
	}
	
	var resultString = "";

	// Get the current date and format it
	resultString += (new Date()).toDateString();
	resultString = resultString.split(" ");
	resultString = resultString[1] + " " + resultString[2] + ", " + resultString[3];
	
	var pricingID = (await dbModule.dbGet('SELECT PRICINGID FROM OFFERS WHERE ID = ?;', [req.body.offerID])).PRICINGID;
	// Retrieve pricing information from the database based on pricingID
	var pricingInfo = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [pricingID]);
	if (!pricingInfo){
		res.sendStatus(500);
		return;
	}
	//Start the subscription with stripe
	var subscriptionID = await billingModule.createSubscription(userID, pricingID);
	
	
	// Insert a new row into the PLAN table with relevant information
	dbModule.dbRun('INSERT INTO PLAN (CLIENTID, COACHID, PRICINGID, STARTDATE, ENDDATE, ACTIVE, STRIPESUBSCRIPTIONID) VALUES (?, ?, ?, ?, ?, ?, ?);', [userID, pricingInfo.COACHID, pricingID, resultString, "", 1, subscriptionID]);
	dbModule.dbRun('UPDATE USER SET COACHID = ? WHERE ID = ?;', [pricingInfo.COACHID, userID]);
	res.sendStatus(200);
});

app.get("/getCoachNameString/:coachid", async function(req, res){
	var dbResult = await dbModule.dbGet('SELECT NAME FROM USER WHERE ID = ?;', [req.params.coachid]);
	if (!dbResult){
		res.sendStatus(400);
		return;
	}
	var name = dbResult.NAME;
	name = name.split(" ");
	
	if (name.length == 0){
		res.sendStatus(500);
		return;
	}
	
	if (name.length > 1){
		res.send(name[0] + " " + name[name.length - 1][0] + ".");
	}
	else{
		res.send(name[0]);
	}
});

app.get("/viewActiveClient/:planid", async function(req, res){
	//I need the clients name and profile picture, all the info from the pricing table, and the start date
	var payload = {};
	var planInfo = await dbModule.dbGet('SELECT * FROM PLAN WHERE ID = ?;', [req.params.planid]);
	if (!planInfo){
		res.sendStatus(400);
		return;
	}
	payload.clientInfo = await dbModule.dbGet('SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE ID = ?;', [planInfo.CLIENTID]);
	payload.pricingInfo = await dbModule.dbGet('SELECT TITLE, DESCRIPTION, PRICE FROM PRICINGS WHERE ID = ?', [planInfo.PRICINGID]);
	payload.startDate = planInfo.STARTDATE;
	res.send(payload);
});

app.get("/adminGetCoaches", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var result = await dbModule.dbAll("SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE ISCOACH = 1;", []);
	res.send(result);
});

app.get("/adminViewCoach/:coachid", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	//This endpoint needs the name, profile picture, about, and a list of the coach's certifications
	var payload = {};
	payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, ABOUT FROM USER WHERE ID = ?;', [req.params.coachid]);
	payload.certifications = await dbModule.dbAll('SELECT * FROM CERTIFICATIONS WHERE COACHID = ?;', [req.params.coachid]);
	res.send(payload);
});

app.get("/adminViewCoachClients/:coachid", async function(req, res){
	//Need the coach's name, as well as all clients - can split into active and past on client sidebar
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var payload = {};
	//payload.NAME = (await dbModule.dbGet('SELECT NAME FROM USER WHERE ID = ?;', [req.params.coachid])).NAME;
	
	var userName = await dbModule.dbGet('SELECT NAME FROM USER WHERE ID = ?;', [req.params.coachid]);
	if (!userName){
		res.sendStatus(400);
		return;
	}
	payload.NAME = userName.NAME;
	payload.CLIENTS = await dbModule.dbAll('SELECT USER.ID, NAME, PROFILEPICTURE, ACTIVE FROM USER JOIN PLAN ON USER.ID = PLAN.CLIENTID AND PLAN.COACHID = ?;', [req.params.coachid]);
	res.send(payload);
	
});

app.get("/adminGetClients", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	res.send(await dbModule.dbAll('SELECT ID, NAME, PROFILEPICTURE FROM USER WHERE ISCOACH = 0 AND ADMIN IS NULL;', []));
});

app.get("/adminGetOpenClients", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	res.send(await dbModule.dbAll('SELECT ID, NAME, PROFILEPICTURE FROM USER WHERE ISCOACH = 0 AND ADMIN IS NULL AND (COACHID IS NULL OR COACHID = -1);', []));
});

app.post("/adminAssignCoaches", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	for (var coachID of req.body.coaches){
		await dbModule.dbRun('INSERT INTO ASSIGNCOACHES (COACHID, CLIENTID) VALUES (?, ?);', [coachID, req.body.clientID]);
	}
	res.sendStatus(200);
});


app.post("/adminCancelSubscription", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var clientID = req.body.clientID;
	var userRow = await dbModule.dbGet('SELECT COACHID FROM USER WHERE ID = ?', [clientID]);
	dbModule.dbRun('UPDATE USER SET COACHID = -1 WHERE ID = ?;', [clientID]);
	dbModule.dbRun('UPDATE PLAN SET ACTIVE = 0 WHERE CLIENTID = ? AND COACHID = ?;', [clientID, userRow.COACHID]);
	res.sendStatus(200);
});

app.post("/adminInviteCoach", async function(req, res){
	var userID = await authModule.resolveAdminId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	//payload contains the name, email, and temporary password (name, email, password)
	var token = await authModule.register(req.body.email, req.body.password, 1, [{inputAnswer: req.body.name}]);
	if (!token){
		res.sendStatus(409);
		return;
	}
	/*
	var coachID = (await dbModule.dbGet('SELECT ID FROM USER ORDER BY ID DESC;', [])).ID;
	dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);',
			[coachID, "Basic Membership", desc1, 100]);
	dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);',
		[coachID, "Intermediate Membership", desc2, 130]);
		*/
		 
	mailModule.inviteCoach(req.body.name, req.body.password, req.body.email, token);
	res.sendStatus(200);
});

app.post("/coachJoin", async function(req, res){
	console.log("fired coach join");
	var userID = await authModule.resolveUserId(req.headers.token);
	console.log(userID);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	//First, verify the coachjoin function hasn't already been run on the user;
	//several ways to do this, but I'm querying the user table to see if "Location" is set - it should only be set for coaches that have completed the process
	var lengthCheck = await dbModule.dbAll("SELECT * FROM USER WHERE ID = ? AND (LOCATION IS NOT NULL AND LOCATION != '');", [userID]);
	if (lengthCheck.length > 0){
		res.sendStatus(409);
		return;
	} 
	dbModule.dbRun('UPDATE USER SET NAME = ?, LOCATION = ?, GENDER = ?, ABOUT = ? WHERE ID = ?;', 
		[req.body.firstName + " " + req.body.lastName, req.body.location, req.body.gender, req.body.about, userID]);
	for (var language of req.body.languages){
		dbModule.dbRun('INSERT INTO COACHLANGUAGES (COACHID, LANGUAGE, FLUENCY) VALUES (?, ?, ?);', [userID, language.language, language.proficiency]);
	}
	dbModule.dbRun('INSERT INTO COACHATTRIBUTES (COACHID, ATTRIBUTE1, ATTRIBUTE2, ATTRIBUTE3) VALUES (?, ?, ?, ?);', 
		[userID, req.body.attributes[0], req.body.attributes[1], req.body.attributes[2]]);
	dbModule.dbRun('INSERT INTO COACHSPEC (COACHID, SPEC1, SPEC2, SPEC3) VALUES (?, ?, ?, ?);', 
		[userID, req.body.specialties[0], req.body.specialties[1], req.body.specialties[2]]);
	dbModule.dbRun('INSERT INTO COACHACCOUNTABLE (COACHID, ACCOUNTABLE) VALUES (?, ?);', [userID, req.body.accountable]);
	if (req.body.compExperience != "No"){
		for (var comp of req.body.comps){
			dbModule.dbRun('INSERT INTO COACHCOMP (COACHID, COMP) VALUES (?, ?);', [userID, comp]);
		}
	}
	for (var circ of req.body.circumstances){
		await dbModule.dbRun('INSERT INTO COACHCIRC (COACHID, CIRC) VALUES (?, ?);', [userID, circ]);
	}
	for (var pricing of req.body.memberships){
		await dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);',
			[userID, pricing.title, pricing.description, pricing.price]);
			
		var idRow = await dbModule.dbGet('SELECT ID FROM PRICINGS ORDER BY ID DESC LIMIT 5;', []);
		for (var feature of pricing.features){	
			if (feature == ""){
				continue;
			}
			await dbModule.dbRun('INSERT INTO PRICINGS_FEATURES (PRICINGID, FEATURE) VALUES (?, ?);', [idRow.ID, feature]);
		}
	}
	for (var cert of req.body.certifications){
		dbModule.dbRun('INSERT INTO CERTIFICATIONS (COACHID, CERTIFICATION, RESOURCE, COMPLETIONDATE, APPROVED) VALUES (?, ?, ?, ?, ?);',
			[userID, cert.title, cert.number, cert.date, 0]);
	}
	var accountURL = await billingModule.createConnectedAccount(userID);
	
	res.send(accountURL);
});

app.get("/getStripeSetupURL", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var setupURL = await billingModule.createSetupSession(userID);
	res.send(setupURL);
});

app.get("/getStripeBalance", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var balance = await billingModule.getBalance(userID);
	console.log(balance);
	res.send({available: balance.available[0].amount / 100, pending: balance.pending[0].amount / 100});;
	
});

app.get("/getStripeLoginURL", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var setupURL = await billingModule.generateLoginLink(userID);
	res.send(setupURL);
});

app.get("/getStripePortalURL", async function(req, res){
	var userID = await authModule.resolveUserId(req.headers.token);
	if (!userID){
		res.sendStatus(401);
		return;
	}
	var portalURL = await billingModule.createPortalSession(userID);
	res.send(portalURL);
});

//This is an internal endpoint - it's called by stripe webhooks. This one specifically handlles accounts being ready to recieve payment.
app.post("/whCapability", async function(req, res){
	console.log(req.body);
	var accountID = req.body.account;
	if (req.body.data.object.status == "active" && req.body.data.previous_attributes.status == "inactive"){
		//Their account is working! Initialize their payment.
		//Get the user's account ID 
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE STRIPEID LIKE ?;", [accountID]);
		var userRow = await dbModule.dbGet("SELECT * FROM USER WHERE ID = ?;", [bankingRow.USERID]);
		
		var newProduct = await billingModule.createProduct('Bastion Coaching With ' + userRow.NAME, "Your monthly coaching plan.");
		
		await dbModule.dbRun("INSERT INTO COACH_PRODUCT (COACHID, PRODUCTID) VALUES (?, ?);", [bankingRow.USERID, newProduct.id]);
		
		
		//Next, get the list of pricings for the user
		var pricingObjects = await dbModule.dbAll("SELECT * FROM PRICINGS WHERE COACHID = ?;", [userRow.ID]);
		
		for (var pricingObject of pricingObjects){
			var price = await billingModule.createPrice(pricingObject.PRICE * 100, newProduct.id);
			await dbModule.dbRun("INSERT INTO PRICINGS_STRIPE (PRICINGID, STRIPEPRODUCTID, STRIPEPRICEID) VALUES (?, ?, ?);", [pricingObject.ID, newProduct.id, price.id]);
		}
		res.send("success");
		return;
	}
	res.sendStatus(200);
});

app.post("/whSubscriptionEnded", async function(req, res){
	console.log(req.body);
	//Endpoint for handling a cancelled subscription
	
	var endedSubscriptionID = req.body.data.object.id;
	var planRow = await dbModule.dbGet('SELECT * FROM PLAN WHERE STRIPESUBSCRIPTIONID = ?;', [endedSubscriptionID]);
	
	if (!planRow){
		res.sendStatus(200);
		return;
	}
	
	var resultString = "";
	resultString += (new Date()).toDateString();
	resultString = resultString.split(" ");
	resultString = resultString[1] + " " + resultString[2] + ", " + resultString[3];
	
	await dbModule.dbRun('UPDATE PLAN SET ACTIVE = 0, ENDDATE = ? WHERE ID = ?;', [resultString, planRow.ID]);
	await dbModule.dbRun('UPDATE USER SET COACHID = -1 WHERE ID = ?;', [planRow.CLIENTID]);
	
	console.log('Successfully ended subscription with PlanID ' + planRow.ID);
	res.sendStatus(200);
});





















http.createServer(function(req, res){
	res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
	res.end();
}).listen(80);

https.createServer(ssl, app).listen(443);

//http.createServer(app).listen(8010);


//Module for stripe integration
const stripe = require('stripe')('');
var dbModule = require('/home/modules/database.js')


/*
createConnectedAccount

Returns: a promise that resolves to an account's onboarding link
Requires: a userID

This method creates a new stripe connect account tied to a user's email.
It stores the resulting account ID inside the banking table
It generates an account onboarding link, and resolves it into the promise
*/
exports.createConnectedAccount = function(userID){
	return new Promise(async function(resolve, reject){
		var userRow = await dbModule.dbGet("SELECT * FROM USER WHERE ID = ?;", [userID]);
		var caPayload = {
			type: "express",
			country: "US",
			email: userRow.EMAIL,
			business_type: "individual",
			business_profile: {url: "dev.bastionfit.com"}
		}
		var newAccount = await stripe.accounts.create(caPayload);
		
		var accountLink = await stripe.accountLinks.create({
			account: newAccount.id,
			refresh_url: 'https://dev.bastionfit.com/#/coachDashboard',
			return_url: 'https://dev.bastionfit.com/#/coachDashboard',
			type: 'account_onboarding',
		});
		dbModule.dbRun('INSERT INTO BANKING (USERID, STRIPEID) VALUES (?, ?);', [userID, newAccount.id]);
		//console.log(accountLink.url);
		resolve(accountLink.url);
	});
}

exports.generateLoginLink = function(userID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		
		try{
			var loginLink = await stripe.accounts.createLoginLink(
			  bankingRow.STRIPEID
			);
			resolve(loginLink.url);
		}
		
		catch (err){
			resolve(await exports.generateOnboardingLink(userID));
		}
		
	});
}

exports.checkActive = function(userID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		if (!bankingRow){
			resolve(0);
			return;
		}
		var userAccount = await stripe.accounts.retrieve(bankingRow.STRIPEID);
		resolve(userAccount.payouts_enabled);	
	});
}


exports.generateOnboardingLink = function(userID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		if (!bankingRow){
			resolve(0);
			return;
		}
		var accountLink = await stripe.accountLinks.create({
			account: bankingRow.STRIPEID,
			refresh_url: 'https://dev.bastionfit.com/#/coachDashboard',
			return_url: 'https://dev.bastionfit.com/#/coachDashboard',
			type: 'account_onboarding',
		});
		resolve(accountLink.url);
	});
}

exports.createProduct = function(name, description){
	return new Promise(async function(resolve, reject){
		var newProduct = await stripe.products.create({
		  name: name,
		  description: description
		});
		resolve(newProduct);
	});
}

exports.createPrice = function(cents, productid){
	return new Promise(async function(resolve, reject){
		console.log("got to startinge of create price");
		console.log(cents);
		console.log(productid);
		var price = await stripe.prices.create({
		  unit_amount: cents,
		  currency: 'usd',
		  recurring: {interval: 'month'},
		  product: productid,
		});
		console.log("here's the price");
		console.log(price);
		resolve(price);
	});
}

exports.createCustomer = function(userID){
	return new Promise(async function(resolve, reject){
		var userRow = await dbModule.dbGet("SELECT * FROM USER WHERE ID = ?;", [userID]);
		var customerPayload = {
			email: userRow.EMAIL,
			name: userRow.NAME,
			description: "Bastion Member"
		};
		var customer = await stripe.customers.create(customerPayload);
		await dbModule.dbRun('INSERT INTO BANKING (USERID, STRIPEID) VALUES (?, ?);', [userID, customer.id]);
		resolve(customer.id);
	});
}

//Creates a setup session, with an optional parameter for a return URL
exports.createSetupSession = function(userID, returnURL){
	if (!returnURL){
		returnURL = "https://dev.bastionfit.com/#/dashboard";
	}
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		var session = await stripe.checkout.sessions.create({
			mode: "setup",
			success_url: returnURL,
			customer: bankingRow.STRIPEID,
			payment_method_types: ["card"]
		});
		resolve(session.url);
	});
}


exports.createPortalSession = function(userID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		var session = await stripe.billingPortal.sessions.create({
			return_url: "https://dev.bastionfit.com/#/dashboard",
			customer: bankingRow.STRIPEID
		});
		resolve(session.url);
	});
}

exports.checkPaymentMethod = function(userID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		var paymentMethods = await stripe.customers.listPaymentMethods(
		  bankingRow.STRIPEID,
		  {type: 'card'}
		);
		if (paymentMethods.data.length > 0){
			resolve(1);
		}
		else{
			resolve(0);
		}
		//console.log(paymentMethods);
	});
}

exports.createSubscription = function(userID, pricingID){
	return new Promise(async function(resolve, reject){
		var bankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?;", [userID]);
		var pricingRow = await dbModule.dbGet("SELECT * FROM PRICINGS_STRIPE WHERE PRICINGID = ?;", [pricingID]);
		var coachProductRow = await dbModule.dbGet("SELECT * FROM COACH_PRODUCT WHERE PRODUCTID = ?;", [pricingRow.STRIPEPRODUCTID]);
		var coachBankingRow = await dbModule.dbGet("SELECT * FROM BANKING WHERE USERID = ?", [coachProductRow.COACHID]);
		
		//Check if the customer has a default payment method - if they don't, set it to the first thing they've got in their payment methods	
		var customerObject = await stripe.customers.retrieve(bankingRow.STRIPEID);
		if (!customerObject.default_source){
			var paymentMethods = await stripe.customers.listPaymentMethods(
			  bankingRow.STRIPEID,
			  {type: 'card'}
			);
			await stripe.customers.update(bankingRow.STRIPEID, {invoice_settings: {default_payment_method: paymentMethods.data[0].id}});
		}
		
		
		
		//End check block
		
		var subscription = await stripe.subscriptions.create({
		  customer: bankingRow.STRIPEID,
		  trial_period_days: 7,
		  description: "Monthly coaching through Bastion",
		  application_fee_percent: 20,
		  transfer_data: {destination: coachBankingRow.STRIPEID},
		  items: [
			{price: pricingRow.STRIPEPRICEID},
		  ],
		});
		console.log(subscription);
		resolve(subscription.id);
	});
}

exports.updateSubscriptionPrice = function(pricingID, newPrice){
	return new Promise(async function(resolve, reject){
		var SPricingsRow = await dbModule.dbGet('SELECT * FROM PRICINGS_STRIPE WHERE PRICINGID = ?;', [pricingID]);
		//cents, productid
		var newPriceObject = await exports.createPrice(newPrice * 100, SPricingsRow.STRIPEPRODUCTID);
		await dbModule.dbRun('UPDATE PRICINGS_STRIPE SET STRIPEPRICEID = ? WHERE ID = ?;', [newPriceObject.id, SPricingsRow.ID]);
		resolve(1);
		
	});
}















































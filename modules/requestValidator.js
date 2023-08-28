//This module serves to validate that all expected fields are present in an incoming request
var expectedFields = {
	"/coachJoin": ['firstName', 'lastName', 'location', 'gender', 'about', 'languages', 'attributes', 'specialties', 'accountable', 'compExperience', 'comps', 'circumstances', 'memberships', 'certifications'],
	"/createAccount": ['email', 'password', 'isCoach', 'surveyAnswers'],
	"/login": ['email', 'password'],
	"/updateProfilePicture": ['picture'],
	"/updateAbout": ['about'],
	"/updatePricings": ['COACHID', 'TITLE', 'DESCRIPTION', 'PRICE', 'ID'],
	//next POST route to add to the request validator is updateCertifications
	"/updateCertifications": ['certifications'],
	"/sendOffer": ['clientID', 'planID', 'greeting'],
	"/sendMessage": ['toID', 'message'],
	"/startCoaching": ['offerID'],
	"/adminCancelSubscription": ["clientID"],
	"/forgotPassword": ["email"],
	"/resetPassword": ["password", "resetToken"]
}

exports.validateRequest = function(route, body){
	return new Promise(function(resolve, reject){
		if (!expectedFields.hasOwnProperty(route)){
			resolve(1);
			return;
		}
		for (var expectedField of expectedFields[route]){
			if (!body.hasOwnProperty(expectedField)){
				resolve(0);
				return;
			}
		}
		resolve(1);
	});
}
//Edited open clients bug fix from last week
//Updated certifications manager to include resource and completiondate
//Add wordcount for coach join process
//Spacing for accountable circles
//Admin functionality remove coaches from the platform
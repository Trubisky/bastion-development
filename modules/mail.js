var AWS = require('aws-sdk');
var emails = require('/home/modules/emails.js');
AWS.config.loadFromPath('/home/credentials/aws.json');

exports.sendThankYou = function(name, email){
	var template = emails.generateWelcomeHTML(name);
	var params = {
	  Destination: { /* required */
		CcAddresses: [
		  /* more items */
		],
		ToAddresses: [
		  email
		  /* more items */
		]
	  },
	  Message: { /* required */
		Body: { /* required */
		  Html: {
		   Charset: "UTF-8",
		   Data: template
		  },
		 },
		 Subject: {
		  Charset: 'UTF-8',
		  Data: 'Thank You!'
		 }
		},
	  Source: '"Sebastien Patino" <no_reply@bastionfit.com>', /* required */
	  ReplyToAddresses: [
		 'jjusko@umich.edu',
		/* more items */
	  ],
	};
	var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
	return new Promise(function(resolve, reject){
		sendPromise.then(
  function(data) {
    resolve(data.MessageId);
  }).catch(
    function(err) {
    reject(err);
  });
	});
	
}

exports.inviteCoach = function(name, email, token){
	var template = `
	<img src="https://uploads-ssl.webflow.com/6254580345036e67d0add6c0/6256278ee553ab33b2cba289_20220411_221335_0000.png" style="width: 100px; height: 100px;"/>
	<h1>You've been invited to join Bastion!</h1>
	<p>
	Hi ${name},
	
	You've been invited to join Bastion as a coach! In order to set up your coaching account, please click the link below.<br /><br />
	<a href="https://dev.bastionfit.com/#/coachJoin/${token}">Begin Coaching</a>
	<br /><br />
	Link not working? You can also copy and paste the following URL into your browser: https://dev.bastionfit.com/#/coachJoin/${token}
	<br />

	<br />
	Copyright Bastion LLC, 2023.
	</p>
	`;
	var params = {
	  Destination: { /* required */
		CcAddresses: [
		  /* more items */
		],
		ToAddresses: [
		  email
		  /* more items */
		]
	  },
	  Message: { /* required */
		Body: { /* required */
		  Html: {
		   Charset: "UTF-8",
		   Data: template
		  },
		  Text: {
		   Charset: "UTF-8",
		   Data: "TEXT_FORMAT_BODY"
		  }
		 },
		 Subject: {
		  Charset: 'UTF-8',
		  Data: "You're Invited!🎉🎉"
		 }
		},
	  Source: '"Sebastien Patino" <no_reply@bastionfit.com>', /* required */
	  ReplyToAddresses: [
		 'jjusko@umich.edu',
		/* more items */
	  ],
	};
	var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
	return new Promise(function(resolve, reject){
		sendPromise.then(
  function(data) {
    resolve(data.MessageId);
  }).catch(
    function(err) {
    reject(err);
  });
	});
	
}

exports.sendResetPassword = function(email, resetToken){
	var template = `
	<img src="https://uploads-ssl.webflow.com/6254580345036e67d0add6c0/6256278ee553ab33b2cba289_20220411_221335_0000.png" style="width: 100px; height: 100px;"/>
	<h1>Reset your Bastion password.</h1>
	<p>We've recieved a request for a password reset on the bastion account connected to ${email}. You can click the following link to reset your password: <a href="https://dev.bastionfit.com/#/resetPassword/${resetToken}">Reset</a>. This link will be valid for 30 minutes.
	<br />

	<br />
	Copyright Bastion LLC, 2023.
	</p>
	`;
	var params = {
	  Destination: { /* required */
		CcAddresses: [
		  /* more items */
		],
		ToAddresses: [
		  email
		  /* more items */
		]
	  },
	  Message: { /* required */
		Body: { /* required */
		  Html: {
		   Charset: "UTF-8",
		   Data: template
		  },
		  Text: {
		   Charset: "UTF-8",
		   Data: "TEXT_FORMAT_BODY"
		  }
		 },
		 Subject: {
		  Charset: 'UTF-8',
		  Data: 'Bastion Password Reset Request'
		 }
		},
	  Source: '"Sebastien Patino" <no_reply@bastionfit.com>', /* required */
	  ReplyToAddresses: [
		 'jjusko@umich.edu',
		/* more items */
	  ],
	};
	var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
	return new Promise(function(resolve, reject){
		sendPromise.then(
  function(data) {
    resolve(data.MessageId);
  }).catch(
    function(err) {
    reject(err);
  });
	});
	
}
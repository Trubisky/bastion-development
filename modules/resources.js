var AWS = require('aws-sdk');
var authModule = require('/home/modules/auth.js');
AWS.config.loadFromPath('/home/credentials/aws.json');
var s3Bucket = new AWS.S3({params: {Bucket: 'bastionuploadedresources'}});

exports.uploadProfilePicture = function(base64string){
	return new Promise(function(resolve, reject){
		var dataKey = authModule.generateToken() + ".png";
		var buf = Buffer.from(base64string, "base64");
		var data = {
			Key: dataKey, 
			Body: buf,
			ContentEncoding: 'base64',
			ContentType: 'image/png'
		};
	
		s3Bucket.putObject(data, function(err, data){
		  if (err) { 
			console.log(err);
			console.log('Error uploading data: ', data); 
			resolve("/resources/default.jpg");
		  } else {
			console.log('successfully uploaded profile picture!');
			resolve('https://bastionuploadedresources.s3.us-east-2.amazonaws.com/' + dataKey);
		  }
	  });
	})
}

exports.uploadPicture = function(base64string){
	return new Promise(function(resolve, reject){
		var dataKey = authModule.generateToken() + ".png";
		var buf = Buffer.from(base64string, "base64");
		var data = {
			Key: dataKey, 
			Body: buf,
			ContentEncoding: 'base64',
			ContentType: 'image/png'
		};
	
		s3Bucket.putObject(data, function(err, data){
		  if (err) { 
			console.log(err);
			console.log('Error uploading data: ', data); 
			resolve("/resources/default.jpg");
		  } else {
			console.log('successfully uploaded picture!');
			resolve('https://bastionuploadedresources.s3.us-east-2.amazonaws.com/' + dataKey);
		  }
	  });
	})
}
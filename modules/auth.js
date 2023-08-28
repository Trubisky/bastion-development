const bcrypt = require('bcrypt');
var dbModule = require('/home/modules/database.js');
dbModule.initDB();

exports.generateToken = function(){
  var tString = "";
  var usableTokenCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  for (var i=0; i<30; i++){
    tString+=usableTokenCharacters[Math.floor(Math.random() * usableTokenCharacters.length)];
  }
  return tString;
}

exports.resolveUserId = async function(token){
  if (!token){
    token = "a";
  }
  var IDRow = await dbModule.dbGet("SELECT ID FROM USER WHERE TOKEN LIKE ?;", [token]);
  if (IDRow){
	return IDRow.ID;
  }
  return 0;
  /*
  return new Promise(function(resolve, reject){
    db.get("SELECT ID FROM USER WHERE TOKEN LIKE ?;", [token], function(err, row){
      if (row){
        resolve(row.ID);
        return;
      }
      resolve(-1);
      return;
    });
  });
  */
}

exports.resolveAdminId = async function(token){
  if (!token){
    token = "a";
  }
  var IDRow = await dbModule.dbGet("SELECT ID FROM USER WHERE TOKEN LIKE ? AND ADMIN = 1;", [token]);
  if (IDRow){
	return IDRow.ID;
  }
  return 0;
}

exports.login = async function(email, password){
	var tokenRow = await dbModule.dbGet("SELECT TOKEN, PASSWORD FROM USER WHERE LOWER(?) LIKE LOWER(EMAIL);", [email]);
	if (!tokenRow){
		return "";
	}
	var resultToken = await new Promise(function(resolve, reject){
		bcrypt.compare(password, tokenRow.PASSWORD, function(err2, res){
			if (res){
			  resolve(tokenRow.TOKEN);
			  return; 
			}
			resolve("");
		});
	});
	return resultToken;
	/*
	return new Promise(async function(resolveb, rejectb){
		 console.log('trying login');
		  var token = await new Promise(function(resolve, reject){
			db.get("SELECT TOKEN, PASSWORD FROM USER WHERE LOWER(?) LIKE LOWER(EMAIL);", [email], function(err, row){
			  if (!row){
				resolve("");
				return;
			  }
			  bcrypt.compare(password, row.PASSWORD, function(err2, res){
				if (res){
				  resolve(row.TOKEN);
				  return;
				}
				resolve("");
				return;
			  });
			});
		  });
		  if (token){
			resolveb(token);
		  }
		  else{
			resolveb("");
		  }
	});
	*/
}

exports.register = async function(email, password, isCoach, surveyAnswers){
	var IDRow = await dbModule.dbGet('SELECT ID FROM USER WHERE LOWER(EMAIL) LIKE LOWER(?);', [email]);
	console.log(IDRow);
	console.log("what");
	if (IDRow){
		return "";
	}
	console.log("here1");
	var password2 = await new Promise(function(resolve, reject){
		bcrypt.hash(password, 10, function(err, hash){
		  resolve(hash);
		});
	});
	var token = exports.generateToken();
	await dbModule.dbRun('INSERT INTO USER (NAME, PROFILEPICTURE, ABOUT, EMAIL, PASSWORD, TOKEN, ISCOACH, COACHID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
		[surveyAnswers[0].inputAnswer, "/resources/default.png", "Proud Bastion Member since 2023!", email, password2, token, isCoach, -1]);
	return token;
	
	/*
	return new Promise(async function(resolveb, rejectb){
		var isGenuine = await new Promise(function(resolve, reject){
		db.get('SELECT ID FROM USER WHERE LOWER(EMAIL) LIKE LOWER(?);', [email], function(err, row){
			  if (!row){
				resolve(true);
			  }
			  else{
				resolve(false);
			  }
			})
		  });
		  if (!isGenuine){
			resolveb();
			return;
		  }
		  var password2 = await new Promise(function(resolve, reject){
			bcrypt.hash(password, 10, function(err, hash){
			  resolve(hash);
			});
		  });
		  var token = exports.generateToken();
		  console.log(token);
		  db.run('INSERT INTO USER (NAME, PROFILEPICTURE, ABOUT, EMAIL, PASSWORD, TOKEN, ISCOACH, COACHID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
			[surveyAnswers[0].inputAnswer, "/resources/default.jpg", "Proud Bastion Member since 2023!", email, password2, token, isCoach, -1],
			function(err){
				console.log(err);
			  resolveb(token);
			})
	});
	*/
} 

exports.resetPassword = async function(userID, newPassword){
	var hashedPassword = await new Promise(function(resolve, reject){
		bcrypt.hash(newPassword, 10, function(err, hash){
		  resolve(hash);
		});
	});
	dbModule.dbRun("UPDATE USER SET PASSWORD = ? WHERE ID = ?;", [hashedPassword, userID]);
}
//This is the old database driver for use with SQLite. It still works seamlessly with the rest of the code, we just don't use SQLite anymore, opting for a migration to MySQL.


const dbFile = "./bastionfit.db";
const sqlite3 = require("sqlite3").verbose();
var db;
exports.initDB = function(){
	if (!db){
		db = new sqlite3.Database(dbFile);
	}
}

exports.dbGet = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		db.get(query, parameterArray, function(err, row){
			if (err){
				console.log(err);
				resolve(0);
				return;
			}
			resolve(row);
		});
	});
}

exports.dbAll = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		db.all(query, parameterArray, function(err, rows){
			if (err){
				console.log(err);
				resolve(0);
				return;
			}
			resolve(rows);
		});
	});
}

exports.dbRun = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		db.run(query, parameterArray, function(err){
			if (err){
				resolve(0);
				return;
			}
			resolve(1);
		});
	});
}
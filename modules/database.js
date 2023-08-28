var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : 'dev1'
});
connection.connect();

exports.initDB = function(){

}

exports.dbGet = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		connection.query(query, parameterArray, function (err, results, fields) {
			//console.log(err);
			console.log(results);
			//console.log(fields);
			if (results.length == 0){
				resolve(0);
			}
			else{
				resolve(results[0]);
			}
		});
		/*
		db.get(query, parameterArray, function(err, row){
			if (err){
				console.log(err);
				resolve(0);
				return;
			}
			resolve(row);
		});
		*/
	});
}

exports.dbAll = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		connection.query(query, parameterArray, function (err, results, fields) {
			//console.log(err);
			console.log(results);
			//console.log(fields);
			resolve(results);
		});
		/*
		db.all(query, parameterArray, function(err, rows){
			if (err){
				console.log(err);
				resolve(0);
				return;
			}
			resolve(rows);
		});
		*/
	});
}

exports.dbRun = function(query, parameterArray){
	return new Promise(function(resolve, reject){
		connection.query(query, parameterArray, function (err, results, fields) {
			if (err){
				console.log(err);
				resolve(0);
				return;
			}
			resolve(1)
			//console.log(results);
			//console.log(fields);
		});
		/*
		db.run(query, parameterArray, function(err){
			if (err){
				resolve(0);
				return;
			}
			resolve(1);
		});
		*/
	});
}
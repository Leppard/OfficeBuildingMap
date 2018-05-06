var mysql = require('mysql');
//创建连接
var config = {
host     : '10.60.45.22',
user     : 'Leppard',
password : '123456',
database : 'officebuilding'
};

function queryData(callback) {
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query('SELECT * from buildings_with_rent', function(err, rows, fields) {
  		if (err) throw err;
  		callback(rows);
	});
	connection.end();
}

exports.queryData = queryData;
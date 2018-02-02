var sql = require('mssql');
//连接方式1："mssql://用户名:密码@ip地址（无需端口号）/SqlServer名/数据库名称"
//连接方式2："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
function queryData(callback) {
	sql.connect("mssql://sa:123456@10.60.38.147:1433/OfficeBuilding").then(function() {
    	// Query
	    new sql.Request().query('select top(10) * from crawler').then(function(recordset) {
	       callback(recordset['recordset']);
	    }).catch(function(err) {
	       console.log(err);
	    });
	}).catch(function(err) {
    	console.log(err);
	});
}

exports.queryData = queryData;

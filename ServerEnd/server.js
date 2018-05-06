var express = require('express');
var nodeExcel = require('excel-export');
var app = express();

app.use(express.static('../'));

app.get('/buildingData', function (req, res) {
	var query = require('./dbConnector');
	query.queryData(function(recordset) {
		var dataSet = [];
		for(var arrNumber in recordset) {
			var rowArr = [];
			var dic = recordset[arrNumber];
			for (var key in dic) {
				rowArr.push(dic[key]);
			}
			dataSet.push(rowArr);
		}
		res.json(dataSet);
	});
})

app.get('/excel', function(req, res){
	var query = require('./dbConnector');
	query.queryData(function(recordset) {
		var dataSet = [];
		for(var arrNumber in recordset) {
			var rowArr = [];
			var dic = recordset[arrNumber];
			for (var key in dic) {
				rowArr.push(dic[key]);
			}
			dataSet.push(rowArr);
		}
		setUpExcelExport(res, dataSet);
	});
});

function setUpExcelExport(res, dataSet) {
	var conf ={};
	// conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
  	conf.cols = [{
		caption:'id',
        type:'number'
	},{
		caption:'outer_id',
		type:'string'
	},{
		caption:'name',
		type:'string'
	},{
		caption:'address',
		 type:'string'
  	},{
		caption:'type',
        	type:'string'
	},{
		caption:'build_time',
		type:'string'
	},{
		caption:'floors',
		type:'string'
	},{
		caption:'property_fee',
		 type:'string'
  	},{
		caption:'rent',
		type:'string'
	},{
		caption:'rent_more',
		type:'string'
	},{
		caption:'area',
		 type:'string'
  	},{
		caption:'location',
        	type:'string'
	},{
		caption:'address_for_coordinate',
		type:'string'
	},{
		caption:'latitude_bd',
		type:'string'
	},{
		caption:'longitude_bd',
		 type:'string'
  	},{
		caption:'latitude_wgs',
		 type:'string'
  	},{
		caption:'longitude_wgs',
		type:'string'
	}];
  	conf.rows = dataSet;
  	var result = nodeExcel.execute(conf);
  	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  	res.end(result, 'binary');
}


var server = app.listen(9999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
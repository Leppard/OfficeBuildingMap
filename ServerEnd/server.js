var express = require('express');
var nodeExcel = require('excel-export');
var app = express();
 
app.use(express.static('../'));

app.get('/queryData', function (req, res) {
	var query = require('./dbConnector');
	query.queryData(function(recordset) {
		res.send(recordset);
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
		caption:'ID',
        type:'number'
	},{
		caption:'RentPerDay',
		type:'string'
	},{
		caption:'Square',
		type:'string'
	},{
		caption:'RentPerMonth',
		 type:'string'				
  	},{
		caption:'Floor',
        type:'string'
	},{
		caption:'RoomRate',
		type:'string'
	},{
		caption:'WorkStation',
		type:'string'
	},{
		caption:'BuildingName',
		 type:'string'				
  	},{
		caption:'PropertyFee',
		type:'string'
	},{
		caption:'Underground',
		type:'string'
	},{
		caption:'Address',
		 type:'string'				
  	},{
		caption:'Description',
        type:'string'
	},{
		caption:'BuildingId',
		type:'string'
	},{
		caption:'Area',
		type:'string'
	},{
		caption:'Location',
		 type:'string'				
  	},{
		caption:'Latitude_bd',
		 type:'string'				
  	},{
		caption:'Longitude_bd',
		type:'string'
	},{
		caption:'Latitude_wgs',
		type:'string'
	},{
		caption:'Longitude_wgs',
		 type:'string'				
  	}];
  	conf.rows = dataSet;
  	var result = nodeExcel.execute(conf);
  	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  	res.end(result, 'binary');
}
 

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
// 历史人数
// $.getJSON('http://118.89.200.111:3000/museum_recent', function (data) {
    data = [{"date":"周一", "people": 10000},
    {"date":"周二", "people": 13000},
    {"date":"周三", "people": 12000},
    {"date":"周四", "people": 15000},
    {"date":"周五", "people": 27000},
    {"date":"周六", "people": 30000},
    {"date":"周日", "people": 28000}];

    var xLabels = []
    var yLabels = []

    for(var i = 0; i < data.length; i++) {
        xLabels.push(data[i]["date"]);
        yLabels.push(data[i]["people"]);
    }
    // console.log(xLabels);
    Highcharts.chart('container1', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#eee'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xLabels
        },
        yAxis: {
            title: {
                text: '人数（个）'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 人'
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: '历史人数',
            data: yLabels
        }]
    });
// });

// 预测人数
// $.getJSON('http://118.89.200.111:3000/museum_prediction', function (data) {
    data = [{"date":"周一", "people": 13000},
    {"date":"周二", "people": 12000},
    {"date":"周三", "people": 11000},
    {"date":"周四", "people": 16000},
    {"date":"周五", "people": 15000},
    {"date":"周六", "people": 29000},
    {"date":"周日", "people": 29000}];
    var xLabels = []
    var yLabels = []

    for(var i = 0; i < data.length; i++) {
        xLabels.push(data[i]["date"]);
        yLabels.push(data[i]["people"]);
    }
    // console.log(xLabels);
    Highcharts.chart('container2', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#eee'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xLabels
        },
        yAxis: {
            title: {
                text: '人数（个）'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 人'
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: '预测人数',
            color: '#f7a35c',
            data: yLabels
        }]
    });
// });

//周边文化设施统计
$.getJSON('http://118.89.200.111:3000/facility_categories', function (data) {
    var arr = []
    data = {
        "剧院": 18,
        "博物馆": 5,
        "美术馆": 11,
        "其他": 8
      }
    for(var key in data) {
        var tuple = null;
        if (key=='剧院') {
            tuple = {
                name: key,
                y: data[key],
                sliced: true,
                selected: true
            }
        } else {
            tuple = [key, data[key]];
        }
        arr.push(tuple);
    }

    Highcharts.chart('container3', {
        chart: {
                backgroundColor: '#eee',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
        },
        title: {
                text: null
        },
        tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
                pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                                enabled: false
                        },
                        showInLegend: true
                }
        },
        series: [{
                name: 'Brands',
                colorByPoint: true,
                data: arr
        }]
    });
});


$.getJSON('http://118.89.200.111:7769/recommendations', function (data) {
    var xLabels = [];
    var yLabels = [];

    for(var i = 0; i < data.length; i++) {
        xLabels.push(data[i]["name"]);
        yLabels.push(data[i]["rating"]);
    }

    var chart = Highcharts.chart('container4', {
        chart: {
            type: 'column',
            backgroundColor: '#eee'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xLabels
        },
        yAxis: {
            title: {
                text: '好评率'
            },
            max: 100
        },
        tooltip: {
            valueSuffix: ' %'
        },
        series: [{
            name: '评价',
            colorByPoint: true,
            data: yLabels,
            showInLegend: false
        }]
    });
});


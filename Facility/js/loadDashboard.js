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
            type: 'areaspline'
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
            type: 'areaspline'
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
            color: '#f7a35c',
            data: yLabels
        }]
    });
// });

// 周边文化设施统计
// $.getJSON('http://118.89.200.111:3000/facility_categories', function (data) {
//     var arr = []

//     for(var key in data) {
//         var tuple = null;
//         if (key=='文化') {
//             tuple = {
//                 name: key,
//                 y: data[key],
//                 sliced: true,
//                 selected: true
//             }
//         } else {
//             tuple = [key, data[key]];
//         }
//         arr.push(tuple);
//     }
//     Highcharts.chart('container3', {
//         chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false
//         },
//         title: {
//             text: null
//         },
//         tooltip: {
//             headerFormat: '{series.name}<br>',
//             pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                     style: {
//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                     }
//                 }
//             }
//         },
//         series: [{
//             type: 'pie',
//             name: '文化设施占比',
//             data: arr
//         }]
//     });
// });

// temp fake data
Highcharts.chart('container3', {
    chart: {
            plotBackgroundColor: null,
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
            data: [{
                    name: '博览类',
                    y: 61.41,
                    sliced: true,
                    selected: true
            }, {
                    name: '社会文化类',
                    y: 11.84
            }, {
                    name: '艺术文化类',
                    y: 10.85
            }, {
                    name: '历史文化类',
                    y: 4.67
            }, {
                    name: '文化市场类',
                    y: 4.18
            }, {
                    name: '其他',
                    y: 7.05
            }]
    }]
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
            type: 'column' // varwide 依赖 varwide.js
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


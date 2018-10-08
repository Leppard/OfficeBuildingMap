// 历史人数
$.getJSON('http://118.89.200.111:3000/museum_recent', function (data) {
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
            text: '历史游客人数统计'
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
});

// 预测人数
$.getJSON('http://118.89.200.111:3000/museum_prediction', function (data) {
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
            text: '历史游客人数统计'
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
});

// 周边文化设施统计
$.getJSON('http://118.89.200.111:3000/facility_categories', function (data) {
    var arr = []

    for(var key in data) {
        var tuple = null;
        if (key=='文化') {
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
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '自然博物馆周边文化设施占比'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '文化设施占比',
            data: arr
        }]
    });
});


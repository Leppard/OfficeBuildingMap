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
            text: '预测游客人数统计'
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
});

$.getJSON('http://118.89.200.111:7769/facilities?select=id,name,ticket_fee', function (data) {
    var xLabels = [];
    var yLabels = [];

    for(var i = 0; i < data.length; i++) {
        xLabels.push(data[i]["name"]);
        var fee = data[i]["ticket_fee"]?data[i]["ticket_fee"]:0;
        yLabels.push(fee);
    }

    var chart = Highcharts.chart('container5', {
        chart: {
            type: 'column',
        },
        title: {
            text: "票价一览"
        },
        xAxis: {
            categories: xLabels
        },
        yAxis: {
            title: {
                text: '票价'
            }
        },
        tooltip: {
            valueSuffix: ' 元'
        },
        series: [{
            name: '票价',
            colorByPoint: true,
            data: yLabels,
            showInLegend: false
        }]
    });
});

$.getJSON('http://118.89.200.111:7769/facilities?select=id,name,construction_area', function (data) {
    var xLabels = [];
    var yLabels = [];

    for(var i = 0; i < data.length; i++) {
        xLabels.push(data[i]["name"]);
        var area = data[i]["construction_area"]?data[i]["construction_area"]:0;
        yLabels.push(area);
    }

    var chart = Highcharts.chart('container6', {
        chart: {
            type: 'column',
        },
        title: {
            text: "占地面积一览"
        },
        xAxis: {
            categories: xLabels
        },
        yAxis: {
            title: {
                text: '面积'
            }
        },
        tooltip: {
            valueSuffix: ' 平方米'
        },
        series: [{
            name: '面积',
            colorByPoint: true,
            data: yLabels,
            showInLegend: false
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


$.getJSON('http://118.89.200.111:3000/facility_districts', function (data) {
    var points = [],
        region_p,
        region_val,
        region_i,
        country_p,
        country_i,
        cause_p,
        cause_i,
        cause_name = [];
    cause_name['Communicable & other Group I'] = 'Communases';
    cause_name['Noncommdiseases'] = 'Non-communicable diseases';
    cause_name['Injuries'] = 'Injuries';
    region_i = 0;
    for (var region in data) {
        region_val = 0;
        region_p = {
            id: "id_" + region_i,
            name: region,
            color: Highcharts.getOptions().colors[region_i]
        };
        points.push(region_p);
        country_i = 0;
        for (var country in data[region]) {
            country_p = {
                id: region_p.id + "_" + country_i,
                name: country,
                parent: region_p.id,
            };
            points.push(country_p);
            cause_i = 0;
            for (var cause in data[region][country]) {
                cause_p = {
                    id: country_p.id + "_" + cause_i,
                    name: cause,
                    parent: country_p.id,
                    value: data[region][country][cause]['latitude'],
                    // color: Highcharts.getOptions().colors[cause_i]
                };
                region_val += cause_p.value;
                points.push(cause_p);
                cause_i++;
            }
            country_i++;
        }
        region_p.value = region_val;
        region_i++;
    }
    console.log(points);
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container4'
        },
        series: [{
            type: "treemap",
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            dataLabels: {
                enabled: false,
                style: {
                    'fontSize': '15px'
                }
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 2
            }],
            data: points
        }],
        subtitle: {
            text: '点击下钻'
        },
        title: {
            text: '上海市文化设施分布情况'
        }
    });
});

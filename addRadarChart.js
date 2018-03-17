function addRadarChart() {
    var title = $('#openModalBtn').data('title');

    var lat = $('#openModalBtn').data('lat');
    var lon = $('#openModalBtn').data('lon');
    var bd_coor = wgs84tobd09(Number(lon), Number(lat));

    var radius = $('#radius').val();
    var nearbyNum = new Array();
    var keywords = ['酒店', '公园', '便利店', '地铁站', '医院'];

    $("#mypanel-title").empty();
    $("#mypanel-title").append(title + " " + radius + "m");

    for (var i = 0; i < keywords.length; i++) {
        mySearchNearby(keywords[i], bd_coor[0], bd_coor[1], Number(radius), nearbyNum);
    }
}

function mySearchNearby(key, lon, lat, r, nearbyNum) {

    var options = {
        pageCapacity: 100,
        onSearchComplete: function (results) {
            // 判断状态是否正确

            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                if (results.length == 0) {
                    alert("未完整设置搜索条件，请重新检查！");
                    return;
                }
                nearbyNum[key] = results.getNumPois();
            } else {
                nearbyNum[key] = 0;
            }

            if (Object.keys(nearbyNum).length == 5) {
                $('#container').highcharts({
                    chart: {
                        polar: true,
                        type: 'line'
                    },
                    title: {
                        text: '',
                        x: 0
                    },
                    pane: {
                        size: '80%'
                    },
                    xAxis: {
                        categories: ['酒店', '公园', '便利店', '地铁站', '医院'],
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },
                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },
                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                    },
                    series: [{
                        name: 'POI数目',
                        data: [nearbyNum['酒店'], nearbyNum['公园'], nearbyNum['便利店'], nearbyNum['地铁站'], nearbyNum['医院']],
                        pointPlacement: 'on'
                    }]
                });
            }

            $('#myModal').modal('hide');
        }
    };
    var local = new BMap.LocalSearch("上海", options);
    local.searchNearby(key, new BMap.Point(lon, lat), r);
}

$(function () {
    $('#spider-charts').highcharts({
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: '',
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['销售', '市场营销', '发展', '客户支持',
                '信息技术', '行政管理'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        series: [{
            name: '预算拨款',
            data: [43000, 19000, 60000, 35000, 17000, 10000],
            pointPlacement: 'on'
        }, {
            name: '实际支出',
            data: [50000, 39000, 42000, 31000, 26000, 14000],
            pointPlacement: 'on'
        }, {
            name: '实际支出',
            data: [60000, 49000, 52000, 51000, 36000, 34000],
            pointPlacement: 'on'
        }, {
            name: '实际支出',
            data: [20000, 29000, 32000, 41000, 56000, 64000],
            pointPlacement: 'on'
        }]
    });
});




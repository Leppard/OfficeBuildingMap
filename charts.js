function addRadarChart() {
    var lat = $('#openModalBtn').data('lat');
    var lon = $('#openModalBtn').data('lon');
    var bd_coor = wgs84tobd09(Number(lon), Number(lat));

    var radius = $('#radius').val();
    var nearbyNum = new Array();
    var categories = new Array();
    var keywords = ['酒店', '公园', '便利店', '地铁站', '医院'];

    var num = new Number();
    for (var i = 0; i < keywords.length; i++) {
        mySearchNearby(keywords[i], bd_coor[0], bd_coor[1], Number(radius), nearbyNum, categories);
    }

}

function mySearchNearby(key, lon, lat, r, nearbyNum, categories) {

    var options = {
        pageCapacity: 100,
        onSearchComplete: function (results) {
            // 判断状态是否正确

            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                if (results.length == 0) {
                    alert("未完整设置搜索条件，请重新检查！");
                    return;
                }
                categories.push(key);
                nearbyNum.push(results.getNumPois());
            } else {
                categories.push(key);
                nearbyNum.push(0);
            }

            if (nearbyNum.length == 5) {
                alert(nearbyNum);
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
                        categories: categories,
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
                        data: nearbyNum,
                        pointPlacement: 'on'
                    }]
                });
            }
        }
    };
    var local = new BMap.LocalSearch("上海", options);
    local.searchNearby(key, new BMap.Point(lon, lat), r);
}


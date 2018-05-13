function addToCompare() {
    var title = $('#openModalBtn').data('title');
    var radius = $('#radius').val();
    var lat = $('#openModalBtn').data('lat');
    var lon = $('#openModalBtn').data('lon');
    var rent = $('#openModalBtn').data('rent');
    var bd_coor = wgs84tobd09(Number(lon), Number(lat));

    var bInfo = [title, bd_coor, radius, rent];

    if (!bList.includes(bInfo.toString())) {
        $("#builds").append("<li class='list-group-item'> " +
            "<span class='badge'>" + radius + "m" + "</span>"
            + title + "</li>");
        bList.push(bInfo.toString());
        searchBs.push(bInfo);
    } else {
        alert("此条查询已存在，请重新设置查询条件");
    }
    // alert("push" + title + bList.length + "," + searchBs.length);
}

function compare() {
    var nearbyNum = [];

    for (var b = 0; b < searchBs.length; b++) {
        var keywords = ['酒店_' + searchBs[b][0], '公园_' + searchBs[b][0],
            '地铁_' + searchBs[b][0], '便利店_' + searchBs[b][0], '医院_' + searchBs[b][0], '商场_' + searchBs[b][0]];
        for (var i = 0; i < keywords.length; i++) {
            mySearchNearby2(keywords[i], searchBs[b][1][0], searchBs[b][1][1], Number(searchBs[b][2]), nearbyNum);
        }
    }
}

function mySearchNearby2(keyword, lon, lat, r, nearbyNum) {
    var options = {
        pageCapacity: 100,
        onSearchComplete: function (results) {
            // 判断状态是否正确

            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                if (results.length == 0) {
                    alert("未完整设置搜索条件，请重新检查！");
                    return;
                }
                nearbyNum[keyword] = results.getNumPois();
            } else {
                nearbyNum[keyword] = 0;
            }

            var allData = [];
            for (var b = 0; b < searchBs.length; b++) {
                var data = [];
                data["name"] = searchBs[b][0] + '_' + searchBs[b][3];
                data["data"] = [nearbyNum['酒店_' + searchBs[b][0]], nearbyNum['公园_' + searchBs[b][0]], nearbyNum['地铁_' + searchBs[b][0]],
                    nearbyNum['便利店_' + searchBs[b][0]], nearbyNum['医院_' + searchBs[b][0]], nearbyNum['商场_' + searchBs[b][0]]];

                data["pointPlacement"] = 'on';
                allData.push(data);
            }

            // alert("noneHasUndefined(allData)" + noneHasUndefined(allData));
            if (noneHasUndefined(allData)) {
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
                        categories: ['酒店', '公园', '地铁', '便利店', '医院', '商场'],
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },
                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },
                    tooltip: {
                        pointFormatter: function () {
                            var s = '<br/><span style="color:' + this.color + '">' + this.series.name.split('_')[0] + ': ' +
                                    this.y;
                            return s;
                        },
                        shared: true
                        // pointFormat: '<span style="color:{series.color}'
                    },
                    series: allData
                });
            }

            $('#myModal').modal('hide');
        }
    };
    var local = new BMap.LocalSearch("上海", options);
    var key = keyword.split('_')[0];
    local.searchNearby(key, new BMap.Point(lon, lat), r);
}

function noneHasUndefined(allData) {
    for (var i = 0; i < allData.length; i++) {
        if (hasUndefined(allData[i].data)) {
            return false;
        }
    }
    return true;
}

function hasUndefined(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) == 'undefined') {
            return true;
        }
    }
    return false;
}

function cancelCompare() {
    bList = [];
    searchBs = [];
    // alert("cancel" + bList.length + "," + searchBs.length);
    $("#builds").empty();
}


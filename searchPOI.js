function searchPOIandDrawOnMap(map, markers, layerControl) {
    var lat = $('#openModalBtn').data('lat');
    var lon = $('#openModalBtn').data('lon');
    var bd_coor = wgs84tobd09(Number(lon), Number(lat));

    var radius = $('#radius').val();
    var keywords = [];
    if($('#inlineCheckbox1').is(':checked')) {
        keywords.push("酒店");
    }; 
    if($('#inlineCheckbox2').is(':checked')) {
        keywords.push("公园");
    }; 
    if($('#inlineCheckbox3').is(':checked')) {
        keywords.push("便利店");
    };
    if($('#inlineCheckbox4').is(':checked')) {
        keywords.push("地铁站");
    };

    var options = {
    pageCapacity: 100,
        onSearchComplete: function(results) {
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                if (results.length == 0) {
                    alert("未完整设置搜索条件，请重新检查！");
                    return;
                }

                markers.clearLayers();
                for (var index in results) {
                    for (var i = 0; i < results[index].getCurrentNumPois(); i++) {
                        var dic = new Array();
                        var wgsCoor = bd09towgs84(results[index].getPoi(i).point.lng, results[index].getPoi(i).point.lat);
                        dic['lon'] = wgsCoor[0];
                        dic['lat'] = wgsCoor[1];
                        dic['title'] = results[index].getPoi(i).title;
                        dic['address'] = results[index].getPoi(i).address;

                        var markerIcon;
                        if (results[index].keyword == "公园") {
                            markerIcon = L.AwesomeMarkers.icon({
                                icon: 'leaf',
                                prefix: 'fa',
                                markerColor: 'green'
                            });
                        } else if (results[index].keyword == "酒店"){
                            markerIcon = L.AwesomeMarkers.icon({
                                icon: 'h-square',
                                prefix: 'fa',
                                markerColor: 'red'
                            }); 
                        } else if (results[index].keyword == "便利店"){
                            markerIcon = L.AwesomeMarkers.icon({
                                icon: 'shopping-basket',
                                prefix: 'fa',
                                markerColor: 'blue'
                            }); 
                        } else if (results[index].keyword == "地铁站"){
                            markerIcon = L.AwesomeMarkers.icon({
                                icon: 'subway',
                                prefix: 'fa',
                                markerColor: 'darkpurple'
                            }); 
                        }  else {
                            markerIcon = L.AwesomeMarkers.icon({
                                prefix: 'fa',
                                markerColor: 'cadetblue'
                            }); 
                        }

                        var marker = L.marker([dic['lat'], dic['lon']], {icon: markerIcon});
                        marker.addTo(markers);
                        var popContent = L.Util.template('<p>{title}<br />{address}<br />{lat}, {lon}</p>', dic);
                        marker.bindPopup(popContent);
                    }
                }
            }

            $('#myModal').modal('hide');
            if (!map.hasLayer(markers)) {
                markers.addTo(map);
                layerControl.addOverlay(markers, "显示搜索结果");
            }

        }
    };
    var local = new BMap.LocalSearch("上海", options);
    local.searchNearby(keywords, new BMap.Point(bd_coor[0], bd_coor[1]), Number(radius));
}
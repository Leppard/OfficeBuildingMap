
$(document).ready(function(){
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
        var selected = $(this).hasClass("todo-done");
        switch($(this).attr('id')) {
            case "panoramaLayer":
                switchPanoramaLayer(selected);
                break;
            case "trafficLayer":
                switchTrafficLayer(selected);
                break;
            case "heatLayer":
                switchHeatLayer(selected);
                break;
            case "drawLayer":
                switchDrawLayer(selected);
                break;
        }
    });
});


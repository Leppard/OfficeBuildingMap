function addRadarChart() {
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
        }]
    });
}

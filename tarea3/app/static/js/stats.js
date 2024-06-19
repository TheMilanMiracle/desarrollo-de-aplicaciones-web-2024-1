fetch('http://localhost:5000/get-stats/')
    .then((res) => {return res.json()})
    .then((json) => {

        let products_categories = [];
        let products_series = [];
        let orders_categories = [];
        let orders_series = [];

        json["products_data"].forEach((pair) => {
            
            products_categories.push(pair[0]);
            products_series.push(pair[1]);

        });

        json["orders_data"].forEach((pair) => {
            
            orders_categories.push(pair[0]);
            orders_series.push(pair[1]);

        });

        Highcharts.chart('product-chart', {
            chart: {
                type: 'column',
                // backgroundColor: 'transparent',
                backgroundColor: 'rgba(240,248,255, 0.08)'
            },
            title: {
                text: 'Estadísticas de productos',
                style:{
                    color : 'aliceblue',
                    fontFamily: 'Comic Sans MS',
                    fontSize: 30
                }
            },
            xAxis: {
                title: {
                    text: 'Productos',
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                        fontSize: 18
                    }
                },
                labels:{
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS'
                    }
                },
                categories: products_categories
            },
            yAxis: {
                title: {
                    text: 'Cantidad',
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                        fontSize: 18
                    }
                },
                labels:{
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS'
                    }
                },
                gridLineDashStyle: 'dot',
                gridLineColor: 'rgba(240,248,255, 0.5)',
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        color: 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: 'rgba(240,248,255, 0.8)',
                    fontFamily: 'Comic Sans MS',
                }
            },
            series: [{
                name: 'Cantidad por producto',
                color: 'rgba(240,248,255, 0.9)',
                fontFamily: 'Comic Sans MS',
                borderColor: 'rgb(0,0,0)',
                data: products_series,
            }]
        });

        Highcharts.chart('order-chart', {
            chart: {
                type: 'column',
                // backgroundColor: 'transparent',
                backgroundColor: 'rgba(240,248,255, 0.08)'
            },
            title: {
                text: 'Estadísticas de pedidos',
                style:{
                    color : 'aliceblue',
                    fontFamily: 'Comic Sans MS',
                    fontSize: 30
                }
            },
            xAxis: {
                title: {
                    text: 'Comunas',
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                        fontSize: 18
                    }
                },
                labels:{
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS'
                    }
                },
                categories: orders_categories
            },
            yAxis: {
                title: {
                    text: 'Cantidad',
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                        fontSize: 18
                    }
                },
                labels:{
                    style:{
                        color : 'aliceblue',
                        fontFamily: 'Comic Sans MS'
                    }
                },
                gridLineDashStyle: 'dot',
                gridLineColor: 'rgba(240,248,255, 0.5)',
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        color: 'aliceblue',
                        fontFamily: 'Comic Sans MS',
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: 'aliceblue',
                    fontFamily: 'Comic Sans MS',
                }
            },
            series: [{
                name: 'Cantidad por pedido',
                color: 'rgba(240,248,255, 0.9)',
                fontFamily: 'Comic Sans MS',
                borderColor: 'rgb(0,0,0)',
                data: orders_series,
            }]
        });

    })
    .catch((error) => {console.log(error)});







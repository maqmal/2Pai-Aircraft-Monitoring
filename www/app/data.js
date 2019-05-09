let succeed = document.getElementById("success");
var param = {
    humidity : 0,
    temperature : 0,
    setHumid : function (data){
        this.humidity = parseFloat(data);
    },
    setTemp : function (data){
        this.temperature = parseFloat(data)
    },
    getHumid : function (data){
        return this.humidity;
    },
    getTemp : function (data){
        return this.temperature;
    }
}

function RealTimeData() {
    const socket = io.connect();

    socket.on('socketData', (data) => {
        console.log(data);

        document.getElementById("DataRecive").innerHTML = data.dataHasil;
        succeed.innerHTML = "Data Parsing Succeed!";

        param.setTemp(data.dataHasil[4]);
        param.setHumid(data.dataHasil[3]);
        gaugeTemp.value = data.dataHasil[4];
    });
}

var gaugeTemp = new LinearGauge({
    renderTo: 'gauge-id',
    colorNumbers: 'red',
    width: 100,
    height: 300
  }).draw();

$(function(){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    chartTemp = new Highcharts.Chart({
        chart: {
            renderTo: 'chartTemp',
            defaultSeriesType: 'spline',
            events: {
                load: function () {

                    var series = this.series[0],
                        shift = series.data.length > 25;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = param.getTemp();
                        series.addPoint([x, y], true, shift);
                    }, 1000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            crosshair: true,
            maxZoom: 20 * 1000,
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            crosshair: true,
            title: {
                text: 'Celcius',
                margin: 5
            }
        },
	    tooltip: {
            valueSuffix: '°'
        },
	    plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }

            }
        },
        series: [{
            name: 'Temperature',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: param.getTemp()
                    });
                }
                return data;
            }())
        }]
    });

    chartHumid = new Highcharts.Chart({
        chart: {
            renderTo: 'chartHumid',
            defaultSeriesType: 'spline',
            events: {
                load: function () {

                    var series = this.series[0],
                        shift = series.data.length > 25;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = param.getHumid();
                        series.addPoint([x, y], true, shift);
                    }, 1000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            crosshair: true,
            maxZoom: 20 * 1000,
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            crosshair: true,
            title: {
                text: 'Humidity',
                margin: 5
            }
        },
	    tooltip: {
            valueSuffix: '%'
        },
	    plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }

            }
        },
        series: [{
            name: 'Humidity',
            color : '#CDDC39',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: param.getHumid()
                    });
                }
                return data;
            }())
        }]
    });
});




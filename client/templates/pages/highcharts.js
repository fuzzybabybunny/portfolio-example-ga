Template.Highcharts.rendered = function(){

  // data is an array
  var dataWeekly = [];
  var dataMonthly = [];
  var dataQuarterly = [];
  var dataYearly = [];
  var url = 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB';

  function getTemp(url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'JSON',
      success: function(response){
        $(response.data).each(function(){
          var dataPoint = {};
          dataPoint.y = this[1];

          var date = moment(this[0], "YYYY-MM-DD")
          dataPoint.x = Date.UTC(date.year(), date.month(), date.date());

          dataWeekly.push(dataPoint);
        })

        // convert to chronological order
        dataWeekly = dataWeekly.reverse()

        console.log(dataWeekly);

        var monthlySum = 0;
        var quarterlySum = 0;
        var yearlySum = 0;

        for (var i = 0; i < dataWeekly.length; i++) {
            monthlySum += dataWeekly[i].y;
            quarterlySum += dataWeekly[i].y;
            yearlySum += dataWeekly[i].y;

            if(i % 4 === 0) { // mod(4) = 0
                dataMonthly.push({x: dataWeekly[i].x, y: monthlySum / 4});
                monthlySum = 0;
            }
            if(i % 13 === 0) { // mod(13) = 0
                dataQuarterly.push({x: dataWeekly[i].x, y: quarterlySum / 13});
                quarterlySum = 0;
            }
            if(i % 52 === 0) { // mod(52) = 0
                dataYearly.push({x: dataWeekly[i].x, y: yearlySum / 52});
                yearlySum = 0;
            }
        }

        initializeHighChart();
      },
      error: function(){
        alert("cannot connect");
      }
    });
  }

  getTemp(url);

  function initializeHighChart(){
    $('#chart').highcharts({
      title: {
        text: 'Historical Gasoline Prices'
      },
      subtitle: {
        text: 'quandl'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        min: 0.5,
        max: 4.5,
        title: {
            text: 'Temperature (°K)'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: [{
        name: 'Weekly',
        data: dataWeekly
      },
      {
        name: 'Monthly',
        data: dataMonthly
      },
      {
        name: 'Quarterly',
        data: dataQuarterly
      },
      {
        name: 'Yearly',
        data: dataYearly
      }]
    });
  }

	var toDateObject = function(date){
		var output = new Date(date);
		return output;
	};

	var returnMonth = function(date){
		var output = toDateObject(date);
		return output.getMonth();
	};

	var returnYear = function(date){
		var output = toDateObject(date);
		return output.getFullYear();
	};

  var info = [ ["2013-11-10", 5.0], ["2013-11-25", 4.0], ["2013-12-01", 3.61] ]
// [ [11, 4.5], [12, 3.61] ]
// {
//	month: "Jan",
//  year: 2013
//	prices: [5.0, 4.0]
// }

	var createBetterArray = function(info){
		var newInfo = [];
		for(var i = 0; i < info.length; i++){
			newInfo[i] = {};
			newInfo[i].month = returnMonth(info[i][0]);
			newInfo[i].year = returnYear(info[i][0]);
			newInfo[i].price = info[i][1];
		};
		return newInfo;
	};

	var monthlyRollingAverage = function(info){

    var average = 0;
    var averageArray = [];
		for( var i = 0; i < info.length - 1; i+=4){
			var sum = 0;
			for(var w = 0; w <= 3; w++){

				sum += info[i][1];
				i++;

			};
      
			average = sum / 4;
			averageArray.push(average)

		};

		console.log(averageArray);
		return averageArray;

	};

	var quarterlyRollingAverage = function(info){

    var average = 0;
    var averageArray = [];
		for( var i = 0; i < info.length - 1; i+=13){
			var sum = 0;
			for(var w = 0; w <= 12; w++){

				sum += info[i][1];
				i++;

			};
      
			average = sum / 4;
			averageArray.push(average)

		};

		console.log(averageArray);
		return averageArray;
		
	};

	// $.ajax({
	// 	url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
	// 	type: 'GET',
	// 	dataType: 'JSON',
	// 	success: function(response){
	// 		"weeklyRollingAverage";
	// 		console.log(weeklyRollingAverage(response.data));
	// 		console.log(quarterly(response.data));
	// 		console.log(response.data);
	// 		// initializeHighChart(response);
	// 	}
	// });

	// var generateYearlySeries = function(info){
	// 	var yearSeries = [];
	// 	var totalPrice = 0;
	// 	var startYear = 1990;
	// 	var endYear = 2015;
	// 	var range = endYear - startYear;

	// 	for(var i = 0; i < info.length; i++){
	// 		for(var year = startYear; year < endYear; year++){
	// 			if(info[i].year == year){
	// 				yearSeries[];
	// 				totalPrice += info[i].price;
	// 			}
	// 		}
	// 	}



	// };

	var generateMonthlySeries = function(info){

		var monthlySeries = [];
// [{
//		month: 10,
//  	year: 2013
//		prices: 34
//  },{
//		month: 11,
//  	year: 2013
//		prices: 50
//	}]

		for(var month = 0; month < 12; month++){
			monthlySeries[month] = {};
			monthlySeries[month].month = month;
			monthlySeries[month].prices = [];
		};

		// console.log(monthlySeries);
		for(var year = 1990; year < 2014; year++){
			for(var month = 0; month < 12; month++){
				for(var i = 0; i < info.length; i++){
					if( info[i].month == month && info[i].year == year ){
						// monthlySeries[info[i].price.push
					};
				};
			};
		}


		console.log(monthlySeries);
	};

	var generateYearlySeries = function(info){



	};

	var generateQuarterlySeries = function(info){



	};

	var generateSeries = function(info){
		var series = [];
		var reversedData = info.data.reverse();
		for(index in reversedData){
			series.push(reversedData[index])
		};
		// console.log("series: ", series);
		return series;
	};

	// $.ajax({
	// 	url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
	// 	type: 'GET',
	// 	dataType: 'JSON',
	// 	success: function(response){
	// 		console.log(createBetterArray(response.data));
	// 		console.log(response);
	// 		// initializeHighChart(response);
	// 	}
	// });

	// var initializeHighChart = function(data){

 //    $('#chart').highcharts({
	// 		// key: value
	// 		title: {
	// 			text: data.name
	// 		},
	// 		subtitle: {
	// 			text: data.description
	// 		},
	// 		xAxis: {
	// 		// Configuration of xAxis
	// 			type: 'datetime',
	// 			dateTimeLabelFormats: {
	// 				millisecond: '%H:%M:%S.%L',
	// 				second: '%H:%M:%S',
	// 				minute: '%H:%M',
	// 				hour: '%H:%M',
	// 				day: '%e. %b',
	// 				week: '%e. %b',
	// 				month: '%b \'%y',
	// 				year: '%Y'
	// 			}
	// 		},
	// 		yAxis: {
	// 			// Configuration of yAxis
	// 			min: 0,
	// 			max: 6,
	// 	    title: {
	// 	            text: 'Gasoline Prices (USD)'
	// 	        }
 //      },
 //      legend: {
 //        // Configuration of Legends
 //        layout: 'vertical',
 //        align: 'right',
 //        verticalAlign: 'middle',
 //        borderWidth: 0
 //      },
 //      series: [{
 //      	name: 'Weekly',
 //      	data: generateSeries(data)
 //      }]
 //    });
 //  }

	// var cities = ["HongKong", "Shanghai"];

	// var ajaxCityWeather = function(cities){

	// 	var series = [];

	// 	for(index in cities){
	// 		$.ajax({
	// 			url: 'http://api.openweathermap.org/data/2.5/history/city?q=' + cities[index]+ '&type=hour',
	// 			type: 'GET',
	// 			dataType: 'JSON',
	// 			success: function(response){

	// 				var dataCity = {};
	// 				dataCity.name = cities[index];
	// 				debugger
	// 				dataCity.data = [];
	// 				$(response.list).each(function(){
	// 					var dataPoint = {};
	// 					dataPoint.y = this.main.temp;
	// 					dataPoint.x = this.dt * 1000;
	// 					dataCity.data.push(dataPoint);
	// 				});
	// 				console.log("dataCity: ", dataCity);
	// 				series.push(dataCity);
	// 				// console.log(dataCity);
	// 				console.log("series: ", series);

	// 				if(series.length == cities.length){
	// 					initializeHighChart(series);
	// 				};

	// 			}
	// 		});
	// 	};

	// };

	// ajaxCityWeather(cities);

	// $.ajax({
	// 	url: 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour',
	// 	type: 'GET',
	// 	dataType: 'JSON',
	// 	success: function(response){
	// 		var dataHk = [];

	// 		$(response.list).each(function(){

	// 			var dataPoint = {};
	// 			dataPoint.y = this.main.temp;
	// 			dataPoint.x = this.dt * 1000;
	// 			dataHk.push(dataPoint);


	// 		});
	// 		console.log(dataHk);
	// 	}
	// });

	// initializeHighChart();

	// var initializeHighChart = function(data){
 //    $('#chart').highcharts({
	// 		// key: value
	// 		title: {
	// 			text: 'Historical Temperatures'
	// 		},
	// 		subtitle: {
	// 			text: 'openweathermap.org'
	// 		},
	// 		xAxis: {
	// 		// Configuration of xAxis
	// 			type: 'datetime',
	// 			dateTimeLabelFormats: {
	// 				millisecond: '%H:%M:%S.%L',
	// 				second: '%H:%M:%S',
	// 				minute: '%H:%M',
	// 				hour: '%H:%M',
	// 				day: '%e. %b',
	// 				week: '%e. %b',
	// 				month: '%b \'%y',
	// 				year: '%Y'
	// 			}
	// 		},
	// 		yAxis: {
	// 			// Configuration of yAxis
	// 			min: 250,
	// 			max: 300,
	// 	    title: {
	// 	            text: 'Temperature (°K)'
	// 	        }
 //      },
 //      legend: {
 //        // Configuration of Legends
 //        layout: 'vertical',
 //        align: 'right',
 //        verticalAlign: 'middle',
 //        borderWidth: 0
 //      },
 //      series: [{
 //        // Data points
 //        name: 'Hong Kong',
 //        data: dataHK
 //      },
 //      {
 //        // Data points
 //        name: 'NYC',
 //        data: dataNYC
 //      }]
 //    });
 //  }

};
Template.highchartsAnnotationBasic.rendered = function() {

	// var url = 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB';

 //  var getPrice = function(url){
 //    $.ajax({
 //      type: 'GET',
 //      url: url,
 //      dataType: 'JSON',
 //      success: function(response){
 //        $(response.data).each(function(){
 //          var dataPoint = {};
 //          dataPoint.y = this[1];

 //          var date = moment(this[0], "YYYY-MM-DD")
 //          dataPoint.x = Date.UTC(date.year(), date.month(), date.date());

 //          dataWeekly.push(dataPoint);
 //        })

 //        for (var i = 0; i < dataWeekly.length; i++) {   
 //            calcSMA(dataWeekly, dataMonthly, monthlySum, 4, i);
 //            calcSMA(dataWeekly, dataQuarterly, monthlySum, 13, i);
 //            calcSMA(dataWeekly, dataYearly, monthlySum, 52, i);
 //        }

 //        initializeHighChart();
 //      },
 //      error: function(){
 //        alert("cannot connect");
 //      }
 //    });
 //  };

 //  getPrice(url);

	var initializeHighcharts = function(){
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data){

      // Create the chart
      $('#chart').highcharts('StockChart', {

          rangeSelector: {
              selected: 1
          },

          title: {
              text: 'USD to EUR exchange rate'
          },

          yAxis: {
              title: {
                  text: 'Exchange rate'
              }
          },

          series: [
            {
              name: 'USD to EUR',
              data: data,
              id: 'dataseries',
              tooltip: {
                valueDecimals: 4
              }
            }, {
              type: 'flags',
              name: 'Flags on series',
              data: [
                {
                  x: Date.UTC(2011, 1, 22),
                  title: 'On series'
                }, {
                  x: Date.UTC(2011, 3, 28),
                  title: 'On series'
                }
              ],
              onSeries: 'dataseries',
              shape: 'squarepin'
            }, {
              type: 'flags',
              name: 'Flags on axis',
              data: [
                {
                  x: Date.UTC(2011, 2, 1),
                  title: 'On axis'
                }, {
                  x: Date.UTC(2011, 3, 1),
                  title: 'On axis'
                }
              ],
              shape: 'squarepin'
          	}
          ]
      });

    });
	};

	initializeHighcharts();

	$('form#annotation-form').submit(function(e){
		e.preventDefault();
		var formContents = $('form#annotation-form').serializeObject();
		console.log(formContents);
		formContents.x = Date.parse(formContents.x);
		formContents.user = "victor";
		console.log(formContents);

		$.ajax({
		  type: 'POST',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/',
		  success: function(response){
		  	console.log(response);
		  	getAllAnnotations();
		  },
		  data: formContents,
		  dataType: 'JSON'
		});
	});

};

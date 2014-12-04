Template.highchartsAnnotation.rendered = function() {

	// $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function(data) {

	//     // Create the chart
	//     $('#chart').highcharts('StockChart', {

	//         rangeSelector: {
	//             selected: 1
	//         },

	//         title: {
	//             text: 'USD to EUR exchange rate'
	//         },

	//         yAxis: {
	//             title: {
	//                 text: 'Exchange rate'
	//             }
	//         },

	//         series: [{
	//             name: 'USD to EUR',
	//             data: data,
	//             id: 'dataseries',
	//             tooltip: {
	//                 valueDecimals: 4
	//             }
	//         }, {
	//             type: 'flags',
	//             name: 'Flags on series',
	//             data: [{
	//                 x: Date.UTC(2011, 1, 22),
	//                 title: 'WHY HELLO THERE',
	//                 text: 'WHY HELLO THERE'
	//             }, {
	//                 x: Date.UTC(2011, 3, 28),
	//                 title: 'On series',
	//                 text: 'WHY HELLO THERE'
	//             }],
	//             onSeries: 'dataseries',
	//             shape: 'squarepin'
	//         }, {
	//             type: 'flags',
	//             name: 'Flags on axis',
	//             data: [{
	//                 x: Date.UTC(2011, 2, 1),
	//                 title: 'On axis',
	//                 text: 'TESTIE!!!'
	//             }, {
	//                 x: Date.UTC(2011, 3, 1),
	//                 title: 'On axis',
	//                 text: 'TWO TESTIES!!!'
	//             }],
	//             shape: 'squarepin'
	//         }]
	//     });
	// });

	// var createChart = function(annotations){

	// 	$.ajax({
	// 	  type: 'GET',
	// 	  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
	// 	  success: function(response){
	// 	  	console.log(response);
	// 			$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function(data) {

	// 			    // Create the chart
	// 			    $('#chart').highcharts('StockChart', {

	// 			        rangeSelector: {
	// 			            selected: 1
	// 			        },

	// 			        title: {
	// 			            text: 'USD to EUR exchange rate'
	// 			        },

	// 			        yAxis: {
	// 			            title: {
	// 			                text: 'Exchange rate'
	// 			            }
	// 			        },

	// 			        series: [{
	// 			            name: 'USD to EUR',
	// 			            data: data,
	// 			            id: 'dataseries',
	// 			            tooltip: {
	// 			                valueDecimals: 4
	// 			            }
	// 			        }, {
	// 			            type: 'flags',
	// 			            name: 'Flags on series',
	// 			            data: annotations,
	// 			            onSeries: 'dataseries',
	// 			            shape: 'squarepin'
	// 			        }, {
	// 			            type: 'flags',
	// 			            name: 'Flags on axis',
	// 			            data: annotations,
	// 			            shape: 'squarepin'
	// 			        }]
	// 			    });
	// 			});

	// 		},
	// 	  dataType: 'JSON'
	// 	});

	// };

	getAllAnnotations = function(){

		$.ajax({
		  type: 'GET',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
		  success: function(response){
		  	console.log(response);
				$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function(data) {

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

				        series: [{
				            name: 'USD to EUR',
				            data: data,
				            id: 'dataseries',
				            tooltip: {
				                valueDecimals: 4
				            }
				        }, {
				            type: 'flags',
				            name: 'Flags on series',
				            data: response,
				            onSeries: 'dataseries',
				            shape: 'squarepin'
				        }, {
				            type: 'flags',
				            name: 'Flags on axis',
				            data: response,
				            shape: 'squarepin'
				        }]
				    });
				});

			},
		  dataType: 'JSON'
		});

	};

	getAllAnnotations();

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

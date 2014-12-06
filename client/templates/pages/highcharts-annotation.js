Template.highchartsAnnotation.rendered = function() {

// FILE VARIABLES

	var annotationsArray = [];

// FUNCTIONS

	var createChart = function(){

		$.ajax({
		  type: 'GET',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
		  success: function(response){
		  	console.log(response);
				$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function(data) {

				    // Create the chart
				    // console.log(data);
				    $('#chart').highcharts('StockChart', {

				    		chart: {
				    			height: 500
				    		},

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

				        plotOptions: {
				        	flags: {
						        style: {
											fontSize: '20px',
											fontWeight: 'bold',
											textAlign: 'center'
										},
				        	},
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

	var createAnnotationsTable = function(){
		
		$.ajax({
		  type: 'GET',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
		  success: function(response){
		  	annotationsArray = response;
		  	console.log(response);
		  	for(index in response){
		  		var html = '\
	            <tr class="annotation-item">\
	              <td class="col-xs-2">\
	                <button data-id="' + response[index]._id + '"class="btn btn-primary">\
	                  Edit\
	                </button>\
	              </td>\
	              <td class="col-xs-2">\
	                <button data-id="' + response[index]._id + '"class="btn btn-danger">\
	                  Delete\
	                </button>\
	              </td>\
	              <td class="col-xs-5">\
	                <div>\
	                  ' + response[index].title + '\
	                </div>\
	              </td>\
	              <td class="col-xs-3">\
	                <div>\
	                  ' + new Date(parseInt(response[index].x)).toDateString() + '\
	                </div>\
	              </td>\
	            </tr>';
	        $('#annotations-list').append(html);
		  	};
		  },
		  dataType: 'JSON'
		});

	};

	var submitAnnotation = function(){

		// e.preventDefault();
		var formContents = $('form#annotation-form').serializeObject();
		var formSubmission = {};
		formSubmission = formContents;
		console.log("formContents: ", formContents);
		formSubmission.x = new Date(formSubmission.x).getTime();
		formSubmission.user = "victor";
		console.log("formSubmission: ", formSubmission);

		$.ajax({
		  type: 'POST',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/',
		  success: function(response){
		  	console.log(response);
		  	location.reload(true);
		  },
		  data: formSubmission,
		  dataType: 'JSON'
		});

	};

	var deleteAnnotation = function(id){

		var annotationId = id;
		// console.log(annotationId);

		$.ajax({
		  type: 'DELETE',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/' + annotationId,
		  success: function(response){
		  	console.log(response);
				location.reload(true);
		  }
		});

	};

	var displayUpdateModal = function(id){

		var annotationId = id;
		for(index in annotationsArray){
			if(annotationsArray[index]._id == annotationId){
				var annotationDate = moment(parseInt(annotationsArray[index].x));
				var annotation = {
					_id: annotationsArray[index]._id,
					title: annotationsArray[index].title,
					text: annotationsArray[index].text,
					date: annotationDate.format('YYYY-MM-DD')
				};
				
				var html = '\
        <form id="edit-annotation-form" class="form-responsive">\
          <fieldset>\
            <!-- Text input-->\
            <div class="form-group">\
            	<input name="_id" type="hidden" value="' + annotation._id + '">\
              <label for="title">Annotation Title</label>\
              <div class="controls">\
                <input name="title" type="text" placeholder="" class="form-control input-xlarge" value="' + annotation.title + '">\
              </div>\
            </div>\
            <!-- Textarea -->\
            <div class="form-group">\
              <label for="text">Annotation Content</label>\
              <div class="controls">\
                <textarea class="form-control" name="text">' + annotation.text + '</textarea>\
              </div>\
            </div>\
            <!-- Text input-->\
            <div class="form-group">\
              <label for="x">Annotation Date</label>\
              <div class="controls">\
                <input name="x" type="date" placeholder="" class="form-control input-xlarge" value="' + annotation.date + '">\
              </div>\
            </div>\
            <!-- Button -->\
            <div class="form-group">\
              <div class="controls">\
                <button id="update-annotation-button" name="submit" type="submit" placeholder="" class="btn btn-primary">Submit Annotation</button>\
              </div>\
            </div>\
          </fieldset>\
        </form>';
        
        $('.modal-body').append(html);
				$('#edit-annotation-modal').modal('show')

				break;
			};
		};

	};

	var updateAnnotation = function(){

		// e.preventDefault();
		var formContents = $('form#edit-annotation-form').serializeObject();
		var formSubmission = {};
		formSubmission = {
			title: formContents.title,
			text: formContents.text,
			dateModified: new Date(),
			x: formContents.x
		};
		console.log("formContents: ", formContents);
		formSubmission.x = new Date(formSubmission.x).getTime();
		formSubmission.user = "victor";
		console.log("formSubmission: ", formSubmission);

		$.ajax({
		  type: 'PUT',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/' + formContents._id,
		  success: function(response){
		  	console.log(response);
		  	
		  	location.reload(true);
		  },
		  error: function(response){
		  	console.log(response);
		  	
		  },
		  data: formSubmission,
		  dataType: 'JSON'
		});

	};

// EVENTS

	$('form#annotation-form').submit(function(e) {
		e.preventDefault();
		submitAnnotation();
	});

	$('body').delegate('form#edit-annotation-form', 'submit', function(e) {
		e.preventDefault();
		updateAnnotation();
	});

	$('body').delegate('button.btn-danger', 'click', function() {
		deleteAnnotation($(this).data('id'));
	});

	$('body').delegate('button.btn-primary', 'click', function() {
		displayUpdateModal($(this).data('id'));
	});

	$('#edit-annotation-modal').on('hide.bs.modal', function(e) {
	  $('.modal-body').html('');
	});



// FUNCTION CALLS ON LOAD

	createChart();
	createAnnotationsTable();

};
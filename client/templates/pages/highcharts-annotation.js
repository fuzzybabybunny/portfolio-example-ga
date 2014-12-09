Template.highchartsAnnotation.rendered = function() {

// FILE VARIABLES

	// Created when createAnnotationsTable() fetches all of my annotations from the server
	var myAnnotationsArray = [];

// FUNCTIONS

	var createChart = function(){
		$.ajax({
			type: 'GET',
			url: 'http://www.quandl.com/api/v1/datasets/EIA/IES_2_2_2_CHN.json?column=1',
			dataType: 'JSON',
			success: function(response){
				var data = [];
				for (index in response.data){
					data[index] = [];
					data[index][0] = moment(response[response.data[index][0]]).valueOf();
					data[index][1] = response.data[index][1];
				};
				debugger

				$.ajax({
				  type: 'GET',
				  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
				  success: function(response){
				  	myAnnotationsArray = response;
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

				        xAxis: {
				        	type: 'datetime',
				        	dateTimeLabelFormats: {
										millisecond: '%H:%M:%S.%L',
										second: '%H:%M:%S',
										minute: '%H:%M',
										hour: '%H:%M',
										day: '%e. %b',
										week: '%e. %b',
										month: '%b \'%y',
										year: '%Y'
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
				        }]
				    });
			

				  },
				  dataType: 'JSON'
				});
			}
		});

	};

	var createAnnotationsTable = function(){
		
		$.ajax({
		  type: 'GET',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/search/victor',
		  success: function(response){
		  	myAnnotationsArray = response;
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

	var returnFormContents = function(formId){

		var formContents = $('form#' + formId).serializeObject();
		return formContents;

	};

	var submitAnnotation = function(data){

		var submission = {};
		submission = data;
		console.log("submission: ", submission);
		submission.x = new Date(data.x).getTime();
		submission.user = "victor";
		console.log("submission: ", submission);

		$.ajax({
		  type: 'POST',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/',
		  success: function(response){
		  	console.log(response);
		  	location.reload(true);
		  },
		  data: submission,
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

	var showUpdateModal = function(id, annotationsArray){

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
        <form data-id="' + annotation._id + '" id="update-annotation-form" class="form-responsive">\
          <fieldset>\
            <!-- Text input-->\
            <div class="form-group">\
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
                <button id="update-annotation-button" name="submit" type="submit" placeholder="" class="btn btn-primary">Edit Annotation</button>\
              </div>\
            </div>\
          </fieldset>\
        </form>';
        
        $('.modal-body').append(html);
				$('#update-annotation-modal').modal('show');

				break;
			};
		};

	};

	var updateAnnotation = function(id, data){

		console.log(id);

		var submission = {
			title: data.title,
			text: data.text,
			dateModified: new Date(),
			x: new Date(data.x).getTime(),
			user: 'victor'
		};
		console.log("data: ", data);
		console.log("submission: ", submission);

		$.ajax({
		  type: 'PUT',
		  url: 'http://ga-wdi-api.meteor.com/api/posts/' + id,
		  success: function(response){
		  	console.log(response);
		  	location.reload(true);
		  	
		  },
		  error: function(response){
		  	console.log(response);
		  },
		  data: submission,
		  dataType: 'JSON'
		});

	};

// EVENTS

	// Submitting a new annotation
	$('form#new-annotation-form').submit(function(e) {
		console.log(e);
		e.preventDefault(); // look this up in google guys
		submitAnnotation( returnFormContents('new-annotation-form') );
	});

	// Submitting an update of an annotation
	$('body').delegate('form#update-annotation-form', 'submit', function(e) {
		console.log(e);
		e.preventDefault();
		updateAnnotation( $(this).data('id'), returnFormContents('update-annotation-form') );
		debugger
	});

	// Deleting an annotation
	$('body').delegate('button.btn-danger', 'click', function() {
		deleteAnnotation( $(this).data('id') );
	});

	// Displaying the update form for a selected annotation
	$('body').delegate('button.btn-primary', 'click', function() {
		showUpdateModal( $(this).data('id'), myAnnotationsArray );
		
	});

	// Clears the BootStrap modal on hide, otherwise old info 
	// will appear on the next opening of the modal
	$('#update-annotation-modal').on('hide.bs.modal', function() {
	  $('.modal-body').html('');
	});


// FUNCTION CALLS ON LOAD

	createChart();
	// createAnnotationsTable();


};
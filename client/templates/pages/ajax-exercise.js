Template.ajaxExercise.rendered = function(){

	$('input[name="movie-title"]').keyup(function(){
		var query = $('input[name="movie-title"]').val();

		$.ajax({
		  type: "GET",
		  url: "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&r=json",
		  dataType: "JSON",
		  success: function(response){ 
		  	$('.movie-title').text(response.Title + ' (' + response.Released + ')');
		  	$('.movie-actors').text(response.Actors);
		  	$('.movie-plot').text(response.Plot);
		  	$('.movie-rating').text("IMDB Rating: " + response.imdbRating);
		  }
		});

	});


};
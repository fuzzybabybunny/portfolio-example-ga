var myVideo = {

	votes: {
		love: 6,
		comedy: 2,
		drama: 9
	},

	topCategories: function(minimumVotes){
		var topGenres = [];
		for(key in this.votes){
			if(this.votes[key] > minimumVotes){
				topGenres.push(key);
			}
		}
		console.log("The top genres are: ", topGenres);
		return topGenres;
	}

};
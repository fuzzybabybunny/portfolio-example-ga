Template.playgroundExercise.rendered = function(){

	console.log("sadfsdf");

	var order = [
		{
			cost: 8,
			qty: 0
		},{
			cost: 12,
			qty: 0
		},{
			cost: 18,
			qty: 0
		}
	];

	var returnTotal = function(order){
		var totalPrice = 0;
		for (var i = 0; i < order.length; i++){
			totalPrice = totalPrice + order[i].cost * order[i].qty;
		};
		console.log(totalPrice);
		$('#total-price').html('$' + totalPrice + '.00');
		return totalPrice;
	};

	$('input[name="item1"]').keyup(function(){
		var qty = $('input[name="item1"]').val();
		order[0].qty = parseInt(qty) || 0;
		returnTotal(order);
		console.log(order);
	});

	$('input[name="item2"]').keyup(function(){
		var qty = $('input[name="item2"]').val();
		order[1].qty = parseInt(qty) || 0;
		returnTotal(order);
		console.log(order);
	});

	$('input[name="item3"]').keyup(function(){
		var qty = $('input[name="item3"]').val();
		order[2].qty = parseInt(qty) || 0;
		returnTotal(order);
		console.log(order);
	});


};

Template.playgroundExercise.events({

	'keydown input[name="item3"]': function(){
		console.log("keyup");
	}

});
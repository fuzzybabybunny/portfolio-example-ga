Template.simpleCart.rendered = function(){

	console.log('rendered');

	var itemsList = [
		{
			name: "Salmon Sashime",
			price: 10000,
			desc: "lorem ipsum",
			sku: "DFS723"
		},{
			name: "Tuna",
			price: 5500,
			desc: "lorem ipsum",
			sku: "PDIK988"
		},{
			name: "Carp",
			price: 2400,
			desc: "lorem ipsum",
			sku: "HDK87"
		},{
			name: "Beef",
			price: 700,
			desc: "lorem ipsum",
			sku: "EDT09"
		},{
			name: "Chicken",
			price: 300,
			desc: "lorem ipsum",
			sku: "UIY87"
		},{
			name: "Pork",
			price: 600,
			desc: "lorem ipsum",
			sku: "GYUIHJLK23"
		},{
			name: "Sausage",
			price: 500,
			desc: "lorem ipsum",
			sku: "NJIKH687"
		},{
			name: "Bread",
			price: 2000,
			desc: "lorem ipsum",
			sku: "KJ782"
		},{
			name: "Cheese",
			price: 5000,
			desc: "lorem ipsum",
			sku: "SDF72"
		},{
			name: "Soda",
			price: 100,
			desc: "lorem ipsum",
			sku: "45tFF"
		}
	];

	var convertToDollar = function(num){
		var dollarNumber = '$' + num/100 + '.00';
		return dollarNumber;
	};

	var createItemRow = function(item){

		var rowHTML = '\
    <div class="row">\
      <div class="item-name col-xs-6">\
        ' + item.name + '\
      </div>\
      <div class="item-price col-xs-3">\
        ' + convertToDollar(item.price) + '\
      </div>\
      <div class="item-qty col-xs-3">\
        <label>QTY</label>\
        <input class="quantity">\
      </div>\
    </div>';

    return rowHTML;

	};

	var returnStoreHTML = function(items){

		var storeHTML = '';

		for(index in items){
			storeHTML += createItemRow(items[index]);
		};	

		return storeHTML;

	};

	var returnAllHTMLQuantities = function(){ 
		return $('.quantity'); 
	};

	var returnQuantityArray = function(){
		var quantityArray = [];
		for(i = 0; i < $('.quantity').length; i++){
			console.log( 
				String( $($('.quantity')[i]).val() )
			);
			quantityArray.push( parseInt( String( $($('.quantity')[i]).val() )) || 0 );
		};
		return quantityArray;
	};

	var createCartWithQty = function(itemsArray, quantitiesArray){
		var cart = {};
		$.extend(cart,itemsArray);
		for(index in cart){
			cart[index].qty = quantitiesArray[index];
		};
		return cart
	};

	var returnTotalPrice = function(cart){
		var totalPrice = 0;
		for (index in cart){
			totalPrice += cart[index].price * cart[index].qty;
		};
		return totalPrice;
	};

	var createOrderSubmission = function(itemList){
		var cart = createCartWithQty(itemList, returnQuantityArray());
		var totalPrice = returnTotalPrice(cart);
		cart.totalPrice = totalPrice;
		cart.totalPriceDollars = convertToDollar(totalPrice);
		$('#total-price').text(cart.totalPriceDollars);
		return cart;
	};

	// Creates the menu on the HTML
	$(returnStoreHTML(itemsList)).insertAfter('.cart-title-row');

	// 
	$('.quantity').on("keyup", function(){
    console.log(createOrderSubmission(itemsList));
	});

};
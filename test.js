$(".order-button button").on('click', function(e) {
	//var cart = Snipcart.api.cart.get();
	//var isSingleOrder = ($(this).hasClass("single-order")) ? 1 : 0;	
	var addQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
	$(this).attr("data-item-quantity", addQuant).trigger("click");
	
});
//Verb Energy Bars JS
//By Abhi Nayar for SemiErect, Copyright 2017.
//All Rights Reserved, please contact developer at anayar2[at]gmail[dot]com for inquiries
//Code is copyright Shopify and Verb Energy Bars Inc.

$(document).ready(function(){
	/* FAQ */
	$(".q-answer.closed").hide();
	$(".q-title").click(function(){
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).next(".q-answer").slideToggle("100").removeClass("visible").addClass("closed");
		} else {
			$(".q-title").removeClass("active");
			$(".q-answer.visible").slideToggle("100").removeClass("visible").addClass("closed");
			
			$(this).addClass("active");
			$(this).next(".q-answer").slideToggle("100").removeClass("closed").addClass("visible");
		}
	});

	/* Nav Scroll BG */
	$(window).on('load, scroll', function(){
		curr_scroll = $(this).scrollTop();
		if (curr_scroll > 50) {
			$("nav").addClass("bg");

			var op = ((curr_scroll-49)/100) * 0.15;
			if (op > 0) {
				$("#Top .container").css("opacity", 1 - op);
			} else {
				$("#Top .container").css("opacity", 0);
			}

		} else {
			$("nav").removeClass("bg");
			$("#Top .container").css("opacity", 1);
		}
	});

	/* Hamburger Menu Display */
	$(".menu-wrapper").on("click", function(){
		$(".hidden-nav").fadeIn("30").addClass("active");
	}); 
	$(".nav-close").on("click", function(){
		$(".hidden-nav").fadeOut("150").removeClass("active");
	});
	$(".hidden-nav a").click(function(){
		$(".hidden-nav").fadeOut("150").removeClass("active");
	});

	/* Smooth Scroll */
	$(function() {
		$('a[href*="#"]:not([href="#"]):not([href="#header-carousel"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		  	var offset;
			if ($(window).width() < 768) {
				offset = 110;
			} else {
				offset = 130;
			}

			$('html, body').animate({
			  scrollTop: target.offset().top - offset
			}, 600);
			return false;
		  }
		}
	  });
	});

	/* SnipCart */
	//data-item-id:
	//1 : 1 box sub
	//2: 2 box sub
	//3: 3 box sub
	//4: 1 box single
	//5: 2 box single
	//6: 3 box single
	Snipcart.execute('config', 'show_continue_shopping', true);
	
	/*
	function snipCart() {
		var box_price = 24.70;
		var sub_price = 21;
		var val = Number($(".item-select select").val());
		//console.log(val);

		if ($("input[name='subscription']").is(":checked")) {
			$(".price-wrapper .dollars").addClass("hidden");
			$(".price-wrapper .per-month").removeClass("hidden");
			if (val == 1) {
				//1 box sub
				//console.log("1");
				$(".order-button button.subscribe.one").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text(sub_price.toString());
			} else if (val == 2) {
				//2 box sub
				//console.log("2");
				$(".order-button button.subscribe.two").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text((2*sub_price).toString());
			} else if (val == 3) {
				//3 box sub
				//console.log("3");
				$(".order-button button.subscribe.three").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text((3*sub_price).toString());
			}
		} else {
			$(".price-wrapper .per-month").addClass("hidden");
			$(".price-wrapper .dollars").removeClass("hidden");
			if (val == 1) {
				//1 box single
				//console.log("1");
				$(".order-button button.single-order.one").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text(box_price.toFixed(2).toString());
			} else if (val == 2) {
				//2 box single
				//console.log("2");
				$(".order-button button.single-order.two").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text((2*box_price).toFixed(2).toString());
			} else if (val == 3) {
				//3 box single
				//console.log("3");
				$(".order-button button.single-order.three").removeClass("hidden").addClass("shown");
				$(".price-wrapper .price").text((3*box_price).toFixed(2).toString());
			}
		}
	}
	snipCart();

	$('input[name="subscription"], .item-select select').on('click, change', function(){
		$(".order-button button.shown").addClass("hidden").removeClass("shown");
		snipCart();
	});
	*/
	
	$(".quantity-select .inc-wrapper").click(function(){
		var curQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
		if ($(this).hasClass("down")) {
			//inc. down
			if (curQuant > 1) {
				curQuant--;
				$(".quantity-select .cur-quant").html(curQuant);
			}
			
		} else {
			//inc. up
			if (!$(".order-type .order-type-button.active").hasClass("sub")) {
				curQuant++;
				$(".quantity-select .cur-quant").html(curQuant);
			}
		}
	});
	
	$(".order-type .order-type-button").click(function(e){
		e.preventDefault();
		var curType;
		
		if (!$(this).hasClass("active")) {
			$(".order-type .order-type-button").removeClass("active");	
			$(this).addClass("active");
			
			if ($(this).hasClass("single")) {
				//then show single button
				$(".order-button button").addClass("hidden");
				$(".order-button button.single-order").removeClass("hidden");
			} else {
				//show sub. button
				$(".order-button button").addClass("hidden");
				$(".order-button button.subscribe").removeClass("hidden");
				$(".quantity-select .cur-quant").text(1);
			}
		}		
	});
	
	$(".order-button button").click(function(e) {
		e.preventDefault();
		
		var quant = parseInt($(".quantity-select .cur-quant").text(), 10);
		$(this).attr("data-item-quantity", quant);
		$(this).click();
		
		$(".quantity-select .cur-quant").text("1");
		$(this).attr("data-item-quantity", "1");
	});
	
	//Flash cart bg when items
	/*Snipcart.subscribe('cart.ready', function() {
	  var count = Snipcart.api.items.count();
	});
	*/

});


















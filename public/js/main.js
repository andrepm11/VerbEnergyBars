//Verb Energy Bars JS
//By Abhi Nayar for SemiErect, Copyright 2017.
//All Rights Reserved, please contact developer at anayar2[at]gmail[dot]com for inquiries
//Code is copyright Shopify and Verb Energy Bars Inc.

$(document).ready(function(){
	/* FAQ */
	$(".q-answer.closed").hide();
	$(".q-title").on('click', function(){
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
	
	/* Order Section JS */
	//Show continue shopping button
	Snipcart.execute('config', 'show_continue_shopping', true);
	
	Snipcart.subscribe('cart.opened, cart.ready', function() {
		addImagesToPlans();
		$("#snipcart-plans-list tr td:nth-of-type(3)").text($("#snipcart-plans-list tr td:nth-of-type(3)").text().replace(/\s/g, ''));
		$("#snipcart-plans-list tr td:nth-of-type(4)").text($("#snipcart-plans-list tr td:nth-of-type(4)").text().replace(/\s/g, ''));
	});

	function addImagesToPlans() {
		$("#snipcart-plans-list>tr>td img").remove();
		var $img = $("<img/>").attr("src", "https://abhinayar.github.io/VerbEnergyBars/public/img/bar_mockup.png").addClass("cartSubIcon");
		$("#snipcart-plans-list .snip-product__name").parent().prepend($img);
	}
	
	$(".quantity-select .inc-wrapper").on('click', function(){
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
	
	$(".order-type .order-type-button").on('click', function(e){
		e.preventDefault();
		var curType;
		
		if (!$(this).hasClass("active")) {
			$(".order-type .order-type-button").removeClass("active");	
			$(this).addClass("active");
			$(".order-button button").addClass("hidden").removeClass("shown");
			
			if ($(this).hasClass("single")) {
				//then show single button
				$(".order-button button.single-order").removeClass("hidden").addClass("shown");
				$(".quantity-select").removeClass("off");
			} else {
				//show sub. button
				$(".order-button button.subscribe").removeClass("hidden").addClass("shown");
				$(".quantity-select .cur-quant").text("1");
				$(".quantity-select").addClass("off");
			}
		}		
	});
	
	$(".order-button button").on('click', function(e) {
		var addQuant = parseInt($(".quantity-select .cur-quant").html(), 10);
		$(this).attr("data-item-quantity", addQuant).trigger("click");
	});
});

/* Nav Scroll BG */
$(document, window).on('load, scroll', function(){
	curr_scroll = $(document).scrollTop();
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


















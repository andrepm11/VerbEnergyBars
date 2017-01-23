//Verb Energy Bars JS
//By Abhi Nayar for SemiErect, Copyright 2017.
//All Rights Reserved, please contact developer at anayar2[at]gmail[dot]com for inquiries
//Code is copyright Shopify and Verb Energy Bars Inc.

$(document).ready(function(){
	/* Shopofy SDK */
	const shopClient = ShopifyBuy.buildClient({
	  apiKey: 'f3fa3db6a7940167bdde69ad3aa38d6f',
	  domain: 'https://verb-energy.myshopify.com',
	  appId: '6'
	});

	var cart;
	shopClient.createCart().then(function (newCart) {
	  cart = newCart;
	});

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
		} else {
			$("nav").removeClass("bg");
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
			$('html, body').animate({
			  scrollTop: target.offset().top - 80
			}, 600);
			return false;
		  }
		}
	  });
	});
});
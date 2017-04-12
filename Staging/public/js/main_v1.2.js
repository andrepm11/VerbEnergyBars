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
	
	Snipcart.subscribe('cart.ready', function() {
		if ($(window).width() > 768) {
			addImagesToPlans();
			addSpacesToPrice();
		}
		moveShippingSameAsBilling();
	}); 
	Snipcart.subscribe('cart.opened', function() {
		if ($(window).width() > 768) {
			addImagesToPlans();
			addSpacesToPrice();
		}
		moveShippingSameAsBilling();
        
        if ($(window).width() < 768) {
            $("body").addClass("fixed");
        }
	});
    Snipcart.subscribe('cart.closed', function() {
        $("body").removeClass("fixed");
	});
	Snipcart.subscribe('page.change', function (page) {
		setTimeout(customPageChange, 150);
	});
	
	var interval;
	var currentSnipcartId = "";
	function customPageChange() {
		newSnipcartId = $(".snip-layout__main-container").attr("id");
		if (newSnipcartId != currentSnipcartId) {
			if ($(window).width() > 768) {
				addImagesToPlans();
				addSpacesToPrice();
			}
			moveShippingSameAsBilling();
		}
		currentSnipcartId = newSnipcartId;
	};

	function addImagesToPlans() {
		$("#snipcart-plans-list>tr>td img").remove();
		var $img = $("<img/>").attr("src", "/public/img/bar_order_mockup.png").addClass("cartSubIcon");
		$("#snipcart-plans-list .snip-product__name").parent().prepend($img);
	}; 
	function addSpacesToPrice() {
		$("#snipcart-plans-list tr").each(function(i, item){
			var txt1 = $(item).find("td:nth-of-type(3)").text();
			$(item).find("td:nth-of-type(3)").text(txt1.replace(/\s/g, ''));
			var txt2 = $(item).find("td:nth-of-type(4)").text();
			$(item).find("td:nth-of-type(4)").text(txt2.replace(/\s/g, ''));
		});
	};
	function moveShippingSameAsBilling() {
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").addClass("shifted");
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").prependTo("#snipcart-billingaddress-form .snip-cols .snip-col:nth-of-type(3)");
	};
	
	
	$(".quantity-select .inc-wrapper").on('click', function(){
		var curQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
      
		if ($(this).hasClass("down")) {
			//inc. down
			if (curQuant > 1) {
				curQuant--;
				$(".quantity-select .cur-quant").html(curQuant);
                $(".order-button button.shown").data("item-quantity", curQuant);
			}
			
		} else {
			//inc. up
			if (!$(".quantity-select").hasClass("off")) {
				curQuant++;
				$(".quantity-select .cur-quant").html(curQuant);
                $(".order-button button.shown").data("item-quantity", curQuant);
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
          $(".price-type .price-item").addClass("hidden");
          $(".quantity-select .cur-quant").html("1");

          if ($(this).hasClass("single")) {
              //then show single button
              $(".order-button button.single-order").removeClass("hidden").addClass("shown");
              $(".quantity-select").removeClass("off");
              $(".price-type .single-price").removeClass("hidden");
          }  else if ($(this).hasClass("single-sub")) {
              //show single-sub. button
              $(".order-button button.single-sub").removeClass("hidden").addClass("shown");
              $(".quantity-select .cur-quant").text("1");
              $(".quantity-select").addClass("off");
              $(".price-type .single-sub-price").removeClass("hidden");
          }  else if ($(this).hasClass("single-small")) {
              $(".order-button button.single-order-small").removeClass("hidden").addClass("shown");
              $(".quantity-select").removeClass("off");
              $(".price-type .single-small-price").removeClass("hidden");
          } else {
                  //show sub. button
                  /*$(".order-button button.subscribe").removeClass("hidden").addClass("shown");
                  $(".quantity-select .cur-quant").text("1");
                  $(".quantity-select").addClass("off");
                  $(".price-type .sub-price").removeClass("hidden");
                  */
                  //then show single button
                  $(".order-button button.single-order").removeClass("hidden").addClass("shown");
                  $(".quantity-select").removeClass("off");
                  $(".price-type .single-price").removeClass("hidden");
              }
        }
	});
	
	
	Snipcart.subscribe('item.added', function (ev, item, items) {
	    setTimeout(function(){
	    	var cart = Snipcart.api.cart.get();
	    	if (cart.items.quantity > 0 || cart.plans.quantity > 0) {
		    	//alert("here2");
		    	$(".cart-wrapper .svg-wrapper").addClass("active");
		    } else {
		    	$(".cart-wrapper .svg-wrapper").removeClass("active");
		    }
	    }, 100);
	}); Snipcart.subscribe('item.removed', function (ev, item, items) {
	    setTimeout(function(){
	    	var cart = Snipcart.api.cart.get();
	    	if (cart.items.quantity > 0 || cart.plans.quantity > 0) {
		    	//alert("here2");
		    	$(".cart-wrapper .svg-wrapper").addClass("active");
		    } else {
		    	$(".cart-wrapper .svg-wrapper").removeClass("active");
		    }
	    }, 100);
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


















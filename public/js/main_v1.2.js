/*jshint browser: true */

$(document).ready(function(){
	//
	// FAQ
	//
    
    $(".accordion-button").on('click', function(){
        if($(this).hasClass("open-section")){
            $(this).removeClass("open-section");
            var answer = $(this).next();
            answer.slideToggle("100");
            
        }else{
            $(this).addClass("open-section");
            var answer = $(this).next();
            answer.slideToggle("100");

        }
    });
    $(".new-faq-title").on('click', function(){
        if($(this).hasClass("open-question")){
            $(this).removeClass("open-question");
            var answer = $(this).next();
            answer.slideToggle("100");
            
        }else{
            $(".new-faq-title.open-question").next().slideToggle("100");
            $(".new-faq-title.open-question").removeClass("open-question");
            
            $(this).addClass("open-question");
            var answer = $(this).next();
            answer.slideToggle("100").addClass("open-question");

        }
    });
    
	//
	// Toggle Mobile Menu
	//
	$('#nav-menu-icon').on("click", function(){
		$('nav').toggleClass("menu-show");
	});
	//
	// Fade-Ins 
		//
		// Header
		//
	$('nav .fade-in').addClass('in');
	$('#line-1').addClass('in');
	$('#line-2').addClass('in');
	$('header .image-wrapper').addClass('in');

	$(window).scroll(function () {
		/* Check the location of each desired element */
		$('.on-scroll').each(function (i) {

			var middle_of_object = $(this).position().top + ( $(this).outerHeight() );
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it in */
			if (bottom_of_window > middle_of_object) {
				$(this).addClass('in');
			}
			
		});
	});
	//
	// Smooth Scroll
	//
	var $groupPre = $('.group-pre');
	var $groupCoffee = $('.group-coffee');
	var $groupDrinks = $('.group-drinks');
	var $groupShots = $('.group-shots');
	var $vsTitle = $('#vs-title');
	var $vsContent = $('#vs-content');
	
	$groupPre.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupShots.removeClass('active');
		$groupPre.addClass('active');
		
		$vsTitle.html('Pre-Workout Supplements');
		$vsContent.html("If don't think you're mortgaging some part of your future health every time you have pre-workout you're kidding yourself.");
		
	});
	$groupCoffee.on('click', function(){
		$groupPre.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupShots.removeClass('active');
		$groupCoffee.addClass('active');
		
		$vsTitle.html('Coffee');
		$vsContent.html("Alright, confession time. We love coffee. We love the taste. We love the ritual. What we don't love though is spending 20 minutes and $4 every time we need an energy boost. Also not a fan of the jitters.");
		
	});
	$groupShots.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.addClass('active');
		
		$vsTitle.html('Energy Shots');
		$vsContent.html("We are very wary of anything delivering 8333% of your daily recommended value of anything.");
		
	});
	$groupDrinks.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.removeClass('active');
		$groupDrinks.addClass('active');
		
		$vsTitle.html('Energy Drinks & Soda');
		$vsContent.html("Would you drink an energy drink in front of your boss? In front of your mother? Energy drinks are great for taking years off your life or helping you relive the darkest moments of your college career, but thanks to ounces of sugar and their complete lack of nutritional content, they aren't actually that good at delivering energy.");
		
	});
	//
	// Pull Quotes
	//
		var childQuotes = $("#quote-list").children();
		var quoteArray = [];
		for (var i = 0; i < childQuotes.length; i++) {
			quoteArray.push(childQuotes[i]);
		}
		i = 0;
		var toggleActive = function () {
			//        console.log(quoteArray[i]);
			$(quoteArray[i]).removeClass("active-quote");
			if (i == quoteArray.length - 1) {
				i = 0;
			} else i++;
			$(quoteArray[i]).addClass("active-quote");
		};
		setInterval(toggleActive, 5000);
  //
	// Smooth Scroll
	//
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
			}, 400);
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
	}

	function addImagesToPlans() {
		$("#snipcart-plans-list>tr>td img").remove();
		var $img = $("<img/>").attr("src", "/public/img/bar_order_mockup.png").addClass("cartSubIcon");
		$("#snipcart-plans-list .snip-product__name").parent().prepend($img);
	}
	function addSpacesToPrice() {
		$("#snipcart-plans-list tr").each(function(i, item){
			var txt1 = $(item).find("td:nth-of-type(3)").text();
			$(item).find("td:nth-of-type(3)").text(txt1.replace(/\s/g, ''));
			var txt2 = $(item).find("td:nth-of-type(4)").text();
			$(item).find("td:nth-of-type(4)").text(txt2.replace(/\s/g, ''));
		});
	}
	function moveShippingSameAsBilling() {
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").addClass("shifted");
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").prependTo("#snipcart-billingaddress-form .snip-cols .snip-col:nth-of-type(3)");
	}
	
	
	$(".quantity-select button").on('click', function(){
		var curQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
      
		if ($(this).hasClass("down")) {
			//inc. down
			if (curQuant > 1) {
				curQuant--;
				$(".quantity-select .cur-quant").html(curQuant);
        $(".order-button button.shown").data("item-quantity", curQuant);
				if (curQuant == 1) {
					$(".cur-quant").removeClass('plural');
				}
			}
		} else {
			//inc. up
			if (!$(".quantity-select button").prop("disabled", true)) {
				curQuant++;
				$(".quantity-select .cur-quant").html(curQuant);
        $(".order-button button.shown").data("item-quantity", curQuant);
				$(".cur-quant").addClass('plural');
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
              $(".quantity-select button").prop("disabled", false);
              $(".price-type .single-price").removeClass("hidden");
							$(".cur-quant").removeClass('three-bar');
          }  else if ($(this).hasClass("single-sub")) {
              //show single-sub. button
              $(".order-button button.single-sub").removeClass("hidden").addClass("shown");
              $(".quantity-select .cur-quant").text("1");
              $(".quantity-select button").prop("disabled", true);
              $(".price-type .single-sub-price").removeClass("hidden");
							$(".cur-quant").removeClass('three-bar');
          }  else if ($(this).hasClass("single-small")) {
              $(".order-button button.single-order-small").removeClass("hidden").addClass("shown");
              $(".quantity-select button").prop("disabled", false);
              $(".price-type .single-small-price").removeClass("hidden");
							$(".cur-quant").addClass('three-bar');
          } else {
                  //show sub. button
                  /*$(".order-button button.subscribe").removeClass("hidden").addClass("shown");
                  $(".quantity-select .cur-quant").text("1");
                  $(".quantity-select").addClass("disabled");
                  $(".price-type .sub-price").removeClass("hidden");
                  */
                  //then show single button
                  $(".order-button button.single-order").removeClass("hidden").addClass("shown");
                  $(".quantity-select button").prop("disabled", false);
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

















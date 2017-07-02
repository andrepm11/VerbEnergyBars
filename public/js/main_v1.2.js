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
    $(".faq-title").on('click', function(){
        if($(this).hasClass("open-question")){
            $(this).removeClass("open-question");
            var answer = $(this).next();
            answer.slideToggle("100");
            
        }else{
            $(".faq-title.open-question").next().slideToggle("100");
            $(".faq-title.open-question").removeClass("open-question");
            
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
	$('.try-button-wrapper').addClass('in');
	$('header .image-wrapper').addClass('in');

	$(window).scroll(function () {
		/* Check the location of each desired element */
		$('.on-scroll').each(function (i) {

			var middle_of_object = $(this).position().top; //+ ( $(this).outerHeight() / 2 );
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
		
		$vsTitle.html('Exercise Supplements');
		$vsContent.html("Friends don&#8217;t let friends use pre-workout. Elite athletes choose Verb. They were Verb's first customers and always the first to give us feedback. We hear &#8220;Thank you! Thank you! Thank you!&#8221; and &#8220;I just had the best workout of my life&#8221; a lot.");
		
	});
	$groupCoffee.on('click', function(){
		$groupPre.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupShots.removeClass('active');
		$groupCoffee.addClass('active');
		
		$vsTitle.html('Coffee');
		$vsContent.html("Alright, confession time. We love coffee. We love the taste. We love the ritual. But we don&#8217;t love spending 20 minutes and $4.50 on jittery fleeting caffeine fixes when we actually need quick and convenient all-day energy. When we want energy, we grab Verb Bars, and save coffee for when we can enjoy it.");
		
	});
	$groupShots.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.addClass('active');
		
		$vsTitle.html('Energy Shots');
		$vsContent.html("We're wary of any &#8220;dietary supplement&#8221; with 8333% of your daily recommended value of anything. Verb is good energy&#8212;you know what's in it, it makes you feel great, and you can feel good about eating it.");
		
	});
	$groupDrinks.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.removeClass('active');
		$groupDrinks.addClass('active');
		
		$vsTitle.html('Energy Drinks & Soda');
		$vsContent.html("If you like pantothenic acid, glucuronolactone, maltodextrin, or 45 grams of sugar, then energy drinks are for you. If any of those made you cringe, try Verb.");
		
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

    Snipcart.api.cart.start().then(function() {
        //Show continue shopping button
        Snipcart.api.configure('show_continue_shopping', true);
        
        Snipcart.subscribe('cart.ready', function() {
            if ($(window).width() > 768) {
                addSpacesToPrice();
            }
            moveShippingSameAsBilling();
        }); 
        
        
        
        Snipcart.subscribe('cart.opened', function() {
            if ($(window).width() > 768) {
                addSpacesToPrice();
            }
            moveShippingSameAsBilling();
            
            if ($(window).width() < 768) {
                $("body").addClass("fixed");
            }
            
            
            Snipcart.unsubscribe('cart.opened');
            var html = $("#cart-content-text").html();
            $(html).insertBefore($("#snipcart-footer"));
    
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
                    addSpacesToPrice();
                }
                moveShippingSameAsBilling();
            }
            currentSnipcartId = newSnipcartId;
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
        

        $(".quantity-increment").on('click', function(){
            
            if($(".order-button button.shown").data("item-id")){
            var curQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
                if ($(this).hasClass("down")) {
                    //inc. down
                    if (curQuant > 10) {
                        curQuant-=10;
                        $(".quantity-select .cur-quant").html(curQuant);
                        $(".order-button button.shown").data("item-quantity", curQuant/10);
                    }
                } else {
                    //inc. up
                    curQuant+=10;
                    $(".quantity-select .cur-quant").html(curQuant);
                    $(".order-button button.shown").data("item-quantity", curQuant/10);
                }
            }
            else{
                var curQuant = parseInt($("#30bars .subscription-bar-quantity").text(),10);
                
                if ($(this).hasClass("down")) {
                    //inc. down
                    if (curQuant > 30) {
                        curQuant-=10;
                        $(".sub-plan-button .quantity-increment.up").removeClass("disabled");
                        $(".order-button button.shown").data("quantity", curQuant/10);
                        if(curQuant==30){
                            $(this).addClass("disabled");
                        }
                    }
                
                } else {
                    //inc. up
                    if(curQuant<60){                
                        curQuant+=10;
                        $(".sub-plan-button .quantity-increment.down").removeClass("disabled");
                        if(curQuant==60){
                            $(".sub-plan-button .quantity-increment.up").addClass("disabled")
                        }
                    }

                }
                var htmlString = htmlString='<span class="sub-plus">+</span>'+String(curQuant)+'<span class="sub-plus">+</span>';
                $("#30bars .subscription-bar-quantity").html(htmlString);
                $(".order-button button.shown").data("plan-quantity", curQuant/10);
                $("#30bars").data("box-quantity",curQuant/10);
                
            }
        });
        
        
        $(".snipcart-add-plan").on("click", function(){
            $("#subitem").data("item-quantity",$(this).data("plan-quantity"));
//            $("#subitem").click(); 
            
            
            
            Snipcart.api.items.add({
                "id": "Subscription-First-Month",
                "name": "Subscription First Month",
                "description": "$10 per box of 10 bars",
                "url": "/",
                "price": "10.00",
                "quantity": $(this).data("plan-quantity"),
                "maxQuantity":6,
                "shippable":"false",
                "image":"public/img/bar_order_mockup.png",
                "stackable": false
            }).catch(function(error){
                
                 var planID = (error['item']['attributes']['quantity'] < 3) ? "Monthly-Sub-"+String(error['item']['attributes']['quantity'])+"0" : "Monthly-Sub-30plus";
                                
                setTimeout(function(){
                
                    var plan = Snipcart.collections.plans.findWhere({'id': planID,'quantity':error['item']['attributes']['quantity']})
                    
                    if (plan){plan.destroy();}

                    Snipcart.api.modal.show();
                    Snipcart.api.modal.close();
                    Snipcart.api.modal.show();
                }, 3000);
                


                
            });
            Snipcart.api.modal.show();

        });
        
        

        
        $(".sub-plan-button").on('click', function(){
            if(!$(this).hasClass("active")){
                $(".sub-plan-button").removeClass("active");

                $(this).addClass("active");
                
                $(".order-button button").addClass("hidden").removeClass("shown");
                $($(this).data("subid")).removeClass("hidden").addClass("shown");
                
                $("#sub-price").html($(this).data("sub-price"));
                $("#subpercent").html($(this).data("percent-off"));
                
                $(".order-button button.shown").data("plan-quantity",$(this).data("box-quantity"));
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

            if ($(this).hasClass("single")) {
                //then show single button
                $(".order-button button.single-order").removeClass("hidden").addClass("shown");
                $(".quantity-select button").prop("disabled", false);
                $(".price-type .single-price").removeClass("hidden");
                $(".cur-quant").removeClass('three-bar');
                $(".quantity-increment").css("visibility", "visible");
                
                $(".quantity-select").css("display","block");
                $(".subscription-select").css("display","none");
                

            }  else if ($(this).hasClass("sub-button")) {
                $($(".sub-plan-button.active").data("subid")).removeClass("hidden").addClass("shown");

                $(".price-type .single-sub-price").removeClass("hidden");
                $(".cur-quant").removeClass('three-bar');

                
                $(".quantity-select").css("display","none");
                $(".subscription-select").css("display","block");

            }
            }
        });
        
        
        Snipcart.subscribe('item.added', function (ev, item, items) {
            
            var cart = Snipcart.api.cart.get();
            setTimeout(function(){
                var cart = Snipcart.api.cart.get();
                if (cart.items.length > 0 || cart.plans.length > 0) {
                    $(".cart-wrapper .svg-wrapper").addClass("active");
                } else {
                    $(".cart-wrapper .svg-wrapper").removeClass("active");
                }
            }, 100);
        }); Snipcart.subscribe('item.removed', function (ev, item, items) {
            
            if(ev["id"] == "Subscription-First-Month"){

                var planID = (ev["quantity"] < 3) ? "Monthly-Sub-"+String(ev["quantity"])+"0" : "Monthly-Sub-30plus";
                
                setTimeout(function(){
                 var plan = Snipcart.collections.plans.findWhere({'id': planID,'quantity':ev["quantity"]})
                    
                    if (plan){plan.destroy();}   
                    Snipcart.api.modal.show();
                    Snipcart.api.modal.close();
                    Snipcart.api.modal.show();
                }, 500);
            }
            
        }); Snipcart.subscribe('plan.removed', function (ev, item, items) {

            
            
            setTimeout(function(){

                var item = Snipcart.collections.items.findWhere({'image': "public/img/bar_order_mockup.png",'quantity':ev["quantity"]});

                if (item){item.destroy();}   
                Snipcart.api.modal.show();
                Snipcart.api.modal.close();
                Snipcart.api.modal.show();
            }, 500);

                
            


            
        }); 
        
        
        $("#subscribe").change(function () {
            if (this.checked) {
                $("#js-email").attr("placeholder", "Required");
                $("#js-email").prop("required", true);
            } else {
                $("#js-email").attr("placeholder", "Optional");
                $("#js-email").prop("required", false);
            }
        });
    });
    
    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(function () {
        var userRating = this.value;
    });
    $('#review-form').submit(function(event) {
       event.preventDefault();
        const email = strip_html_tags(($("#js-email").val() == '') ? 'none@email.com' : $("#js-email").val());
        const title = strip_html_tags(($("#js-title").val() == '') ? 'No Title' : $("#js-title").val());
        const name = strip_html_tags(($("#js-name").val() == '') ? 'Anonymous' : $("#js-name").val());
        const comments = strip_html_tags($("#comments").val());
        const rating = parseInt($("input[name='rating']:checked").val());
        


        firebase.auth().signInAnonymously().then(function(){

                var database = firebase.database();
                var usersRef = database.ref('/users');
                var rootpath = database.ref();
                var transactionpath = database.ref('transaction/');

                transactionpath.transaction(function(tran){
                    
                    if(tran){

                        tran.num_ratings++;
                        tran[rating]++;
                        tran.total_rating+=rating;
                        tran.average_rating=tran.total_rating/tran.num_ratings;
                    }
                    return tran;
                }, function(error, committed, val){
                    if(committed){
                        const date = Date();
                        const createdAt = (new Date().getTime())*-1;
                        
                        database.ref("reviews").push({
                            title,
                            name,
                            email,
                            rating,
                            comments,
                            createdAt,
                            date,
                        }, function(error){
                            if(!error){
                                setTimeout(function () { window.location.reload(); }, 10);
                            }
                        });
                        

                    }
                });

        })
            .catch(error=>{
            console.log(error)
        });
        
        $("#replacement-content").css("display", "block");
        $("#content-wrapper").css("display", "none");
    });
    
    $('#email-form').submit(function(event) {
        event.preventDefault();
        
        const verb = $("#theirverb").val();
        const email = $("#theiremail").val();

        $("#email-form-container").addClass('submitted');
    });

    var modal = document.getElementById("reviewModal");
    var btn = document.getElementById("reviewBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


});


var beginAt = 0;
var rowsPerPage = 5;
var i = 0;
var totalPages = 0;


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMqZPBSfLtJBNbZEEM0CXmog04ihRfiUQ",
    authDomain: "storing-comments.firebaseapp.com",
    databaseURL: "https://storing-comments.firebaseio.com",
    projectId: "storing-comments",
    storageBucket: "storing-comments.appspot.com",
    messagingSenderId: "353896147164"
};

firebase.initializeApp(config);



firebase.auth().signInAnonymously().then(function () {

    var database = firebase.database();
    var usersRef = database.ref('/users/');
    var transactionRef = database.ref('/transaction/');

    database.ref().once("value",function(snapshot){
        transactionRef.once("value", function(tranSnap){
            var starRating = tranSnap.val().average_rating.toFixed(2);
            $("#avg").append(starRating);
            var outOfFive = ((starRating/5)*100).toFixed(0);

            var stars='<div class="avg-rating-stars"><div class="avg-rating-stars-top" style="width:'+outOfFive+'%"><span>★★★★★</span></div><div class="avg-rating-stars-bottom"><span>★★★★★</span></div>';
            $("#avg").prepend(stars);
            
            var totalRows = tranSnap.val().num_ratings;
            totalPages = Math.ceil(totalRows/rowsPerPage);
            $("#total-reviews").append(String(totalRows)+" reviews&#41;");
                        
            for(i=1;i<=5;i++){
                var starId= "#"+String(i)+"stars";
                var starValue=tranSnap.val()[i];
                $(starId).append(String(starValue));
                var barId="#"+String(i)+"bar";
                var barString = String((starValue/totalRows)*100)+"%";

                $(barId).css("width", barString);                  
            }
            
            if(totalPages <= 1){
                $("#nextPageBtn").prop("disabled", true);
                $("#lastPageBtn").prop("disabled", true);
            }
            var reviewsRef = database.ref('/reviews/');

            reviewsRef.orderByChild("createdAt").limitToFirst(rowsPerPage).on("value", function(snapshot){
                var i = 0;
                snapshot.forEach(function(data){
                    if(i==0){
                        stopAt=data.val().createdAt;
                    }
                    i+=1;
                    var html='<div class="review">';
                    html+='<h3 class="review-title">' + data.val().title + '</h3>';
                    html+='<span class="review-stars">'
                    for(j=0;j<data.val().rating;j++){
                        html+='★';
                    }
                    html+='</span>';
                                    html+='<span class="review-empty-stars">'
                    for(k=0;k<(5 - data.val().rating);k++){
                        html+='★';
                    }
                    html+='</span>';
                    html+='<span class="reviewer-name">' + data.val().name + '</span>';
                    html+='<span class="review-date">' + data.val().date.substring(4,15)+'</span>';
                    html+='<p class="review-body">'+data.val().comments+'</p>';

                    html+='</div>';

                    $("#reviewTable").append(html);
                    beginAt = data.val().createdAt;

               }) 
            });
        });
    });

}).catch(function(error){
    console.log(error);
});

function append(snapshot){
    var i=0;
    snapshot.forEach(function(data){
        if(i==0){
            stopAt=data.val().createdAt;
        }
        i+=1;

        var html='<div class="review">';
        html+='<h3 class="review-title">' + data.val().title + '</h3>';
        html+='<span class="reviewer-name">' + data.val().name + '</span>';
        html+='<span class="review-date">' + data.val().date.substring(4,15)+'</span>';
        html+='<span class="review-stars">'
        
        for(j=0;j<data.val().rating;j++){
            html+='★';
        }
            
        html+='</span>';
        html+='<p class="review-body">'+data.val().comments+'</p>';

        html+='</div>';

        $("#reviewTable").append(html);
       beginAt = data.val().createdAt;
    });
}


function updateTable(moveCount){
    $(".review").remove();
    if(moveCount=='first'){
        var newCurrentPage = 1;
    }else if(moveCount=='last'){
        var newCurrentPage = totalPages;
    }else var newCurrentPage = parseInt($("#currentPage").html(), 10)+moveCount;

    $("#currentPage").html(newCurrentPage);
    if(newCurrentPage == 1){
        $("#prevPageBtn").prop("disabled", true);
        $("#firstPageBtn").prop("disabled", true);
    }else{
        $("#prevPageBtn").prop("disabled", false);
        $("#firstPageBtn").prop("disabled", false);
    }
    if(newCurrentPage == totalPages){
        $("#nextPageBtn").prop("disabled", true);
        $("#lastPageBtn").prop("disabled", true);
    }else{
        $("#nextPageBtn").prop("disabled", false);
        $("#lastPageBtn").prop("disabled", false);
    }

    firebase.auth().signInAnonymously().then(function(){

        var database = firebase.database();
        var usersRef = database.ref('/users/');
        var transactionRef = database.ref('/transaction/');

        transactionRef.once("value",function(snapshot){

            var totalRows = snapshot.val().num_ratings;

            var reviewsRef = database.ref('/reviews/');
            if(moveCount==1){
                reviewsRef.orderByChild("createdAt").startAt(beginAt+1).limitToFirst(rowsPerPage).once("value", function(snapshot){
                    append(snapshot);
              });
            }else if(moveCount==-1){
                reviewsRef.orderByChild("createdAt").endAt(stopAt-1).limitToLast(rowsPerPage).once("value", function(snapshot){
                    append(snapshot);
                });
            }else if(moveCount=='first'){
                 reviewsRef.orderByChild("createdAt").limitToFirst(rowsPerPage).once("value", function(snapshot){
                    append(snapshot);
                });
            }else if(moveCount=='last'){
                reviewsRef.orderByChild("createdAt").limitToLast((totalRows%rowsPerPage) ? totalRows%rowsPerPage : rowsPerPage).once("value", function(snapshot){
                    append(snapshot);
                });
            }
        });
    }).catch(function(error){
        console.log(error);
    }); 
}

$(document).on("click", "#firstPageBtn", function(){
    updateTable('first');
});
$(document).on("click", "#prevPageBtn", function(){
    updateTable(-1);
});
$(document).on("click", "#nextPageBtn", function(){
    updateTable(1);
});
$(document).on("click", "#lastPageBtn", function(){
    updateTable('last');
});


function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

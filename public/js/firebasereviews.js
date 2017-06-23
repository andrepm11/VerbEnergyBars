/*jslint browser: true*/
/*global $, jQuery*/

$(document).ready(function () {
    $("#subscribe").change(function () {
        if (this.checked) {
            $("#js-email").attr("placeholder", "Required");
            $("#js-email").prop("required", true);
        } else {
            $("#js-email").attr("placeholder", "Optional");
            $("#js-email").prop("required", false);
        }
    });

    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(function () {
        var userRating = this.value;
    });
    
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        //const mixpanelDistintctID = mixpanel.get_distinct_id();
        const mixpanelDistinctId = "12345";

        const email = $("#js-email").val();
        const title = ($("#js-title").val() == '') ? 'No Title' : $("#js-title").val();
        const name = ($("#js-name").val() == '') ? 'Anonymous' : $("#js-name").val();
        const comments = $("#comments").val();
        const rating = parseInt($("input[name='rating']:checked").val());
        const createdAt = (new Date().getTime())*-1;

        const date = Date();

        firebase.auth().signInAnonymously().then(function(){

                var database = firebase.database();
                var usersRef = database.ref('/users');

                usersRef.once('value', function(snapshot) {
                  if (snapshot.hasChild("/"+mixpanelDistinctId)) {
                      //If they've reviewed before
                  }
                    else{
                        //If they haven't reviewed before
                    }
                });

                database.ref("reviews").push({
                    title,
                    name,
                    email,
                    rating,
                    comments,
                    createdAt,
                    date,
                });

                idsetter={};
                idsetter[mixpanelDistinctId] = createdAt;
                usersRef.set(idsetter);

                var rootpath = database.ref();

                var updates={};

                rootpath.once("value").then(function(snapshot){
                    updates["num_ratings"] = snapshot.val().num_ratings+1;
                    updates["total_rating"] = snapshot.val().total_rating+rating;
                    updates["average_rating"] = updates["total_rating"] / updates["num_ratings"];
                    rootpath.update(updates);
                    return updates;
                })
                .catch(error=>{
                    console.log(error)
                })
        })
            .catch(error=>{
            console.log(error)
        })

        $.ajax({
            type: "POST",
            url: "post.php",
            data: $(this).serialize(),		
            success: function(data){
                $('#result').html(data);
            }					
        });
        if($("#subscribe").is(":checked")){
            alert("Subscriber");//ADD IN EVENT TRACKING HERE TO GRAB E-MAIL AND ADD TO E-MAIL LIST
        };
        $("#replacement-content").css("display", "block");
        $("#content-wrapper").css("display", "none");
    });
    
    $('#emailVerb').submit(function(event) {
        event.preventDefault();
        
        const verb = $("#theirverb").val();
        const email = $("#theiremail").val();
        
        $.ajax({
            type: "POST",
            url: "whatsyourverb.php",
            data: $(this).serialize(),		
            success: function(data){
//                console.log(data);
            }					
        });
        $("#thanksForTheVerb").css("display", "block");
        $("#formwrap").css("display", "none");
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
    const mixpanelDistinctId = "12345"; //GET REAL MIXPANEL ID HERE

    var database = firebase.database();
    var usersRef = database.ref('/users/');

    database.ref().once("value",function(snapshot){
        var starRating = snapshot.val().average_rating.toFixed(2);
        $("#avg").append(starRating);
        var outOfFive = ((starRating/5)*100).toFixed(0);
//        console.log(outOfFive);
        
        var stars='<div class="star-ratings-css"><div class="star-ratings-css-top" style="width:'+outOfFive+'%"><span>★★★★★</span></div><div class="star-ratings-css-bottom"><span>★★★★★</span></div>';
//        console.log(stars);
        $("#avg").append(stars);

        var totalRows = snapshot.val().num_ratings;
        totalPages = Math.ceil(totalRows/rowsPerPage);

//        console.log(totalPages);

        if(totalPages <= 1){
            $("#nextPageBtn").prop("disabled", true);
            $("#lastPageBtn").prop("disabled", true);
        }
        var reviewsRef = database.ref('/reviews/');
        
        reviewsRef.orderByChild("createdAt").limitToFirst(rowsPerPage).once("value", function(snapshot){
            var i = 0;
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
               //console.log(data.val());
           }) 
        });
    });

    usersRef.once("value").then(function(snapshot) {   
        var currentDate = new Date().getTime();
        if(snapshot.hasChild("/"+mixpanelDistinctId) && (currentDate - (snapshot.child(mixpanelDistinctId).val()*-1)) < 0) {
            $("#content-wrapper").css("display", "none");
            $("#recency").css("display", "block");
        };
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
       //console.log(data.val());
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
        const mixpanelDistinctId = "12345"; //GET REAL MIXPANEL ID HERE

        var database = firebase.database();
        var usersRef = database.ref('/users/');

        database.ref().once("value",function(snapshot){

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
                reviewsRef.orderByChild("createdAt").limitToLast(totalRows%rowsPerPage).once("value", function(snapshot){
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


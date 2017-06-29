/*jslint browser: true*/
/*global $, jQuery*/

var secondaryconfig = {
    apiKey: "AIzaSyAunXjXaZzvNXn3c7_TIhEtNi1y_VbHxHg",
    authDomain: "subscriptions-5a966.firebaseapp.com",
    databaseURL: "https://subscriptions-5a966.firebaseio.com",
    projectId: "subscriptions-5a966",
    storageBucket: "",
    messagingSenderId: "598791599729"
  };
var subsdb = firebase.initializeApp(secondaryconfig, "subsdb");


Snipcart.subscribe('order.completed', function(data) {
    console.log(data);
    
    if(data['plans']){
        console.log("here");
    
        subsdb.auth().signInAnonymously().then(function(){
            var db = subsdb.database();
            var rootpath = db.ref(data['email']).set({
                billingAddress:data['billingAddress'],
                shippingAddress:data['shippingAddress'],
                plans:data['plans']
            });
            
            
        }).catch(error=>{
            console.log("error"+error);
        });
    }
                                               

});

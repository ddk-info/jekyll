var $ = jQuery.noConflict();

mageDepositeActive     = "app/assets/images/payment-types/bank-deposit-en.png";
imageDepositeDisActive = "app/assets/images/payment-types/bank-deposit-2-en.png";

imageSkrillActive      = "app/assets/images/payment-types/skrill-logo-payment.png";
imageSkrillDisActive   = "app/assets/images/payment-types/skrill-logo-payment-2.png";

imageNetellerActive    = "app/assets/images/payment-types/neteller-logo-payment.png";
imageNetellerDisActive = "app/assets/images/payment-types/neteller-logo-payment-2.png"

initToggleDropDownDeposite = function() {
  $(".js-toggle-deposite").click(function(event){
    event.preventDefault();
    $(".js-toogle-deposite-show").slideDown("slow");
    $(".js-toogle-skrill-show").hide();
    $(".js-toogle-neteller-show").hide();
    $(".js-deposite").attr("src", imageDepositeActive);
    $(".js-skrill").attr("src",   imageSkrillDisActive);
    $(".js-neteller").attr("src", imageNetellerDisActive);
  });
};


initToggleDropDownSkrill = function() {
  $(".js-toggle-skrill").click(function(event){
    event.preventDefault();
    $(".js-toogle-deposite-show").hide();
    $(".js-toogle-skrill-show").slideDown("slow");
    $(".js-toogle-neteller-show").hide();
    $(".js-deposite").attr("src", imageDepositeDisActive);
    $(".js-skrill").attr("src",   imageSkrillActive);
    $(".js-neteller").attr("src", imageNetellerDisActive);
  });
};

initToggleDropDownNeteller = function() {
  $(".js-toggle-neteller").click(function(event){
    event.preventDefault();
    $(".js-toogle-deposite-show").hide();
    $(".js-toogle-skrill-show").hide();
    $(".js-toogle-neteller-show").slideDown("slow");
    $(".js-deposite").attr("src", imageDepositeDisActive);
    $(".js-skrill").attr("src",   imageSkrillDisActive);
    $(".js-neteller").attr("src", imageNetellerActive);
  });
};


initToggleDropDownDeposite();
initToggleDropDownSkrill();
initToggleDropDownNeteller();
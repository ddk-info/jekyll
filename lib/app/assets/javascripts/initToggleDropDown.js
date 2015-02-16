imageDepositeActive    = "app/assets/images/payment-types/bank-deposit-en.png";
imageDepositeDisActive = "app/assets/images/payment-types/bank-deposit-2-en.png";

imageSkrillActive      = "app/assets/images/payment-types/skrill-logo-payment.png";
imageSkrillDisActive   = "app/assets/images/payment-types/skrill-logo-payment-2.png";

imageNetellerActive    = "app/assets/images/payment-types/neteller-logo-payment.png";
imageNetellerDisActive = "app/assets/images/payment-types/neteller-logo-payment-2.png"

initToggleDropDownDeposite = function() {
  jQuery(".js-toggle-deposite").click(function(event){
    event.preventDefault();
    jQuery(".js-toogle-deposite-show").slideDown("slow");
    jQuery(".js-toogle-skrill-show").hide();
    jQuery(".js-toogle-neteller-show").hide();
    jQuery(".js-deposite").attr("src", imageDepositeActive);
    jQuery(".js-skrill").attr("src",   imageSkrillDisActive);
    jQuery(".js-neteller").attr("src", imageNetellerDisActive);
  });
};


initToggleDropDownSkrill = function() {
  jQuery(".js-toggle-skrill").click(function(event){
    event.preventDefault();
    jQuery(".js-toogle-deposite-show").hide();
    jQuery(".js-toogle-skrill-show").slideDown("slow");
    jQuery(".js-toogle-neteller-show").hide();
    jQuery(".js-deposite").attr("src", imageDepositeDisActive);
    jQuery(".js-skrill").attr("src",   imageSkrillActive);
    jQuery(".js-neteller").attr("src", imageNetellerDisActive);
  });
};

initToggleDropDownNeteller = function() {
  jQuery(".js-toggle-neteller").click(function(event){
    event.preventDefault();
    jQuery(".js-toogle-deposite-show").hide();
    jQuery(".js-toogle-skrill-show").hide();
    jQuery(".js-toogle-neteller-show").slideDown("slow");
    jQuery(".js-deposite").attr("src", imageDepositeDisActive);
    jQuery(".js-skrill").attr("src",   imageSkrillDisActive);
    jQuery(".js-neteller").attr("src", imageNetellerActive);
  });
};


initToggleDropDownDeposite();
initToggleDropDownSkrill();
initToggleDropDownNeteller();
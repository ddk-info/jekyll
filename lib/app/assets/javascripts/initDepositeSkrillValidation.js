inputDepositeEmail     = jQuery("#js-deposite-skrill-email");
inputDepositeAmount    = jQuery("#js-deposite-skrill-amount");
submitDepositeButton   = jQuery("#js-deposite-skrill-submit");

depositeIconEmail      = jQuery(".js-icon-email-valiation");
DepositeIconAmount     = jQuery(".js-icon-amount-valiation");

DepositeTextEmail      = jQuery(".js-text-email-valiation")
DepositeTextAmount     = jQuery(".js-text-amount-valiation");



depositeEmailValidation = function(){
  inputDepositeEmail.keyup(function(){
    if(_validateEmail(inputDepositeEmail.val())) {
      depositeIconEmail.removeClass("hidden");
      depositeIconEmail.attr("src", "app/assets/images/form/ok.png");
    }
    else if (inputDepositeEmail.val() == "") {
      depositeIconEmail.addClass("hidden");
    }
    else if (inputDepositeEmail.val().length <= 6) {
      depositeIconEmail.addClass("hidden");
      DepositeTextEmail.addClass("hidden");
    }
    else{
      depositeIconEmail.removeClass("hidden");
      depositeIconEmail.attr("src", "app/assets/images/form/warning.png");
    }
  });
};


depositeAmountValidation = function () {
  inputDepositeAmount.numeric()
  inputDepositeAmount.keyup(function(){
    if (inputDepositeAmount.val() == "") {
      DepositeTextAmount.removeClass("hidden");
      DepositeIconAmount.removeClass("hidden");
    }
    else {
      DepositeIconAmount.addClass("hidden");
      DepositeTextAmount.addClass("hidden");
    }
  });
}

depositeSubmitButtonValidation = function(){
  submitDepositeButton  .click(function(event){
    event.preventDefault();
    if (inputDepositeEmail.val() == "" && inputDepositeAmount.val() == "") {
      depositeIconEmail.removeClass("hidden");
      DepositeIconAmount.removeClass("hidden");
      DepositeTextEmail.removeClass("hidden");
      DepositeTextAmount.removeClass("hidden");
    }
    else if(inputDepositeEmail.val() == ""){
      depositeIconEmail.removeClass("hidden");
      DepositeTextEmail.removeClass("hidden");
    }
    else if(inputDepositeEmail.val() != ""){
      depositeIconEmail.addClass("hidden");
      DepositeTextEmail.addClass("hidden");

    }
    else {
      DepositeIconAmount.removeClass("hidden");
      DepositeTextEmail.removeClass("hidden");
    }
  });
}



function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 


depositeEmailValidation();
depositeSubmitButtonValidation();
depositeAmountValidation();
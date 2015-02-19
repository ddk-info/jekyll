inputDepositeEmail     = jQuery("#js-deposite-skrill-email");
inputDepositeAmount    = jQuery("#js-deposite-skrill-amount");
submitDepositeButton   = jQuery("#js-deposite-skrill-submit");

depositeIconEmail      = jQuery(".js-icon-email-valiation");
depositeTextEmail      = jQuery(".js-text-email-valiation")

depositeIconAmount     = jQuery(".js-icon-amount-valiation");
depositeTextAmount     = jQuery(".js-text-amount-valiation");



depositeEmailInputValidation = function(){
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
      depositeTextEmail.addClass("hidden");
    }
    else{
      depositeIconEmail.removeClass("hidden");
      depositeIconEmail.attr("src", "app/assets/images/form/warning.png");
    }
  });
};


depositeAmountInputValidation = function () {
  inputDepositeAmount.numeric()
  inputDepositeAmount.keyup(function(){
    if (inputDepositeAmount.val() == "") {
      depositeTextAmount.removeClass("hidden");
      depositeIconAmount.removeClass("hidden");
      depositeIconAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputDepositeAmount.val() != "") {
      depositeTextAmount.addClass("hidden");
      depositeIconAmount.attr("src", "app/assets/images/form/ok.png");
    }
    else {
      depositeIconAmount.addClass("hidden");
      depositeTextAmount.addClass("hidden");
    }
  });
}

depositeSubmitButtonValidation = function(){
  submitDepositeButton  .click(function(event){
    event.preventDefault();
    if (inputDepositeEmail.val() == "" && inputDepositeAmount.val() == "") {
      depositeIconEmail.removeClass("hidden");
      depositeIconAmount.removeClass("hidden");
      depositeTextEmail.removeClass("hidden");
      depositeTextAmount.removeClass("hidden");
    }
    else if(inputDepositeEmail.val() == ""){
      depositeIconEmail.removeClass("hidden");
      depositeTextEmail.removeClass("hidden");
    }
    else if(inputDepositeEmail.val() != ""){
      depositeIconEmail.addClass("hidden");
      depositeTextEmail.addClass("hidden");

    }
    else {
      depositeIconAmount.removeClass("hidden");
      depositeTextEmail.removeClass("hidden");
    }
  });
}



function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 


depositeEmailInputValidation();
depositeSubmitButtonValidation();
depositeAmountInputValidation();
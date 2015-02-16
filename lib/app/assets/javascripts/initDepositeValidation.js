inputEmail     = jQuery("#js-deposite-skrill-email");
inputAmount    = jQuery("#js-deposite-skrill-amount");
submitDeposite = jQuery("#js-deposite-skrill-submit");

iconEmail      = jQuery(".js-icon-email-valiation");
iconAmount     = jQuery(".js-icon-amount-valiation");

textEmail      = jQuery(".js-text-email-valiation")
textAmount     = jQuery(".js-text-amount-valiation");


EmailValidation = function(){
  inputEmail.keyup(function(){
    if(_validateEmail(inputEmail.val())) {
      iconEmail.removeClass("hidden");
      iconEmail.attr("src", "app/assets/images/form/ok.png");
    }
    else if (inputEmail.val() == "") {
      iconEmail.addClass("hidden");
    }
    else if (inputEmail.val().length <= 6) {
      iconEmail.addClass("hidden");
      textEmail.addClass("hidden");
    }
    else{
      iconEmail.removeClass("hidden");
      iconEmail.attr("src", "app/assets/images/form/warning.png");
    }
  });
};


amountValidation = function () {
  inputAmount.numeric()
  inputAmount.keyup(function(){
    if (inputAmount.val() == "") {
      textAmount.removeClass("hidden");
      iconAmount.removeClass("hidden");
    }
    else {
      iconAmount.addClass("hidden");
      textAmount.addClass("hidden");
    }
  });
}

SubmitButtonValidation = function(){
  submitDeposite.click(function(event){
    event.preventDefault();
    if (inputEmail.val() == "" && inputAmount.val() == "") {
      iconEmail.removeClass("hidden");
      iconAmount.removeClass("hidden");
      textEmail.removeClass("hidden");
      textAmount.removeClass("hidden");
    }
    else if(inputEmail.val() == ""){
      iconEmail.removeClass("hidden");
      textEmail.removeClass("hidden");
    }
    else if(inputEmail.val() != ""){
      iconEmail.addClass("hidden");
      textEmail.addClass("hidden");

    }
    else {
      iconAmount.removeClass("hidden");
      textEmail.removeClass("hidden");
    }
  });
}


function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 


EmailValidation();
SubmitButtonValidation();
amountValidation();
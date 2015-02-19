inputWithdrawalSkrEmail        = jQuery("#js-skrill-withdrawal-email");
inputWithdrawalSkrAmount       = jQuery("#js-skrill-withdrawal-amount")
buttonSubmitWithdrawalSkrEmail = jQuery("#js-skrill-withdrawal-submit");

textWithdrawalSkrEmail =  jQuery(".js-text-skrill-withdrawal-email-validation");
iconWithdrawalSkrEmail =  jQuery(".js-icon-skrill-withdrawal-email-validation");

textWithdrawalSkrAmount =  jQuery(".js-text-skrill-withdrawal-amount-validation");
iconWithdrawalSkrAmount =  jQuery(".js-icon-skrill-withdrawal-amount-validation");


submitWithdrawalSkrButtonValidation = function(){
  buttonSubmitWithdrawalSkrEmail.click(function(event){
    event.preventDefault();

    if (inputWithdrawalSkrEmail.val() == "" && inputWithdrawalSkrAmount.val() == "") {
      textWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }

    else if (inputWithdrawalSkrEmail.val() == "") {
      textWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
    }
    else{
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }
  });
};

inputWithdrawalSkrEmailValidation = function(){
  inputWithdrawalSkrEmail.keyup(function(){
    if(_validateEmail(inputWithdrawalSkrEmail.val())) {
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/ok.png");
      textWithdrawalSkrEmail.addClass("hidden");
    }
    else if (inputWithdrawalSkrEmail.val() == "") {
      iconWithdrawalSkrEmail.addClass("hidden");
    }
    else if (inputWithdrawalSkrEmail.val().length <= 6) {
      iconWithdrawalSkrEmail.addClass("hidden");
      textWithdrawalSkrEmail.addClass("hidden");
      depositeTextEmail.addClass("hidden");
    }
    else{
      textWithdrawalSkrEmail.removeClass("hidden");
      textWithdrawalSkrEmail.html("The Email Address is in an invalid format.");
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
    }
  });
};

inputWithdrawalSkrAmountValidation = function(){
  inputWithdrawalSkrAmount.numeric();
  inputWithdrawalSkrAmount.keyup(function(){
    if (inputWithdrawalSkrAmount.val() == "") {
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textWithdrawalSkrAmount.addClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/ok.png");
    }
  });
};


function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
}; 

submitWithdrawalSkrButtonValidation();
inputWithdrawalSkrEmailValidation();
inputWithdrawalSkrAmountValidation();
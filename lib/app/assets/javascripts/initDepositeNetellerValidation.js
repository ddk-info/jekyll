inputDepositeNetAccountId        = jQuery("#js-deposite-neteller-account-id-validation");
inputDepositeNetSecureId        = jQuery("#js-deposite-neteller-secure-id-validation");
inputDepositeNetAmount  = jQuery("#js-deposite-neteller-deposite-amount-validation");
buttonDepositeSumit         = jQuery("#js-deposite-neteller-submit-button");

textDepositeNetAccountId        = jQuery(".js-text-acount-id-validation");
iconDepositeNetAccountId        = jQuery(".js-icon-acount-id-validation");

textDepositeNetSecureId         = jQuery(".js-text-secure-id-validation");
iconDepositeNetSecureId         = jQuery(".js-icon-secure-id-validation");

textDepositeNetAmount   = jQuery(".js-text-deposite-amount-validation");
iconDepositeNetAmount   = jQuery(".js-icon-deposite-amount-validation");


depositeNetButtonSubmitValidation = function() {
  buttonDepositeSumit.click(function(event){
    // TODO
    if(inputDepositeNetAccountId.val() == "" && inputDepositeNetSecureId.val() == "" && inputDepositeNetAmount.val() == ""){
      textDepositeNetAccountId.removeClass("hidden");
      iconDepositeNetAccountId.removeClass("hidden");
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
      textDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && inputDepositeNetSecureId.val() == "") {
      textDepositeNetAccountId.removeClass("hidden");
      iconDepositeNetAccountId.removeClass("hidden");
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && inputDepositeNetAmount.val() == "") {
      textDepositeNetAccountId.removeClass("hidden");
      iconDepositeNetAccountId.removeClass("hidden");
      textDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.removeClass("hidden");
    }
    else if (inputDepositeNetSecureId.val() == "" && inputDepositeNetAmount.val() == "" ) {
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
      textDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "") {
      textDepositeNetAccountId.removeClass("hidden");
      iconDepositeNetAccountId.removeClass("hidden");
    }
    else if(inputDepositeNetSecureId.val() == "") {
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
    }
    else if(inputDepositeNetAmount.val() == ""){
      textDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.removeClass("hidden");
    }
    else {

    }
  event.preventDefault();
  });
}

depositeNetInputAmountValidation = function() {
  inputDepositeNetAmount.numeric();
  inputDepositeNetAmount.keyup(function(){
    if (inputDepositeNetAmount.val() == "") {
      textDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.removeClass("hidden");
      iconDepositeNetAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textDepositeNetAmount.addClass("hidden");
      iconDepositeNetAmount.attr("src", "app/assets/images/form/ok.png");
    }
  });
};

depositeNetInputValidation = function(inputObject, text, icon, errorMessage, charLength){
  inputObject.numeric();
  inputObject.keyup(function(){
    if (inputObject.val() == "") {
      text.removeClass("hidden");
      text.removeClass("hidden");
      icon.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputObject.val().length < charLength) {
      text.removeClass("hidden");
      text.html(errorMessage + " " + charLength + " digits.");
      icon.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputObject.val().length == charLength) {
      text.addClass("hidden");
      icon.removeClass("hidden");
      icon.attr("src", "app/assets/images/form/ok.png");
    }
    else{
      text.addClass("hidden");
      icon.attr("src", "app/assets/images/form/ok.png");
    }
  });
};


depositeNetButtonSubmitValidation();


// Account ID 
depositeNetInputValidation(inputDepositeNetAccountId, textDepositeNetAccountId, iconDepositeNetAccountId, "Account ID must be", 12);

// Secure ID
depositeNetInputValidation(inputDepositeNetSecureId, textDepositeNetSecureId, iconDepositeNetSecureId, "Secure ID must be", 6);

// Amount 
depositeNetInputAmountValidation();
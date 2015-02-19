inputDepositeNetAccountId        = jQuery("#js-deposite-neteller-account-id-validation");
inputDepositeNetSecoureId        = jQuery("#js-deposite-neteller-secure-id-validation");
inputDepositeNetAmount  = jQuery("#js-deposite-neteller-deposite-amount-validation");
netSubmitButton         = jQuery("#js-deposite-neteller-submit-button");

netTextAccountId        = jQuery(".js-text-acount-id-validation");
netIconAccountId        = jQuery(".js-icon-acount-id-validation");

textDepositeNetSecureId         = jQuery(".js-text-secure-id-validation");
iconDepositeNetSecureId         = jQuery(".js-icon-secure-id-validation");

netTextDepositeAmount   = jQuery(".js-text-deposite-amount-validation");
netIconDepositeAmount   = jQuery(".js-icon-deposite-amount-validation");


netButtonSubmitValidation = function() {
  netSubmitButton.click(function(event){
    // TODO
    if(inputDepositeNetAccountId.val() == "" && inputDepositeNetSecoureId.val() == "" && inputDepositeNetAmount.val() == ""){
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && inputDepositeNetSecoureId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && inputDepositeNetAmount.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (inputDepositeNetSecoureId.val() == "" && inputDepositeNetAmount.val() == "" ) {
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
    }
    else if(inputDepositeNetSecoureId.val() == "") {
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.removeClass("hidden");
    }
    else if(inputDepositeNetAmount.val() == ""){
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else {

    }
  event.preventDefault();
  });
}


depositeNetAccountIdValidation = function() {
  inputDepositeNetAccountId.numeric();
  inputDepositeNetAccountId.keyup(function(){
    if (inputDepositeNetAccountId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputDepositeNetAccountId.val().length < 12) {
      netTextAccountId.removeClass("hidden");
      netTextAccountId.html("Account ID must be 12 digits.");
      netIconAccountId.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputDepositeNetAccountId.val().length == 12) {

      netTextAccountId.addClass("hidden");
      netIconAccountId.removeClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/ok.png");
    }
    else if (inputDepositeNetAccountId.val() != "") {
      netTextAccountId.addClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/ok.png");
    }
  });
}


depositeNetSecoureIdValidation = function(){
  inputDepositeNetSecoureId.numeric();
  inputDepositeNetSecoureId.keyup(function(){
    if (inputDepositeNetSecoureId.val() == "") {
      textDepositeNetSecureId.removeClass("hidden");
      iconDepositeNetSecureId.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textDepositeNetSecureId.addClass("hidden");
      iconDepositeNetSecureId.attr("src", "app/assets/images/form/ok.png");
    }
  });
};

netButtonSubmitValidation();
depositeNetAccountIdValidation();
depositeNetSecoureIdValidation();

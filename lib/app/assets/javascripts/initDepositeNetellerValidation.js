iconDepositeNetAccountId  = j$(".js-icon-acount-id-validation");
textDepositeNetAccountId  = j$(".js-text-acount-id-validation");

textDepositeNetSecureId   = j$(".js-text-secure-id-validation");
iconDepositeNetSecureId   = j$(".js-icon-secure-id-validation");

textDepositeNetAmount     = j$(".js-text-deposite-amount-validation");
iconDepositeNetAmount     = j$(".js-icon-deposite-amount-validation");

// 
buttonOnClickValidationFields("#js-deposite-neteller-submit-button", ".js-cashier-payment-form-neteller");

// Event keyup validation: Account ID
j$("#js-deposite-neteller-account-id-validation").numeric();
j$("#js-deposite-neteller-account-id-validation").keyup(function(){
  _depositeNetInputValidation(j$(this), textDepositeNetAccountId, iconDepositeNetAccountId, "Account ID must be", 12);
});

// Event keyup validation: Secure ID
j$("#js-deposite-neteller-secure-id-validation").numeric();
j$("#js-deposite-neteller-secure-id-validation").keyup(function(){
  _depositeNetInputValidation(j$(this), textDepositeNetSecureId, iconDepositeNetSecureId, "Secure ID must be", 6);
});

// Event keyup validation: Deposite Amount
j$("#js-deposite-neteller-deposite-amount-validation").numeric()
j$("#js-deposite-neteller-deposite-amount-validation").keyup(function(){
  if (j$(this).val() == "") {
    textDepositeNetAmount.removeClass("hidden");
    textDepositeNetAmount.removeClass("hidden");
    iconDepositeNetAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else {
    textDepositeNetAmount.addClass("hidden");
    iconDepositeNetAmount.removeClass("hidden");
    iconDepositeNetAmount.attr("src", "app/assets/images/form/ok.png");
  }
});

_depositeNetInputValidation = function(inputObject, text, icon, errorMessage, charLength){
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
};

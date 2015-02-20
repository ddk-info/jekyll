iconDepositeNetAccountId  = _$(".js-icon-acount-id-validation");
textDepositeNetAccountId  = _$(".js-text-acount-id-validation");

textDepositeNetSecureId   = _$(".js-text-secure-id-validation");
iconDepositeNetSecureId   = _$(".js-icon-secure-id-validation");

textDepositeNetAmount     = _$(".js-text-deposite-amount-validation");
iconDepositeNetAmount     = _$(".js-icon-deposite-amount-validation");

// 
buttonOnClickValidationFields("#js-deposite-neteller-submit-button", ".js-cashier-payment-form-neteller");

// Event keyup validation: Account ID
_$("#js-deposite-neteller-account-id-validation").numeric();
_$("#js-deposite-neteller-account-id-validation").keyup(function(){
  _depositeNetInputValidation(_$(this), textDepositeNetAccountId, iconDepositeNetAccountId, "Account ID must be", 12);
});

// Event keyup validation: Secure ID
_$("#js-deposite-neteller-secure-id-validation").numeric();
_$("#js-deposite-neteller-secure-id-validation").keyup(function(){
  _depositeNetInputValidation(_$(this), textDepositeNetSecureId, iconDepositeNetSecureId, "Secure ID must be", 6);
});

// Event keyup validation: Deposite Amount
_$("#js-deposite-neteller-deposite-amount-validation").numeric()
_$("#js-deposite-neteller-deposite-amount-validation").keyup(function(){
  if (_$(this).val() == "") {
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

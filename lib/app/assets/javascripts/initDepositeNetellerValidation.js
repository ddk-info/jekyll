var $ = jQuery.noConflict();

iconDepositeNetAccountId  = $(".js-icon-acount-id-validation");
textDepositeNetAccountId  = $(".js-text-acount-id-validation");

textDepositeNetSecureId   = $(".js-text-secure-id-validation");
iconDepositeNetSecureId   = $(".js-icon-secure-id-validation");

textDepositeNetAmount     = $(".js-text-deposite-amount-validation");
iconDepositeNetAmount     = $(".js-icon-deposite-amount-validation");

// 
buttonOnClickValidationFields("#js-deposite-neteller-submit-button", ".js-cashier-payment-form-neteller");

// Event keydown validation: Account ID
$("#js-deposite-neteller-account-id-validation").keydown(function(){
  $(this).numeric();
  _depositeNetInputValidation($(this), textDepositeNetAccountId, iconDepositeNetAccountId, "Account ID must be", 12);
});

// Event keydown validation: Secure ID
$("#js-deposite-neteller-secure-id-validation").keydown(function(){
  $(this).numeric();
  _depositeNetInputValidation($(this), textDepositeNetSecureId, iconDepositeNetSecureId, "Secure ID must be", 6);
});

// Event keydown validation: Deposite Amount
$("#js-deposite-neteller-deposite-amount-validation").keydown(function(){
  $(this).numeric();
  if ($(this).val() == "") {
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

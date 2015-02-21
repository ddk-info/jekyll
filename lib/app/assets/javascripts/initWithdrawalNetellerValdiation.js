var $ = jQuery.noConflict(); 

textWithdrawalNetellerAccountId = $(".js-text-withdrawal-neteller-validation");
iconWithdrawalNetellerAccountId = $(".js-icon-withdrawal-neteller-validation");

textWithdrawalNetellerAmountId  = $(".js-text-withdrawal-neteller-amount-validation");
iconWithdrawalNetellerAmountId  = $(".js-icon-withdrawal-neteller-amount-validation");

buttonOnClickValidationFields("#js-withdrawal-neteller-submit-button", ".js-cashier-payment-form-withdrawal-neteller");

$("#js-withdrawal-neteller-account-id").keydown(function(){
  $(this).numeric();
  _depositeNetInputValidation($(this), textWithdrawalNetellerAccountId, iconWithdrawalNetellerAccountId, "Account ID must be", 12);
});

$("#js-withdrawal-neteller-amount-id").keydown(function(){
  $(this).numeric();
  if ($(this).val() == "") {
    textWithdrawalNetellerAmountId.removeClass("hidden");
    iconWithdrawalNetellerAmountId.removeClass("hidden");
    iconWithdrawalNetellerAmountId.attr("src", "app/assets/images/form/warning.png");
  }
  else {
    textWithdrawalNetellerAmountId.addClass("hidden");
    iconWithdrawalNetellerAmountId.attr("src", "app/assets/images/form/ok.png");
  }
});




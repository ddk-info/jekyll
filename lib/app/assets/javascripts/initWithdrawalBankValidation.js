var $ = jQuery.noConflict();

iconWithdrawalAmount  = $(".js-icon-withdrawal-amount-validation");
textWithdrawalAmount  = $(".js-text-withdrawal-amount-validation");


buttonOnClickValidationFields("#js-bank-withdrawal-submit-button", ".js-cashier-payment-form-bank-withdrawal");

$("#js-bank-withdrawal-amount-validation").keydown(function(){
  $(this).numeric();
  if ($(this).val() == "") {
    textWithdrawalAmount.removeClass("hidden");
    iconWithdrawalAmount.removeClass("hidden");
    iconWithdrawalAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else {
    textWithdrawalAmount.addClass("hidden");
    iconWithdrawalAmount.attr("src", "app/assets/images/form/ok.png");
  }
});





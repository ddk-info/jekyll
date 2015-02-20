iconWithdrawalAmount  = j$(".js-icon-withdrawal-amount-validation");
textWithdrawalAmount  = j$(".js-text-withdrawal-amount-validation");


buttonOnClickValidationFields("#js-bank-withdrawal-submit-button", ".js-cashier-payment-form-bank-withdrawal")

j$("#js-bank-withdrawal-amount-validation").numeric();
j$("#js-bank-withdrawal-amount-validation").keyup(function(){
  if (j$(this).val() == "") {
    textWithdrawalAmount.removeClass("hidden");
    iconWithdrawalAmount.removeClass("hidden");
    iconWithdrawalAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else {
    textWithdrawalAmount.addClass("hidden");
    iconWithdrawalAmount.attr("src", "app/assets/images/form/ok.png");
  }
});





inputWithdrawalBankAmount  = jQuery("#js-neteller-withdrawal-amount-validation");
buttonSubmitWithdrawalBank = jQuery("#js-neteller-withdrawal-submit-button");

iconWithdrawalAmount  = jQuery(".js-icon-withdrawal-amount-validation");
textWithdrawalAmount  = jQuery(".js-text-withdrawal-amount-validation");

submitWithdrawalBankButtonValidation = function(){
  buttonSubmitWithdrawalBank.click(function(event){
    event.preventDefault();
    if (inputWithdrawalBankAmount.val() == "") {
      textWithdrawalAmount.removeClass("hidden");
      iconWithdrawalAmount.removeClass("hidden");
      iconWithdrawalAmount.attr("src", "app/assets/images/form/warning.png");
    }
  });
}

inputWithdrawalBankAmountValidation = function() {
  inputWithdrawalBankAmount.numeric();
  inputWithdrawalBankAmount.keyup(function(){
    if (inputWithdrawalBankAmount.val() == "") {
      textWithdrawalAmount.removeClass("hidden");
      iconWithdrawalAmount.removeClass("hidden");
      iconWithdrawalAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textWithdrawalAmount.addClass("hidden");
      iconWithdrawalAmount.attr("src", "app/assets/images/form/ok.png");
    }
  });
};

inputWithdrawalBankAmountValidation();
submitWithdrawalBankButtonValidation();




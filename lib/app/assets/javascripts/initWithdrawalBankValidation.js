inputWithdrawalAmount  = jQuery("#js-neteller-withdrawal-amount-validation");
submitWithdrawalButton = jQuery("#js-neteller-withdrawal-submit-button");

iconWithdrawalAmount  = jQuery(".js-icon-withdrawal-amount-valiation");
textWithdrawalAmount  = jQuery(".js-text-withdrawal-amount-valiation");

submitWithdrawalButtonValidaion = function(){
  submitWithdrawalButton.click(function(event){
    event.preventDefault();
    if (inputWithdrawalAmount.val() == "") {
      textWithdrawalAmount.removeClass("hidden");
      iconWithdrawalAmount.attr("src", "app/assets/images/form/warning.png")
    }

  });
}

submitWithdrawalButtonValidaion();




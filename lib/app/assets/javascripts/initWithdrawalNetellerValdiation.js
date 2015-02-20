inputWithdrawalNetellerId      = jQuery("#js-withdrawal-neteller");
inputWithdrawalNetellerAmount  = jQuery("#js-withdrawal-neteller-amount");
buttonSubmitWithdrawalNeteller = jQuery("#js-withdrawal-neteller-submit");

textWithdrawalNetellerId       = jQuery(".js-text-withdrawal-neteller-validation");
iconWithdrawalNetellerId       = jQuery(".js-icon-withdrawal-neteller-validation");

textWithdrawalNetellerAmount = jQuery(".js-text-withdrawal-neteller-amount-validation");
iconWithdrawalNetellerAmount = jQuery(".js-icon-withdrawal-neteller-amount-validation");

buttonSubmitWithdrawalNetellerValidation = function(){
  buttonSubmitWithdrawalNeteller.click(function(event){
    event.preventDefault();
    if (inputWithdrawalNetellerId.val() == "" && inputWithdrawalNetellerAmount.val() == "" ) {
      textWithdrawalNetellerId.removeClass("hidden");
      iconWithdrawalNetellerId.removeClass("hidden");
      textWithdrawalNetellerId.html("NETELLER Account ID is required!");
      textWithdrawalNetellerAmount.removeClass("hidden");
      iconWithdrawalNetellerAmount.removeClass("hidden");
    }
    else if (inputWithdrawalNetellerId.val() == "") {
      textWithdrawalNetellerId.removeClass("hidden");
      iconWithdrawalNetellerId.removeClass("hidden");
      textWithdrawalNetellerId.html("NETELLER Account ID is required!");
    }
    else {
      textWithdrawalNetellerAmount.removeClass("hidden");
      iconWithdrawalNetellerAmount.removeClass("hidden");
      textWithdrawalNetellerAmount.html("NETELLER Account ID is required!");
    }
  });
};

inputWithdrawalNetellerAmountValidation = function() {
  inputWithdrawalNetellerAmount.numeric();
  inputWithdrawalNetellerAmount.keyup(function(){
    if (inputWithdrawalNetellerAmount.val() == "") {
      textWithdrawalNetellerAmount.removeClass("hidden");
      iconWithdrawalNetellerAmount.removeClass("hidden");
      iconWithdrawalNetellerAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textWithdrawalNetellerAmount.addClass("hidden");
      iconWithdrawalNetellerAmount.attr("src", "app/assets/images/form/ok.png");
    }
  });
};


buttonSubmitWithdrawalNetellerValidation();
inputWithdrawalNetellerAmountValidation();
// depositeNetInputValidation(inputWithdrawalNetellerId, textWithdrawalNetellerId, iconWithdrawalNetellerId, "NETELLER Account ID must be", 12);
var $ = jQuery.noConflict(); 

inputWithdrawalNetellerId      = $("#js-withdrawal-neteller");
inputWithdrawalNetellerAmount  = $("#js-withdrawal-neteller-amount");
buttonSubmitWithdrawalNeteller = $("#js-withdrawal-neteller-submit");

textWithdrawalNetellerId       = $(".js-text-withdrawal-neteller-validation");
iconWithdrawalNetellerId       = $(".js-icon-withdrawal-neteller-validation");

textWithdrawalNetellerAmount   = $(".js-text-withdrawal-neteller-amount-validation");
iconWithdrawalNetellerAmount   = $(".js-icon-withdrawal-neteller-amount-validation");

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
inputDepositeNetAccountId       = jQuery("#js-neteller-account-id-validation");
netInputSecureId        = jQuery("#js-neteller-secure-id-validation");
netInputDepositeAmount  = jQuery("#js-neteller-deposite-amount-validation");
netSubmitButton         = jQuery("#js-neteller-submit-button");

netTextAccountId        = jQuery(".js-text-acount-id-valiation");
netIconAccountId        = jQuery(".js-icon-acount-id-valiation");

netTextSecureId         = jQuery(".js-text-secure-id-valiation");
netIconSecureId         = jQuery(".js-icon-secure-id-valiation");

netTextDepositeAmount   = jQuery(".js-text-deposite-amount-valiation");
netIconDepositeAmount   = jQuery(".js-icon-deposite-amount-valiation");


netButtonSubmitValidation = function() {
  netSubmitButton.click(function(event){
    // TODO
    if(inputDepositeNetAccountId.val() == "" && netInputSecureId.val() == "" && netInputDepositeAmount.val() == ""){
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netTextSecureId.removeClass("hidden");
      netIconSecureId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && netInputSecureId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netTextSecureId.removeClass("hidden");
      netIconSecureId.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "" && netInputDepositeAmount.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (netInputSecureId.val() == "" && netInputDepositeAmount.val() == "" ) {
      netTextSecureId.removeClass("hidden");
      netIconSecureId.removeClass("hidden");
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else if (inputDepositeNetAccountId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
    }
    else if(netInputSecureId.val() == "") {
      netTextSecureId.removeClass("hidden");
      netIconSecureId.removeClass("hidden");
    }
    else if(netInputDepositeAmount.val() == ""){
      netTextDepositeAmount.removeClass("hidden");
      netIconDepositeAmount.removeClass("hidden");
    }
    else {

    }
  event.preventDefault();
  });
}


depositeNetAccountIdValidation = function() {
  inputDepositeNetAccountId.numeric();
  inputDepositeNetAccountId.keyup(function(){
    if (inputDepositeNetAccountId.val() == "") {
      netTextAccountId.removeClass("hidden");
      netIconAccountId.removeClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputDepositeNetAccountId.val().length < 12) {
      netTextAccountId.removeClass("hidden");
      netTextAccountId.html("Account ID must be 12 digits.");
      netIconAccountId.attr("src", "app/assets/images/form/warning.png");
    }
    else if (inputDepositeNetAccountId.val().length == 12) {

      netTextAccountId.addClass("hidden");
      netIconAccountId.removeClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/ok.png");
    }
    else if (inputDepositeNetAccountId.val() != "") {
      netTextAccountId.addClass("hidden");
      netIconAccountId.attr("src", "app/assets/images/form/ok.png");
    }
  });
}


// function netValidation(input, text, icon){
//   input.keyup(function(){
//     if (input.val() == "") {
//       text.removeClass("hidden");
//       icon.removeClass("hidden");
//       icon.attr("src", "app/assets/images/form/warning.png");
//     }
//     if (input.val() != "") {
//       text.addClass("hidden");
//       icon.attr("src", "app/assets/images/form/ok.png");
//     }
//   });
// };

netButtonSubmitValidation();
depositeNetAccountIdValidation();

// netValidation(inputDepositeNetAccountId, netTextAccountId, netIconAccountId);
// netValidation(netInputSecureId, netTextSecureId, netIconSecureId);
// netValidation(netInputDepositeAmount, netTextDepositeAmount, netIconDepositeAmount);

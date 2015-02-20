iconDepositeNetAccountId  = jQuery(".js-icon-acount-id-validation");
textDepositeNetAccountId  = jQuery(".js-text-acount-id-validation");

textDepositeNetSecureId   = jQuery(".js-text-secure-id-validation");
iconDepositeNetSecureId   = jQuery(".js-icon-secure-id-validation");

textDepositeNetAmount     = jQuery(".js-text-deposite-amount-validation");
iconDepositeNetAmount     = jQuery(".js-icon-deposite-amount-validation");

// Event Click Buttont Submit
jQuery("#js-deposite-neteller-submit-button").on("click",function(){  
  jQuery("form.cashier-payment-form-neteller .div-validate").each(function(){    
    var input = jQuery(this).find("input");      
    if(input.val()==""){      
      jQuery(this).find("p").removeClass("hidden");
      jQuery(this).find("img").removeClass("hidden");        
    }else{      
      jQuery(this).find("p").addClass("hidden");
      jQuery(this).find("img").addClass("hidden");
    }      
  });  
});

// Event keyup validation: Account ID
jQuery("#js-deposite-neteller-account-id-validation").numeric();
jQuery("#js-deposite-neteller-account-id-validation").keyup(function(){
  _depositeNetInputValidation(jQuery(this), textDepositeNetAccountId, iconDepositeNetAccountId, "Account ID must be", 12);
});

// Event keyup validation: Secure ID
jQuery("#js-deposite-neteller-secure-id-validation").numeric();
jQuery("#js-deposite-neteller-secure-id-validation").keyup(function(){
  _depositeNetInputValidation(jQuery(this), textDepositeNetSecureId, iconDepositeNetSecureId, "Secure ID must be", 6);
});

// Event keyup validation: Deposite Amount
jQuery("#js-deposite-neteller-deposite-amount-validation").numeric()
jQuery("#js-deposite-neteller-deposite-amount-validation").keyup(function(){
  if (jQuery(this).val() == "") {
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



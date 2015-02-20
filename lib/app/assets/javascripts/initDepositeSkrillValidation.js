depositeIconEmail      = j$(".js-icon-email-validation");
depositeTextEmail      = j$(".js-text-email-validation")

depositeIconAmount     = j$(".js-icon-amount-validation");
depositeTextAmount     = j$(".js-text-amount-validation");


buttonOnClickValidationFields("#js-deposite-skrill-submit-button", ".js-cashier-payment-form-skrill" );

j$("#js-deposite-skrill-email").keyup(function(){
  if(validateEmail(j$(this).val())) {
    depositeIconEmail.removeClass("hidden");
    depositeIconEmail.attr("src", "app/assets/images/form/ok.png");
    depositeTextEmail.addClass("hidden");
  }
  else if (j$(this).val() == "") {
    depositeIconEmail.addClass("hidden");
  }
  else if (j$(this).val().length <= 6) {
    depositeIconEmail.addClass("hidden");
    depositeTextEmail.addClass("hidden");
  }
  else{
    depositeTextEmail.removeClass("hidden");
    depositeTextEmail.html("The Email Address is in an invalid format.");
    depositeIconEmail.removeClass("hidden");
    depositeIconEmail.attr("src", "app/assets/images/form/warning.png");
   }
});

j$("#js-deposite-skrill-amount").numeric();
j$("#js-deposite-skrill-amount").keyup(function(){
  if (j$(this).val() == "") {
    depositeTextAmount.removeClass("hidden");
    depositeIconAmount.removeClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else if (j$(this).val() != "") {
    depositeTextAmount.addClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/ok.png");
  }
  else {
    depositeIconAmount.addClass("hidden");
    depositeTextAmount.addClass("hidden");
  }
});

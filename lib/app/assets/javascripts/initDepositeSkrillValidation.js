var $ = jQuery.noConflict();

depositeIconEmail      = $(".js-icon-email-validation");
depositeTextEmail      = $(".js-text-email-validation")

depositeIconAmount     = $(".js-icon-amount-validation");
depositeTextAmount     = $(".js-text-amount-validation");


buttonOnClickValidationFields("#js-deposite-skrill-submit-button", ".js-cashier-payment-form-skrill" );

$("#js-deposite-skrill-email").keydown(function(){
  if(validateEmail($(this).val())) {
    depositeIconEmail.removeClass("hidden");
    depositeIconEmail.attr("src", "app/assets/images/form/ok.png");
    depositeTextEmail.addClass("hidden");
  }
  else if ($(this).val() == "") {
    depositeIconEmail.addClass("hidden");
  }
  else if ($(this).val().length <= 6) {
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

$("#js-deposite-skrill-amount").keydown(function(){
  $(this).numeric();
  if ($(this).val() == "") {
    depositeTextAmount.removeClass("hidden");
    depositeIconAmount.removeClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else if ($(this).val() != "") {
    depositeTextAmount.addClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/ok.png");
  }
  else {
    depositeIconAmount.addClass("hidden");
    depositeTextAmount.addClass("hidden");
  }
});

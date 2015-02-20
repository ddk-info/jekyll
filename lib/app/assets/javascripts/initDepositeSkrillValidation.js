depositeIconEmail      = _$(".js-icon-email-validation");
depositeTextEmail      = _$(".js-text-email-validation")

depositeIconAmount     = _$(".js-icon-amount-validation");
depositeTextAmount     = _$(".js-text-amount-validation");


buttonOnClickValidationFields("#js-deposite-skrill-submit-button", ".js-cashier-payment-form-skrill" );

_$("#js-deposite-skrill-email").keyup(function(){
  if(_validateEmail(_$(this).val())) {
    depositeIconEmail.removeClass("hidden");
    depositeIconEmail.attr("src", "app/assets/images/form/ok.png");
    depositeTextEmail.addClass("hidden");
  }
  else if (_$(this).val() == "") {
    depositeIconEmail.addClass("hidden");
  }
  else if (_$(this).val().length <= 6) {
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

_$("#js-deposite-skrill-amount").numeric();
_$("#js-deposite-skrill-amount").keyup(function(){
  if (_$(this).val() == "") {
    depositeTextAmount.removeClass("hidden");
    depositeIconAmount.removeClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else if (_$(this).val() != "") {
    depositeTextAmount.addClass("hidden");
    depositeIconAmount.attr("src", "app/assets/images/form/ok.png");
  }
  else {
    depositeIconAmount.addClass("hidden");
    depositeTextAmount.addClass("hidden");
  }
});

var $ = jQuery.noConflict();

textWithdrawalSkrEmail =  $(".js-text-skrill-withdrawal-email-validation");
iconWithdrawalSkrEmail =  $(".js-icon-skrill-withdrawal-email-validation");

textWithdrawalSkrAmount =  $(".js-text-skrill-withdrawal-amount-validation");
iconWithdrawalSkrAmount =  $(".js-icon-skrill-withdrawal-amount-validation");

buttonOnClickValidationFields("#js-skrill-withdrawal-submit-button", ".js-cashier-payment-form-skrill-withdrawal");

$("#js-skrill-withdrawal-email").keydown(function(){
  if(validateEmail($(this).val())) {
    iconWithdrawalSkrEmail.removeClass("hidden");
    iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/ok.png");
    textWithdrawalSkrEmail.addClass("hidden");
  }
  else if ($(this).val() == "") {
    iconWithdrawalSkrEmail.addClass("hidden");
  }
  else if ($(this).val().length <= 6) {
    iconWithdrawalSkrEmail.addClass("hidden");
    textWithdrawalSkrEmail.addClass("hidden");
    depositeTextEmail.addClass("hidden");
  }
  else{
    textWithdrawalSkrEmail.removeClass("hidden");
    textWithdrawalSkrEmail.html("The Email Address is in an invalid format.");
    iconWithdrawalSkrEmail.removeClass("hidden");
    iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
  }
});


$("#js-skrill-withdrawal-amount").keydown(function(){
  $(this).numeric();
  if ($(this).val() == "") {
    textWithdrawalSkrAmount.removeClass("hidden");
    iconWithdrawalSkrAmount.removeClass("hidden");
    iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
  }
  else {
    textWithdrawalSkrAmount.addClass("hidden");
    iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/ok.png");
  }
});

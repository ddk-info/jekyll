var $ = jQuery.noConflict();

inputWithdrawalSkrEmail        = $("#js-skrill-withdrawal-email");
inputWithdrawalSkrAmount       = $("#js-skrill-withdrawal-amount")
buttonSubmitWithdrawalSkrEmail = $("#js-skrill-withdrawal-submit");

textWithdrawalSkrEmail =  $(".js-text-skrill-withdrawal-email-validation");
iconWithdrawalSkrEmail =  $(".js-icon-skrill-withdrawal-email-validation");

textWithdrawalSkrAmount =  $(".js-text-skrill-withdrawal-amount-validation");
iconWithdrawalSkrAmount =  $(".js-icon-skrill-withdrawal-amount-validation");


submitWithdrawalSkrButtonValidation = function(){
  buttonSubmitWithdrawalSkrEmail.click(function(event){
    event.preventDefault();

    if (inputWithdrawalSkrEmail.val() == "" && inputWithdrawalSkrAmount.val() == "") {
      textWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }

    else if (inputWithdrawalSkrEmail.val() == "") {
      textWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/warning.png");
    }
    else{
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }
  });
};

inputWithdrawalSkrEmailValidation = function(){
  inputWithdrawalSkrEmail.keyup(function(){
    if(validateEmail(inputWithdrawalSkrEmail.val())) {
      iconWithdrawalSkrEmail.removeClass("hidden");
      iconWithdrawalSkrEmail.attr("src", "app/assets/images/form/ok.png");
      textWithdrawalSkrEmail.addClass("hidden");
    }
    else if (inputWithdrawalSkrEmail.val() == "") {
      iconWithdrawalSkrEmail.addClass("hidden");
    }
    else if (inputWithdrawalSkrEmail.val().length <= 6) {
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
};

inputWithdrawalSkrAmountValidation = function(){
  inputWithdrawalSkrAmount.numeric();
  inputWithdrawalSkrAmount.keyup(function(){
    if (inputWithdrawalSkrAmount.val() == "") {
      textWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.removeClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/warning.png");
    }
    else {
      textWithdrawalSkrAmount.addClass("hidden");
      iconWithdrawalSkrAmount.attr("src", "app/assets/images/form/ok.png");
    }
  });
};


submitWithdrawalSkrButtonValidation();
inputWithdrawalSkrEmailValidation();
inputWithdrawalSkrAmountValidation();
inputEmail     = jQuery("#js-deposite-skrill-email");
submitDeposite = jQuery("#js-deposite-skrill-submit");
iconValidation = jQuery(".js-icon-valiation");


EmailValidation = function(){
  inputEmail.keyup(function(){
    if(_validateEmail(inputEmail.val())) {
      iconValidation.removeClass("hidden");
      iconValidation.attr("src", "app/assets/images/form/ok.png");
    }
    else if (inputEmail.val() == "") {
      iconValidation.addClass("hidden");
    }
    else if (inputEmail.val().length <= 6) {
      iconValidation.addClass("hidden");
    }
    else{
      iconValidation.removeClass("hidden");
      iconValidation.attr("src", "app/assets/images/form/warning.png");
    }
  });
};


SubmitButtonValidation = function(){
  submitDeposite.click(function(event){
    // event.preventDefault();
    if(inputEmail.val() == ""){
      jQuery(".js-text-valiation").removeClass("hidden");
      jQuery(".js-icon-valiation").removeClass("hidden");
    }
  });
}


function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 


EmailValidation();
SubmitButtonValidation();
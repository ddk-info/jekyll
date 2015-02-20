_$ = jQuery;

function addJavascript(jsname,pos) {
  var th = document.getElementsByTagName(pos)[0];
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.setAttribute('src',jsname);
  th.appendChild(s);
}

jQuery( document ).ready(function() {
  addJavascript('app/assets/javascripts/initToggleDropDown.js','body');
  addJavascript('app/assets/javascripts/initToggleSlideUp.js','body');
  addJavascript('app/assets/javascripts/initDepositeSkrillValidation.js','body');
  addJavascript('app/assets/javascripts/initDepositeNetellerValidation.js','body');
  addJavascript('app/assets/javascripts/initWithdrawalBankValidation.js', 'body');
  addJavascript('app/assets/javascripts/initWithdrawalSkrillValidation.js', 'body');
  addJavascript('app/assets/javascripts/initWithdrawalNetellerValdiation.js', 'body');
});



// Global Function Scope
function buttonOnClickValidationFields(buttonName, formName) {
  _$(buttonName).on("click",function(){  
    _$(formName + " " + ".js-validate").each(function(){    
      input = _$(this).find("input");      
      if(input.val()==""){      
        _$(this).find("p").removeClass("hidden");
        _$(this).find("img").removeClass("hidden");        
      }
    });  
  });
}


function _validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 
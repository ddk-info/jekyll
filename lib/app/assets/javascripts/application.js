j$ = jQuery;

function addJavascript(jsname,pos) {
  var th = document.getElementsByTagName(pos)[0];
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.setAttribute('src',jsname);
  th.appendChild(s);
}

j$ ( document ).ready(function() {
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
  j$(buttonName).on("click",function(){  
    j$(formName + " " + ".js-validate").each(function(){    
      input = j$(this).find("input");      
      if(input.val()==""){      
        j$(this).find("p").removeClass("hidden");
        j$(this).find("img").removeClass("hidden");        
      }
    });  
  });2
}


function validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 
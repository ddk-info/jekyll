function addJavascript(jsname,pos) {
  var th = document.getElementsByTagName(pos)[0];
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.setAttribute('src',jsname);
  th.appendChild(s);
}
 
jQuery( document ).ready(function() {
  addJavascript('app/assets/javascripts/initToggleSlideDown.js','body');
  addJavascript('app/assets/javascripts/initToggleSlideUp.js','body');
  addJavascript('app/assets/javascripts/initDepositeSkrillValidation.js','body');
  addJavascript('app/assets/javascripts/initDepositeNetellerValidation.js','body');
  addJavascript('app/assets/javascripts/initWithdrawalBankValidation.js', 'body');
  addJavascript('app/assets/javascripts/initWithdrawalSkrillValidation.js', 'body');
  addJavascript('app/assets/javascripts/initWithdrawalNetellerValdiation.js', 'body');
});



// Global Function Scope
function buttonOnClickValidationFields(buttonName, formName) {
  jQuery(buttonName).on("click",function(){  
    jQuery(formName + " " + ".js-validate").each(function(){    
      input = jQuery(this).find("input");      
      if(input.val()==""){      
        jQuery(this).find("p").removeClass("hidden");
        jQuery(this).find("img").removeClass("hidden");        
      }
    });  
  });
}


function validateEmail(email) { 
  regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
} 
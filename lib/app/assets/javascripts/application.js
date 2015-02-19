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
  addJavascript('app/assets/javascripts/initNetellerValidation.js','body');
});
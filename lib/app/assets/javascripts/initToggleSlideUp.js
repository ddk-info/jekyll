var $ = jQuery.noConflict();

bankWithdrawalShowContainer      = $(".js-bank-withdrawal-show-container");
skrillWithdrawalShowContainer    = $(".js-skrill-winthdrawal-show-container");
netellerWithdrawalShowContainer  = $(".js-neteller-winthdrawal-show-container");

outerContainerBankWidthdrawal    = $(".js-outer-controller-bank-withdrawal");
outerContainerSkrillWithdrawal   = $(".js-outer-controller-skrill-withdrawal");
outerContainerNetellerWithdrawal = $(".js-outer-controller-neteller-withdrawal");

bankWithdrawalImageActive        = "app/assets/images/withdrawal-logos/bank-withdraw-logo-en.png"; 
bankWithdrawalImageDisActive     = "app/assets/images/withdrawal-logos/bank-withdraw-logo-2-en.png"; 
skrillWithdrawalImageActive      = "app/assets/images/withdrawal-logos/skrill-logo-payment.png";
skrillWithdrawalImageDisActive   = "app/assets/images/withdrawal-logos/skrill-logo-payment-2.png";
netellerWithdrawalImageActive    = "app/assets/images/withdrawal-logos/neteller-logo-payment.png";
netellerWithdrawalImageDisActive = "app/assets/images/withdrawal-logos/neteller-logo-payment-2.png";



$(".js-bank-withdrawal-image").click(function(event){
  event.preventDefault();
  outerContainerSkrillWithdrawal.height( 0 );
  outerContainerNetellerWithdrawal.height( 0 );
  outerContainerBankWidthdrawal.height( 370 );
  netellerWithdrawalShowContainer.hide();
  skrillWithdrawalShowContainer.hide();
  bankWithdrawalShowContainer.slideDown("slow");
  $(".js-bank-withdrawal").attr("src",     bankWithdrawalImageActive);
  $(".js-skrill-withdrawal").attr("src",   skrillWithdrawalImageDisActive );
  $(".js-neteller-withdrawal").attr("src", netellerWithdrawalImageDisActive);
})


$(".js-skrill-withdrawal-image").click(function(event){
  event.preventDefault();
  outerContainerNetellerWithdrawal.height( 0 );
  outerContainerBankWidthdrawal.height( 0 );
  outerContainerSkrillWithdrawal.height( 320 );
  netellerWithdrawalShowContainer.hide();
  bankWithdrawalShowContainer.hide();
  skrillWithdrawalShowContainer.slideDown("slow");
  $(".js-bank-withdrawal").attr("src",     bankWithdrawalImageDisActive);
  $(".js-skrill-withdrawal").attr("src",   skrillWithdrawalImageActive );
  $(".js-neteller-withdrawal").attr("src", netellerWithdrawalImageDisActive);
})


$(".js-neteller-withdrawal-image").click(function(event){
  event.preventDefault();
  outerContainerBankWidthdrawal.height( 0 );
  outerContainerSkrillWithdrawal.height( 0 );
  outerContainerNetellerWithdrawal.height( 320 );
  skrillWithdrawalShowContainer.hide();
  bankWithdrawalShowContainer.hide();
  netellerWithdrawalShowContainer.slideDown("slow");
  $(".js-bank-withdrawal").attr("src",     bankWithdrawalImageDisActive);
  $(".js-skrill-withdrawal").attr("src",   skrillWithdrawalImageDisActive );
  $(".js-neteller-withdrawal").attr("src", netellerWithdrawalImageActive);
});

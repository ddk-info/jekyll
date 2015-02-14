initToggleDropDown = function() {
  $(".js-toggle").click(function(){
    $(".js-toogle-is-show").slideToggle("slow");
  });
};

initToggleDropDown();
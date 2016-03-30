
function displaySlider(slider) {


  $(slider).slider({
      min: 0,
      max: 10,
      step: 0.01
    }).slider("pips", {
      rest: "false",
      step: 50,
      labels: {"first":"Fully in favor of Agreement 1", "last":"Fully in favor of Agreement 2"}
    }).each(function(){
      //set the label for center value
      var el = $(slider)[0].getElementsByClassName("ui-slider-pip-5")[0].getElementsByClassName("ui-slider-label")[0];
      if(el.textContent){
        el.textContent = "No preference";
      }else{
        el.innerText = "No preference";
      }
    }).on('click', function(){
    });

$(".ui-slider-label").off("mouseenter mouseleave");

$(slider).mousedown(function(){
  $('' + slider + ' .ui-slider-handle').show();
})
$(slider).slider({
/*     change: function(event, ui) {
         $('.ui-slider-handle').show();
     }*/
});
$('' + slider + ' .ui-slider-handle').hide();

    return false;
}

/**
 * Created by fawadkhan on 7/23/15.
 */

var expiryDays = 5;

$(function () {
    displaySlider("#slider1");
    displaySlider("#slider2");
    displaySlider("#slider3");
    displaySlider("#slider4");
    displaySlider("#slider5");
});

function submitData(){

    if( isSlidersSelected() && isRadioButtonsChecked()){
        //Store values in cookies
        storeSliderValues();
        storeRadioValues();
    }else{
        return false;
    }
}

/**
 * Check if the sliders are selected.
 * @returns {boolean}
 */
function isSlidersSelected(){
    for(var i = 1; i<= 5; i++){
        var sliderHandle = $('#slider' + i + ' .ui-slider-handle')[0];
        if(sliderHandle.style.display == "none"){
            alert("Please choose slider " +i + " value");
            return false;
        }
    }
    return true;
}

/**
 * Check if the Radio Buttons are selected
 * @returns {boolean}
 */
function isRadioButtonsChecked(){
    for (var i = 1; i<=5; i++){
        if(!$("input[name='radioButton"+i+"']:checked").val()){
            alert("Please select a value for question " + (i) + ".");
            return false;
        }
    }
    return true;
}

function storeSliderValues(){
    var slider1Value = $('#slider1').slider("option", "value");
    var slider2Value = $('#slider2').slider("option", "value");
    var slider3Value = $('#slider3').slider("option", "value");
    var slider4Value = $('#slider4').slider("option", "value");
    var slider5Value = $('#slider5').slider("option", "value");

    setCookie("sliderPage2_slider1", slider1Value, expiryDays);
    setCookie("sliderPage2_slider2", slider2Value, expiryDays);
    setCookie("sliderPage2_slider3", slider3Value, expiryDays);
    setCookie("sliderPage2_slider4", slider4Value, expiryDays);
    setCookie("sliderPage2_slider5", slider5Value, expiryDays);
}

function storeRadioValues(){
    for (var i = 1; i<=5; i++){
        var radioButtonValue = $("input[name='radioButton"+i+"']:checked").val();
        setCookie("sliderPage2_RadioButton"+i, radioButtonValue, expiryDays);
    }
}
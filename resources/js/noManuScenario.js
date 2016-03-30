/**
 * Created by fawadkhan on 7/28/15.
 */
var x = getCookie("scenarioNumber") ? parseInt(getCookie("scenarioNumber")) + 1 : 1;

var scenario_submitButton = false;
spinner1Selection = null;

var selectedContract = getCookie("slectedContract");

$(document).ready(function () {

    var contractText = decodeURIComponent(getCookie("contract_scenario" + selectedContract));
    alert("Contract " + selectedContract + ":" + contractText);
    $('#btnNext').prop('disabled', false);
    var selectBox = $("select").selectBoxIt({nativeMousedown: true});

    var randomnumber = randomScenarioNumber();

    $("#container").html(contractText);

    //updateTextFromFile("#container", "resources/data/scenario", randomnumber);
    readQualityControlText(randomnumber);
});

/**
 * generate a random number for scenario which have not been picked before.
 * @returns {randomNumber}
 */
function randomScenarioNumber() {
    var maximum = 16;
    var minimum = 1;
    var rndnum = null;

    var sc1num = getCookie("sc1num");
    var sc2num = getCookie("sc2num");
    var sc3num = getCookie("sc3num");
    var sc4num = getCookie("sc4num");
    var sc5num = getCookie("sc5num");
    var sc6num = getCookie("sc6num");

    do {
        rndnum = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    } while (rndnum == sc1num || rndnum == sc2num || rndnum == sc3num || rndnum == sc4num || rndnum == sc5num || rndnum == sc6num);

    setCookie("sc" + x + "num", rndnum, 5);

    return rndnum;
}

//get scenario text from file and fill up the container with it
//here we should replace x with a random number (accoring to algorithm) and store in cookie (not here, somewhere).

function updateTextFromFile(txtcontainer, txtFilePrefix, randomnumber) {
    var txtFile = txtFilePrefix + randomnumber + ".txt";
    $.get(txtFile, function (data) {
        $(txtcontainer).html(data.toString());
    }, "text");
}

var text = null;
function readQualityControlText(randomnumber) {
    $.get("resources/data/qc" + randomnumber + ".txt", function (txtData) {
        text = txtData;
    }, "text");
}

function createDynamicHtml() {
    var dynamicHtml = "<nump1> <div id='txtqualitycontrol'>" + text + "<div/><nump1/>\
					<br><input type='text' id='qccontrolvalue' style='font-size:20px' size='40'  placeholder='enter the answer here'/>\
					<br><br><input type='submit' id='submitbutton' onClick='return submitScenario()' value='Submit' style='float: right;'  />"
    return dynamicHtml;
}

/*function createDynamicHtml(){
 var dynamicHtml = "<nump1> <div id='txtqualitycontrol'>"+text+"<div/><nump1/>\
 <br><input type='text' id='qccontrolvalue' style='font-size:20px' size='40'  placeholder='enter the answer here'/>\
 <br><br>\
 <nump3>How did the agreement menu and its options contribute towards solving the problem in the scenario?</nump3>\
 <br><br>\
 <div id='slider' class='slider'></div>\
 <br><br><input type='submit' id='submitbutton' onClick='return submitScenario()' value='Submit' style='float: right;'  />"
 return dynamicHtml;
 }*/

function nextScenario() {

    var dynamicHtml = createDynamicHtml();

    $("#target").submit(function (event) {
        $('#btnNext').prop('disabled', true);
        event.preventDefault();
        $('#table2').css('background-color', "#FFFFEE");
        $('#dynmaicform').append(dynamicHtml);
        /*$('.slider').on('input', function(){
         $('#sliderValue').prop('value', this.value);
         });
         displaySlider();*/
    });

    //deleteCookie("scenarioNumber");
    //}
}

function submitScenario() {
    var expiryDays = 5; // number of days after which the cookie will be expired
    var qccontrolvalue = document.getElementById("qccontrolvalue").value;

    if (!qccontrolvalue) {
        alert("Please answer the question.");
        return false;
    }

    //var sliderValue = $('#slider').slider("option", "value");

    // if there is no handle, it means the slider have not been clicked.
    /*	var handle =  $('.ui-slider-handle')[0];
     if (handle.style.display == "none"){
     alert("Please choose slider value");
     return false;
     }*/
    // store form values in cookies

    setCookie("qc_scenario" + x, qccontrolvalue, expiryDays);

    scenario_submitButton = true;

    setCookie("scenarioNumber", x);
    if(x == 3){
        $('#dynmaicform').prop('action', 'sliderPage1.html');
    }else if(x == 6){
        $('#dynmaicform').prop('action', 'sliderPage2.html');
    }
    $('#dynmaicform').submit();
}


window.onbeforeunload = function (e) {
    if (scenario_submitButton == true) {
        //e.preventDefault();
        return;
    }

    var e = e || window.event;
    var msg = "if you go back you will invalidate your participation in this experiment";

    // For IE and Firefox
    if (e) {
        e.returnValue = msg;
    }

    // For Safari / chrome
    return msg;
};




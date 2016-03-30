var x = getCookie("scenarioNumber") ? parseInt(getCookie("scenarioNumber")) + 1 : 1;

//clear all cookies be we are loading the first scenario
var resolutionStrategy = {1: "random", 2: "popup"};
/*var scenarioPairs = {
 1: 10,
 2: 9,
 3: 4,
 4: 3,
 5: 6,
 6: 5,
 7: 8,
 8: 7,
 9: 2,
 10: 1,
 11: 12,
 12: 11,
 13: 14,
 14: 13,
 15: 16,
 16: 15
 };*/

var scenarioPairs = {
    1: {1: 10, 4: 12, 5: 16, 7: 15, 10: 1, 12: 4, 15: 7, 16: 5},
    2: {2: 9, 3: 11, 6: 14, 8: 13, 9: 2, 11: 3, 13: 8, 14: 6}
};

if (x == 1) {
    deleteCookie("sc1num");
    deleteCookie("sc2num");
    deleteCookie("sc3num");
    deleteCookie("sc4num");
    deleteCookie("sc5num");
    deleteCookie("sc6num");
    deleteCookie("sc7num");
    deleteCookie("sc8num");
    deleteCookie("sc9num");
    deleteCookie("sc10num");
    deleteCookie("sc11num");
    deleteCookie("sc12num");
    deleteCookie("sc13num");
    deleteCookie("sc14num");
    deleteCookie("sc15num");
    deleteCookie("sc16num");
    deleteCookie("randomStrategy2");
    deleteCookie("randomStrategy5");
    deleteCookie("slectedContract");
    deleteCookie("contract_scenario1");
    deleteCookie("contract_scenario2");
    deleteCookie("contract_scenario4");
    deleteCookie("contract_scenario5");
}

var scenario_submitButton = false;
spinner1Selection = null;

$(document).ready(function () {

    $('#btnNext').prop('disabled', false);
    var selectBox = $("select").selectBoxIt({nativeMousedown: true});
    var randomnumber;

    if (x % 2 == 0) {
        var previousScenario = getCookie("sc" + (x - 1) + "num");
        randomnumber = scenarioPairs[getCookie("scenarioPair")][previousScenario];
    } else {
        randomnumber = randomScenairoFromPair(); // randomScenarioNumber();
    }

    setCookie("sc" + x + "num", randomnumber, 5);
    var txtContainer = $("#scenarioText");

    loadScenarioText(txtContainer, randomnumber);
    readQualityControlText(randomnumber);

    //find the lead character
    leadChar = null;
    for (var i = 0; i < leadCharacter.length; i++) {
        if (leadCharacter[i]['scenario'] == randomnumber) {
            leadChar = leadCharacter[i]['lead'];
            break;
        }
    }
    ;

    //remove myself from the spinner1 and spinner3
    //removeLeadCharacterOption("#spinner1nump", "spinner1", leadChar);
    removeLeadCharacterOption("#spinner3nump", "spinner3", leadChar);

    var leadexcludeCharacters = [];
    for (var i = 0; i < excludeCharacters.length; i++) {
        if (excludeCharacters[i]['scenario'] == randomnumber) {
            leadexcludeCharacters = excludeCharacters[i]['exclude'];
            break;
        }
    }
    ;

    leadexcludeCharacters.push(leadChar);
    removeLeadAndExludeCharacters("#spinner1nump", "spinner1", leadexcludeCharacters);

    // spinner click listeners
    $('select[name=spinner1]').on('change', spinner1ClickListener);
    $('select[name=spinner2]').on('change', spinner2ClickListener);
    //changeText();
    chooseTimePlace();
});

function randomScenairoFromPair() {
    var scenarioPairNumber = getCookie("scenarioPair");

    pairObject = scenarioPairs[scenarioPairNumber];
    var keys = Object.keys(pairObject),
        length = keys.length;

    do {
        rndkey = pairObject[keys[Math.floor(Math.random() * length)]];
    } while (checkIfScenarioTaken(pairObject[rndkey]));

    return pairObject[rndkey];
}

function checkIfScenarioTaken(rndScenario) {
    for (var i = 1; i <= x; i++) {
        if (rndScenario == getCookie("sc" + i + "num")) {
            return true;
        }
    }
    return false;
    //
    //if (getCookie("sc" + rndScenario + "num") == "")
    //    return false;
    //else
    //    return true;
}

/**
 * generate a random number for scenario which have not been picked before.
 * @returns {randomNumber}
 */
function randomScenarioNumber() {

    var maximum = 16;
    var minimum = 1;
    var rndnum = null;

    do {
        rndnum = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    } while (checkIfRandomNoTaken(rndnum));
    //setCookie("sc" + x + "num", rndnum, 5);
    return rndnum;
}

function checkIfRandomNoTaken(randomNumber) {
    for (var i = 1; i <= 16; i++) {
        if (randomNumber == getCookie("sc" + i + "num")) {
            return true;
        }
    }
    return false;
}

/**
 * get scenario text from scenario text file and fill up the container with it
 * @param txtcontainer
 */
function loadScenarioText(txtcontainer, randomnumber) {
    var txtFile = "resources/data/scenario" + randomnumber + ".txt";
    $.get(txtFile, function (data) {
        txtcontainer.html(data.toString());
    }, "text");
}

var qualityControlText = null;
function readQualityControlText(randomnumber) {
    var txtFile = "resources/data/qc" + randomnumber + ".txt";
    $.get(txtFile, function (txtData) {
        qualityControlText = txtData;
    }, "text");
}

/**
 * listen to click event on spinner 1
 */
function spinner1ClickListener() {
    spinner1Selection = ($("option:selected", this).text());
    var timePlaceButton = document.getElementById("switchTimePlace");
    if (timePlaceButton.value == "Time" && timePlaceButton.hidden == false) {
        changeHeShe(spinner1Selection);
    }
}

/**
 * listen to click event on spinner 2
 */
function spinner2ClickListener() {
    var selectedValue = ($("option:selected", this).text());
    cloneWith = $("#with").clone();
    switch (selectedValue) {
        case "receive":
        case "not receive":
            $("#with").replaceWith(cloneWith.clone());
            $("#with").text("from");
            break;
        default:
            $("#with").replaceWith(cloneWith.clone());
            $("#with").text("with");
            break;
    }
}

function defaultOptions() {
    var spinner = document.getElementById("spinner4");
    var langArray = [
        {value: "val1", text: "text 1"},
        {value: "val2", text: "text 2"}
    ];

    for (var i = 0; i < langArray.length; i++) {
        option = document.createElement('option');
        option.setAttribute('value', langArray[i].value);
        option.appendChild(document.createTextNode(langArray[i].text));
        spinner.appendChild(option);
    }
}

function removeLeadCharacterOption(numpID, spinnerID, leadCharacter) {

    var sp = document.getElementById(spinnerID);
    $(numpID).empty();

    for (var i = 0; i < sp.length; i++) {
        if (sp.options[i].value == leadCharacter) {
            sp.remove(i);
        }
    }
    ;

    $(numpID).append(sp);

    var selectBox = $("select").selectBoxIt({nativeMousedown: true});
}

function removeLeadAndExludeCharacters(numpID, spinnerID, leadExcCharacter) {

    var sp = document.getElementById(spinnerID);
    $(numpID).empty();

    for (var i = 0; i < sp.length; i++) {
        for (var j = 0; j < leadExcCharacter.length; j++) {
            if (sp.options[i].value == leadExcCharacter[j]) {
                sp.remove(i);
                i = i - 1;
                break;
            }
        }
        ;

    }
    ;

    $(numpID).append(sp);

    var selectBox = $("select").selectBoxIt({nativeMousedown: true});
}

//switch the text depending on if it is share or receive event

function setSpinnerValues() {

    cloneObj = $("#spinnerTimePicker").clone();
    $("#spinnerTimePicker").empty();

    var sp = document.createElement("select");
    sp.setAttribute("name", "spinner4");
    sp.setAttribute("id", "spinner4");
    sp.setAttribute("class", "placepicker");

    var placesArray = [
        {value: "select", text: "Select place..."},
        {value: "school", text: "school"},
        {value: "the park", text: "the park"},
        {value: "day care", text: "day care"},
        {value: "home", text: "home"}
    ];

    for (var i = 0; i < placesArray.length; i += 1) {
        option = document.createElement('option');
        option.setAttribute('value', placesArray[i].value);
        option.appendChild(document.createTextNode(placesArray[i].text));
        sp.appendChild(option);
    }

    $("#spinnerTimePicker").append(sp);
    var selectBox = $("select").selectBoxIt({nativeMousedown: true});

}

function switchTimePlaceValue(element) {

    if (element.value === "Time") {
        $("#spinnerTimePicker").empty();
        setTimePicker("#timepicker1", 1);
        $("#timePlace").text("if it is between");
        $("#and").text("and");
        setTimePicker("#timepicker2", 2);
        element.value = "Place";
        element.style.float = "right";
    }
    else if (element.value === "Place") {
        setSpinnerValues();
        changeHeShe(spinner1Selection);
        $("#and").empty();
        $("#timepicker1").empty();
        $("#timepicker2").empty();
        element.value = "Time";
        element.style.float = "";
    }

}


function setTimePicker(elmHolder, idN) {

    var n = 2;
    var cloneTimePicker = $(elmHolder).clone();
    $(elmHolder).empty();
    $(elmHolder).append("<input id=\"tp" + idN + "\" class=\"timepicker\" name=\"timepicker\" \/>");

    $('input.timepicker').timepicker({
        interval: 30,
        scrollbar: true
    });
    // change select time in timepicker-1.
    $('#tp' + idN).timepicker('setTime', '12:00p');

    $('input.change-format').click(function () {
        var input = $(this),
            timepicker = input.closest('div').find('.timepicker2'),
            instance = timepicker.timepicker();
        instance.option('timeFormat', $(this).data('format'));
    });
}

function chooseTimePlace() {
    $('select[name=spinner4]').on('change', function () {
        var timePlaceButton = document.getElementById("switchTimePlace");
        timePlaceButton.hidden = false;
        var selectedValue = ($("option:selected", this).text());
        switch (selectedValue) {
            case "Time":
                timePlaceButton.value = "Time";
                switchTimePlaceValue(timePlaceButton);
                break;
            case "Place":
                timePlaceButton.value = "Place";
                switchTimePlaceValue(timePlaceButton);
                break;
            default:
                break;
        }
    });
}

function changeHeShe(selectedOption) {
    cloneTimePlace = $("#timePlace").clone();
    switch (selectedOption) {
        case "Mary":
        case "Lisa":
        case "Claire":
        case "Jane":
            $("#timePlace").replaceWith(cloneTimePlace.clone());
            $("#timePlace").text("if she is at");
            break;
        case "Jason":
        case "Paul":
        case "Peter":
        case "Mike":
            $("#timePlace").replaceWith(cloneTimePlace.clone());
            $("#timePlace").text("if he is at");
            break;
        default:
            $("#timePlace").replaceWith(cloneTimePlace.clone());
            $("#timePlace").text("if he/she is at");
            break;
    }
}

function nextScenario() {

    var sp1 = document.getElementById("spinner1");
    var sp2 = document.getElementById("spinner2");
    var sp3 = document.getElementById("spinner3");
    var sp4 = document.getElementById("spinner4");

    if (sp1.value === "select" || sp2.value === "select" || sp3.value === "select" || (sp4 && sp4.value === "select")) {
        alert("Please select a value in all menus.");
        return false;
    }

    $("#target").submit(function (event) {
        $('#btnNext').prop('disabled', true);
        event.preventDefault();
        $('#txtqualitycontrol')[0].innerHTML = qualityControlText;
        $("#pieChartTextTest").append(leadChar.capitalize() + ".");
        $('#table2')[0].style.display = "block";
        /*$('.slider').on('input', function(){
         $('#sliderValue').prop('value', this.value);
         });
         displaySlider();*/
        //return false;
    });

}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function submitScenario() {
    var expiryDays = 5; // number of days after which the cookie will be expired
    var qccontrolvalue = document.getElementById("qccontrolvalue").value;

    if (!qccontrolvalue) {
        alert("Please answer the question.");
        return false;
    }

    var sp1 = document.getElementById("spinner1").selectedOptions.item(0).text;
    var sp2 = document.getElementById("spinner2").selectedOptions.item(0).text;
    var sp3 = document.getElementById("spinner3").selectedOptions.item(0).text;
    var sp4 = null;
    var tp1 = null;
    var tp2 = null;

    if (document.getElementById("spinner4")) {
        sp4 = document.getElementById("spinner4").selectedOptions.item(0).text;
    }
    else if (document.getElementById("tp1") && document.getElementById("tp2")) {
        tp1 = document.getElementById("tp1").value;
        tp2 = document.getElementById("tp2").value;
    }
    setCookie("sp1_scenario" + x, sp1, expiryDays);
    setCookie("sp2_scenario" + x, sp2, expiryDays);
    setCookie("sp3_scenario" + x, sp3, expiryDays);
    setCookie("sp4_scenario" + x, sp4, expiryDays);

    setCookie("tp1_scenario" + x, tp1, expiryDays);
    setCookie("tp2_scenario" + x, tp2, expiryDays);

    setCookie("qc_scenario" + x, qccontrolvalue, expiryDays);
    //setCookie("qc_slider_scenario"+x, sliderValue, expiryDays);

    scenario_submitButton = true;
    setCookie("scenarioNumber", x);

    var contractText = $("#text1").text() + " " + sp1 + $("#text2").text() + " " + sp2 + $("#text3").text() + " " + $("#with").text() + " " + sp3 + " " + $("#timePlace").text() + " " + (sp4 != null ? sp4 : (tp1 + " " + $("#and").text() + " " + tp2));
    setCookie("contract_scenario" + x, contractText, expiryDays);

    var pieData = {Friendship: data[0], Privacy: data[1], Safety: data[2], Independence: data[3], Responsibility: data[4]};
    setPieDataCookie("sc" + x + "piedata", JSON.stringify(pieData), expiryDays);

    if (x % 2 == 0) {

        var  sp1PrevScenario = decodeURIComponent(getCookie("sp1_scenario" + (x - 1)));
        var  sp2PrevScenario = decodeURIComponent(getCookie("sp2_scenario" + (x - 1)));
        var  sp3PrevScenario = decodeURIComponent(getCookie("sp3_scenario" + (x - 1)));
        var  sp4PrevScenario = decodeURIComponent(getCookie("sp4_scenario" + (x - 1)));
        var  tp1PrevScenario = decodeURIComponent(getCookie("tp1_scenario" + (x - 1)));
        var  tp2PrevScenario = decodeURIComponent(getCookie("tp2_scenario" + (x - 1)));

        sp4PrevScenario = sp4PrevScenario === "null"? null: sp4PrevScenario;
        tp1PrevScenario = tp1PrevScenario === "null"? null: tp1PrevScenario;
        tp2PrevScenario = tp2PrevScenario === "null"? null: tp2PrevScenario;

        var isConflicts = isConflict(sp1PrevScenario, sp2PrevScenario, sp3PrevScenario, sp4PrevScenario, tp1PrevScenario, tp2PrevScenario, sp1, sp2, sp3, sp4, tp1, tp2);
        if (isConflicts) {

            var popUpList = $('<table title="Please indicate your preference"><tr><td><div> It appears that a conflict may occur between the last two agreements that have been created:</div></td></tr>' +
                '<tr><td><div style="margin-top: 10px">Agreement 1:' + decodeURIComponent(getCookie("contract_scenario" + (x - 1))) + '</div></td></tr>' +
                '<tr><td><div>Agreement 2:' + decodeURIComponent(getCookie("contract_scenario" + x)) + '</div></td></tr>' +
                '<tr><td><div id = "popupText" style="margin-top: 10px"> <script> var pileNumber = getCookie("scenarioPair"); if (pileNumber === "1") { $("#popupText").load("resources/data/popuptextPileA.txt", function(){ $("#leadCharPopup").append(leadChar)} ); } else { $("#popupText").load("resources/data/popuptextPileB.txt", function(){ $("#leadCharPopup").append(leadChar)} ); }  </script>  </ div > < /td></ tr > ' +
                '<tr><td><div id="slider" class="slider" style="margin-top: 15px"></div></td></tr></table>');

            popUpList.dialog({
                resizable: false,
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close").hide();
                    displaySlider("#slider");
                },
                height: 200,
                width: 650,

                modal: true,
                buttons: {
                    Proceed: function () {
                        var selectedContract = $("input[name='radio']:checked").val();
                        var handle = $('.ui-slider-handle')[0];
                        if (handle.style.display == "none") {
                            alert("Please choose slider value");
                            return false;
                        }
                        setCookie("sc" + x + "agreementSlider", $("#slider").slider("option", "value"), expiryDays);
                        //setCookie("slectedContract", selectedContract, expiryDays);
                        //setCookie("winningContract" + x, selectedContract, expiryDays);
                        $(this).dialog("close");
                        if (x == 8) {
                            $('#dynmaicform').prop('action', 'piechart2.html');
                            $('#dynmaicform').submit();
                        } else {
                            $('#dynmaicform').prop('action', 'scenario.html');
                            $('#dynmaicform').submit();
                        }
                    }
                }
            }).css("font-size", "12px");
            //wait for the popup dialoge to close
            return false;
        }
        else {
            if (x == 8) {
                $('#dynmaicform').prop('action', 'piechart2.html');
                $('#dynmaicform').submit();
            } else {
                $('#dynmaicform').prop('action', 'scenario.html');
                $('#dynmaicform').submit();
            }
        }
    }
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
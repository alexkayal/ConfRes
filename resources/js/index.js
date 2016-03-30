var cookieExpiryDays = 5; // number of days after which the cookie will be expired

$(document).ready(function () {
    setCookie("scenarioNumber", 0, cookieExpiryDays);
    setCookie("randomStrategy", 0, cookieExpiryDays);
    getIntroductionText();
    var pair = selectScenarioPair();

    video = document.getElementById("videoFrame");
    if(pair == 1){
        video.setAttribute("src", "https://www.youtube.com/embed/BfcCvUyPPOg");
    }else{
        video.setAttribute("src", "https://www.youtube.com/embed/X68WUhNzL9o");
    }

});

function selectScenarioPair(){
    var pair = Math.round(Math.random()) + 1;
    setCookie("scenarioPair", pair, cookieExpiryDays);
    return pair;
}
//get introduction text from file and fill up the container with it 
function getIntroductionText() {
    var filePath = "resources/data/index.txt";
    $.get(filePath, function (data) {
        $("#containerintro").html(data);
    }, "text");
}

function storeValues() {
    var workerID = document.getElementById("txtName").value;
    var age = document.getElementById("txtAge").value;
    var gender = radioGroupCheck(document.getElementsByName("gender"));
    var haveKids = radioGroupCheck(document.getElementsByName("kids"));
    if (!workerID) {
        alert("Please enter your worker ID");
        return false;
    }
    if (!age) {
        alert("Please enter a valid age");
        return false;
    }
    if (!gender) {
        alert("Please select your gender");
        return false;
    }
    if (!haveKids) {
        alert("Please select if you have kids");
        return false;
    }
    setCookie("workerID", workerID, cookieExpiryDays);
    setCookie("workerAge", age, cookieExpiryDays);
    setCookie("workerGender", gender, cookieExpiryDays);
    setCookie("workerKids", haveKids, cookieExpiryDays);
}

//function isInt(value) {
//    var x;
//    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
//}

function radioGroupCheck(radioGroup){

    for(var i = 0; i < radioGroup.length; i++){
            if(radioGroup[i].checked == true){
                return radioGroup[i].value;
            }
    }
    return false;
}
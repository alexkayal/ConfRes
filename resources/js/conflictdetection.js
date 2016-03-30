/**
 * Created by fawadkhan on 8/20/15.
 */

function isConflict(debtor1, action1, thirdparty1, place1, starttime1, endtime1, debtor2, action2, thirdparty2, place2, starttime2, endtime2) {
    var isConflict = false;

    var startTime1 = to24hTime(starttime1);
    var endTime1 = to24hTime(endtime1);
    var startTime2 = to24hTime(starttime2);
    var endTime2 = to24hTime(endtime2);

    if (debtor1 == debtor2 && isOpposite(action1, action2) && isthridPartyOverlap(thirdparty1, thirdparty2)) {

        if (place1 !== null && place2 !== null && place1 === place2) {
            isConflict = true;
        } else if (isTimeOverlap(starttime1, endtime1, starttime2, endtime2)) {
            isConflict = true;
        } else if ((place1 !== null && place2 == null) || (place1 == null && place2 !== null)) {
            isConflict = true;
        }
    }
    return isConflict;
}

/**
 * checks if thirdParty charaters overlaps between two scenarios.
 */
function isthridPartyOverlap(thirdparty1, thirdparty2) {
    groups = ["me", "family", "friends", "others", "everyone"];

    if(thirdparty1 == "everyone" || thirdparty2 == "everyone"){
        return true;
    }

    var thirdParty1List = [];
    var thirdParty2List = [];
    var scenario1 = getCookie("sc" + (x - 1) + "num");
    var scanrio2 = getCookie("sc" + x + "num");

    if (groups.indexOf(thirdparty1) == -1) {
        thirdParty1List.push(thirdparty1.toLowerCase());
    } else {
        thirdParty1List = thirdParty[scenario1 - 1][thirdparty1];
    }

    if (groups.indexOf(thirdparty2) == -1) {
        thirdParty2List.push(thirdparty2.toLowerCase());
    } else {
        thirdParty2List = thirdParty[scanrio2 - 1][thirdparty2];
    }

    var conflict = thirdParty1List.filter(function (value) {
        return thirdParty2List.indexOf(value) != -1
    });

    if (conflict.length > 0) {
        return true;
    }
    return false;
}

/**
 * Convert 12 hour(AM/PM) time to 24h time e.g, 10:25 PM = 20:25:00
 * @param input
 * @returns {string}
 */
function to24hTime(time12h) {
    var time24h = null;
    if (time12h && time12h != "null") {
        var matches = time12h.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
        var time24h = (parseInt(matches[1]) + (matches[3] == 'pm' && matches[1] != '12' ? 12 : 0)) + ':' + matches[2] + ':00';
    }
    return time24h;
}

function isTimeOverlap(starttime1, endtime1, starttime2, endtime2) {
    var isTimeOverlap = false;
    if (starttime1 !== null && endtime1 !== null && starttime2 !== null && endtime2 !== null) {
        if (starttime1 <= starttime2 && starttime2 <= endtime1) {
            isTimeOverlap = true;
        } else if (starttime1 <= endtime2 && endtime2 <= endtime1) {
            isTimeOverlap = true;
        } else if (starttime2 < starttime1 && endtime1 < endtime2) {
            isTimeOverlap = true;
        }
    }
    return isTimeOverlap;
}

function isOpposite(action1, action2) {
    var isOpposite = false;
    if ((action1 === "share" && action2 === "not share") || (action1 === "not share" && action2 === "share")) {
        isOpposite = true;
    }
    if ((action1 === "receive" && action2 === "not receive") || (action1 === "not receive" && action2 === "receive")) {
        isOpposite = true;
    }
    return isOpposite;
}
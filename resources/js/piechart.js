$(document).ready(function () {

    $('.pieHolder').bind('contextmenu', function (event) {
        return false;
    })

    var r = Raphael("holder");
    var circleRadius = 100;
    firstStart = 0;

    animate = function(ms) {
        var start = firstStart,
            val;
        for (i = 0; i < ii; i++) {
            val = 360 / total * data[i];
            paths[i].animate({
                segment: [200, 200, circleRadius, start, start += val]
            }, ms || 200, "<");
            paths[i].angle = start - val / 2;
        }
    }

    colors = ["#000000", "#CCCCCC", "#0000FF", "#FFFF00", "#A52A2A"];
    r.customAttributes.segment = function (x, y, r, a1, a2) {
        var flag = (a2 - a1) > 180,
            clr = colors[this.id - 1];
            //clr = (this.id * 90) / 360;
        //clr = (a2 - a1) / 360;
        a1 = (a1 % 360) * Math.PI / 180;
        a2 = (a2 % 360) * Math.PI / 180;

        return {
            path: [
                ["M", x, y],
                ["l", r * Math.cos(a1), r * Math.sin(a1)],
                ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)],
                ["z"]
            ],
            fill: clr,  // "hsb(" + clr + ", .75, .8)",
        };
    };

    //change this number to change increase the gap between max and min of random size of segments
    var segmentVariation = 15;
    createSegments();
    function createSegments(){
        numberOfSegments = 5;
        data = [];
        var sizeofSegments = 0;
        segmentsList = [];
        for (var j = 0; j < numberOfSegments; j++) {
            if(j < numberOfSegments -1){
                segmentsList[j] = generateRandomNumber(numberOfSegments);
                sizeofSegments += segmentsList[j];
            }else{
                segmentsList[numberOfSegments-1] = 360 - sizeofSegments;
            }
        }

        for(var i = 0; i < segmentsList.length; i++){
            data[i] = segmentsList[i];
        }
    }

    function generateRandomNumber(numberOfSegments){
        var maxNumber = 360/numberOfSegments + segmentVariation;
        var minNumber = 360/numberOfSegments - segmentVariation;
        rndnum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        return rndnum;
    }

    var paths = r.set(),
        total,
        start,
        bg = r.circle(200, 200, 0).attr({
            stroke: "#fff",
            "stroke-width": 5
        });


    //data = data.sort(function (a, b) {
    //    return b - a;
    //});

    total = 0;
    for (var i = 0, ii = data.length; i < ii; i++) {
        total += data[i];
    }
    start = 0;
    for (i = 0; i < ii; i++) {
        var val = 360 / total * data[i];
        (function (i, val) {
            paths.push(r.path().attr({
                segment: [200, 200, 1, start, start + val],
                stroke: "#fff"
            }).mousedown(function (event) {

                if (event.which == 1) {
                    if (data[(i + 1) % numberOfSegments] >= 10) {
                        data[i] += 5; // *= 2;
                        data[(i + 1) % numberOfSegments] -= 5;
                        if (i == (numberOfSegments -1) ) {
                            firstStart += 5;
                        }
                        animate();
                    }
                } else if (event.which == 3) {
                    if (data[i] >= 10) {
                        data[i] -= 5; // *= 2;
                        data[(i + 1) % numberOfSegments] += 5;
                        if (i == (numberOfSegments - 1)) {
                            firstStart -= 5;
                        }
                        animate();
                    }
                }

            }));
        })(i, val);
        start += val;
    }
    bg.animate({
        r: circleRadius + 1
    }, 1000, "<");
    animate(1000);

});

function resetChart(){
    data = [];
    firstStart = 0;
    for(var i = 0; i < segmentsList.length; i++){
        data.push(segmentsList[i]);
    }
    animate();
}

function submitPie(chartNumber) {
    var expiryDays = 5;
    var pieData = {Friendship: data[0], Privacy: data[1], Safety: data[2], Independence: data[3], Responsibility: data[4] };
    if(chartNumber === "chart1" ){
        $('#piecharForm').prop('action', 'scenario.html');
        setPieDataCookie("chart1Pie", JSON.stringify(pieData), expiryDays );
    }else{
        //$('#piecharForm').prop('action', 'lastPage.html');
        $('#piecharForm').prop('action', 'handle-data.php');
        setPieDataCookie("chart2Pie", JSON.stringify(pieData), expiryDays );
    }

    $('#piecharForm').submit();
}
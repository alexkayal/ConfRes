<?php
$username = "alexk";
$password = "test1234";
$hostname = "localhost";
$dbname = "j1";

//Create connection

$conn = mysqli_connect($hostname, $username, $password, $dbname) or die("Unable to connect to MySQL" . mysql_error());

// Check connection
if ($conn->connect_error) {
    echo "connection to the database failed";
    die("Connection failed: " . $conn->connect_error);
} else {
    //echo "Connected to the database";
}

function saveData($conn)
{
    $stmt = $conn->prepare("INSERT INTO confRes (workerId, workerAge, workerGender, workerKids, piechart1, sc1num, sc1sp1,  sc1sp2, sc1sp3, sc1sp4, sc1tp1, sc1tp2, qcsc1, sc1piedata, sc2num, sc2sp1, sc2sp2, sc2sp3, sc2sp4, sc2tp1, sc2tp2, qcsc2, sc2piedata, sc2agreementSlider, sc3num, sc3sp1, sc3sp2, sc3sp3, sc3sp4, sc3tp1, sc3tp2, qcsc3, sc3piedata, sc4num, sc4sp1,  sc4sp2, sc4sp3, sc4sp4, sc4tp1, sc4tp2, qcsc4, sc4piedata, sc4agreementSlider, sc5num, sc5sp1, sc5sp2, sc5sp3, sc5sp4, sc5tp1, sc5tp2, qcsc5, sc5piedata, sc6num, sc6sp1, sc6sp2, sc6sp3, sc6sp4, sc6tp1, sc6tp2, qcsc6, sc6piedata, sc6agreementSlider, sc7num, sc7sp1, sc7sp2, sc7sp3, sc7sp4, sc7tp1, sc7tp2, qcsc7, sc7piedata, sc8num, sc8sp1, sc8sp2, sc8sp3, sc8sp4, sc8tp1, sc8tp2, qcsc8, sc8piedata, sc8agreementSlider, piechart2data  )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


    $stmt->bind_param("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", $workerId, $workerAge, $workerGender, $workerKids, $piechart1, $sc1num, $sp1sc1, $sp2sc1, $sp3sc1, $sp4sc1, $tp1sc1, $tp2sc1, $qc_sc1, $piedatasc1, $sc2num, $sp1sc2, $sp2sc2, $sp3sc2, $sp4sc2, $tp1sc2, $tp2sc2, $qc_sc2, $piedatasc2, $sc2agreementSlider, $sc3num, $sp1sc3, $sp2sc3, $sp3sc3, $sp4sc3, $tp1sc3, $tp2sc3, $qc_sc3, $piedatasc3, $sc4num, $sp1sc4, $sp2sc4, $sp3sc4, $sp4sc4, $tp1sc4, $tp2sc4, $qc_sc4, $piedatasc4, $sc4agreementSlider,$sc5num, $sp1sc5, $sp2sc5, $sp3sc5, $sp4sc5, $tp1sc5, $tp2sc5, $qc_sc5, $piedatasc5, $sc6num, $sp1sc6, $sp2sc6, $sp3sc6, $sp4sc6, $tp1sc6, $tp2sc6, $qc_sc6, $piedatasc6, $sc6agreementSlider, $sc7num, $sp1sc7, $sp2sc7, $sp3sc7, $sp4sc7, $tp1sc7, $tp2sc7, $qc_sc7, $piedatasc7, $sc8num, $sp1sc8, $sp2sc8, $sp3sc8, $sp4sc8, $tp1sc8, $tp2sc8, $qc_sc8, $piedatasc8, $sc8agreementSlider, $piechart2 );

    $workerId = $_COOKIE['workerID'];
    $workerAge = $_COOKIE['workerAge'];
    $workerGender = $_COOKIE['workerGender'];
    $workerKids = $_COOKIE['workerKids'];

    $piechart1 = $_COOKIE['chart1Pie'];


    for ($x = 1; $x <= 8; $x++) {

        ${"sc" . $x . "num"} = $_COOKIE["sc" . $x . "num"]; //the random scenario number

        ${"sp1sc" . $x} = $_COOKIE["sp1_scenario" . $x];
        ${"sp2sc" . $x} = $_COOKIE["sp2_scenario" . $x];
        ${"sp3sc" . $x} = $_COOKIE["sp3_scenario" . $x];
        ${"sp4sc" . $x} = $_COOKIE["sp4_scenario" . $x];
        ${"tp1sc" . $x} = $_COOKIE["tp1_scenario" . $x];
        ${"tp2sc" . $x} = $_COOKIE["tp2_scenario" . $x];

        ${"qc_sc" . $x} = $_COOKIE["qc_scenario" . $x];

        ${"piedatasc" . $x} = $_COOKIE["sc" . $x . "piedata"];
    }

    ${"sc2agreementSlider"} = $_COOKIE["sc2agreementSlider"];
    ${"sc4agreementSlider"} = $_COOKIE["sc4agreementSlider"];
    ${"sc6agreementSlider"} = $_COOKIE["sc6agreementSlider"];
    ${"sc8agreementSlider"} = $_COOKIE["sc8agreementSlider"];

    $piechart2 = $_COOKIE['chart2Pie'];


    $stmt->execute();
    echo "Thank you for your participation. You will be compensated within 7 days. For any questions or complaints, please email a (dot) kayal (at) tudelft.nl.";
    $stmt->close();
    $conn->close();

}

saveData($conn);

?>
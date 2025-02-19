<?php
header('Content-Type: application/json');

//get shared data
require 'db_config.php';

//get range from dropdown on index.html
$range = $_GET['range'];
$sql = "";

//data range to pull data from database
switch ($range) {
    case '24hr':
        $sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 DAY";
        break;
    case 'week':
        $sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 WEEK";
        break;
    case 'month':
        $sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 MONTH";
        break;
    default:
        echo json_encode([]);
        $conn->close();
        exit;
}

//error handeler
$result = $conn->query($sql);
if ($result === false) {
    echo json_encode(['error' => 'Query failed']);
    $conn->close();
    exit;
}

//get result
$data = $result->fetch_all(MYSQLI_ASSOC);

//send code to js script
echo json_encode($data);

//close this script
$conn->close();
?>

<?php
header('Content-Type: application/json');

require 'db_config.php';

$range = $_GET['range'];
$sql = "";

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

$result = $conn->query($sql);
if ($result === false) {
    echo json_encode(['error' => 'Query failed']);
    $conn->close();
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();
?>

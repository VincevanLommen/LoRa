<?php
header('Content-Type: application/json');

$servername = "192.168.0.103";
$username = "ReadWrite";
$password = "ReadWrite";
$dbname = "LoRa";

// Maak verbinding met de database
$conn = new mysqli($servername, $username, $password, $dbname);

// Controleer de verbinding
if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

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

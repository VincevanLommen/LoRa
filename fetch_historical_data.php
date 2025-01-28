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

// Query om data van de laatste 24 uur op te halen
$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 DAY";
$result = $conn->query($sql);
$data_24hr = $result->fetch_all(MYSQLI_ASSOC);

// Query om data van de laatste week op te halen
$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 WEEK";
$result = $conn->query($sql);
$data_week = $result->fetch_all(MYSQLI_ASSOC);

// Query om data van de laatste maand op te halen
$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 MONTH";
$result = $conn->query($sql);
$data_month = $result->fetch_all(MYSQLI_ASSOC);

$response = [
    'last_24_hours' => $data_24hr,
    'last_week' => $data_week,
    'last_month' => $data_month
];

echo json_encode($response);

$conn->close();
?>

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

$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 HOUR ORDER BY Datum ASC";

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

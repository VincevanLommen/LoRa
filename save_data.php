<?php
$servername = "localhost";
$username = "LoRa";
$password = "LoRa";
$dbname = "LoRa";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$temp = $data['temperature'];
$vocht = $data['humidity'];
$regen = $data['rain'];
$grondVocht = $data['soilMoisture'];

$sql = "INSERT INTO Data (Temp, Vocht, Regen, GrondVocht) VALUES ('$temp', '$vocht', '$regen', '$grondVocht')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

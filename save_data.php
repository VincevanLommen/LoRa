<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "PHP script gestart<br>";

$servername = "192.168.0.103";  // Gebruik het IP-adres van de database
$username = "RW";  // Gebruik de inloggegevens van localhost
$password = "RW";
$dbname = "LoRa";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON decode error: " . json_last_error_msg();
} else {
    echo "Ontvangen data: " . json_encode($data) . "<br>";

    $temp = $data['temperature'];
    $vocht = $data['humidity'];
    $regen = $data['rain'];
    $grondVocht = $data['soilMoisture'];

    $sql = "INSERT INTO Data (Temp, Vocht, Regen, GrondVocht) VALUES ('$temp', '$vocht', '$regen', '$grondVocht')";

    if ($conn->query($sql) === TRUE) {
        echo "Nieuw record succesvol toegevoegd";
    } else {
        echo "Fout: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

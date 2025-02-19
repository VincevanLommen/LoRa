<?php
header('Content-Type: application/json');

// Includen van gedeelde databaseconfiguratie
require 'db_config.php';

// Ophalen van gegevens van de afgelopen uur uit de database
$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 HOUR ORDER BY Datum ASC";
$result = $conn->query($sql);

// Verwerken van het resultaat en omzetten naar JSON
if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

// Sluiten van de databaseverbinding
$conn->close();
?>

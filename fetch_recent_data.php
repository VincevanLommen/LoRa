<?php
header('Content-Type: application/json');

require 'db_config.php';

$sql = "SELECT * FROM `LoRa` WHERE Datum >= NOW() - INTERVAL 1 HOUR ORDER BY Datum ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

$conn->close();
?>

<?php
$servername = "192.168.0.103"; //ip for database
$username = "ReadWrite";       //username databae
$password = "ReadWrite";       //password database
$dbname = "LoRa";              //tbl name database

// Maak verbinding met de database
$conn = new mysqli($servername, $username, $password, $dbname);

// Controleer de verbinding
if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}
?>
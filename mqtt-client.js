document.addEventListener("DOMContentLoaded", function() {
    // Connect to MQTT broker
    const client = mqtt.connect('ws://192.168.0.103:9001');

    let lastTemp = 'N/A';
    let lastHumidity = 'N/A';
    let lastSoilMoisture = 'N/A';
    let lastRain = 'N/A';

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('LoRa/readings');
    });

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        // Update HTML elements with the received data
        if (data.temperature !== undefined) {
            lastTemp = data.temperature;
        }
        document.getElementById('temp-value').textContent = lastTemp;

        if (data.humidity !== undefined) {
            lastHumidity = data.humidity;
        }
        document.getElementById('humidity-value').textContent = lastHumidity;

        if (data.soilMoisture !== undefined) {
            lastSoilMoisture = data.soilMoisture;
        }
        document.getElementById('soil-moisture-value').textContent = lastSoilMoisture;

        if (data.rain !== undefined) {
            lastRain = data.rain;
        }
        document.getElementById('rain-value').textContent = lastRain;

        // Send data to PHP script to save in database
        fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
        .then(result => console.log('Data saved:', result))
        .catch(error => console.error('Error saving data:', error));
    });
});

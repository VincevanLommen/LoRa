document.addEventListener("DOMContentLoaded", function() {
    // Connect to MQTT broker
    const client = mqtt.connect('ws://192.168.0.103:9001');

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('LoRa/readings');
    });

    const tempData = [];
    const humidityData = [];
    const soilMoistureData = [];
    const labels = ['Temperatuur', 'Luchtvochtigheid', 'Grondvochtigheid'];
    let radarChart;

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        // Update the displayed values
        if (document.getElementById('temp-value')) {
            document.getElementById('temp-value').textContent = data.temperature !== undefined ? data.temperature : 'N/A';
        }
        if (document.getElementById('humidity-value')) {
            document.getElementById('humidity-value').textContent = data.humidity !== undefined ? data.humidity : 'N/A';
        }
        if (document.getElementById('soil-moisture-value')) {
            document.getElementById('soil-moisture-value').textContent = data.soilMoisture !== undefined ? data.soilMoisture : 'N/A';
        }
        if (document.getElementById('rain-value')) {
            document.getElementById('rain-value').textContent = data.rain !== undefined ? data.rain : 'N/A';
        }

        // Save the data to the server
        fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.text())
        .then(result => console.log('Data saved:', result))
        .catch(error => console.error('Error saving data:', error));
    });
});

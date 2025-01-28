document.addEventListener("DOMContentLoaded", function() {
    // Connect to MQTT broker
    const client = mqtt.connect('ws://192.168.0.103:9001');

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('LoRa/readings');
    });

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        // Update HTML elements with the received data
        document.getElementById('temp-value').textContent = data.temperature !== undefined ? data.temperature : 'N/A';
        document.getElementById('humidity-value').textContent = data.humidity !== undefined ? data.humidity : 'N/A';
        document.getElementById('soil-moisture-value').textContent = data.soilMoisture !== undefined ? data.soilMoisture : 'N/A';
    });
});

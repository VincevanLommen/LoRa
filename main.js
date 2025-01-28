document.addEventListener("DOMContentLoaded", function() {
    // Real-time MQTT data
    const client = mqtt.connect('ws://192.168.0.103:9001');

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('LoRa/readings');
    });

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        document.getElementById('temp-value').textContent = data.temperature;
        document.getElementById('humidity-value').textContent = data.humidity;
        document.getElementById('soil-moisture-value').textContent = data.soilMoisture;
    });

    // Historical data visualization
    fetch('/api/historical-data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('historical-graphs').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.timestamps,
                    datasets: [{
                        label: 'Temperatuur',
                        data: data.temperature,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Luchtvochtigheid',
                        data: data.humidity,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Grondvochtigheid',
                        data: data.soilMoisture,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching historical data:', error));
});

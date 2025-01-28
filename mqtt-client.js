document.addEventListener("DOMContentLoaded", function() {
    // Connect to MQTT broker
    const client = mqtt.connect('ws://192.168.0.103:9001');

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('LoRa/readings');
    });

    let temperatureData = [];
    let humidityData = [];
    let soilMoistureData = [];

    const temperatureChartCtx = document.getElementById('temperatureChart').getContext('2d');
    const humidityChartCtx = document.getElementById('humidityChart').getContext('2d');
    const soilMoistureChartCtx = document.getElementById('soilMoistureChart').getContext('2d');

    const temperatureChart = new Chart(temperatureChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperatuur',
                data: temperatureData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const humidityChart = new Chart(humidityChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Luchtvochtigheid',
                data: humidityData,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const soilMoistureChart = new Chart(soilMoistureChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Grondvochtigheid',
                data: soilMoistureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        // Update HTML elements with the received data
        document.getElementById('temp-value').textContent = data.temperature !== undefined ? data.temperature : 'N/A';
        document.getElementById('humidity-value').textContent = data.humidity !== undefined ? data.humidity : 'N/A';
        document.getElementById('soil-moisture-value').textContent = data.soilMoisture !== undefined ? data.soilMoisture : 'N/A';

        // Update chart data
        const now = new Date();

        temperatureChart.data.labels.push(now);
        temperatureChart.data.datasets[0].data.push(data.temperature);
        temperatureChart.update();

        humidityChart.data.labels.push(now);
        humidityChart.data.datasets[0].data.push(data.humidity);
        humidityChart.update();

        soilMoistureChart.data.labels.push(now);
        soilMoistureChart.data.datasets[0].data.push(data.soilMoisture);
        soilMoistureChart.update();
    });
});

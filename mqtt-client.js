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
    const labels = [];
    let temperatureChart, humidityChart, soilMoistureChart, extraChart;

    function initializeCharts() {
        const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');
        const humidityCanvas = document.getElementById('humidityChart').getContext('2d');
        const soilMoistureCanvas = document.getElementById('soilMoistureChart').getContext('2d');
        const extraCanvas = document.getElementById('extraChart').getContext('2d');

        temperatureChart = new Chart(temperatureCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatuur',
                    data: tempData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { type: 'time', time: { unit: 'minute' } },
                    y: { beginAtZero: true }
                }
            }
        });

        humidityChart = new Chart(humidityCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Luchtvochtigheid',
                    data: humidityData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { type: 'time', time: { unit: 'minute' } },
                    y: { beginAtZero: true }
                }
            }
        });

        soilMoistureChart = new Chart(soilMoistureCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Grondvochtigheid',
                    data: soilMoistureData,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { type: 'time', time: { unit: 'minute' } },
                    y: { beginAtZero: true }
                }
            }
        });

        extraChart = new Chart(extraCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Extra Data',
                    data: tempData,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { type: 'time', time: { unit: 'minute' } },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    client.on('message', function(topic, message) {
        const data = JSON.parse(message.toString());
        console.log('Message arrived:', data);

        const currentTime = new Date().toLocaleTimeString();

        labels.push(currentTime);
        tempData.push(data.temperature);
        humidityData.push(data.humidity);
        soilMoistureData.push(data.soilMoisture);

        if (labels.length > 30) {
            labels.shift();
            tempData.shift();
            humidityData.shift();
            soilMoistureData.shift();
        }

        temperatureChart.update();
        humidityChart.update();
        soilMoistureChart.update();
        extraChart.update();

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

        fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.text())
        .then(result => console.log('Data saved:', result))
        .catch(error => console.error('Error saving data:', error));
    });

    initializeCharts();

});

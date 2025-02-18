/*
# ----------------------------------------------------------------------------
# MQTT Client Script
# 
# Vince Van Lommen
# 2025
# 
# Beschrijving:
# Dit script maakt verbinding met een MQTT-broker en toont sensor
# data in verschillende grafieken.
#
# De broker verwacht data te ontvangen in het formaat {"temperature": x, "humidity": y, "rain": z, "soilMoisture": q}
#
# Functies:
# - Verbinding maken met de MQTT-broker
# - Abonneren op het LoRa readings-topic
# - Sensor data tonen in grafieken
# ----------------------------------------------------------------------------
*/

// Variables for MQTT broker and topic
const brokerUrl = 'ws://192.168.0.103:9001'; //IP van broker
const topic = 'LoRa/readings'; //Topic van broker

document.addEventListener("DOMContentLoaded", function() {
    // Connect to MQTT broker
    const client = mqtt.connect(brokerUrl);

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe(topic);
    });

    const tempData = [];
    const humidityData = [];
    const soilMoistureData = [];
    const rainData = [];
    const labels = [];

    let temperatureChart, humidityChart, soilMoistureChart, rainChart;

    function initializeCharts() {
        const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');
        const humidityCanvas = document.getElementById('humidityChart').getContext('2d');
        const soilMoistureCanvas = document.getElementById('soilMoistureChart').getContext('2d');
        const rainCanvas = document.getElementById('rainChart').getContext('2d');

        temperatureChart = new Chart(temperatureCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatuur',
                    data: tempData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: false
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

        humidityChart = new Chart(humidityCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Luchtvochtigheid',
                    data: humidityData,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
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

        soilMoistureChart = new Chart(soilMoistureCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Grondvochtigheid',
                    data: soilMoistureData,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1,
                    fill: false
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

        rainChart = new Chart(rainCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Regen',
                    data: rainData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                    fill: false
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
    }

    function fetchRecentData() {
        fetch('fetch_recent_data.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(entry => {
                    labels.push(new Date(entry.Datum));
                    tempData.push(entry.Temp);
                    humidityData.push(entry.Vocht);
                    soilMoistureData.push(entry.GrondVocht);
                    rainData.push(entry.Regen);
                });
                temperatureChart.update();
                humidityChart.update();
                soilMoistureChart.update();
                rainChart.update();
            })
            .catch(error => console.error('Error fetching recent data:', error));
    }

    client.on('message', function(topic, message) {
        let data;
        try {
            data = JSON.parse(message.toString());

            // Validate received data
            if (
                typeof data.temperature === 'number' &&
                typeof data.humidity === 'number' &&
                typeof data.soilMoisture === 'number' &&
                typeof data.rain === 'number' &&
                data.humidity >= 0 && data.humidity <= 100 &&
                data.soilMoisture >= 0 && data.soilMoisture <= 100 &&
                data.rain >= 0
            ) {
                console.log('Message arrived:', data);

                const currentTime = new Date();

                labels.push(currentTime);
                tempData.push(data.temperature);
                humidityData.push(data.humidity);
                soilMoistureData.push(data.soilMoisture);
                rainData.push(data.rain);

                if (labels.length > 30) {
                    labels.shift();
                    tempData.shift();
                    humidityData.shift();
                    soilMoistureData.shift();
                    rainData.shift();
                }

                temperatureChart.update();
                humidityChart.update();
                soilMoistureChart.update();
                rainChart.update();

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
            } else {
                console.error('Invalid data format or values out of range:', data);
            }
        } catch (e) {
            console.error('Invalid JSON:', message.toString());
            // Ignore invalid JSON data
        }
    });

    initializeCharts();
    fetchRecentData();
});

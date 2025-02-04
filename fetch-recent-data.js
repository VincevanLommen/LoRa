document.addEventListener("DOMContentLoaded", function() {
    const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');
    const humidityCanvas = document.getElementById('humidityChart').getContext('2d');
    const soilMoistureCanvas = document.getElementById('soilMoistureChart').getContext('2d');
    const extraCanvas = document.getElementById('extraChart').getContext('2d');

    let temperatureChart = new Chart(temperatureCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperatuur',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let humidityChart = new Chart(humidityCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Luchtvochtigheid',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let soilMoistureChart = new Chart(soilMoistureCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Grondvochtigheid',
                data: [],
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let extraChart = new Chart(extraCanvas, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Extra Data',
                data: [],
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
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function fetchDataAndUpdateCharts() {
        fetch('fetch_recent_data.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                const labels = data.map(entry => entry.Datum);
                const tempData = data.map(entry => entry.Temp);
                const humidityData = data.map(entry => entry.Vocht);
                const soilMoistureData = data.map(entry => entry.GrondVocht);

                // Update charts with new data
                temperatureChart.data.labels = labels;
                temperatureChart.data.datasets[0].data = tempData;
                temperatureChart.update();

                humidityChart.data.labels = labels;
                humidityChart.data.datasets[0].data = humidityData;
                humidityChart.update();

                soilMoistureChart.data.labels = labels;
                soilMoistureChart.data.datasets[0].data = soilMoistureData;
                soilMoistureChart.update();

                extraChart.data.labels = labels;
                extraChart.data.datasets[0].data = tempData;
                extraChart.update();
            })
            .catch(error => console.error('Error fetching recent data:', error));
    }

    fetchDataAndUpdateCharts();
    setInterval(fetchDataAndUpdateCharts, 60000); // Fetch data every minute
});

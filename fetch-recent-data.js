document.addEventListener("DOMContentLoaded", function() {
    const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');
    const humidityCanvas = document.getElementById('humidityChart').getContext('2d');
    const soilMoistureCanvas = document.getElementById('soilMoistureChart').getContext('2d');
    const extraCanvas = document.getElementById('extraChart').getContext('2d');

    function createChart(canvas, label, data) {
        return new Chart(canvas, {
            type: 'line',
            data: {
                labels: data.map(entry => entry.Datum),
                datasets: [{
                    label: label,
                    data: data.map(entry => entry.Temp),
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
    }

    function fetchDataAndCreateCharts() {
        fetch('fetch_recent_data.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                createChart(temperatureCanvas, 'Temperatuur', data);
                createChart(humidityCanvas, 'Luchtvochtigheid', data);
                createChart(soilMoistureCanvas, 'Grondvochtigheid', data);

                // Extra chart example
                new Chart(extraCanvas, {
                    type: 'bar',
                    data: {
                        labels: data.map(entry => entry.Datum),
                        datasets: [{
                            label: 'Extra Data',
                            data: data.map(entry => entry.Temp),
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
            })
            .catch(error => console.error('Error fetching recent data:', error));
    }

    fetchDataAndCreateCharts();
    setInterval(fetchDataAndCreateCharts, 1000); // Fetch data every minute
});

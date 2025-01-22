document.addEventListener("DOMContentLoaded", function() {
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

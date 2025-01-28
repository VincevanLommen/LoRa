document.addEventListener("DOMContentLoaded", function() {
    fetch('fetch_historical_data.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Grafieken maken
            createChart('chart-24hr', data.last_24_hours, 'Laatste 24 uur');
            createChart('chart-week', data.last_week, 'Actuele Week');
            createChart('chart-month', data.last_month, 'Actuele Maand');
        })
        .catch(error => console.error('Error fetching historical data:', error));
});

function createChart(canvasId, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const labels = data.map(entry => entry.Datum);
    const tempData = data.map(entry => entry.Temp);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: tempData,
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

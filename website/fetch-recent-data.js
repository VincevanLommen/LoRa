/*
# ----------------------------------------------------------------------------
# Fetch Recent Data Script
# 
# Vince Van Lommen
# 2025
# 
# Beschrijving:
# Dit script haalt recente sensorgegevens op van de server en visualiseert
# deze in grafieken op de webpagina. Het maakt gebruik van fetch-aanvragen
# om gegevens op te halen en Chart.js om deze gegevens in grafieken weer te geven.
#
# Functies:
# - Ophalen van recente sensorgegevens via fetch-aanvragen
# - Visualiseren van sensorgegevens in verschillende grafieken
# ----------------------------------------------------------------------------
*/


document.addEventListener("DOMContentLoaded", function() {
    const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');
    const humidityCanvas = document.getElementById('humidityChart').getContext('2d');
    const soilMoistureCanvas = document.getElementById('soilMoistureChart').getContext('2d');
    const extraCanvas = document.getElementById('extraChart').getContext('2d');
    let chart;

    function fetchDataAndCreateCharts() {
        console.log(`Fetching data`);
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

                if (chart) {
                    chart.destroy();
                }

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

    // Fetch and display data for the default selected range on page load
    fetchDataAndCreateCharts(dataRangeSelect.value);
});
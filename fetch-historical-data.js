/*
# ----------------------------------------------------------------------------
# Fetch Historical Data Script
# 
# Vince Van Lommen
# 2025
# 
# Beschrijving:
# Dit script haalt historische sensorgegevens op van de server en visualiseert
# deze in een grafiek op de webpagina. Het maakt gebruik van fetch-aanvragen
# om gegevens op te halen en Chart.js om deze gegevens in een lijn grafiek weer te geven.
#
# Functies:
# - Ophalen van historische sensorgegevens via fetch-aanvragen
# - Visualiseren van sensorgegevens in een lijn grafiek
# - Dynamisch bijwerken van grafieken op basis van de geselecteerde tijdsperiode
# ----------------------------------------------------------------------------
*/


document.addEventListener("DOMContentLoaded", function() {
    const dataRangeSelect = document.getElementById('data-range');
    const canvas = document.getElementById('chart').getContext('2d');
    let chart;

    function fetchDataAndCreateChart(range) {
        console.log(`Fetching data for range: ${range}`);
        fetch(`fetch_historical_data.php?range=${range}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Data received for range ${range}:`, data);
                const labels = data.map(entry => entry.Datum);
                const tempData = data.map(entry => entry.Temp);

                if (chart) {
                    chart.destroy();
                }

                chart = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: `Data Range: ${range}`,
                            data: tempData,
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: range === '24hr' ? 'hour' : 'day'
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
    }

    dataRangeSelect.addEventListener('change', function() {
        const selectedRange = dataRangeSelect.value;
        fetchDataAndCreateChart(selectedRange);
    });

    // Fetch and display data for the default selected range on page load
    fetchDataAndCreateChart(dataRangeSelect.value);
});
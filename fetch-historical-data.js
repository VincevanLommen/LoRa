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

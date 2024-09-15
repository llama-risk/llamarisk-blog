(function() {
    function createDebtChart() {
        fetch('../../js/gho-users/peg_series.json')
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('linechart-peg').getContext('2d');

                const chartData = Object.entries(data).map(([timestamp, value]) => ({
                    x: new Date(parseInt(timestamp) * 1000),
                    y: value
                }));

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'GHO Peg Over Time',
                            data: chartData,
                            fill: true,
                            backgroundColor: 'rgba(255,206, 86, 0.2)',
                            borderColor: 'rgba(255,206, 86, 1)',
                            tension: 0.1,
                            pointRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {

                            title: {
                                display: true,
                                text: 'GHO USD Price',
                                font: {
                                    size: 16
                                },
                                padding: {
                                    top: 10,
                                    bottom: 20
                                }
                            },
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    title: function(context) {
                                        const date = new Date(context[0].parsed.x);
                                        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'month',
                                    displayFormats: {
                                        month: 'MMM yy'
                                    }
                                },
                                ticks: {
                                    maxTicksLimit: 12
                                }
                            },
                            y: {
                                beginAtZero: false,
                                ticks: {
                                    callback: function(value, index, values) {
                                        return '$' + (value.toFixed(2));
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading the debt data:', error));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createDebtChart);
    } else {
        createDebtChart();
    }
})();
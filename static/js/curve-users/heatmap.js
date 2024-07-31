
const chainData = {
    all: [
        [100.0, 26.139088729016784, 64.5083932853717, 48.201438848920866, 14.388489208633093, 8.393285371702639],
        [0.32123069668749266, 100.0, 31.807733113285398, 15.763880702581634, 0.8693858304844985, 0.5393139219615702],
        [0.6620723603248831, 26.564115185823283, 100.0, 25.175978341127248, 0.9771105094757568, 0.7432931331528427],
        [0.3164258052328327, 8.420704637763295, 16.103082396649977, 100.0, 0.942980384748591, 0.7005446931771669],
        [2.225519287833828, 10.942136498516321, 14.725519287833826, 22.218100890207715, 100.0, 5.0816023738872405],
        [4.45859872611465, 23.312101910828027, 38.47133757961784, 56.68789808917197, 17.452229299363058, 100.0]
    ],
    base: [
        [100.0, 26.139088729016784, 64.5083932853717, 48.201438848920866, 14.388489208633093, 8.393285371702639],
        [0.32123069668749266, 100.0, 31.807733113285398, 15.763880702581634, 0.8693858304844985, 0.5393139219615702],
        [0.6620723603248831, 26.564115185823283, 100.0, 25.175978341127248, 0.9771105094757568, 0.7432931331528427],
        [0.3164258052328327, 8.420704637763295, 16.103082396649977, 100.0, 0.942980384748591, 0.7005446931771669],
        [2.225519287833828, 10.942136498516321, 14.725519287833826, 22.218100890207715, 100.0, 5.0816023738872405],
        [4.45859872611465, 23.312101910828027, 38.47133757961784, 56.68789808917197, 17.452229299363058, 100.0]
    ],
    arbitrum: [
        [100.0, 26.139088729016784, 64.5083932853717, 48.201438848920866, 14.388489208633093, 8.393285371702639],
        [0.32123069668749266, 100.0, 31.807733113285398, 15.763880702581634, 0.8693858304844985, 0.5393139219615702],
        [0.6620723603248831, 26.564115185823283, 100.0, 25.175978341127248, 0.9771105094757568, 0.7432931331528427],
        [0.3164258052328327, 8.420704637763295, 16.103082396649977, 100.0, 0.942980384748591, 0.7005446931771669],
        [2.225519287833828, 10.942136498516321, 14.725519287833826, 22.218100890207715, 100.0, 5.0816023738872405],
        [4.45859872611465, 23.312101910828027, 38.47133757961784, 56.68789808917197, 17.452229299363058, 100.0]
    ],
    ethereum: [
        [100.0, 86.139088729016784, 64.5083932853717, 48.201438848920866, 14.388489208633093, 8.393285371702639],
        [0.32123069668749266, 100.0, 31.807733113285398, 15.763880702581634, 0.8693858304844985, 0.5393139219615702],
        [90.6620723603248831, 86.564115185823283, 100.0, 25.175978341127248, 0.9771105094757568, 0.7432931331528427],
        [90.3164258052328327, 98.420704637763295, 16.103082396649977, 100.0, 0.942980384748591, 0.7005446931771669],
        [2.225519287833828, 90.942136498516321, 14.725519287833826, 22.218100890207715, 100.0, 5.0816023738872405],
        [4.45859872611465, 93.312101910828027, 38.47133757961784, 56.68789808917197, 17.452229299363058, 100.0]
    ],
};

let chart;

function createHeatmap(data) {
    const seriesData = data.flatMap((row, i) =>
        row.map((value, j) => ({
            x: labels[j],
            y: value.toFixed(2)
        }))
    );

    const options = {
        series: labels.map((label, index) => ({
            name: label,
            data: seriesData.slice(index * labels.length, (index + 1) * labels.length)
        })),
        chart: {
            height: 450,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#222']
            },
            formatter: function (value, {seriesIndex, dataPointIndex, w}) {
                return value + '%';
            }
        },
        colors: ["#008FFB"],
        title: {
            text: 'Overlap Between Users of Curve Products (%)'
        },
        xaxis: {
            type: 'category',
            categories: labels,
            tooltip: {
                enabled: false
            }
        },
        tooltip: {
            y: {
                formatter: function (value, {seriesIndex, dataPointIndex, w}) {
                    let x = w.config.xaxis.categories[dataPointIndex];
                    let y = w.config.series[seriesIndex].name;
                    return `${value}% of ${y} users also use ${x}`;
                },
                title: {
                    formatter: () => ''
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    chart = new ApexCharts(document.querySelector("#heatmapChart"), options);
    chart.render();
}

function transposeData(data) {
    return data[0].map((_, colIndex) => data.map(row => row[colIndex]));
}


function updateHeatMapChart(selectedChain) {
    createHeatmap(chainData[selectedChain]);
}

document.addEventListener('DOMContentLoaded', () => {
    const initialChainHeatmap = createChainSelector('chainSelectHeatmap', updateHeatMapChart);
    if (initialChainHeatmap) {
        updateHeatMapChart(initialChainHeatmap);
    } else {
        console.error('Failed to initialize chain selector');
    }
});

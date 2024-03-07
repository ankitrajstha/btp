let myChart;

document.addEventListener("DOMContentLoaded", function () {
    renderChart()
})

renderChart = () => {
    const selectedChartType = document.querySelector('#chart-type').value;

    if (myChart) {
        myChart.destroy();
    }

    var chartSeries = [15,6, 25, 30, 9, 15]

    var chartLegend = {
        fontSize: '10px',
        fontFamily: "Poppins",
        offsetX: -8,
        offsetY: 15,
        itemMargin: {
            vertical: -1
        },
        markers: {
            width: 14,
            height: 14,
            offsetX: -5,
            offsetY: 3
        }
    }

    if (selectedChartType == 'bar') {
        chartSeries = [
            {
                name: "Count", // Series name
                data: chartSeries // Series data
            }
        ]
    }

    var taskTypeChart = {
        chart: {
            width: "100%",
            height: "192px",
            type: selectedChartType,
        },
        plotOptions: {
            pie: {
                offsetX: -65,
                offsetY: 5,
                customScale: 0.9,
            }
        },
        legend: chartLegend,
        series: chartSeries,
        labels: ['Bug Leakage', 'Task', 'Sub Task', 'Task Maintenance', 'Bug', 'Epic' ],

        xaxis: {
            categories: ['BL', 'Task', 'ST', 'TM', 'Bug', 'Epic' ], // X-axis labels
            labels: {
                style: {
                    fontSize: '12px', // Adjust label font size if needed
                    fontFamily: 'Poppins', // Adjust label font family if needed
                }
            }
        },
        tooltip: {
            enabled: true,
            x: {
                formatter: function (val) {
                    if (val === "ST") {
                        return "Sub Task";
                    } else if (val === "TM") {
                        return "Task Maintenance";
                    } else if (val === "BL") {
                        return "Bug Leakage";
                    }
                    return val;
                }
            }
        }
    }

    myChart = new ApexCharts(document.querySelector("#taskTypeChart"), taskTypeChart);
    myChart.render();
}
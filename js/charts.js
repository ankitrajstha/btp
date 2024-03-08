const getChartConfig = (chartType, data, labels) => {
    // Initial configuration for all charts
    const chartConfig = {
        chart: {
            width: "100%",
            height: "192px",
            type: chartType,
        },
        legend: {
            fontSize: '10px',
            fontFamily: "Poppins",
            offsetX: -8,
            offsetY: 15,
            itemMargin: {
                vertical: -1,
            },
            markers: {
                width: 14,
                height: 14,
                offsetX: -5,
                offsetY: 3,
            },
        },
        series: chartType === 'bar' ? [{ name: "Data", data }] : data
    };

    // Chart configuration for pie chart, outlined and filled
    if (chartType !== 'bar') {
        chartConfig['plotOptions'] = {
            pie: {
                offsetX: -65,
                offsetY: 5,
                customScale: 0.9,
            }
        }
        chartConfig['labels'] = labels
    }

    // Addtional chart configuration for bar chart
    if (chartType === 'bar') {
        // Shorten labels for bar chart by taking the initals of long words
        var newLabels = {}
        labels.forEach(label => {
            if (label.length > 5) {
                var intitals = ''
                label.split(' ').forEach(word => {
                    intitals += word[0]
                })
                newLabels[intitals] = label
            } else {
                newLabels[label] = label
            }
        });
        labels = Object.keys(newLabels);
        // X-axis labels for bar charts with custom styling
        chartConfig['xaxis'] = {
            categories: labels,
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                },
            },
        };
        // Mapping shortened labels to display their fullforms when hover
        chartConfig['tooltip'] = {
            enabled: true,
            x: {
                formatter: (val) => {
                    return newLabels[val] || val;
                },
            },
        };
    }
    return chartConfig;
};

const renderChart = (container, chartConfig) => {
    const chart = new ApexCharts(container, chartConfig);
    chart.render();
    return chart;
};

const updateChart = (myChart, chartContainer, chartType, data, labels) => {
    if (myChart) {
        myChart.destroy();
    }
    const chartConfig = getChartConfig(chartType, data, labels);
    myChart = renderChart(chartContainer, chartConfig);
    return myChart
};

document.addEventListener("DOMContentLoaded", () => {
    // Apex chart objects
    let taskTypeChart;

    // Chart containers
    let taskTypeContainer = document.querySelector("#taskTypeChart");

    // Selected chart type
    const selectedChartType = document.querySelector('#chart-type-1');

    // Chart data
    // Task type chart data
    const taskTypeData = [15, 6, 25, 30, 9, 15]; // Replace with actual data from API later
    const taskTypelabels = ['Bug Leakage', 'Task', 'Sub Task', 'Task Maintenance', 'Bug', 'Epic']; // Replace with actual data from API later

    // Change graphs when another option is selected
    taskTypeChart = selectedChartType.addEventListener('change', function () {
        updateChart(taskTypeChart, taskTypeContainer, selectedChartType.value, taskTypeData, taskTypelabels);
    });

    // Intial chart render
    taskTypeChart = updateChart(taskTypeChart, taskTypeContainer, selectedChartType.value, taskTypeData, taskTypelabels);
});
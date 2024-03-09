const getChartConfig = (chartType, data, labels, inModal) => {
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
    
    if (inModal && chartType !== 'bar') {
        chartConfig.chart.height = '100%'
        chartConfig.plotOptions.pie.customScale = 0.85
        chartConfig.plotOptions.pie.offsetX = -60
        chartConfig.legend.itemMargin.vertical = 2.5
        chartConfig.legend.offsetY = 30
    }
    if (inModal && chartType === 'bar') {
        chartConfig.chart.height = '90%'
    }
    return chartConfig;
};

const renderChart = (container, chartConfig) => {
    const chart = new ApexCharts(container, chartConfig);
    chart.render();
    return chart;
};

const updateChart = (myChart, chartContainer, chartType, data, labels, inModal) => {
    if (myChart) {
        myChart.destroy();
    }
    const chartConfig = getChartConfig(chartType, data, labels, inModal);
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
    selectedChartType.addEventListener('change', function () {
        taskTypeChart = updateChart(taskTypeChart, taskTypeContainer, selectedChartType.value, taskTypeData, taskTypelabels, false);
    });

    // Intial chart render
    taskTypeChart = updateChart(taskTypeChart, taskTypeContainer, selectedChartType.value, taskTypeData, taskTypelabels, false);

    // Charts inside modal 
    // Modal apex chart objects
    let taskTypeModalChart;

    // Get modal open button and handle event
    const openModalButton = document.getElementById("openTaskTypeModal");
    openModalButton.addEventListener('click', () => {
        openModal(taskTypeModalChart, 'taskTypeModal', 'taskTypeModalChart', selectedChartType.value, taskTypeData, taskTypelabels);
    });
});

// Modal 
const openModal = (myChart, modalId, chartModalContainerId, chartType, data, labels) => {
    const modal = document.getElementById(modalId);
    const chartContainer = document.getElementById(chartModalContainerId);
    myChart = updateChart(myChart, chartContainer, chartType, data, labels, true);

    // Display modal
    modal.style.display = "block";

    // Add event listener for chart type selector inside modal
    const chartTypeSelector = modal.querySelector('select');
    chartTypeSelector.addEventListener('change', () => {
        myChart = updateChart(myChart, chartContainer, chartTypeSelector.value, data, labels, true);
    });

    // Add event listener for closing the modal
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
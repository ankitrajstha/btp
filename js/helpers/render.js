const renderChart = (container, chartConfig) => {
    const chart = new ApexCharts(container, chartConfig);
    chart.render();
    return chart;
};

const updateChart = (
    myChart,
    chartContainer,
    chartConfig
) => {
    if (myChart) {
        myChart.destroy();
    }

    myChart = renderChart(chartContainer, chartConfig);
    return myChart;
};

export default updateChart;
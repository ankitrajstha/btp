import getChartConfig from "./chartConfig.js";

const renderChart = (container, chartConfig) => {
    const chart = new ApexCharts(container, chartConfig);
    chart.render();
    return chart;
};

const updateChart = (
    myChart,
    chartContainer,
    chartType,
    data,
    labels,
    inModal
) => {
    if (myChart) {
        myChart.destroy();
    }
    const chartConfig = getChartConfig(chartType, data, labels, inModal);
    myChart = renderChart(chartContainer, chartConfig);
    return myChart;
};

export default updateChart;
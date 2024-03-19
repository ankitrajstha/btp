import createRadialBarChart from "./chartConfig.js";

const renderRadialBarChart = (containerId, data) => {
  const chartContainer = document.getElementById(containerId);
  const chartConfig = createRadialBarChart(data);

  const radialBarChart = new ApexCharts(chartContainer, chartConfig);
  radialBarChart.render();
  
  return radialBarChart
}

export default renderRadialBarChart;
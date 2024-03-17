import renderTaskTypeChart from "./charts/taskType/renderTaskTypeChart.js";
import rederTaskStatusChart from "./charts/taskStatus/renderTaskStatusChart.js"
import renderStoryPoints from "./charts/storyPoints/renderStoryPointsChart.js"
import renderLogHours from "./charts/logHours/renderLogHoursChart.js"
import renderClientData from "./charts/clientData/renderClientDataChart.js"
import {
  taskTypeData, taskTypelabels, taskStatusData,
  taskStatusLabels, storyPointsData, storyPointsLabels,
  logHoursData, logHoursLabels, clientDataData, clientDataLabels
} from "./static/apiData.js"

const createRadialBarChart = (elementId, series) => {
  const chartElement = document.getElementById(elementId);
  function radialBarColor(series) {
    if (series > 30 && series < 60) {
      return "#E9E906";
    } else if (series < 30 && series > 10) {
      return "#CC3333";
    } else if (series < 10 && series > 0) {
      return "#2F4858";
    } else if (series > 60 && series < 100) {
      return "#00ff00";
    }
  }
  const radialBarColorSelected = radialBarColor(series);
  const options = {
    height: 20,
    series: [series],
    colors: [radialBarColorSelected],
    chart: {
      type: "radialBar",
      offsetY: -8,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "40%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontFamily: "Poppins",
            fontWeight: 600,
            offsetY: -2,
            fontSize: "14px",
          },
        },
      },
    },
  };

  const radialBarChart = new ApexCharts(chartElement, options);
  radialBarChart.render();
};

document.addEventListener("DOMContentLoaded", () => {
  // Intial chart render
  renderTaskTypeChart(taskTypeData, taskTypelabels);
  rederTaskStatusChart(taskStatusData, taskStatusLabels);
  renderStoryPoints(storyPointsData, storyPointsLabels);
  renderLogHours(logHoursData, logHoursLabels);
  renderClientData(clientDataData,clientDataLabels);
  // //radial chart render
  createRadialBarChart("chart", 20);
  createRadialBarChart("chart2", 80);
});
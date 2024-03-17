import renderTaskTypeChart from "./charts/taskType/renderTaskTypeChart.js";
import renderTaskStatusChart from "./charts/taskStatus/renderTaskStatusChart.js";
import renderStoryPointsChart from "./charts/storyPoints/renderStoryPointsChart.js";
import renderLogHoursChart from "./charts/logHours/renderLogHoursChart.js";
import renderClientDataChart from "./charts/clientData/renderClientDataChart.js";
import renderRadialBarChart from "./charts/radialBarChart/renderRadialBarChart.js";

import getData from "./static/apiData.js";
import {
  taskTypeData, taskTypelabels, taskStatusData,
  taskStatusLabels, storyPointsData, storyPointsLabels,
  logHoursData, logHoursLabels, clientDataData, clientDataLabels
} from "./static/apiData.js"


document.addEventListener("DOMContentLoaded", () => {

  getData().then(data => {

    const {
      clientSatisfaction, teamMorale,
      taskTypeData, taskTypelabels, taskStatusData,
      taskStatusLabels, storyPointsData, storyPointsLabels,
      logHoursData, logHoursLabels, clientDataData, clientDataLabels
    } = data;

    // Intial chart render
    renderTaskTypeChart(taskTypeData, taskTypelabels);
    renderTaskStatusChart(taskStatusData, taskStatusLabels);
    renderStoryPointsChart(storyPointsData, storyPointsLabels);
    renderLogHoursChart(logHoursData, logHoursLabels);
    renderClientDataChart(clientDataData, clientDataLabels);

    // Radial chart render
    renderRadialBarChart('chart', clientSatisfaction);
    renderRadialBarChart('chart2', teamMorale);

  });
});
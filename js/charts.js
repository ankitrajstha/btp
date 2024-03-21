import renderTaskTypeChart from "./charts/taskType/renderTaskTypeChart.js";
import renderTaskStatusChart from "./charts/taskStatus/renderTaskStatusChart.js";
import renderStoryPointsChart from "./charts/storyPoints/renderStoryPointsChart.js";
import renderLogHoursChart from "./charts/logHours/renderLogHoursChart.js";
import renderClientDataChart from "./charts/clientData/renderClientDataChart.js";
import renderRadialBarChart from "./charts/radialBarChart/renderRadialBarChart.js";
import { reformatData, reformatLabel } from "./helpers/dataClean.js";

// Global variables to store chart instances
let clientSatisfactionChart,
  teamMoraleChart,
  taskTypeChart,
  taskStatusChart,
  storyPointsChart,
  logHoursChart,
  clientDataChart;

// Function to update all charts
function updateCharts(sprint) {
  // Data objects to hold chart data
  let taskTypeDataObj = {};
  let taskStatusDataObj = {};
  let storyPointsData = [
    { name: "Completed", type: "column", data: [] },
    { name: "Assigned", type: "line", data: [] },
  ];
  let logHoursData = [
    { name: "Billable Hours", type: "line", data: [] },
    { name: "Available Hours", type: "column", data: [] },
    { name: "Estimated Hours", type: "column", data: [] },
    { name: "Logged Hours", type: "column", data: [] },
  ];
  let taskTypeData = [];
  let taskTypelabels = [];
  let taskStatusData = [];
  let taskStatusLabels = [];
  let storyPointsLabels = [];
  let logHoursLabels = [];
  let clientDataData = [];
  let clientDataLabels = [];

  // Counting total task type and status data
  for (let item of sprint.tasks) {
    taskTypeDataObj[item.type] = (taskTypeDataObj[item.type] || 0) + 1;
    taskStatusDataObj[item.status] = (taskStatusDataObj[item.status] || 0) + 1;
  }

  // Extracting task type data and labels
  for (let [type, data] of Object.entries(taskTypeDataObj)) {
    data = reformatData(data);
    taskTypeData.push(data);
    type = reformatLabel(type);
    taskTypelabels.push(type);
  }

  // Extracting task status data and labels
  for (let [status, data] of Object.entries(taskStatusDataObj)) {
    data = reformatData(data);
    taskStatusData.push(data);
    status = reformatLabel(status);
    taskStatusLabels.push(status);
  }

  // Extracting story points and log hours data
  for (let member of sprint.team_members) {

    storyPointsLabels.push(reformatLabel(member.name));
    logHoursLabels.push(reformatLabel(member.name));
    member.story_points.forEach((points, i) => {
      storyPointsData[i].data.push(points);
    });
    Object.values(member.logs)
      .slice(1)
      .forEach((value, i) => {
        value = reformatData(value);
        logHoursData[i].data.push(value);
      });
  }

  // Extracting client data
  for (let [label, data] of Object.entries(sprint.client_data)) {
    if (label !== "client_data_id") {
      data = reformatData(data);
      clientDataData.push(data);
      label = reformatLabel(label);
      clientDataLabels.push(label);
    }
  }

  // Destroy existing charts if they exist
  if (clientSatisfactionChart) {
    clientSatisfactionChart.destroy();
    teamMoraleChart.destroy();
    taskTypeChart.destroy();
    taskStatusChart.destroy();
    storyPointsChart.destroy();
    logHoursChart.destroy();
    clientDataChart.destroy();
  }

  // Render initial charts
  taskTypeChart = renderTaskTypeChart(taskTypeData, taskTypelabels);
  taskStatusChart = renderTaskStatusChart(taskStatusData, taskStatusLabels);
  storyPointsChart = renderStoryPointsChart(storyPointsData, storyPointsLabels);
  logHoursChart = renderLogHoursChart(logHoursData, logHoursLabels);
  clientDataChart = renderClientDataChart(clientDataData, clientDataLabels);

  // Render radial charts
  clientSatisfactionChart = renderRadialBarChart(
    "chart",
    sprint.client_satisfaction
  );
  teamMoraleChart = renderRadialBarChart("chart2", sprint.team_morale);
}

export default updateCharts;

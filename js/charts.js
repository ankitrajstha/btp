import renderTaskTypeChart from "./charts/taskType/renderTaskTypeChart.js";
import renderTaskStatusChart from "./charts/taskStatus/renderTaskStatusChart.js";
import renderStoryPointsChart from "./charts/storyPoints/renderStoryPointsChart.js";
import renderLogHoursChart from "./charts/logHours/renderLogHoursChart.js";
import renderClientDataChart from "./charts/clientData/renderClientDataChart.js";
import renderRadialBarChart from "./charts/radialBarChart/renderRadialBarChart.js";

let r1, r2, taskTypeChart, taskStatusChart, storyPointsChart, logHoursChart, clientDataChart;
function updateCharts(sprint) {
  // document.addEventListener("DOMContentLoaded", () => {
    
  let taskTypeDataObj = {}
  let taskStatusDataObj = {}
  let storyPointsData = [
    {
      name: 'Completed',
      type: 'column',
      data: []
    },
    {
      name: 'Assigned',
      type: 'line',
      data: []
    }];

  let logHoursData = [
    {
      name: 'Billable Hours',
      type: 'line',
      data: []
    },
    {
      name: 'Available Hours',
      type: 'column',
      data: []
    },
    {
      name: 'Estimated Hours',
      type: 'column',
      data: []
    },
    {
      name: 'Logged Hours',
      type: 'column',
      data: []
    }];

  let logHoursLabels = [];

  let taskTypeData = []
  let taskTypelabels = []

  let taskStatusData = []
  let taskStatusLabels = []

  let storyPointsLabels = []

  let clientDataData = []
  let clientDataLabels = []

  for (let item of sprint.tasks) {
    if (taskTypeDataObj.hasOwnProperty(item.type)) taskTypeDataObj[item.type]++;
    else taskTypeDataObj[item.type] = 1;
  }

  for (let [type, data] of Object.entries(taskTypeDataObj)) {
    taskTypeData.push(data)
    taskTypelabels.push(type);
  }

  for (let item of sprint.tasks) {
    if (taskStatusDataObj.hasOwnProperty(item.status)) taskStatusDataObj[item.status]++;
    else taskStatusDataObj[item.status] = 1;
  }

  for (let [status, data] of Object.entries(taskStatusDataObj)) {
    taskStatusData.push(data)
    taskStatusLabels.push(status);
  }

  for (let member of sprint.team_members) {
    storyPointsLabels.push(member.name)
    logHoursLabels.push(member.name)
    for (let i = 0; i < member.story_points.length; i++) {
      storyPointsData[i]["data"].push(member.story_points[i]);
    }
    for (let i = 1; i < Object.keys(member.logs).length; i++) {
      logHoursData[i - 1]["data"].push(Object.entries(member.logs)[i][1])
    }
  }

  for(let [label, data] of Object.entries(sprint.client_data))
  {
      if(label !== "client_data_id") {
        clientDataData.push(data);
        clientDataLabels.push(label)
      }
  }

  if (r1) {
    r1.destroy();
    r2.destroy();
    taskTypeChart.destroy();
    taskStatusChart.destroy();
    storyPointsChart.destroy();
    logHoursChart.destroy();
    clientDataChart.destroy();
  }

  // Intial chart render
  taskTypeChart = renderTaskTypeChart(taskTypeData, taskTypelabels);
  taskStatusChart = renderTaskStatusChart(taskStatusData, taskStatusLabels);
  storyPointsChart = renderStoryPointsChart(storyPointsData, storyPointsLabels);
  logHoursChart = renderLogHoursChart(logHoursData, logHoursLabels);
  clientDataChart = renderClientDataChart(clientDataData, clientDataLabels);

  // Radial chart render
  r1 = renderRadialBarChart('chart', sprint.client_satisfaction);
  r2 = renderRadialBarChart('chart2', sprint.team_morale);
  // });
}
export default updateCharts;
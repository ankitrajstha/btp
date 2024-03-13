import {
  taskTypeData, taskTypelabels, taskStatusData,
  taskStatusLabels, storyPointsData, storyPointsLabels,
  logHoursData, logHoursLabels, clientDataData, clientDataLabels
} from "./static/apiData.js";
import {
  taskTypeContainer, taskStatusContainer, storyPointsContainer,
  logHoursContainer, clientDataContainer
} from "./static/chartContainers.js"
import updateChart from "./helpers/render.js";
import openModal from "./helpers/modal.js";

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
  // Apex chart objects
  let taskTypeChart, taskStatusChart, storyPointsChart, logHoursChart, clientDataChart;

  // Selected chart type
  let selectedChartTypeTaskType, selectedChartTypeTaskStatus, selectedChartTypeStoryPoints, selectedChartTypeLogHours, selectedChartTypeClientData;
  let selectedChartTypeTaskStatusModal, selectedChartTypeTaskTypeModal, selectedChartTypeStoryPointsModal;
  selectedChartTypeTaskType = selectedChartTypeTaskStatus = selectedChartTypeTaskTypeModal = selectedChartTypeTaskStatusModal = 'donut';
  selectedChartTypeStoryPoints = selectedChartTypeStoryPointsModal = selectedChartTypeLogHours = 'line';
  selectedChartTypeClientData = 'bar';

  // Change graphs when another option is selected
  const chartOption = document.querySelector("#chart-type-1");
  const dropdownOptions = document.querySelector("#dropdownChartOptions");
  const selectedChartLabel = document.querySelector("#selectedChart");

  chartOption.addEventListener("click", function () {
    dropdownOptions.classList.toggle('dropdown-chart-options-visibility');
  });
  dropdownOptions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedChartTypeTaskType = selectedChartTypeTaskTypeModal = event.target.getAttribute("data-value");
      taskTypeChart = updateChart(
        taskTypeChart,
        taskTypeContainer,
        selectedChartTypeTaskType,
        taskTypeData,
        taskTypelabels,
        false
      );
      selectedChartLabel.textContent = selectedChartLabelModal.textContent = selectedOptionText;
      dropdownOptions.style.display === "none";
    }
  });

  const chartOption2 = document.querySelector("#chart-type-2");
  const dropdownOptions2 = document.querySelector("#dropdownChartOptions2");
  const selectedChartLabel2 = document.querySelector("#selectedChart2");

  chartOption2.addEventListener("click", function () {
    dropdownOptions2.classList.toggle('dropdown-chart-options-visibility');
  });
  dropdownOptions2.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedChartTypeTaskStatus = selectedChartTypeTaskStatusModal = event.target.getAttribute("data-value");
      taskStatusChart = updateChart(
        taskStatusChart,
        taskStatusContainer,
        selectedChartTypeTaskStatus,
        taskStatusData,
        taskStatusLabels,
        false
      );
      selectedChartLabel2.textContent = selectedChartLabelModal2.textContent = selectedOptionText;
    }
    dropdownOptions2.style.display === "none";
  });

  // Intial chart render
  taskTypeChart = updateChart(
    taskTypeChart,
    taskTypeContainer,
    selectedChartTypeTaskType,
    taskTypeData,
    taskTypelabels,
    false
  );
  taskStatusChart = updateChart(
    taskStatusChart,
    taskStatusContainer,
    selectedChartTypeTaskStatus,
    taskStatusData,
    taskStatusLabels,
    false
  );
  storyPointsChart = updateChart(
    storyPointsChart,
    storyPointsContainer,
    selectedChartTypeStoryPoints,
    storyPointsData,
    storyPointsLabels,
    false
  );
  logHoursChart = updateChart(
    logHoursChart,
    logHoursContainer,
    selectedChartTypeLogHours,
    logHoursData,
    logHoursLabels,
    false
  );
  clientDataChart = updateChart(
    clientDataChart,
    clientDataContainer,
    selectedChartTypeClientData,
    clientDataData,
    clientDataLabels,
    false
  );
  //radial chart render
  createRadialBarChart("chart", 20);
  createRadialBarChart("chart2", 80);

  // Charts inside modal
  // Modal apex chart objects
  let taskTypeModalChart, taskStatusModalChart, storyPointsModalChart, logHoursModalChart, clientDataModalChart;

  const chartOptionModal = document.querySelector("#chart-type-1-0");
  const dropdownOptionsModal = document.querySelector("#dropdownChartOptions-0");
  const selectedChartLabelModal = document.querySelector("#selectedChart-0");

  const chartOptionModal2 = document.querySelector("#chart-type-2-0");
  const dropdownOptionsModal2 = document.querySelector("#dropdownChartOptions2-0");
  const selectedChartLabelModal2 = document.querySelector("#selectedChart2-0");

  const chartOptionModal3 = document.querySelector("#chart-type-3-0");
  const dropdownOptionsModal3 = document.querySelector("#dropdownChartOptions3-0");
  const selectedChartLabelModal3 = document.querySelector("#selectedChart3-0");
  // Get modal open button and handle event
  const openModalButton = document.getElementById("openTaskTypeModal");
  openModalButton.addEventListener("click", () => {
    openModal(
      taskTypeModalChart,
      "taskTypeModal",
      "taskTypeModalChart",
      selectedChartTypeTaskTypeModal,
      taskTypeData,
      taskTypelabels,
      chartOptionModal,
      dropdownOptionsModal,
      selectedChartLabelModal
    );
  });
  const openModalButton2 = document.getElementById("openTaskStatusModal");
  openModalButton2.addEventListener("click", () => {
    openModal(
      taskStatusModalChart,
      "taskStatusModal",
      "taskStatusModalChart",
      selectedChartTypeTaskStatusModal,
      taskStatusData,
      taskStatusLabels,
      chartOptionModal2,
      dropdownOptionsModal2,
      selectedChartLabelModal2
    );
  });
  const openModalButton3 = document.getElementById("openStoryPointsModal");
  openModalButton3.addEventListener("click", () => {
    openModal(
      storyPointsModalChart,
      "storyPointsModal",
      "storyPointsModalChart",
      selectedChartTypeStoryPointsModal,
      storyPointsData,
      storyPointsLabels,
      chartOptionModal3,
      dropdownOptionsModal3,
      selectedChartLabelModal3
    );
  });
  const openModalButton4 = document.getElementById("openLogHoursModal");
  openModalButton4.addEventListener("click", () => {
    openModal(
      logHoursModalChart,
      "logHoursModal",
      "logHoursModalChart",
      selectedChartTypeLogHours,
      logHoursData,
      logHoursLabels,
      null,
      null,
      null
    );
  });
  const openModalButton5 = document.getElementById("openClientDataModal");
  openModalButton5.addEventListener("click", () => {
    openModal(
      clientDataModalChart,
      "clientDataModal",
      "clientDataModalChart",
      selectedChartTypeClientData,
      clientDataData,
      clientDataLabels,
      null,
      null,
      null
    );
  });
});
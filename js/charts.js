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

const getChartConfig = (chartType, data, labels, inModal) => {
  // Initial configuration for all charts
  const chartConfig = {
    chart: {
      width: "100%",
      // height: "100%",
      type: chartType,
    },
    series: chartType === "bar" ? [{ name: "Data", data }] : data,
    labels: labels
  };

  // Chart configuration for pie chart, outlined and filled
  if (chartType !== "bar" && chartType !== 'line') {
    chartConfig['dataLabels'] = {
      style: {
        fontSize: '10px',
        fontFamily: "Poppins",
        fontWeight: '400',
      },
      dropShadow: {
        enabled: false,
      }
    }
    chartConfig['legend'] = {
      fontSize: "10px",
      fontFamily: "Poppins",
      offsetX: -2,
      offsetY: -2,
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
      chartConfig["plotOptions"] = {
        pie: {
          offsetX: -55,
          offsetY: -30,
          customScale: 0.75,
          donut: {
            size: 65
          }
        },
      };
  }
  // Addtional chart configuration for bar chart
  if (chartType === "bar" || chartType == 'line') {
    // Shorten labels for bar chart by taking the initals of long words
    var newLabels = {};
    labels.forEach((label) => {
      if (label.length > 5) {
        var intitals = "";
        label.split(" ").forEach((word) => {
          intitals += word[0];
        });
        newLabels[intitals] = label;
      } else {
        newLabels[label] = label;
      }
    });
    labels = Object.keys(newLabels);
    chartConfig.chart.height = '90%'
    // X-axis labels for bar charts with custom styling
    chartConfig["xaxis"] = {
      categories: labels,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Poppins",
        },
      },
    };
    // Mapping shortened labels to display their fullforms when hover
    chartConfig["tooltip"] = {
      enabled: true,
      x: {
        formatter: (val) => {
          return newLabels[val] || val;
        },
      },
    };
    // Hamburger icon with download options in bar chart
    chartConfig.chart["toolbar"] = {
      show: false,
    };
    chartConfig.dataLabels = {
      enabled: true,
      enabledOnSeries: [1]
    }
    chartConfig.stroke = {
      width: [0, 4]
    }
  }

  if (inModal && chartType !== "bar" && chartType !== 'line') {
    chartConfig.dataLabels.style.fontSize = '20px'
    chartConfig.chart.height = "100%";
    chartConfig.plotOptions.pie.customScale = 0.95;
    chartConfig.plotOptions.pie.offsetX = -40;
    chartConfig.plotOptions.pie.offsetY = -5;
    chartConfig.legend.itemMargin.vertical = 2.55;
    chartConfig.legend.offsetY = 10;
    chartConfig.legend.offsetX = -30;
    chartConfig.legend.fontSize = '12px'
  }
  if (inModal && (chartType === "bar" || chartType === 'line')) {
    chartConfig.chart.height = "90%";
  }
  return chartConfig;
};

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

document.addEventListener("DOMContentLoaded", () => {
  // Apex chart objects
  let taskTypeChart, taskStatusChart, storyPointsChart;

  // Chart containers
  let taskTypeContainer = document.querySelector("#taskTypeChart");
  let taskStatusContainer = document.querySelector("#taskStatusChart");
  let storyPointsContainer = document.querySelector("#storyPointsChart");

  // Selected chart type
  let selectedChartTypeTaskType = 'donut';
  const selectedChartTypeTaskTypeModal = document.querySelector("#chart-type-1-0");
  let selectedChartTypeTaskStatus = 'donut';
  const selectedChartTypeTaskStatusModal = document.querySelector("#chart-type-2-0");
  let selectedChartTypeStoryPoints = 'line';
  const selectedChartTypeStoryPointsModal = document.querySelector("#chart-type-3-0");

  // Chart data
  // Task type chart data
  const taskTypeData = [15, 6, 25, 30, 9, 15]; // Replace with actual data from API later
  const taskTypelabels = [
    "Bug Leakage",
    "Task",
    "Sub Task",
    "Task Maintenance",
    "Bug",
    "Epic",
  ]; // Replace with actual data from API later

  // Task status chart data
  const taskStatusData = [15, 6, 25, 30, 9, 15]; // Replace with actual data from API later
  const taskStatusLabels = [
    "Todo",
    "In Progress",
    "Awaiting Dev Review",
    "In Review",
    "Complete",
    "Blocked",
  ]; // Replace with actual data from API later


  // Story points chart data
  const storyPointsData = [
    {
      name: 'Completed',
      type: 'column',
      data: [35, 45, 32, 30, 22]
    },
    {
      name: 'Assigned',
      type: 'line',
      data: [45, 50, 35, 40, 25]
    }]; // Replace with actual data from API later
  const storyPointsLabels = [
    'Ram',
    'Shyam',
    'Hari',
    'Shiva',
    'Sita'
  ]; // Replace with actual data from API later

  // Change graphs when another option is selected
  const chartOption = document.querySelector("#chart-type-1");
  const dropdownOptions = document.querySelector("#dropdownChartOptions");
  const selectedChartLabel = document.querySelector("#selectedChart");

  chartOption.addEventListener("click", function () {
    dropdownOptions.style.display =
      dropdownOptions.style.display === "none" ? "block" : "none";
  });
  dropdownOptions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedChartTypeTaskType = event.target.getAttribute("data-value");
      taskTypeChart = updateChart(
        taskTypeChart,
        taskTypeContainer,
        selectedChartTypeTaskType,
        taskTypeData,
        taskTypelabels,
        false
      );
      selectedChartLabel.textContent = selectedOptionText;
      dropdownOptions.style.display === "none";
    }
  });

  const chartOption2 = document.querySelector("#chart-type-2");
  const dropdownOptions2 = document.querySelector("#dropdownChartOptions2");
  const selectedChartLabel2 = document.querySelector("#selectedChart2");

  chartOption2.addEventListener("click", function () {
    dropdownOptions2.style.display =
      dropdownOptions2.style.display === "none" ? "block" : "none";
  });
  dropdownOptions2.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedChartTypeTaskStatus = event.target.getAttribute("data-value");
      taskStatusChart = updateChart(
        taskStatusChart,
        taskStatusContainer,
        selectedChartTypeTaskStatus,
        taskStatusData,
        taskStatusLabels,
        false
      );
      selectedChartLabel2.textContent = selectedOptionText;
    }
    dropdownOptions2.style.display === "none";
  });

  const chartOption3 = document.querySelector("#chart-type-3");
  const dropdownOptions3 = document.querySelector("#dropdownChartOptions3");
  const selectedChartLabel3 = document.querySelector("#selectedChart3");

  chartOption3.addEventListener("click", function () {
    dropdownOptions3.style.display =
      dropdownOptions3.style.display === "none" ? "block" : "none";
  });
  dropdownOptions3.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedChartTypeStoryPoints = event.target.getAttribute("data-value");
      storyPointsChart = updateChart(
        storyPointsChart,
        storyPointsContainer,
        selectedChartTypeStoryPoints,
        storyPointsData,
        storyPointsLabels,
        false
      );
      selectedChartLabel3.textContent = selectedOptionText;
    }
    dropdownOptions3.style.display === "none";
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
  //radial chart render
  createRadialBarChart("chart", 20);
  createRadialBarChart("chart2", 80);

  // Charts inside modal
  // Modal apex chart objects
  let taskTypeModalChart, taskStatusModalChart, storyPointsModalChart;

  const chartOptionModal = document.querySelector("#chart-type-1-0");
  const dropdownOptionsModal = document.querySelector("#dropdownChartOptions-0");
  const selectedChartLabelModal = document.querySelector("#selectedChart-0");
  // Get modal open button and handle event
  const openModalButton = document.getElementById("openTaskTypeModal");
  openModalButton.addEventListener("click", () => {
    openModal(
      taskTypeModalChart,
      "taskTypeModal",
      "taskTypeModalChart",
      'donut',
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
      taskStatusLabels
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
      storyPointsLabels
    );
  });
});

// Modal
const openModal = (
  myChart,
  modalId,
  chartModalContainerId,
  chartType,
  data,
  labels,
  chartOptionModal,
  dropdownOptionsModal,
  selectedChartLabelModal
) => {
  const modal = document.getElementById(modalId);
  const chartContainer = document.getElementById(chartModalContainerId);
  myChart = updateChart(
    myChart,
    chartContainer,
    chartType,
    data,
    labels,
    true
  );

  // Display modal
  modal.style.display = "block";

  // Add event listener for chart type selector inside modal
  chartOptionModal.addEventListener("click", function () {
    dropdownOptionsModal.style.display =
      dropdownOptionsModal.style.display === "none" ? "block" : "none";
  });
  dropdownOptionsModal.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionTextModal = event.target.textContent.trim();
      chartType = event.target.getAttribute("data-value");
      myChart = updateChart(
        myChart,
        chartContainer,
        chartType,
        data,
        labels,
        true
      );
      selectedChartLabelModal.textContent = selectedOptionTextModal;
    }
    dropdownOptionsModal.style.display === "none";
  });

  // Add event listener for closing the modal
  const closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};


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
      height: "192px",
      type: chartType,
    },
    series: chartType === "bar" ? [{ name: "Data", data }] : data,
    labels: labels
  };

  // Chart configuration for pie chart, outlined and filled
  if (chartType !== "bar" && chartType !== 'line') {
    chartConfig['legend'] =  {
      fontSize: "10px",
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
    chartConfig["plotOptions"] = {
      pie: {
        offsetX: -65,
        offsetY: 5,
        customScale: 0.9,
      },
    };
  }

  // Addtional chart configuration for bar chart
  if (chartType === "bar") {
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
  }

  if (chartType === 'line') {
    chartConfig.dataLabels = {
      enabled: true,
      enabledOnSeries: [1]
    }
    chartConfig.stroke = {
      width: [0, 4]
    }
  }

  if (inModal && chartType !== "bar") {
    chartConfig.chart.height = "100%";
    chartConfig.plotOptions.pie.customScale = 0.85;
    chartConfig.plotOptions.pie.offsetX = -60;
    chartConfig.legend.itemMargin.vertical = 2.5;
    chartConfig.legend.offsetY = 30;
  }
  if (inModal && chartType === "bar") {
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
  const selectedChartTypeTaskType = document.querySelector("#chart-type-1");
  const selectedChartTypeTaskTypeModal = document.querySelector("#chart-type-1-0");
  const selectedChartTypeTaskStatus = document.querySelector("#chart-type-2");
  const selectedChartTypeTaskStatusModal = document.querySelector("#chart-type-2-0");
  const selectedChartTypeStoryPoints = document.querySelector("#chart-type-3");

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
  selectedChartTypeTaskType.addEventListener("change", function () {
    selectedChartTypeTaskTypeModal.value = selectedChartTypeTaskType.value
    taskTypeChart = updateChart(
      taskTypeChart,
      taskTypeContainer,
      selectedChartTypeTaskType.value,
      taskTypeData,
      taskTypelabels,
      false
    );
  });
  selectedChartTypeTaskStatus.addEventListener("change", function () {
    selectedChartTypeTaskStatusModal.value = selectedChartTypeTaskStatus.value
    taskStatusChart = updateChart(
      taskStatusChart,
      taskStatusContainer,
      selectedChartTypeTaskStatus.value,
      taskStatusData,
      taskStatusLabels,
      false
    );
  });
  selectedChartTypeStoryPoints.addEventListener("change", function () {
    // selectedChartTypeTaskStatusModal.value = selectedChartTypeTaskStatus.value
    storyPointsChart = updateChart(
      storyPointsChart,
      storyPointsContainer,
      selectedChartTypeStoryPoints.value,
      storyPointsData,
      storyPointsLabels,
      false
    );
  });

  // Intial chart render
  taskTypeChart = updateChart(
    taskTypeChart,
    taskTypeContainer,
    selectedChartTypeTaskType.value,
    taskTypeData,
    taskTypelabels,
    false
  );
  taskStatusChart = updateChart(
    taskStatusChart,
    taskStatusContainer,
    selectedChartTypeTaskStatus.value,
    taskStatusData,
    taskStatusLabels,
    false
  );
  storyPointsChart = updateChart(
    storyPointsChart,
    storyPointsContainer,
    selectedChartTypeStoryPoints.value,
    storyPointsData,
    storyPointsLabels,
    false
  );
  //radial chart render
  createRadialBarChart("chart", 20);
  createRadialBarChart("chart2", 80);
  // Charts inside modal
  // Modal apex chart objects
  let taskTypeModalChart, taskStatusModalChart;

  // Get modal open button and handle event
  const openModalButton = document.getElementById("openTaskTypeModal");
  openModalButton.addEventListener("click", () => {
    openModal(
      taskTypeModalChart,
      "taskTypeModal",
      "taskTypeModalChart",
      selectedChartTypeTaskTypeModal,
      taskTypeData,
      taskTypelabels
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
});

// Modal
const openModal = (
  myChart,
  modalId,
  chartModalContainerId,
  chartType,
  data,
  labels
) => {
  const modal = document.getElementById(modalId);
  const chartContainer = document.getElementById(chartModalContainerId);
  myChart = updateChart(myChart, chartContainer, chartType.value, data, labels, true);

  // Display modal
  modal.style.display = "block";

  // Add event listener for chart type selector inside modal
  // const chartTypeSelector = modal.querySelector("select");
  chartType.addEventListener("change", () => {
    myChart = updateChart(
      myChart,
      chartContainer,
      chartType.value,
      data,
      labels,
      true
    );
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

import chartTypeRender from "../../helpers/renderChartType.js";
import updateChart from "../../helpers/render.js";
import openModal from "../../helpers/modal.js";
import getChartConfig from "./chartconfig.js";

import {
    taskStatusContainer, taskStatusChartOption,
    taskStatusDropdownOptions, taskStatusSelectedChartLabel,
    taskStatusOpenModalButton, taskStatusModal, taskStatusChartModalContainer,
    taskStatusChartOptionModal, taskStatusDropdownOptionsModal, taskStatusSelectedChartLabelModal
} from "./idSelector.js";

const renderTaskStatusChart = (taskStatusData, taskStatusLabels) => {
    let taskStatusChart;
    let selectedChartTypeTaskStatus = 'donut';
    let selectedOptionText = taskStatusSelectedChartLabel.textContent;

    // Initial rendering of chart
    const chartConfig = getChartConfig(selectedChartTypeTaskStatus, taskStatusData, taskStatusLabels, false);
    taskStatusChart = updateChart(
        taskStatusChart,
        taskStatusContainer,
        chartConfig
    );

    // Re-render chart when different chart type is selected
    chartTypeRender(
        selectedChartTypeTaskStatus,
        taskStatusChartOption,
        taskStatusDropdownOptions,
        taskStatusSelectedChartLabel,
        (chartType, optionText) => {
            selectedChartTypeTaskStatus = chartType;
            selectedOptionText = optionText;

            const chartConfig = getChartConfig(selectedChartTypeTaskStatus, taskStatusData, taskStatusLabels, false);
            taskStatusChart = updateChart(
                taskStatusChart,
                taskStatusContainer,
                chartConfig
            );
        }
    );

    let taskStatusModalChart;
    taskStatusOpenModalButton.addEventListener("click", () => {
        const chartConfigModal = getChartConfig(selectedChartTypeTaskStatus, taskStatusData, taskStatusLabels, true);

        // Render chart inside modal
        taskStatusModalChart = updateChart(
            taskStatusModalChart,
            taskStatusChartModalContainer,
            chartConfigModal
        );

        openModal(
            taskStatusModal,
            selectedChartTypeTaskStatus,
            selectedOptionText,
            taskStatusChartOptionModal,
            taskStatusDropdownOptionsModal,
            taskStatusSelectedChartLabelModal,
            // Handle re-rendering of chart when different chart type is selected inside modal
            (chartType) => {
                const chartConfigModal = getChartConfig(chartType, taskStatusData, taskStatusLabels, true);
                taskStatusModalChart.destroy();
                taskStatusModalChart = updateChart(
                    taskStatusModalChart,
                    taskStatusChartModalContainer,
                    chartConfigModal
                );
            }
        );
    });
    return taskStatusChart;
}

export default renderTaskStatusChart;
import chartTypeRender from "../../helpers/renderChartType.js";
import updateChart from "../../helpers/render.js";
import openModal from "../../helpers/modal.js";
import getChartConfig from "./chartconfig.js";

import {
    taskTypeContainer, taskTypeChartOption, taskTypeChevron,
    taskTypeDropdownOptions, taskTypeSelectedChartLabel,
    taskTypeOpenModalButton, taskTypeModal, taskTypeChartModalContainer,
    taskTypeDropdownOptionsModal, taskTypeSelectedChartLabelModal, 
    taskTypeChartOptionModal, taskTypeModalChevron
} from "./idSelector.js";

let taskTypeModalChart;

const renderTaskTypeChart = (taskTypeData, taskTypeLabels) => {
    let taskTypeChart;
    let selectedChartTypeTaskType = 'donut';
    let selectedOptionText = taskTypeSelectedChartLabel.textContent;

    // Initial rendering of chart
    const chartConfig = getChartConfig(selectedChartTypeTaskType, taskTypeData, taskTypeLabels, false);
    taskTypeChart = updateChart(
        taskTypeChart,
        taskTypeContainer,
        chartConfig
    );

    // Re-render chart when different chart type is selected
    chartTypeRender(
        selectedChartTypeTaskType,
        taskTypeDropdownOptions,
        taskTypeSelectedChartLabel,
        taskTypeChartOption,
        taskTypeChevron,
        (chartType, optionText) => {
            selectedChartTypeTaskType = chartType;
            selectedOptionText = optionText;

            const chartConfig = getChartConfig(selectedChartTypeTaskType, taskTypeData, taskTypeLabels, false);
            taskTypeChart = updateChart(
                taskTypeChart,
                taskTypeContainer,
                chartConfig
            );
        }
    );

    if (taskTypeModalChart) {
        taskTypeModalChart.destroy();
    }
    taskTypeOpenModalButton.addEventListener("click", () => {
        const chartConfigModal = getChartConfig(selectedChartTypeTaskType, taskTypeData, taskTypeLabels, true);

        // Render chart inside modal
        taskTypeModalChart = updateChart(
            taskTypeModalChart,
            taskTypeChartModalContainer,
            chartConfigModal
        );

        openModal(
            taskTypeModal,
            selectedChartTypeTaskType,
            selectedOptionText,
            taskTypeDropdownOptionsModal,
            taskTypeSelectedChartLabelModal,
            taskTypeChartOptionModal,
            taskTypeModalChevron,
            // Handle re-rendering of chart when different chart type is selected inside modal
            (chartType) => {
                const chartConfigModal = getChartConfig(chartType, taskTypeData, taskTypeLabels, true);
                taskTypeModalChart.destroy();
                taskTypeModalChart = updateChart(
                    taskTypeModalChart,
                    taskTypeChartModalContainer,
                    chartConfigModal
                );
            }
        );
    });
    return taskTypeChart;
}

export default renderTaskTypeChart;
import updateChart from "../../helpers/render.js";
import openModal from "../../helpers/modal.js";
import getChartConfig from "./chartconfig.js";

import {
    logHoursContainer, logHoursOpenModalButton,
    logHoursModal, logHoursChartModalContainer,
} from "./idSelector.js";

let logHoursModalChart;

const renderLogHoursChart = (logHoursData, logHoursLabels) => {
    let logHoursChart;
    let selectedChartTypelogHours = 'line';

    // Initial rendering of chart
    const chartConfig = getChartConfig(selectedChartTypelogHours, logHoursData, logHoursLabels, false);
    logHoursChart = updateChart(
        logHoursChart,
        logHoursContainer,
        chartConfig
    );

    if (logHoursModalChart) {
        logHoursModalChart.destroy();
    }
    logHoursOpenModalButton.addEventListener("click", () => {
        const chartConfigModal = getChartConfig(selectedChartTypelogHours, logHoursData, logHoursLabels, true);

        // Render chart inside modal
        logHoursModalChart = updateChart(
            logHoursModalChart,
            logHoursChartModalContainer,
            chartConfigModal
        );

        // Null values since this chart has no options for different chart types
        openModal(
            logHoursModal,
            null,
            null,
            null,
            null,
            (chartType) => {
            }
        );
    });
    return logHoursChart;
}

export default renderLogHoursChart;
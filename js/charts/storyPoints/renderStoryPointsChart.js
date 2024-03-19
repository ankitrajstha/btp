import updateChart from "../../helpers/render.js";
import openModal from "../../helpers/modal.js";
import getChartConfig from "./chartconfig.js";

import {
    storyPointsContainer, storyPointsOpenModalButton,
    storyPointsModal, storyPointsChartModalContainer,
} from "./idSelector.js";

let storyPointsModalChart;

const renderStoryPointsChart = (storyPointsData, storyPointsLabels) => {
    let storyPointsChart;
    let selectedChartTypestoryPoints = 'line';

    // Initial rendering of chart
    const chartConfig = getChartConfig(selectedChartTypestoryPoints, storyPointsData, storyPointsLabels, false);
    storyPointsChart = updateChart(
        storyPointsChart,
        storyPointsContainer,
        chartConfig
    );

    if (storyPointsModalChart) {
        storyPointsModalChart.destroy();
    }
    storyPointsOpenModalButton.addEventListener("click", () => {
        const chartConfigModal = getChartConfig(selectedChartTypestoryPoints, storyPointsData, storyPointsLabels, true);

        // Render chart inside modal
        storyPointsModalChart = updateChart(
            storyPointsModalChart,
            storyPointsChartModalContainer,
            chartConfigModal
        );

        // Null values since this chart has no options for different chart types
        openModal(
            storyPointsModal,
        );
    });
    return storyPointsChart;
}

export default renderStoryPointsChart;
import updateChart from "../../helpers/render.js";
import openModal from "../../helpers/modal.js";
import getChartConfig from "./chartconfig.js";

import {
    clientDataContainer, clientDataOpenModalButton,
    clientDataModal, clientDataChartModalContainer,
} from "./idSelector.js";

const renderClientDataChart = (clientDataData, clientDataLabels) => {
    let clientDataChart;
    let selectedChartTypeclientData = 'bar';

    // Initial rendering of chart
    const chartConfig = getChartConfig(selectedChartTypeclientData, clientDataData, clientDataLabels, false);
    clientDataChart = updateChart(
        clientDataChart,
        clientDataContainer,
        chartConfig
    );

    let clientDataModalChart;
    clientDataOpenModalButton.addEventListener("click", () => {
        const chartConfigModal = getChartConfig(selectedChartTypeclientData, clientDataData, clientDataLabels, true);

        // Render chart inside modal
        clientDataModalChart = updateChart(
            clientDataModalChart,
            clientDataChartModalContainer,
            chartConfigModal
        );

        // Null values since this chart has no options for different chart types
        openModal(
            clientDataModal,
            null,
            null,
            null,
            null,
            null,
            (chartType) => {

            }
        );
    });
}

export default renderClientDataChart;
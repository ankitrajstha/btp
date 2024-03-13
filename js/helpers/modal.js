import updateChart from "./render.js";

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
    if (chartOptionModal) {
        chartOptionModal.addEventListener("click", function () {
            dropdownOptionsModal.classList.toggle('dropdown-chart-options-visibility');
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
    }

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

export default openModal;
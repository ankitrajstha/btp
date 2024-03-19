// Modal
const openModal = (
    modal,
    chartType,
    selectedOptionText,
    chartOptionModal,
    dropdownOptionsModal,
    selectedChartLabelModal,
    callback
) => {
    if (dropdownOptionsModal) {
        selectedChartLabelModal.textContent = selectedOptionText;
    }

    // Display modal
    modal.style.display = "block";

    // handle event for chart type selector 
    // const handleDropdown = () => {
    //     dropdownOptionsModal.classList.toggle('dropdown-chart-options-visibility');
    // };
    const handleDropdownOptionClick = (event) => {
        if (event.target.tagName === "LI") {
            const selectedOptionTextModal = event.target.textContent.trim();
            chartType = event.target.getAttribute("data-value");

            selectedChartLabelModal.textContent = selectedOptionTextModal;

            if (typeof callback === 'function') {
                callback(chartType);
            }
        }
    };

    // Handle event listener for closing the modal
    const closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        if (dropdownOptionsModal) {
            dropdownOptionsModal.removeEventListener("click", handleDropdownOptionClick);
            // chartOptionModal.removeEventListener("click", handleDropdown);
        }
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            if (dropdownOptionsModal) {
                dropdownOptionsModal.removeEventListener("click", handleDropdownOptionClick);
                // chartOptionModal.removeEventListener("click", handleDropdown);
            }
        }
        if (dropdownOptionsModal && event.target !== chartOptionModal && event.target !== selectedChartLabelModal && event.target !== dropdownOptionsModal) {
            dropdownOptionsModal.classList.remove('dropdown-chart-options-visibility');
        }
    });
    if (dropdownOptionsModal) {
        dropdownOptionsModal.addEventListener("click", handleDropdownOptionClick);
        // chartOptionModal.addEventListener("click", handleDropdown);
    }
};

export default openModal;
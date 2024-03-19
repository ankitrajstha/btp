const chartTypeRender = (
    selectedChartType,
    dropdownOptions,
    selectedChartLabel,
    chartOption,
    chevron,
    callback
) => {
    let selectedOptionText = selectedChartLabel.textContent;

    dropdownOptions.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            selectedOptionText = event.target.textContent.trim();
            selectedChartType = event.target.getAttribute("data-value");
            selectedChartLabel.textContent = selectedOptionText;
            if (typeof callback === 'function') {
                callback(selectedChartType, selectedOptionText);
            }
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target !== chartOption && event.target !== chevron && event.target !== selectedChartLabel && event.target !== dropdownOptions) {
            dropdownOptions.classList.remove('dropdown-chart-options-visibility');
        }
    });
}

export default chartTypeRender;
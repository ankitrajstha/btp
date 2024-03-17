const chartTypeRender = (
    selectedChartType,
    chartOption,
    dropdownOptions,
    selectedChartLabel,
    callback
) => {
    let selectedOptionText = selectedChartLabel.textContent;

    chartOption.addEventListener("click", function () {
        dropdownOptions.classList.toggle('dropdown-chart-options-visibility');
    });

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
        if (event.target !== chartOption && event.target !== selectedChartLabel && event.target !== dropdownOptions) {
            dropdownOptions.classList.remove('dropdown-chart-options-visibility');
        }
    });
}

export default chartTypeRender;
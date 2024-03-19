import { 
    taskTypeChartOption, taskTypeDropdownOptions,
    taskTypeChartOptionModal, taskTypeDropdownOptionsModal

} from "./idSelector.js";

const taskTypeDropdownToggle = () => {
    taskTypeChartOption.addEventListener("click", function () {
        taskTypeDropdownOptions.classList.toggle('dropdown-chart-options-visibility');
    });
}
const taskTypeModalDropdownToggle = () => {
    taskTypeChartOptionModal.addEventListener("click", function () {
        taskTypeDropdownOptionsModal.classList.toggle('dropdown-chart-options-visibility');
    });
}

export { taskTypeDropdownToggle, taskTypeModalDropdownToggle };


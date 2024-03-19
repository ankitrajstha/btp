import { 
    taskStatusChartOption, taskStatusDropdownOptions,
    taskStatusChartOptionModal, taskStatusDropdownOptionsModal
} from "./idSelector.js";


const taskStatusDropdownToggle = () => {
    taskStatusChartOption.addEventListener("click", function () {
        taskStatusDropdownOptions.classList.toggle('dropdown-chart-options-visibility');
    });
}
const taskStatusModalDropdownToggle = () => {
    taskStatusChartOptionModal.addEventListener("click", function () {
        taskStatusDropdownOptionsModal.classList.toggle('dropdown-chart-options-visibility');
    });
}

export { taskStatusDropdownToggle, taskStatusModalDropdownToggle };
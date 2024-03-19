const taskStatusContainer = document.querySelector("#taskStatusChart");

const taskStatusChartOption = document.querySelector("#chart-type-2");
const taskStatusDropdownOptions = document.querySelector("#dropdownChartOptions2");
const taskStatusSelectedChartLabel = document.querySelector("#selectedChart2");
const taskStatusChevron = document.querySelector("#taskStatusChevron");

const taskStatusModal = document.getElementById('taskStatusModal');
const taskStatusChartModalContainer = document.getElementById('taskStatusModalChart');

const taskStatusOpenModalButton = document.getElementById("openTaskStatusModal");

const taskStatusChartOptionModal = document.querySelector("#chart-type-2-0");
const taskStatusDropdownOptionsModal = document.querySelector("#dropdownChartOptions2-0");
const taskStatusSelectedChartLabelModal = document.querySelector("#selectedChart2-0");
const taskStatusModalChevron = document.querySelector("#taskStatusChevron-2");

export {
     taskStatusContainer, taskStatusChartOption, taskStatusChevron, taskStatusModalChevron,
     taskStatusDropdownOptions, taskStatusSelectedChartLabel, taskStatusModal,
     taskStatusOpenModalButton, taskStatusChartModalContainer, taskStatusChartOptionModal,
     taskStatusDropdownOptionsModal, taskStatusSelectedChartLabelModal
};
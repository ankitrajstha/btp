document.addEventListener("DOMContentLoaded", /**
 * This function adds an event listener to the DOMContentLoaded event, which is triggered when the HTML document has been fully loaded and parsed.
 * The function selects the dropdown element with the id "dropdownListOptions", and the elements with the ids "milestonesList" and "milestonesGraphical".
 * It defines two variables, selectedListTypeTaskType and selectedListTypeTaskTypeModal, which are used to store the selected list type.
 * The function defines a function listOption, which is an event listener for the click event of the "List" button.
 * The function defines a function dropdownListOptions, which is an event listener for the click event of the dropdown options.
 * The function defines a function selectedListLabel, which is an event listener for the click event of the selected list label.
 * The function sets the display property of the dropdown element to "block" or "none" based on whether it is currently visible.
 * The function sets the display property of the milestonesList and milestonesGraphical elements to "block" or "none" based on the selected list type.
 * The function sets the text content of the selected list label based on the selected list type.
 */
document.addEventListener("DOMContentLoaded", () => {

  const dropdownOptions = document.querySelector("#dropdownListOptions");
    
    // View Containers
    let milestonesList = document.getElementById('milestonesListView');
    let milestonesGraphical = document.getElementById('milestonesGraphicalView');

    // Selected List type
    let selectedListTypeTaskType, selectedListTypeTaskTypeModal;
    selectedListTypeTaskType = selectedListTypeTaskTypeModal = 'list';

    const chevronDown = document.querySelector('#chevronDownMilestoneSelect');
    const listOption = document.querySelector('#list-type-1');
    const dropdownListOptions = document.querySelector("#dropdownListOptions");
    const selectedListLabel = document.querySelector("#selectedList");
  
  /**
   * This function is an event listener for the click event of the "List" button.
   * It displays or hides the dropdown element based on the current visibility state.
   */
  listOption.addEventListener("click", function () {
    dropdownListOptions.classList.toggle("dropdown-chart-options-visibility");
  });

  /**
   * This function is an event listener for the click event of the dropdown options.
   * It gets the value of the clicked element and sets the selectedListTypeTaskType variable to the corresponding data-value.
   * It also sets the display property of the dropdown element to "none".
   * If the selected list type is "list", it sets the display property of the milestonesList and milestonesGraphical elements to "block" and "none", respectively.
   * If the selected list type is "graphical", it sets the display property of the milestonesList and milestonesGraphical elements to "none" and "block", respectively.
   * It sets the text content of the selected list label to the text content of the clicked element.
   */
  dropdownListOptions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedOptionText = event.target.textContent.trim();
      selectedListTypeTaskType = selectedListTypeTaskTypeModal = event.target.getAttribute("data-value");
      selectedListLabel.textContent = selectedOptionText;
      dropdownOptions.style.display === "none";
      if (selectedListTypeTaskType == 'list') {
        milestonesList.style.display = 'block';
        milestonesGraphical.style.display = 'none';
      } else if (selectedListTypeTaskType == 'graphical') {
        milestonesList.style.display = 'none';
        milestonesGraphical.style.display = 'block';
      }
    }
  });
  window.addEventListener("click", (event) => {
    const elementsToCheck = [chevronDown, listOption, selectedListLabel, dropdownListOptions];
    
    const isInside = elementsToCheck.some(element => element.contains(event.target));
    
    if (!isInside) {
        dropdownListOptions.classList.remove('dropdown-chart-options-visibility');
    }
});
})
)


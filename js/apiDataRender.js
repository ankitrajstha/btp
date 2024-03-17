function toggleDropdown(dropdownSelector, optionsContainerSelector) {
    document.querySelector(dropdownSelector).addEventListener('click', (e) => {
        document.querySelector(optionsContainerSelector).classList.toggle('dropdown-option-container-visibility-toggler');
    });
}

function dropdownHandler() {
    toggleDropdown(".project-dropdown", ".project-dropdown-options-container");
    toggleDropdown(".sprint-dropdown", ".sprint-dropdown-options-container");
}

dropdownHandler();
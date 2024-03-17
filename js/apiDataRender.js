function dropdownHandler() {
    document.querySelector(".project-dropdown").addEventListener('click', (e) => {
        document.querySelector(".project-dropdown-options-container").classList.toggle('dropdown-option-container-visibility-toggler');
    });

    document.querySelector(".sprint-dropdown").addEventListener('click', (e) => {
        document.querySelector(".sprint-dropdown-options-container").classList.toggle('dropdown-option-container-visibility-toggler');
    });
}

dropdownHandler();
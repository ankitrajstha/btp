document.addEventListener("DOMContentLoaded", () => {
  // Project Dropdown
  const projectChevron = document.getElementById("projectChevron");
  const projectDropdownOptions = document.getElementById(
    "projectDropdownOptions"
  );

  projectChevron.addEventListener("click", () => {
    projectDropdownOptions.classList.toggle("show");
  });

  // Sprint Dropdown
  const sprintChevron = document.getElementById("sprintChevron");
  const sprintDropdownOptions = document.getElementById(
    "sprintDropdownOptions"
  );

  sprintChevron.addEventListener("click", () => {
    sprintDropdownOptions.classList.toggle("show");
  });

  // Close dropdowns if the user clicks outside
  document.addEventListener("click", (event) => {
    if (
      !event.target.matches("#projectChevron") &&
      !event.target.matches("#sprintChevron")
    ) {
      projectDropdownOptions.classList.remove("show");
      sprintDropdownOptions.classList.remove("show");
    }
  });
});

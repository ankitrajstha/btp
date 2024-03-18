import getData from "./static/apiData.js";
import updateCharts from "./charts.js";

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

getData().then(data => {

    // Function to create colored div
    function createColoredDiv(color) {
        const div = document.createElement("div");
        div.classList.add("status-color");
        div.style.backgroundColor = color;
        return div;
    }

    // Function to create paragraph with specified text and ID attribute
    function createParagraph(text, id) {
        const p = document.createElement("p");
        p.textContent = text;
        p.setAttribute("data-attr-id", id);
        return p;
    }

    // Function to create list item with highlight or milestone
    function createListItem(content) {
        const li = document.createElement("li");
        const disc = document.createElement("span");
        disc.classList.add("disc");
        const description = document.createElement("p");
        description.innerHTML = content;
        li.appendChild(disc);
        li.appendChild(description);
        return li;
    }

    // Function to create project or sprint element
    function createElement(container, item, clickHandler) {
        const elementDiv = document.createElement("div");
        elementDiv.classList.add(container === "project" ? "project-dropdown-option" : "sprint-dropdown-option");
        const statusColorDiv = createColoredDiv(item.status === 'critical' ? '#cc3333' :
            item.status === 'on track' ? '#4eb011' :
                item.status === 'caution' ? '#e9e906' : '#2f4858');
        statusColorDiv.setAttribute("data-attr-id", item.id);
        const nameParagraph = createParagraph(item.name, item.id);
        elementDiv.appendChild(statusColorDiv);
        elementDiv.appendChild(nameParagraph);
        elementDiv.addEventListener("click", clickHandler);
        return elementDiv;
    }

    // Function to render project highlights or sprint highlights
    function renderHighlights(container, items, createFunction) {
        const containerElement = document.querySelector(container);
        containerElement.innerHTML = "";
        items.forEach(item => {
            const listItem = createFunction(item);
            containerElement.appendChild(listItem);
        });
    }

    function renderTechnicalDebt(container, content) {
        const containerElement = document.querySelector(container)
        containerElement.innerHTML = content;
    }

    //function to view status and update accordingly
    function statuscolor(statusel, status) {
        const statusMap = {
            'critical': { color: '#cc3333', text: 'Critical' },
            'on track': { color: '#4eb011', text: 'On Track' },
            'caution': { color: '#e9e906', text: 'Caution' },
            'halt': { color: '#2f4858', text: 'Halt' }
        };

        const { color, text } = statusMap[status] || { color: '', text: '' };

        statusel.style.backgroundColor = color;
        statusel.innerText = text;
    }

    // Function to handle project click
    function handleProjectClick(e) {
        const projectId = parseInt(e.target.dataset.attrId);
        const clickedProject = data.projects.find(project => project.id === projectId);

        // Update project status pill
        let projectPill = document.querySelector('.project-status-pill');
        let projectPillstatus = clickedProject.status;
        statuscolor(projectPill, projectPillstatus);

        // Update project dropdown
        // Select Sprint dropdown
        const projectDropdown = document.querySelector(".project-dropdown");

        // Remove existing project paragraph
        const existingProjectParagraph = projectDropdown.querySelector("p");
        if (existingProjectParagraph) {
            projectDropdown.removeChild(existingProjectParagraph);
        }

        // Create and insert new project paragraph
        const selectedProject = createParagraph(clickedProject.name, clickedProject.id);
        let chevronDownImg = projectDropdown.querySelector("img");
        projectDropdown.insertBefore(selectedProject, chevronDownImg);

        // Update sprint dropdown
        // Select Sprint dropdown
        const sprintDropdown = document.querySelector(".sprint-dropdown");

        // Remove existing sprint paragraph
        const existingSprintParagraph = sprintDropdown.querySelector("p");
        if (existingSprintParagraph) {
            sprintDropdown.removeChild(existingSprintParagraph);
        }

        // Create and insert new sprint paragraph
        const selectedSprint = createParagraph(clickedProject.sprints[0].name, clickedProject.sprints[0].id);
        let chevronDown = sprintDropdown.querySelector("img");
        sprintDropdown.insertBefore(selectedSprint, chevronDown);

        // Remove existing sprint options
        document.querySelectorAll('.sprint-dropdown-option').forEach(option => option.remove());

        // Render sprint elements
        clickedProject.sprints.forEach(sprint => {
            const sprintElement = createElement("sprint", sprint, handleSprintClick);
            document.querySelector(".sprint-dropdown-options").appendChild(sprintElement);
        });

        // Render default sprint value on clicking the project
        const sprintId = parseInt(sprintDropdown.querySelector("p").dataset.attrId);
        handleSprintClick({ target: { dataset: { attrId: sprintId } } });

        // Render project highlights
        renderHighlights(".project-hightlights-list", clickedProject.highlights, createListItem);

        // Render project milestones
        renderHighlights(".milestones-list", clickedProject.milestones.map(milestone => milestone.name), createListItem);

        // Render Technical debt
        renderTechnicalDebt(".technical-debt > p", clickedProject.technical_debt);
    }

    // Function to handle sprint click
    function handleSprintClick(e) {
        const sprintId = parseInt(e.target.dataset.attrId);
        const clickedSprint = data.projects.flatMap(project => project.sprints).find(sprint => sprint.id === sprintId);


        let sprintPill = document.querySelector('.sprint-status-pill');
        let sprintPillstatus = clickedSprint['status'];
        statuscolor(sprintPill, sprintPillstatus);

        //update sprint name in dropdown
        document.querySelector(".sprint-dropdown > p").innerHTML = clickedSprint.name;


        // Update sprint duration
        document.querySelector(".date-chart-container > p").innerHTML = `${clickedSprint.start_date} to ${clickedSprint.end_date}`;

        // Render sprint highlights
        // Update sprint description and use sprint highlights after api is updated
        // Currently sprint highlights array is not present so description is passed as an array
        renderHighlights(".sprint-hightlights-list", [clickedSprint.description], createListItem);

        updateCharts(clickedSprint);
    }

    // Render project elements
    let projects = data.projects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    projects.forEach(project => {
        const projectElement = createElement("project", project, handleProjectClick);
        document.querySelector(".project-dropdown-options").appendChild(projectElement);
    });

    // Initial call to render default data
    handleProjectClick({ target: { dataset: { attrId: projects[0].id } } })
    handleSprintClick({ target: { dataset: { attrId: projects[0].sprints[0].id } } })

});

import getData from "./static/apiData.js";
import updateCharts from "./charts.js";
import { taskStatusDropdownToggle, taskStatusModalDropdownToggle } from "./charts/taskStatus/chartOptionDropdown.js";
import { taskTypeDropdownToggle, taskTypeModalDropdownToggle } from "./charts/taskType/chartOptionDropdown.js";

// Initialize event listeners for chart dropwdown menu 
taskStatusDropdownToggle();
taskTypeDropdownToggle();
taskStatusModalDropdownToggle();
taskTypeModalDropdownToggle();

function toggleDropdown(dropdownSelector, optionsContainerSelector) {
    // Select required values to close dropdown
    let chevronDown = document.querySelector(dropdownSelector + " img"),
        selectedProjectDiv = document.querySelector(dropdownSelector + " .selected-option-container"),
        dropdownListOptions = document.querySelector(optionsContainerSelector);

    // Toggle class to display and hid the dropdown
    document.querySelector(dropdownSelector).addEventListener('click', (e) => {
        dropdownListOptions.classList.toggle('dropdown-option-container-visibility-toggler');
    });

    // Hide dropdown upon clicking anywhere outside of the toggler
    window.addEventListener("click", (event) => {
        const isInside = chevronDown.contains(event.target) || selectedProjectDiv.contains(event.target);

        if (!isInside) {
            dropdownListOptions.classList.remove('dropdown-option-container-visibility-toggler');
        }
    });
}

function dropdownHandler() {
    toggleDropdown(".project-container", ".project-dropdown-options-container");
    toggleDropdown(".sprint-container", ".sprint-dropdown-options-container");
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

    // Function to create list item with highlight or milestone
    function createGraphView(content) {
        const li = document.createElement("li");
        li.classList.add(content.completed === true ? "active" : "inactive");
        li.innerHTML = content.name;
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

    // Function to render technical debt
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

    // Function to render team members
    function renderTeamMembers(parentContainer, teamMembers) {
        const teamMembersList = document.querySelector(parentContainer);

        // Clear previous content
        teamMembersList.innerHTML = '';

        teamMembers.forEach(member => {
            // Create list item for each team member
            const listItem = document.createElement('li');

            // Create image element
            const img = document.createElement('img');
            img.src = member.image;
            img.alt = 'profile';
            img.height = "33";
            img.width = "33";
            img.style.borderRadius = "50%";
            listItem.appendChild(img);

            // Create container for member title and subtitle
            const titleContainer = document.createElement('div');
            titleContainer.classList.add('team-members-title-container');

            // Create member title (name)
            const title = document.createElement('p');
            title.classList.add('team-members-title');
            title.textContent = member.name;
            titleContainer.appendChild(title);

            // Create member subtitle (designation)
            const subtitle = document.createElement('p');
            subtitle.classList.add('team-members-subtitle');
            subtitle.textContent = member.designation;
            titleContainer.appendChild(subtitle);

            // Append title container to list item
            listItem.appendChild(titleContainer);

            // Append list item to the team members list
            teamMembersList.appendChild(listItem);
        });
    }

    // Function to handle project click
    function handleProjectClick(e) {

        // Get project id and identify the clicked project
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

        renderHighlights('.timeline', clickedProject.milestones.map(milestone => milestone), createGraphView);

        // Render Technical debt
        renderTechnicalDebt(".technical-debt > p", clickedProject.technical_debt);

        // Render Resources
        let resorcesContainer = document.querySelectorAll(".resources-quantity-container");
        for (let i = 0; i < Object.entries(clickedProject.resources).length; i++) {
            resorcesContainer[i].innerHTML = Object.entries(clickedProject.resources)[i][1];
        }

        // Select DOM Elements
        const navbarSlider = document.querySelector('.navbar-slider');
        const navSliderButtons = document.querySelectorAll('.nav-slider-button');

        // Flatten Team Members Array
        const projectTeamMembers = clickedProject.sprints.flatMap(sprint => sprint.team_members);

        // Handle Slider Click Function
        const handleSliderClick = () => {
            const designation = document.querySelector('.nav-slider-item.selected p').innerHTML;
            const filteredMembers = (designation === "All") ? projectTeamMembers : projectTeamMembers.filter(mem => mem.designation.toLowerCase() === designation.toLowerCase());
            renderTeamMembers(".members-list", filteredMembers);
        };

        // Add Event Listeners
        navbarSlider.addEventListener('click', handleSliderClick);
        navSliderButtons.forEach(button => button.addEventListener('click', handleSliderClick));

        // Render Team Members Initially
        renderTeamMembers(".members-list", projectTeamMembers);

        // let sliderItemsCounter = document.querySelectorAll('.nav-slider-item');
        // for (let i = 0; i < sliderItemsCounter.length; i++) {
        //     sliderItemsCounter[i].querySelector("span").innerHTML = projectTeamMembers.length;
        //     console.log(sliderItemsCounter[i])
        // }
    }
    // Function to handle sprint click
    function handleSprintClick(e) {

        // Get sprint id and identify the selected sprint
        const sprintId = parseInt(e.target.dataset.attrId);
        const clickedSprint = data.projects.flatMap(project => project.sprints).find(sprint => sprint.id === sprintId);

        // Update status color of the sprint pill
        let sprintPill = document.querySelector('.sprint-status-pill');
        let sprintPillstatus = clickedSprint['status'];
        statuscolor(sprintPill, sprintPillstatus);

        //update sprint name in dropdown
        document.querySelector(".sprint-dropdown > p").innerHTML = clickedSprint.name;

        // Update sprint duration
        document.querySelector(".date-chart-container > p").innerHTML = `${clickedSprint.start_date} to ${clickedSprint.end_date}`;

        // Render sprint highlights
        renderHighlights(".sprint-hightlights-list", clickedSprint.description, createListItem);

        // Render Team Members
        renderTeamMembers('.team-members-list', clickedSprint.team_members);
        document.querySelector(".team-members h4 > span").innerHTML = `[${clickedSprint.team_members.length}]`;

        // Update Charts based on selected sprint
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

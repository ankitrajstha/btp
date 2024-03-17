// Chart data
// Task type chart data 

async function getData() {
    try {
        let res = await fetch("https://run.mocky.io/v3/546328f9-af1a-479d-ab48-e34c57343b03");
        let data = await res.json();

        const projects = data.projects
        const clientSatisfaction = data.projects[0].sprints[0].client_satisfaction;
        const teamMorale = data.projects[0].sprints[0].team_morale;

        const taskTypeData = [15, 9, 25, 30, 15, 6]; // Replace with actual data from API later
        const taskTypelabels = [
            "Task",
            "Sub Task",
            "Task Maintenance",
            "Bug",
            "Epic",
            "Bug Leakage",
        ]; // Replace with actual data from API later

        // Task status chart data
        const taskStatusData = [15, 9, 25, 30, 15, 6]; // Replace with actual data from API later
        const taskStatusLabels = [
            "Todo",
            "In Progress",
            "Awaiting Dev Review",
            "In Review",
            "Complete",
            "Blocked",
        ]; // Replace with actual data from API later

        // Story points chart data
        const storyPointsData = [
            {
                name: 'Completed',
                type: 'column',
                data: [35, 45, 32, 30, 22]
            },
            {
                name: 'Assigned',
                type: 'line',
                data: [45, 50, 35, 40, 25]
            }]; // Replace with actual data from API later
        const storyPointsLabels = [
            'Ram',
            'Shyam',
            'Hari',
            'Shiva',
            'Sita'
        ]; // Replace with actual data from API later

        // Log hours chart data
        const logHoursData = [
            {
                name: 'Billable Hours',
                type: 'line',
                data: [60, 55, 60, 58, 52]
            },
            {
                name: 'Available Hours',
                type: 'column',
                data: [38, 38, 28, 40, 21]
            },
            {
                name: 'Estimated Hours',
                type: 'column',
                data: [38, 48, 36, 40, 21]
            },
            {
                name: 'Logged Hours',
                type: 'column',
                data: [13, 22, 30, 19, 15]
            }]; // Replace with actual data from API later
        const logHoursLabels = [
            'Ram',
            'Shyam',
            'Hari',
            'Shiva',
            'Sita'
        ]; // Replace with actual data from API later

        // Client Data chart data
        const clientDataData = [3.1, 2.3, 10.1, 4]; // Replace with actual data from API later
        const clientDataLabels = [
            "CS Support",
            "Dev Support",
            "Client Call",
            "Site Visit"
        ]; // Replace with actual data from API later

        return {
            projects, clientSatisfaction, teamMorale,
            taskTypeData, taskTypelabels, taskStatusData,
            taskStatusLabels, storyPointsData, storyPointsLabels,
            logHoursData, logHoursLabels, clientDataData, clientDataLabels
        };
    } catch (err) {
        console.log(err);
    }
}

export default getData;

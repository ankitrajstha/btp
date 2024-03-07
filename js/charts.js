document.addEventListener("DOMContentLoaded", function () {
    renderChart()
})

renderChart = () => {
    var taskTypeChart = {
        chart: {
            width: "100%",
            height: "192px",
            type: "donut",
        },
        plotOptions: {
            pie: {
                offsetX: -65,
                offsetY: 5,
                customScale: 0.9,
            }
        },
        legend: {
            fontSize: '10px',
            fontFamily: "Poppins",
            offsetX: -8,
            offsetY: 15,
            itemMargin: {
                vertical: -1
            },
            markers: {
                width: 14,
                height: 14,
                offsetX: -5,
                offsetY: 3
            },
        },
        series: [14, 13, 23, 30, 15, 5],
        labels: ['Task', 'Sub Task', 'Task Maintenance', 'Bug', 'Epic', 'Bug Leakage']
    }

    var chart = new ApexCharts(document.querySelector("#taskTypeChart"), taskTypeChart);
    chart.render();
}
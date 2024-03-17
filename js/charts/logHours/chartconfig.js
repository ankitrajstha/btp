import shortLabel from "../../helpers/shortLabel.js";

const getChartConfig = (chartType, data, labels, inModal) => {
    // Shorten labels for bar chart by taking the initals of long labels
    var newLabels = shortLabel(labels);
    labels = Object.keys(newLabels);

    const colorArray = labels.map(() => '#ACACAC');
    // Chart Configuration
    const chartConfig = {
        chart: {
            width: "100%",
            height: '90%',
            type: chartType,
            toolbar: {
                show: false,
            }
        },
        series: data,
        labels: labels,
        colors: ['#FFAD33', '#ED4B82', '#2E93FA', '#00E396'],
        legend: {
            fontSize: inModal ? '12px' : '10px',
            fontFamily: "Poppins",
            itemMargin: {
                horizontal: 25,
            },
            markers: {
                width: 14,
                height: 14,
                offsetX: -5,
                radius: '4px'
            },
        },
        // X-axis labels for bar charts with custom styling
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    colors: colorArray
                },
            },
        },
        // Mapping shortened labels to display their fullforms when hover
        tooltip: {
            enabled: true,
            x: {
                formatter: (val) => {
                    return newLabels[val] || val;
                },
            },
        },
        stroke: {
            width: [2, 0, 0, 0]
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1, 2, 3],
            offsetY: -7,
            style: {
                fontSize: '9px',
                fontFamily: 'Poppins',
                fontWeight: 400,
                colors: ['#2B2B2B']
            },
            background: {
                enabled: false
            },
            dropShadow: {
                enabled: false,
            }
        },
    };

    return chartConfig;
};

export default getChartConfig;
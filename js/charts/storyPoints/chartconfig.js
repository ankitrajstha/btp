import shortLabel from "../../helpers/shortLabel.js";

const getChartConfig = (chartType, data, labels, inModal) => {
    // Shorten labels for bar chart by taking the initals of long words
    var newLabels = shortLabel(labels);
    labels = Object.keys(newLabels);

    const colorArray = labels.map(() => '#ACACAC');
    // Initial configuration for all charts
    const chartConfig = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
            width: "100%",
            type: chartType,
            height: '90%',
            toolbar: {
                show: false,
            }
        },
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
        series: data,
        labels: labels,

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
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },
        stroke: {
            width: [0, 4]
        }
    };
    return chartConfig;
};

export default getChartConfig;
import shortLabel from "../../helpers/shortLabel.js";

const getChartConfig = (chartType, data, labels, inModal) => {
    // Chart Configuration
    const chartConfig = {
        chart: {
            width: "100%",
            type: chartType,
        },
        legend: {
            fontSize: inModal ? '12px' : '10px',
            fontFamily: "Poppins",
        },
        series: chartType === "bar" ? [{ name: "Data", data }] : data,
        labels: labels,
        dataLabels: {
            style: {
                fontSize: inModal ? '20px' : '10px',
                fontFamily: "Poppins",
                fontWeight: '400',
            },
            dropShadow: {
                enabled: false,
            }
        },
        colors: ['#546E7A', '#00E396', '#FFAD33', '#ED4B82', '#775DD0', '#2E93FA']
    };

    // Chart configuration for pie chart, outlined and filled
    if (chartType !== "bar") {
        chartConfig.legend = {
            ...{
                offsetX: inModal ? -30 : -2,
                offsetY: inModal ? 10 : -2,
                itemMargin: {
                    vertical: inModal ? 2.55 : -1,
                },
                markers: {
                    width: 14,
                    height: 14,
                    offsetX: -5,
                    offsetY: 3,
                },
            }
        },
            chartConfig["plotOptions"] = {
                pie: {
                    offsetX: inModal ? -40 : -55,
                    offsetY: inModal ? -5 : -30,
                    customScale: inModal ? 0.95 : 0.75,
                    donut: {
                        size: 65
                    }
                },
            };
    }
    // Addtional chart configuration for bar chart
    if (chartType === "bar") {
        // Shorten labels for bar chart by taking the initals of long words
        var newLabels = shortLabel(labels);
        labels = Object.keys(newLabels);

        chartConfig.chart.height = '90%'

        chartConfig['plotOptions'] = {
            'bar': {
                distributed: true
            }
        }
        chartConfig.legend = {
            ...{
                offsetX: 2,
                itemMargin: {
                    horizontal: 12,
                },
            }
        }
        // Remove hamburger icon with download options in bar chart
        chartConfig.chart["toolbar"] = {
            show: false,
        };

        chartConfig.dataLabels = {
            ...{
                enabledOnSeries: [1]
            }
        }
        // X-axis labels for bar charts with custom styling
        chartConfig["xaxis"] = {
            categories: labels,
            labels: {
                show: false
            },
        };
        // Mapping shortened labels to display their fullforms when hover
        chartConfig["tooltip"] = {
            enabled: true,
            x: {
                formatter: (val) => {
                    return newLabels[val] || val;
                },
            },
        };
    }

    return chartConfig;
};

export default getChartConfig;
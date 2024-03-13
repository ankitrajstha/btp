import shortLabel from "./shortLabel.js";

const getChartConfig = (chartType, data, labels, inModal) => {
    // Initial configuration for all charts
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
        labels: labels
    };

    // Chart configuration for pie chart, outlined and filled
    if (chartType !== "bar" && chartType !== 'line') {
        chartConfig['dataLabels'] = {
            style: {
                fontSize: inModal ? '20px' : '10px',
                fontFamily: "Poppins",
                fontWeight: '400',
            },
            dropShadow: {
                enabled: false,
            }
        }
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
    if (chartType === "bar" || chartType == 'line') {
        // Shorten labels for bar chart by taking the initals of long words
        var newLabels = shortLabel(labels);
        labels = Object.keys(newLabels);

        chartConfig.chart.height = '90%'
        const colorArray = labels.map(() => '#ACACAC');

        // X-axis labels for bar charts with custom styling
        chartConfig["xaxis"] = {
            categories: labels,
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    colors: colorArray
                },
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
        // Remove hamburger icon with download options in bar chart
        chartConfig.chart["toolbar"] = {
            show: false,
        };

        chartConfig['dataLabels'] = {
            enabled: true,
            enabledOnSeries: [1],
        }
        chartConfig['stroke'] = {
            width: [0, 4]
        }
        chartConfig.legend = {
            ...{
                itemMargin: {
                    horizontal: 25,
                },
                markers: {
                    width: 14,
                    height: 14,
                    offsetX: -5,
                    radius: '4px'
                },
            }
        }
        if (data.length > 2) {
            chartConfig.stroke = {
                width: [2, 0, 0, 0]
            }
            chartConfig.dataLabels = {
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
            }
        }

    }

    if (inModal && (chartType !== "bar" && chartType !== 'line')) {
        chartConfig.chart.height = "100%";
    }

    return chartConfig;
};

export default getChartConfig;
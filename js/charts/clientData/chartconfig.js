const getChartConfig = (chartType, data, labels, inModal) => {
    // Chart Configuration
    const chartConfig = {
        chart: {
            width: "100%",
            height: '90%',
            type: chartType,
            // Remove hamburger icon with download options in bar chart
            toolbar: {
                show: false,
            }
        },
        series: [{ name: "Data", data }],
        labels: labels,
        plotOptions: {
            bar: {
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            },
        },
        colors: ['#ED4B82', '#FFAD33', '#2E93FA', '#00E396'],
        dataLabels: {
            enabled: true,
            offsetY: -15,
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
        legend: {
            fontSize: inModal ? '12px' : '10px',
            fontFamily: "Poppins",
            itemMargin: {
                horizontal: inModal ? 20 : 40,
            },
            markers: {
                width: 14,
                height: 14,
                offsetX: -5,
                radius: '4px',
            },
            onItemClick: {
                toggleDataSeries: false
            },
        },
        xaxis: {
            categories: labels,
            labels: {
                show: false
            },
        },
    };

    return chartConfig;
};

export default getChartConfig;
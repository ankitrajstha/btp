import getRadialBarColor from "../../helpers/radialBarColor.js";
const createRadialBarChart = (series) => {
  // Set color of radial bar according to series data value
  const radialBarColorSelected = getRadialBarColor(series);

  // Chart Configuration
  const chartConfig = {
    height: 20,
    series: [series],
    colors: [radialBarColorSelected],
    chart: {
      type: "radialBar",
      offsetY: -8,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "40%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontFamily: "Poppins",
            fontWeight: 600,
            offsetY: -2,
            fontSize: "14px",
          },
        },
      },
    },
  }

  return chartConfig;
};

export default createRadialBarChart;

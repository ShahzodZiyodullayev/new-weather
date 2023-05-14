import React from "react";
import Chart from "react-apexcharts";

const options = {
  series: [
    {
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#ffffff"],
        },
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          return `<img src="https://yourdomain.com/your-image.png" width="20" height="20" /> ${val}`;
        },
      },
    },
  ],
};

const Appp = () => (
  <Chart options={options} series={options.series} type="line" height={350} />
);

export default Appp;

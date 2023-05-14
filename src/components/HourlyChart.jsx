import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

const hourlyChartOptions = {
  chart: {
    type: "candlestick",
    height: 350,
    toolbar: { show: false },
    zoom: { enabled: false },
    offsetX: 5,
    offsetY: -10,
    animations: {
      enabled: true,
      easing: "linear",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 350,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  markers: {
    size: 0,
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: ["#FFB3AA"],
    width: 1,
    dashArray: 0,
  },
  fill: {
    colors: ["#fb7c7c"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#00A4FF"],
      type: "vertical",
      shadeIntensity: 0,
      opacityFrom: 0.7,
      opacityTo: 0,
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  yaxis: {
    labels: { show: false },
  },
  grid: {
    show: false,
  },
};

function HourlyChart() {
  const { hourly, customization } = useSelector((state) => state);
  const [series, setSeries] = useState([{}]);
  const chartRef = useRef();
  const [fromLeft, setFromLeft] = useState();

  const [options, setOptions] = useState(hourlyChartOptions);

  useEffect(() => {
    setFromLeft(chartRef.current.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    setSeries([
      {
        name: "Baland",
        data: hourly ? hourly.filter((_, i) => i < 24).map((e) => e.temp) : [],
      },
    ]);
  }, [hourly]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [customization.bool ? "#000" : "#fff"],
      dataLabels: {
        enabled: true,
        offsetY: -4,
        formatter: (val) => val + "°",
        background: {
          enabled: false,
        },
        style: {
          fontSize: "12px",
          fontFamily: '"Comfortaa", cursive',
          colors: [customization.bool ? "#000" : "#fff"],
        },
      },
      xaxis: {
        type: "category",
        categories: hourly
          ? hourly
              .filter((e, i) => i < 24)
              .map((e) => {
                let date = new Date(e.dt * 1000);
                return `${date.getHours()}:00`;
              })
          : [],
        axisTicks: {
          show: false,
        },
        tickPlacement: "on",
        labels: {
          show: true,
          style: {
            colors: customization.bool ? "#000" : "#fff",
            fontFamily: '"Comfortaa", cursive',
            fontWeight: 800,
          },
        },
        axisBorder: {
          show: false,
        },
      },
    }));
  }, [hourly, customization.bool]);

  return (
    <Grid
      ref={chartRef}
      sx={{
        height: "300px",
        width: "100%",
        // overflowX: "scroll",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          width: 0,
        },
        cursor: "pointer",
      }}
    >
      <Draggable
        axis="x"
        bounds={{ left: fromLeft - 2000, right: 0 }}
        defaultPosition={{ x: 0, y: 0 }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          width="2000px"
          height="100%"
        />
      </Draggable>
    </Grid>
  );
}

export default HourlyChart;

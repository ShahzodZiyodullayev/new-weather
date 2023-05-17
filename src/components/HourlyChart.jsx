import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import { colorSequence } from "../helper/chartColor";
import IconSelector from "../helper/IconSelector";
import fff from "../assets/bolt.png";

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
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    // colors: colorSequence,
    colors: ["#FFE45C"],
    width: 3,
    dashArray: 0,
  },
  fill: {
    opacity: 0,
    type: "solid",
    colors: ["#fff"],
    // colors: ["#fb7c7c"],
    // type: "gradient",
    // gradient: {
    //   gradientToColors: ["#00A4FF"],
    //   type: "vertical",
    //   shadeIntensity: 0,
    //   opacityFrom: 0.7,
    //   opacityTo: 0,
    // },
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

      markers: {
        show: true,
        size: 5,
        shape: "circle",
        strokeColors: ["#FFE45C"],
        strokeWidth: 2,
        colors: customization.bool ? "#F9F9F9" : "#151D2A",
      },
      dataLabels: {
        enabled: true,
        offsetY: "100%",
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
      // annotations: {
      //   points: hourly
      //     .filter((_, i) => i < 24)
      //     .map((data, i) => ({
      //       x: `${new Date(data.dt * 1000).getHours()}:00`,
      //       y: "0px",
      //       image: {
      //         path: `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`,
      //         width: 40,
      //         height: 40,
      //         // offsetX: 0,
      //         // offsetY: 0,
      //       },
      //     })),
      // },
    }));
  }, [hourly, customization.bool]);

  return (
    <Grid
      ref={chartRef}
      sx={{
        height: "200px",
        width: "100%",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          width: 0,
        },
        cursor: "pointer",
        background: "rgba(200, 200, 200, 0.1)",
        borderRadius: "20px",
        mb: 1,
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

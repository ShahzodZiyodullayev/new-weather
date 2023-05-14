import { useEffect, useState } from "react";
import cloud from "../assets/cloud.png";
import bolt from "../assets/bolt.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import haze from "../assets/haze.png";
import sunny from "../assets/sunny.png";
import moon from "../assets/moon.png";
import { useSelector } from "react-redux";

const IconSelector = ({ id, width = 100, alt }) => {
  const { current } = useSelector((state) => state);
  const [icon, setIcon] = useState("");

  const curr = current && new Date(current.dt * 1000).getHours();
  const sunrise = current && new Date(current.sunrise * 1000).getHours();
  const sunset = current && new Date(current.sunset * 1000).getHours();

  const isDay = current && curr > sunrise && curr < sunset ? true : false;

  useEffect(() => {
    if (id > 199 && id < 233) setIcon(bolt);
    if (id > 299 && id < 322) setIcon(drizzle);
    if (id > 499 && id < 532) setIcon(rain);
    if (id > 599 && id < 623) setIcon(snow);
    if (id > 700 && id < 781) setIcon(haze);
    if (id === 800 && isDay) {
      setIcon(sunny);
    } else {
      setIcon(moon);
    }
    if (id > 800 && id < 805) setIcon(cloud);
  }, [id]);

  return <img src={icon} alt={alt} width={`${width}px`} />;
};

export default IconSelector;

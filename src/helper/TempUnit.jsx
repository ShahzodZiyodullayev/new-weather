export const TempUnit = (isCel = true, temp, isFirst = false) => {
  let temperature;
  if (isFirst)
    temperature = isCel
      ? Math.round(temp - 273.15)
      : Math.round(1.8 * (temp - 273) + 32);

  if (!isFirst)
    temperature = isCel
      ? Math.round(((temp - 32) * 5) / 9)
      : Math.round(temp * 1.8 + 32);

  return temperature;
};

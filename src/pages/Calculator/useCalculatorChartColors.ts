import { useState } from "react";

export const useCalculatorChartColors = () => {
  const [colors] = useState({
    startingAmount: "#0088FE",
    contributions: "#8884d8",
    interest: "#82ca9d",
  });
  return colors;
};

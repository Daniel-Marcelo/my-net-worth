import { useState } from "react";
import format from "date-fns/format";
import { YF } from "../../types/yahoo-finance";

export const useChartData = () => {
  const [chartData, setChartData] = useState([]);

  const updateChartData = (result: YF.Result) => {
    const prices = result.indicators.quote[0].close.map((price) => Math.round(price * 100) / 100);
    const dates = result.timestamp.map((t) => {
      const date = new Date(1970, 0, 1);
      // console.log(t)
      date.setSeconds(t);
      // console.log(date)
      return date;
    });
    const data = dates.map((date, index) => ({
      name: format(date, "MM/dd/yyyy"),
      price: prices[index],
    }));
    setChartData(data);
  };

  return [chartData, updateChartData] as const;
};

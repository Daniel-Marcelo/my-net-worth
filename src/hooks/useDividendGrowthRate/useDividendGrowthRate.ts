import { useEffect, useState } from "react";
import { YearToNumber } from "../../types";

export const useDividendGrowthRate = (averageAnnualIncrease: YearToNumber, year: number) => {
  const [dividendGrowthRate, setDividendGrowthRate] = useState<number>();

  useEffect(() => {
    console.log("use effect growth");
    if (averageAnnualIncrease && averageAnnualIncrease[year]) {
      setDividendGrowthRate(+(averageAnnualIncrease[year] / 100).toFixed(3));
    }
  }, [averageAnnualIncrease]);

  return [dividendGrowthRate, setDividendGrowthRate] as const;
};

import { BarChartEntry, ContributionPeriodValue } from "./Calculator.model";

export const useInvestmentCalculator = () => {
  // const [chartData, setChartData] = useState([]);

  const periods = {
    [ContributionPeriodValue.Weekly]: 52,
    [ContributionPeriodValue.BiWeekly]: 26,
    [ContributionPeriodValue.Monthly]: 12,
    [ContributionPeriodValue.Annually]: 1,
  };

  const calculate = (
    contributionPeriod: ContributionPeriodValue,
    rateOfReturn: number,
    startingAmount: number,
    years: number,
    additionalContribution: number
  ) => {
    // let totalPieContributions
    const items = [] as BarChartEntry[];
    const period = periods[contributionPeriod];
    const periodicalInterestRate = rateOfReturn / 100 / period;
    let totalContributions = 0;
    let total = startingAmount;

    for (let y = 1; y <= years; y += 1) {
      let contributions = 0;
      for (let i = 1; i <= period; i += 1) {
        total += total * periodicalInterestRate;
        total += additionalContribution;
        contributions += additionalContribution;
      }
      totalContributions += contributions;

      if (y === 1) {
        console.log(contributions);
        console.log(totalContributions);
      }

      items.push({
        name: `Year ${y}`,
        startingAmount,
        interest: +(total - contributions).toFixed(2),
        contributions: +(contributions + y === 1 ? 0 : totalContributions).toFixed(2),
      });

      //   console.log(chartData);
    }

    return [items, total] as const;

    // setChartData(items);

    // setTotalValue(total);
  };

  return calculate;
};

// const onKeyDown = (event) => {
//   console.log(event.keyCode)
//    if (event.keyCode == 8 || event.keyCode == 0 || event.keyCode == 13) return false;

//    if(event.keyCode >= 48 && event.keyCode <= 57) {
//     // setYears(event.target.value)
//     return true;
//    }
// }

/* <TextField
      type="text"
      value={value}
      variant="outlined"
      inputProps={{
        maxLength: 6,
        // step: "1",
        pattern:"^[1-9]\d*(\.\d+)?$"
      }}
      onChange={(e) => setValue(''+ parseFloat(e.target.value))}
    /> */

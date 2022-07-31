import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useState } from "react";
import numeral from "numeral";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ContributionPeriodValue } from "./Calculator.model";
import { useContributionPeriodOptions } from "./useContributionPeriodOptions";

export function Calculator() {
  const [startingAmount, setStartingAmount] = useState(1000);
  const [additionalContribution, setAdditionalContribution] = useState(100);
  const [rateOfReturn, setRateOfReturn] = useState(8);
  const [contributionPeriod, setContributionPeriod] = useState(ContributionPeriodValue.Monthly);
  const [years, setYears] = useState(10);
  const [totalValue, setTotalValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const contributionPeriodOptions = useContributionPeriodOptions();
  // const [value, setValue] = useState("");

  // const onKeyDown = (event) => {
  //   console.log(event.keyCode)
  //    if (event.keyCode == 8 || event.keyCode == 0 || event.keyCode == 13) return false;

  //    if(event.keyCode >= 48 && event.keyCode <= 57) {
  //     // setYears(event.target.value)
  //     return true;
  //    }
  // }
  const periods = {
    [ContributionPeriodValue.Weekly]: 52,
    [ContributionPeriodValue.BiWeekly]: 26,
    [ContributionPeriodValue.Monthly]: 12,
    [ContributionPeriodValue.Annually]: 1,
  };

  const calculate = () => {
    const items = [];
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

      items.push({
        name: `Year ${y}`,
        interest: +(total - contributions).toFixed(2),
        contributions: +(contributions + totalContributions).toFixed(2),
      });

      console.log(chartData);
    }

    setChartData(items);

    setTotalValue(total);
  };

  const valdate = () => {
    calculate();
  };

  return (
    <x.div p={16}>
      <Typography variant="h3" component="div" sx={{ textAlign: "center", flexGrow: 1 }}>
        Investment Calculator
      </Typography>
      <x.div mt={8} display="flex" justifyContent="space-between">
        <TextField
          value={startingAmount}
          type="number"
          onChange={(event) => setStartingAmount(+event.target.value)}
          label="Starting Amount"
          variant="outlined"
        />
        <TextField
          value={additionalContribution}
          type="number"
          onChange={(event) => setAdditionalContribution(+event.target.value)}
          label="Additional Contribution"
          variant="outlined"
        />

        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Period"
            value={contributionPeriod}
            onChange={(event) => setContributionPeriod(event.target.value as ContributionPeriodValue)}
          >
            {contributionPeriodOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          value={rateOfReturn}
          onChange={(event) => setRateOfReturn(+event.target.value)}
          label="Rate of Return"
          variant="outlined"
        />

        <TextField
          value={years}
          type="number"
          inputProps={{
            min: "1",
            step: "1",
          }}
          // onKeyDownCapture={onKeyDown}
          onChange={(event) => {
            console.log(`Setting years to ${event.target.value}`);
            setYears(+event.target.value);
          }}
          label="Years to Grow"
          variant="outlined"
        />

        <Button variant="contained" onClick={valdate}>
          Calculate
        </Button>
      </x.div>

      {totalValue ? (
        <Typography variant="h6" component="div" sx={{ textAlign: "center", mt: 2, flexGrow: 1 }}>
          £{numeral(totalValue).format("0,0.00")}
        </Typography>
      ) : (
        ""
      )}

      {chartData.length ? (
        <BarChart
          width={1000}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="contributions" stackId="a" fill="#8884d8" />
          <Bar dataKey="interest" stackId="a" fill="#82ca9d" />
        </BarChart>
      ) : null}

      {/* <TextField
      type="text"
      value={value}
      variant="outlined"
      inputProps={{
        maxLength: 6,
        // step: "1",
        pattern:"^[1-9]\d*(\.\d+)?$"
      }}
      onChange={(e) => setValue(''+ parseFloat(e.target.value))}
    /> */}
    </x.div>
  );
}

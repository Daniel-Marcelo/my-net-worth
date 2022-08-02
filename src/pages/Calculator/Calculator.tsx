import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useState } from "react";
import numeral from "numeral";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";
import { ContributionPeriodValue } from "./Calculator.model";
import { useContributionPeriodOptions } from "./useContributionPeriodOptions";
import { useInvestmentCalculator } from "./useInvestmentCalculator";
import { useLabelize } from "../../hooks/useLabelize";

function CustomTooltip({ active, payload, label }: TooltipProps<string, string>) {
  const [colors] = useState({
    startingAmount: "#0088FE",
    contributions: "#8884d8",
    interest: "#82ca9d",
  });
  const labelize = useLabelize();
  const [currency] = useState("£");
  if (active && payload && payload.length) {
    return (
      <x.div background="#fff" p={4} borderRadius="4" borderWidth={1} borderStyle="solid" borderColor="lightgray">
        <x.div p={1} className="label">{`${label}`}</x.div>
        <x.div p={1} color={colors[payload[0].dataKey]} className="label">{`${labelize(
          payload[0].name
        )} : ${currency}${numeral(payload[0].value).format("0,0.00")}`}</x.div>
        <x.div p={1} color={colors[payload[1].dataKey]} className="label">{`${labelize(
          payload[1].name
        )} : ${currency}${numeral(payload[1].value).format("0,0.00")}`}</x.div>
        <x.div p={1} color={colors[payload[2].dataKey]} className="label">{`${labelize(
          payload[2].name
        )} : ${currency}${numeral(payload[2].value).format("0,0.00")}`}</x.div>
      </x.div>
    );
  }

  return null;
}

export function Calculator() {
  const [colors] = useState({
    startingAmount: "#0088FE",
    contributions: "#8884d8",
    interest: "#82ca9d",
  });
  const [currency] = useState("£");
  const [startingAmount, setStartingAmount] = useState(1000);
  const [additionalContribution, setAdditionalContribution] = useState(100);
  const [rateOfReturn, setRateOfReturn] = useState(8);
  const [contributionPeriod, setContributionPeriod] = useState(ContributionPeriodValue.Monthly);
  const [years, setYears] = useState(10);
  const [totalValue, setTotalValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [clickedCalculate, setClickedCalculate] = useState(false);
  const contributionPeriodOptions = useContributionPeriodOptions();
  const calculateInvestment = useInvestmentCalculator();
  const labelize = useLabelize();

  const validate = () => {
    setClickedCalculate(true);
    if (contributionPeriod && rateOfReturn && startingAmount && years && additionalContribution) {
      const [chartRows, total] = calculateInvestment(
        contributionPeriod,
        rateOfReturn,
        startingAmount,
        years,
        additionalContribution
      );
      setChartData(chartRows);
      const pie = chartRows[chartRows.length - 1];
      setPieData([
        {
          name: "Starting Amount",
          key: "startingAmount",
          value: pie.startingAmount,
        },
        {
          name: "Contributions",
          key: "contributions",
          value: pie.contributions,
        },
        {
          name: "Interest",
          key: "interest",
          value: pie.interest,
        },
      ]);
      setTotalValue(total);
    }
  };

  const isError = (v: number | ContributionPeriodValue) => !v;
  const getHelperText = (v: number | ContributionPeriodValue) => (v ? "" : "Please enter a value");

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
          helperText={clickedCalculate && getHelperText(startingAmount)}
          error={clickedCalculate && isError(startingAmount)}
        />
        <TextField
          value={additionalContribution}
          type="number"
          onChange={(event) => setAdditionalContribution(+event.target.value)}
          label="Additional Contribution"
          variant="outlined"
          helperText={clickedCalculate && getHelperText(additionalContribution)}
          error={clickedCalculate && isError(additionalContribution)}
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
          helperText={clickedCalculate && getHelperText(rateOfReturn)}
          error={clickedCalculate && isError(rateOfReturn)}
        />
        <TextField
          value={years}
          type="number"
          inputProps={{
            min: "1",
            step: "1",
          }}
          onChange={(event) => {
            console.log(`Setting years to ${event.target.value}`);
            setYears(+event.target.value);
          }}
          label="Years to Grow"
          variant="outlined"
          helperText={clickedCalculate && getHelperText(years)}
          error={clickedCalculate && isError(years)}
        />

        <Button variant="contained" onClick={validate}>
          Calculate
        </Button>
      </x.div>

      {totalValue ? (
        <Typography variant="h6" component="div" sx={{ textAlign: "center", my: 4, flexGrow: 1 }}>
          £{numeral(totalValue).format("0,0.00")}
        </Typography>
      ) : (
        ""
      )}
      <x.div display="flex" justifyContent="center">
        {chartData.length ? (
          <BarChart width={1000} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="1 1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={(props: TooltipProps<string, string>) => <CustomTooltip {...props} />} />
            <Legend formatter={(value, entry, index) => labelize(value)} />
            <Bar dataKey="startingAmount" stackId="a" fill={colors.startingAmount} />
            <Bar dataKey="contributions" stackId="a" fill={colors.contributions} />
            <Bar dataKey="interest" stackId="a" fill={colors.interest} />
          </BarChart>
        ) : null}
        {true ? (
          <x.div ml={12} display="flex" flexDirection="column" justifyContent="center">
            <PieChart width={200} height={200}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={entry.key} fill={colors[entry.key]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => (
                  // console.log(value)
                  // console.log(name)
                  // console.log(props)
                  <x.span color={colors[props.payload.key]}>
                    {currency}
                    {numeral(value).format("0,0.00")}
                  </x.span>
                )}
              />
            </PieChart>
          </x.div>
        ) : (
          ""
        )}
      </x.div>
    </x.div>
  );
}

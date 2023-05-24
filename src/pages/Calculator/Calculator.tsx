import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useState } from "react";
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
  ResponsiveContainer,
} from "recharts";
import { ContributionPeriodLabel, ContributionPeriodValue } from "../../models/Calculator";
import { useInvestmentCalculator } from "./useInvestmentCalculator";
import { useLabelize } from "../../hooks/useLabelize";
import { useFormatNumber } from "../../hooks/useFormatNumber";

const calculatorColours = {
  startingAmount: "#0088FE",
  contributions: "#8884d8",
  interest: "#82ca9d",
};
function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  const labelize = useLabelize();
  const format = useFormatNumber();
  const [currency] = useState("£");
  if (active && payload && payload.length) {
    return (
      <x.div background="#fff" p={4} borderRadius="4" borderWidth={1} borderStyle="solid" borderColor="lightgray">
        <x.div p={1} className="label">{`${label}`}</x.div>
        <x.div p={1} color={calculatorColours[payload[0].dataKey]} className="label">{`${labelize(
          payload[0].name
        )} : ${currency}${format(payload[0].value)}`}</x.div>
        <x.div p={1} color={calculatorColours[payload[1].dataKey]} className="label">{`${labelize(
          payload[1].name
        )} : ${currency}${format(payload[1].value)}`}</x.div>
        <x.div p={1} color={calculatorColours[payload[2].dataKey]} className="label">{`${labelize(
          payload[2].name
        )} : ${currency}${format(payload[2].value)}`}</x.div>
      </x.div>
    );
  }

  return null;
}

const contributionPeriodOptions = [
  {
    value: ContributionPeriodValue.Weekly,
    label: ContributionPeriodLabel.Weekly,
  },
  {
    value: ContributionPeriodValue.BiWeekly,
    label: ContributionPeriodLabel.BiWeekly,
  },
  {
    value: ContributionPeriodValue.Monthly,
    label: ContributionPeriodLabel.Monthly,
  },
  {
    value: ContributionPeriodValue.Annually,
    label: ContributionPeriodLabel.Annually,
  },
];

export function Calculator() {
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

  const calculateInvestment = useInvestmentCalculator();
  const labelize = useLabelize();
  const format = useFormatNumber();

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
    <x.div display="flex" flexDirection="column" p={16}>
      <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
        Investment Calculator
      </Typography>
      <x.div display="flex">
        <x.div display="flex">
          <x.div mt={2}>
            <x.div>
              <TextField
                value={startingAmount}
                type="number"
                onChange={(event) => setStartingAmount(+event.target.value)}
                label="Starting Amount"
                variant="outlined"
                helperText={clickedCalculate && getHelperText(startingAmount)}
                error={clickedCalculate && isError(startingAmount)}
              />
            </x.div>
            <x.div mt={2}>
              <TextField
                value={additionalContribution}
                type="number"
                onChange={(event) => setAdditionalContribution(+event.target.value)}
                label="Additional Contribution"
                variant="outlined"
                helperText={clickedCalculate && getHelperText(additionalContribution)}
                error={clickedCalculate && isError(additionalContribution)}
              />
            </x.div>
            <x.div mt={2}>
              <FormControl variant="outlined" sx={{ minWidth: 195 }}>
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
            </x.div>
            <x.div mt={2}>
              <TextField
                type="number"
                value={rateOfReturn}
                onChange={(event) => setRateOfReturn(+event.target.value)}
                label="Rate of Return"
                variant="outlined"
                helperText={clickedCalculate && getHelperText(rateOfReturn)}
                error={clickedCalculate && isError(rateOfReturn)}
              />
            </x.div>
            <x.div mt={2}>
              <TextField
                value={years}
                type="number"
                inputProps={{
                  min: "1",
                  step: "1",
                }}
                onChange={(event) => {
                  setYears(+event.target.value);
                }}
                label="Years to Grow"
                variant="outlined"
                helperText={clickedCalculate && getHelperText(years)}
                error={clickedCalculate && isError(years)}
              />
            </x.div>
            <Button variant="contained" onClick={validate} sx={{ marginTop: 1 }}>
              Calculate
            </Button>
          </x.div>
        </x.div>
        <x.div flex={1} display="flex" h="50vh" mt={4}>
          {chartData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="1 1 1" />
                <XAxis dataKey="name" />
                <YAxis width={60} />
                <Tooltip content={CustomTooltip} />
                <Legend formatter={(value) => labelize(value)} />
                <Bar dataKey="startingAmount" stackId="a" fill={calculatorColours.startingAmount} />
                <Bar dataKey="contributions" stackId="a" fill={calculatorColours.contributions} />
                <Bar dataKey="interest" stackId="a" fill={calculatorColours.interest} />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </x.div>
      </x.div>
      {/* {totalValue ? (
        <Typography variant="h6" component="div" sx={{ textAlign: "center", my: 4, flexGrow: 1 }}>
          {currency}
          {format(totalValue)}
        </Typography>
      ) : null} */}
      <x.div display="flex" h="50vh" w="100%" mt={4}>
        {chartData.length ? (
          // <ResponsiveContainer width="100%" height="100%">
          //   <BarChart data={chartData} margin={{ left: 0 }}>
          //     <CartesianGrid strokeDasharray="1 1 1" />
          //     <XAxis dataKey="name" />
          //     <YAxis width={60} />
          //     <Tooltip content={CustomTooltip} />
          //     <Legend formatter={(value) => labelize(value)} />
          //     <Bar dataKey="startingAmount" stackId="a" fill={calculatorColours.startingAmount} />
          //     <Bar dataKey="contributions" stackId="a" fill={calculatorColours.contributions} />
          //     <Bar dataKey="interest" stackId="a" fill={calculatorColours.interest} />
          //   </BarChart>
          // </ResponsiveContainer>
          <></>
        ) : null}
        <x.div h="30vh" w="100%" mt={4}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry) => (
                  <Cell key={entry.key} fill={calculatorColours[entry.key]} />
                ))}
              </Pie>
              <Tooltip
                // eslint-disable-next-line react/no-unstable-nested-components
                formatter={(value: number, name: string, props) => (
                  // console.log(value)
                  // console.log(name)
                  // console.log(props)
                  // eslint-disable-next-line react/prop-types
                  <x.span color={calculatorColours[props.payload.key]}>
                    {currency}
                    {format(value)}
                  </x.span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </x.div>
      </x.div>
    </x.div>
  );
}

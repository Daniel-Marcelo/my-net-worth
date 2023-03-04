/* eslint-disable no-nested-ternary */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import range from "lodash/range";
import { useGetHistoryQuery } from "../../hooks/useGetHistoryQuery";
import { useQueries } from "@tanstack/react-query";
import { useFinance } from "../../services";
import { format } from "date-fns";
import { useState } from "react";
import { YFDividendHistory } from "../../types/yahoo-finance.d";
import { useCalculateDividendFrequency } from "../DividendDiscountModel/useCalculateDividendFrequency";
interface DividendCalendarProps {
  rowData: any[];
}

const currentYear = new Date().getFullYear();

interface DividendData {
  date: Date;
  year: number;
  month: number;
  day: number;
  amount: number;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Months = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
type Days =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

type MonthToRow = {
  [P in Months]: {
    [Z in Days]: number;
  };
};

const monthToRowTemplate = range(1, 13).reduce(
  (acc, item) =>
    ({
      ...acc,
      [item]: range(1, 32).reduce((acc2, day) => ({ ...acc2, [day]: 0 } as const), {}),
    } as const),
  {}
);

export function DividendCalendar({ rowData }: DividendCalendarProps) {
  const finance = useFinance();
  const [his, setHis] = useState<any>({});
  const calculateDividendFrequency = useCalculateDividendFrequency();

  // console.log(monthToRowTemplate);
  useQueries({
    queries: ["PG"].map((item) => ({
      queryKey: ["something", item],
      queryFn: () => finance.getDividendHistory(item),
      onSuccess: (data) => {
        const thisYearLastYearDividends = Object.entries(data)
          .filter(([key]) => {
            const t = new Date(1970, 0, 1);
            t.setSeconds(+key);
            const year = +format(t, "yyyy");
            return year >= currentYear - 1;
          })
          .map(([key, value]) => {
            const t = new Date(1970, 0, 1);
            t.setSeconds(+key);
            return {
              date: t,
              amount: (value as any).amount,
              year: +format(t, "yyyy"),
              month: +format(t, "MM"),
              day: +format(t, "dd"),
            };
          })
          .sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
        const mostRecentDividendAmount = thisYearLastYearDividends[0];
        console.log(thisYearLastYearDividends);
        const lastYearDividends = thisYearLastYearDividends.filter((div) => div.year === currentYear - 1);
        lastYearDividends.forEach((div) => {
          const divsForMonth = monthToRowTemplate[div.month];
          divsForMonth[div.day] = +divsForMonth[div.day] + mostRecentDividendAmount.amount;
        });
        console.log(monthToRowTemplate);
        // setHis({ ...his, [item]: lastYearsDividendsForTicker });
      },
    })),
  });

  console.log(Object.values(monthToRowTemplate));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            {range(1, 32).map((value) => (
              <TableCell>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(monthToRowTemplate).map(([month, days]) => (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{months[+month - 1]}</TableCell>
              {range(1, 32).map((num) => (
                <TableCell>{days[num]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

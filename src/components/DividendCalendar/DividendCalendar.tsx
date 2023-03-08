/* eslint-disable no-nested-ternary */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import range from "lodash/range";
import { months, MonthToRow } from "../../types";

interface DividendCalendarProps {
  monthToRow: MonthToRow;
}

export function DividendCalendar({ monthToRow }: DividendCalendarProps) {
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
          {Object.entries(monthToRow).map(([month, days]) => (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{months[+month - 1]}</TableCell>
              {range(1, 32).map((num) => (
                <TableCell>{days[num] ? days[num] : "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

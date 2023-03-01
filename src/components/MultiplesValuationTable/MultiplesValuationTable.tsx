import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { x } from "@xstyled/styled-components";
import { MultiplesTableRow } from "../../models";

interface MultiplesValuationTableProps {
  rowData: MultiplesTableRow[];
  setRowData: (rowData: MultiplesTableRow[]) => void;
}

export function MultiplesValuationTable({ rowData, setRowData }: MultiplesValuationTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Company</TableCell>
            <TableCell align="right">Stock Price</TableCell>
            <TableCell align="right">Earnings Per Share</TableCell>
            <TableCell align="right">Price to earnings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.ticker} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>
                <x.div
                  textAlign="center"
                  onClick={() => {
                    setRowData(rowData.filter((item) => item.ticker !== row.ticker));
                  }}
                >
                  <RemoveCircleIcon
                    sx={{
                      color: "red",
                      "&:hover": {
                        color: "darkred",
                      },
                      cursor: "pointer",
                    }}
                  />
                </x.div>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.ticker}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.eps}</TableCell>
              <TableCell align="right">{row.pe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import { Button } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useGetSimilarCompanies } from "../../hooks";
import { MultiplesValuationTable } from "../MultiplesValuationTable";

interface MultiplesTabProps {
  ticker: string;
}
export function MultiplesTab({ ticker }: MultiplesTabProps) {
  const [rowData, setRowData, callback] = useGetSimilarCompanies(ticker);

  return (
    <>
      <x.div mb={4}>
        <Button variant="contained" onClick={callback}>
          Load default
        </Button>
      </x.div>
      {!!rowData.length && <MultiplesValuationTable rowData={rowData} setRowData={setRowData} />}
    </>
  );
}

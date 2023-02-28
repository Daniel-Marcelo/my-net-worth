import { where } from "firebase/firestore";
import { usePolySymbolV1Service } from "../../services";
import { useMyQuery } from "../../hooks/useMyQuery";

interface MultiplesTabProps {
  ticker: string;
}
export function MultiplesTab({ ticker }: MultiplesTabProps) {
  const symbolsApi = usePolySymbolV1Service();

  const query = useMyQuery({
    queryKey: ["getSymbolV1", ticker],
    queryFn: () => symbolsApi.getByQuery(where("symbol", "==", ticker)),
  });

  console.log(query.data);
  return <div>{ticker}</div>;
}

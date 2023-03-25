import { useEffect, useState } from "react";
import { useQuoteStore } from "../../stores";

export const useNumberOfShares = () => {
  const [numberOfShares, setNumberOfShares] = useState<number>();
  const { quote: selectedQuote } = useQuoteStore();

  useEffect(() => {
    setNumberOfShares(undefined);
  }, [selectedQuote]);

  return [numberOfShares, setNumberOfShares] as const;
};

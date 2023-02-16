import { useEffect, useState } from "react";
import { useQuoteStore } from "../../stores";

export const useNumberOfShares = () => {
  const [numberOfShares, setNumberOfShares] = useState<number>();
  const { selectedQuote } = useQuoteStore((state) => state);

  useEffect(() => {
    setNumberOfShares(undefined);
  }, [selectedQuote]);

  return [numberOfShares, setNumberOfShares] as const;
};

import { create } from "zustand";
import { Quote } from "../models";

interface QuoteStoreData {
  selectedQuote: Quote;
  ticker: string;
  setSelectedQuote: (quote: Quote) => void;
}
const quoteStore = create<QuoteStoreData>((set) => ({
  selectedQuote: null,
  ticker: "",
  setSelectedQuote: (selectedQuote) => {
    set({ selectedQuote });
    set({ ticker: selectedQuote.ticker });
  },
}));

export const useQuoteStore = () => quoteStore((state) => state);

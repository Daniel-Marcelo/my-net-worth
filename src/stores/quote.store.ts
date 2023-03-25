import { create } from "zustand";
import { Quote } from "../models";

interface QuoteStoreData {
  quote: Quote;
  ticker: string;
  setQuote: (quote: Quote) => void;
}
const quoteStore = create<QuoteStoreData>((set) => ({
  quote: null,
  ticker: "",
  setQuote: (selectedQuote) => {
    set({ quote: selectedQuote });
    set({ ticker: selectedQuote.ticker });
  },
}));

export const useQuoteStore = () => quoteStore((state) => state);

import { create } from "zustand";
import { Quote } from "../models";

interface QuoteStoreData {
    selectedQuote: Quote;
    setSelectedQuote: (quote: Quote) => void
}
export const useQuoteStore = create<QuoteStoreData>((set) => ({
    selectedQuote: null,
    setSelectedQuote: (selectedQuote) => set(({selectedQuote}))
}))

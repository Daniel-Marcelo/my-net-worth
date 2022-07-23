import { Quote, QuoteType } from "../../models/Quote";

export const useTickerSearch =
  () =>
  async (text: string): Promise<Quote[]> => {
    const response = await fetch(`/search?q=${text}`);
    const data = await response.json();
    return data.quotes
      .filter((quote) => ![QuoteType.Future, QuoteType.Option].includes(quote.quoteType))
      .map((quote) => ({
        ticker: quote.symbol,
        name: quote.shortname,
      }));
  };

import { Quote } from "../models";
import { Finance } from "./useFinance";
import * as mockPriceHistory from "./data.json";

const getMockPrices = () => {
  const data = JSON.parse(JSON.stringify(mockPriceHistory));
  return data.chart.result[0].indicators.quote[0].close as number[];
};

export const useLocalFinance = (): Finance => {
  const getPriceHistory = async () => {
    const data = JSON.parse(JSON.stringify(mockPriceHistory));
    const timestamps = data.chart.result[0].timestamp as number[];
    const prices = getMockPrices();
    const randomNumber = Math.round(Math.random());
    const mockUpdatedPrices = randomNumber === 1 ? prices : [...prices.sort()];

    return [timestamps, mockUpdatedPrices.map((price) => Math.round(price * 100) / 100)];
  };

  const searchForTicker = async (text: string): Promise<Quote[]> => [
    { ticker: "APPL", name: "Apple" },
    { ticker: "GOOG", name: "Google" },
    { ticker: "FB", name: `FB` },
    { ticker: `${text}`, name: `${text}-name` },
  ];

  return {
    getPriceHistory,
    searchForTicker,
  } as const;
};

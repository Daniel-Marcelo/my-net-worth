import { Quote } from "../models";
import { Finance } from "./useFinance";
import * as mockPriceHistory from "./price-history.json";
import * as mockModules from "./finance-modules.json";
import { YFModule } from "../types/yahoo-finance";

const getMockPrices = () => {
  const data = JSON.parse(JSON.stringify(mockPriceHistory));
  return data.chart.result[0].indicators.quote[0].close as number[];
};

export const useLocalFinance = (): Finance => {
  const getPriceHistory = async () => {
    const data = JSON.parse(JSON.stringify(mockPriceHistory));
    const result = data.chart.result[0];
    return result;
  };
  const getTimesAndPrices = async () => {
    const data = JSON.parse(JSON.stringify(mockPriceHistory));
    const timestamps = data.chart.result[0].timestamp as number[];
    const prices = getMockPrices();
    const randomNumber = Math.round(Math.random());
    const mockUpdatedPrices = randomNumber === 1 ? prices : [...prices.sort()];

    return [timestamps, mockUpdatedPrices.map((price) => Math.round(price * 100) / 100)];
  };

  const searchForTicker = async (text: string): Promise<Quote[]> => [
    { ticker: "APPL", name: "Apple", exchangeDisplay: "New York" },
    { ticker: "GOOG", name: "Google", exchangeDisplay: "New York" },
    { ticker: "FB", name: `FB`, exchangeDisplay: "New York" },
    { ticker: `${text}`, name: `${text}-name`, exchangeDisplay: "New York" },
  ];

  return {
    getPriceHistory,
    getTimesAndPrices,
    searchForTicker,
    getModules: () => Promise.resolve(mockModules as YFModule.RootObject),
    getSummaryProfile: async () => {
      const response = mockModules as YFModule.RootObject;
      return response.quoteSummary.result[0].summaryProfile;
    },
  } as const;
};

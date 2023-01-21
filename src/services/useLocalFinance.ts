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
    getSummaryProfile: (stock: string) =>
      Promise.resolve({
        address1: "One Apple Park Way",
        city: "Cupertino",
        state: "CA",
        zip: "95014",
        country: "United States",
        phone: "408 996 1010",
        website: "https://www.apple.com",
        industry: "Consumer Electronics",
        sector: "Technology",
        longBusinessSummary:
          "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. In addition, the company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. Further, it provides AppleCare support and cloud services store services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. Additionally, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.",
        fullTimeEmployees: 164000,
        companyOfficers: [],
        maxAge: 86400,
      }),
  } as const;
};

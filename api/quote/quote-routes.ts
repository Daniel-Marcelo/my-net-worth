import * as express from "express";
import { QuoteType } from "../models/yahoo-finance";
import { PriceChartInterval, PriceChartTimeRange } from "../models/yahoo-finance/price-history";
import { yahooFinanceService } from "../services/yahoo-finance";

export const router = express.Router();
router.get("/ticker", async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const tickerSearchResponse = await yahooFinanceService.searchForTicker(req.query.q as string);
  res.end(
    JSON.stringify(
      tickerSearchResponse.quotes
        .filter((quote) => [QuoteType.Etf, QuoteType.Equity].includes(quote.quoteType as QuoteType))
        .map((quote) => ({
          ticker: quote.symbol,
          name: quote.shortname,
          exchangeDisplay: quote.exchDisp,
        }))
    )
  );
});

router.get("/modules/:ticker", async (req, res) => {
  const priceHistoryResponse = await yahooFinanceService.getModules(req.params.ticker);
  res.end(JSON.stringify(priceHistoryResponse));
});

router.get("/events/:ticker", async (req, res) => {
  const eventsResponse = await yahooFinanceService.getEvents(req.params.ticker);
  res.end(JSON.stringify(eventsResponse));
});

router.get("/price-history/:ticker", async (req, res) => {
  const priceHistoryResponse = await yahooFinanceService.getPriceHistory(
    req.params.ticker,
    req.query.range as PriceChartTimeRange,
    req.query.interval as PriceChartInterval
  );
  res.end(JSON.stringify(priceHistoryResponse.chart.result[0]));
});

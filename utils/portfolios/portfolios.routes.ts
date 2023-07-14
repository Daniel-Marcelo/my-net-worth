import * as express from "express";
import { DeletePortfolioEntriesRequest, PortfolioEntry } from "../models/PortfolioEntry";
import { portfolioService } from "./portfolio-service";

const portfoliosRouter = express.Router();

portfoliosRouter.get("/:id", async (req, res) => {
  const portfolioId = req.params.id;
  const data = await portfolioService.get(portfolioId);
  res.send(JSON.stringify(data));
});

portfoliosRouter.get("", async (req, res) => {
  const data = await portfolioService.getList();
  res.send(JSON.stringify(data));
});

portfoliosRouter.post("", async (req, res) => {
  const portfolioEntry = req.body as PortfolioEntry;
  await portfolioService.create(portfolioEntry);
  res.send(JSON.stringify({ success: true }));
});

portfoliosRouter.delete("", async (req, res) => {
  const portfolioEntry = req.body as DeletePortfolioEntriesRequest;
  await portfolioService.deleteList(portfolioEntry.ids);
  res.send(JSON.stringify({ success: true }));
});

export default portfoliosRouter;

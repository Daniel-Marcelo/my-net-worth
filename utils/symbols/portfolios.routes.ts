import * as express from "express";
import { symbolService } from "./symbol-service";
import { DeletePortfolioEntriesRequest, PortfolioEntry } from "../models/PortfolioEntry";

const symbolsRouter = express.Router();

symbolsRouter.get("/:id", async (req, res) => {
  const portfolioId = req.params.id;
  const data = await portfolioService.get(portfolioId);
  res.send(JSON.stringify(data));
});

symbolsRouter.get("", async (req, res) => {
  const data = await portfolioService.getList();
  res.send(JSON.stringify(data));
});

symbolsRouter.post("", async (req, res) => {
  const portfolioEntry = req.body as PortfolioEntry;
  await portfolioService.create(portfolioEntry);
  res.send(JSON.stringify({ success: true }));
});

symbolsRouter.delete("", async (req, res) => {
  const portfolioEntry = req.body as DeletePortfolioEntriesRequest;
  await portfolioService.deleteList(portfolioEntry.ids);
  res.send(JSON.stringify({ success: true }));
});

export default symbolsRouter;

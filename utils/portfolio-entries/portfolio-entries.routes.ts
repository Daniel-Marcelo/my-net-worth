import * as express from "express";
import { portfolioEntryService } from "../services/portfolio-entry-service";
import { DeletePortfolioEntriesRequest, PortfolioEntry } from "../models/PortfolioEntry";

const portfolioEntriesRouter = express.Router();

portfolioEntriesRouter.get("/:id", async (req, res) => {
  const portfolioId = req.params.id;
  const data = await portfolioEntryService.getEntriesByPortfolioId(portfolioId);
  res.send(JSON.stringify(data));
});

portfolioEntriesRouter.get("", async (req, res) => {
  const data = await portfolioEntryService.getList();
  res.send(JSON.stringify(data));
});

portfolioEntriesRouter.post("", async (req, res) => {
  const portfolioEntry = req.body as PortfolioEntry;
  await portfolioEntryService.create(portfolioEntry);
  res.send(JSON.stringify({ success: true }));
});

portfolioEntriesRouter.delete("", async (req, res) => {
  const portfolioEntry = req.body as DeletePortfolioEntriesRequest;
  await portfolioEntryService.deleteList(portfolioEntry.ids);
  res.send(JSON.stringify({ success: true }));
});

export default portfolioEntriesRouter;

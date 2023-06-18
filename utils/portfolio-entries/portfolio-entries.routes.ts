import * as express from "express";
import { portfolioEntryService } from "../services/portfolio-entry-service";

const portfolioEntriesRouter = express.Router();

portfolioEntriesRouter.get("/:id", async (req, res) => {
  const portfolioId = req.params.id;
  const data = await portfolioEntryService.getEntriesByPortfolioId(portfolioId);
  res.send(JSON.stringify(data));
});

export default portfolioEntriesRouter;

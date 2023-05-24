import * as express from "express";

const portfolioEntriesRouter = express.Router();

portfolioEntriesRouter.post("/:id", async (req, res) => {
  console.log(req);
  res.send(JSON.stringify({ status: "success" }));
});

export default portfolioEntriesRouter;

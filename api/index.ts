/* eslint-disable import/no-relative-packages */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import quoteRouter from "../utils/quote/quote-routes";
import portfolioEntriesRouter from "../utils/portfolio-entries/portfolio-entries.routes";

const app = express();
dotenv.config();
app.use(cors());

app.get("/api/getList", (req, res) => {
  fetch("https://query2.finance.yahoo.com/v1/finance/search?q=AAPL")
    .then((data) => {
      data.json().then((d) => {
        res.end(JSON.stringify(d));
      });
    })
    .catch((er) => console.log(er));
});

app.use("/api/quote", quoteRouter);
app.use("/api/portfolio-entries", portfolioEntriesRouter);

app.get("");
console.log("__dirname", __dirname);
console.log("__dirname", `${__dirname}/../build/index.html`);

app.get("*", (req, res) => {
  // console.log(res);
  console.log("catch all triggered");
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

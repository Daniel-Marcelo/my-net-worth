import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { RequestInfo, RequestInit } from "node-fetch";

// const path = require("path");

// const got = require('got');
const app = express();

dotenv.config();
app.use(cors());

const fetchData = (url: URL | RequestInfo, init?: RequestInit | undefined) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

app.get("/api/getList", (req, res) => {
  fetchData("https://query2.finance.yahoo.com/v1/finance/search?q=AAPL")
    .then((data) => {
      data.json().then((d) => {
        res.end(JSON.stringify(d));
      });
    })
    .catch((er) => console.log(er));
});

app.get("");

// Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
// });

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
export { app };

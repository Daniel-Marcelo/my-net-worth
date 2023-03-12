const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const path = require("path");

// const got = require('got');
const { pipeline } = require("stream");
dotenv.config();
app.use(cors());

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/api/getList", (req, res) => {
  fetch("https://query2.finance.yahoo.com/v1/finance/search?q=AAPL")
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

module.exports = app;

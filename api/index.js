import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// const { router } = require("./quote/quote-routes");

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

// app.use("/api/quote", router);

app.get("");
// Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
// });

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

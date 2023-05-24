/* eslint-disable import/no-relative-packages */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import quoteRouter from "../utils/quote/quote-routes";
import portfolioEntriesRouter from "../utils/portfolio-entries/portfolio-entries.routes";
import { db } from "../utils/config/admin";
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

app.get("/api/books", async (req, res) => {
  const booksRef = db.collection("portfolioEntry");
  try {
    console.log("inside");
    booksRef.get().then((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      res.end(JSON.stringify({ status: data }));
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ general: "Something went wrong, please try again" });
  }
});

app.get("*", (req, res) => {
  // console.log(res);
  console.log("catch all triggered");
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

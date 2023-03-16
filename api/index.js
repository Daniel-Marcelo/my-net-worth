const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { router } = require("./quote/quote-routes");

const app = express();
dotenv.config();
app.use(cors());

app.use("/api/quote", router);

app.get("");
// Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
// });

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

module.exports = app;

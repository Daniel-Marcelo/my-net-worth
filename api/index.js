"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-relative-packages */
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var quote_routes_1 = __importDefault(require("../utils/quote/quote-routes"));
var portfolio_entries_routes_1 = __importDefault(require("../utils/portfolio-entries/portfolio-entries.routes"));
var portfolios_routes_1 = __importDefault(require("../utils/portfolios/portfolios.routes"));
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/getList", function (req, res) {
    fetch("https://query2.finance.yahoo.com/v1/finance/search?q=AAPL")
        .then(function (data) {
        data.json().then(function (d) {
            res.end(JSON.stringify(d));
        });
    })
        .catch(function (er) { return console.log(er); });
});
app.use("/api/quote", quote_routes_1.default);
app.use("/api/portfolio-entries", portfolio_entries_routes_1.default);
app.use("/api/portfolios", portfolios_routes_1.default);
app.get("");
// console.log("__dirname", __dirname);
// console.log("__dirname", `${__dirname}/../build/index.html`);
app.get("*", function (req, res) {
    // console.log(res);
    // console.log(req.body);
    console.log("catch all triggered");
    res.sendFile(path_1.default.join("".concat(__dirname, "/../build/index.html")));
});
var port = process.env.API_PORT || 4000;
app.listen(port, function () { return console.log("LISTENING ON PORT ".concat(port)); });

import { tickers } from "./tickers";

describe("Get similar tickers", () => {
  tickers.forEach((ticker) => {
    it("should fetch", () => {
      // cy.on("uncaught:exception", (err, runnable) => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.visit("finance.yahoo.com/quote/" + ticker);

      Cypress.on("fail", (error, runnable) => {
        // if () {
        console.log(error);
        // throw error;
        // }
      });
      cy.get(`button:contains(Accept all)`).click();
      cy.get(`button:contains(Maybe later)`).click();

      // });
      cy.scrollTo(0, 500);
      const text = `Similar to ${ticker}`;
      cy.get(`span:contains(${text})`);
      const similar = [];
      cy.get("#similar-by-symbol > table > tbody > tr > td > a")
        .each((item) => {
          similar.push(item[0].innerText);
        })
        .then(() => {
          const json = { [ticker]: similar };
          cy.task("log", json);
        });
    });
  });
});

import { tickers } from "./tickers";
import { tickersFtse100 } from "./tickers-ftse-100";

describe("Get similar tickers", () => {
  ["ULVR.L"].forEach((ticker) => {
    describe(`${ticker}`, () => {
      it("navigates to url ", () => {
        cy.on("uncaught:exception", (err, runnable) => {
          return false;
        });
        cy.visit("finance.yahoo.com/quote/" + ticker);

        // Cypress.on("fail", (error, runnable) => {
        //   console.log(error);
        // });
        cy.get(`button:contains(Accept all)`).click();
        // cy.get(`button:contains(Maybe later)`).click();
        // });
        // it("should fetch", () => {
        cy.scrollTo(0, 500);
        const text = `Similar to ${ticker}`;
        console.log("checking for similar to");
        // cy.get(`span:contains(${text})`);
        cy.get(`Market Cap`);

        const similar = [];
        console.log("GETTING");
        // cy.get("#similar-by-symbol > table > tbody > tr > td > a")
        cy.get('td[data-test="MARKET_CAP-value"]')
          .each((item) => {
            console.log("in each");
            similar.push(item[0].innerText);
          })
          .then(() => {
            const json = { [ticker]: similar };
            cy.task("logFtse100", json);
          });
      });
    });
  });
});

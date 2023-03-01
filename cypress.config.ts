import { defineConfig } from "cypress";
import fs from "fs";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(json) {
          const data = JSON.parse(fs.readFileSync("./similar.json"));
          fs.writeFileSync(
            `./similar.json`,
            JSON.stringify({
              ...data,
              ...json,
            })
          );
          console.log({
            ...data,
            ...json,
          });

          return null;
        },
      });
      // implement node event listeners here
    },
  },
});

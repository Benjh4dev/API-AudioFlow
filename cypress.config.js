import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "src/test/**/*.spec.js", 
  },
  e2e: {
    specPattern: "src/test/**/*.spec.js", 
    setupNodeEvents(on, config) {

    },
  },
});
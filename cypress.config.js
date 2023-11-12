import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "**/*.spec.js", 
  },
  e2e: {
    specPattern: "**/*.spec.js", 
    setupNodeEvents(on, config) {
      
    },
  },
});


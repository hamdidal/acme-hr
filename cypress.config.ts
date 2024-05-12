import { defineConfig } from 'cypress'
 
export default defineConfig({
  e2e: {
    supportFile:false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
  },
})
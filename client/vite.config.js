// REQUIRES: Import the necessary functions and packages
// EFFECTS: Makes the 'defineConfig' function from the 'vite' package available
import { defineConfig } from 'vite';

// REQUIRES: Import the '@vitejs/plugin-react' package
// EFFECTS: Makes the 'react' plugin from the '@vitejs/plugin-react' package available
import react from '@vitejs/plugin-react';

// REQUIRES: Define and export the Vite configuration
// MODIFIES: The default Vite configuration
// EFFECTS: Returns a Vite configuration object with specified options
export default defineConfig({
  // REQUIRES: Configure the development server
  // MODIFIES: server.proxy configuration
  // EFFECTS: Sets up a proxy for API requests during development to avoid CORS issues
  server: {
    proxy: {
      // REQUIRES: Define the API proxy target
      // MODIFIES: '/api' proxy configuration
      // EFFECTS: Proxies requests to '/api' to 'http://localhost:4000/'
      '/api': 'http://localhost:4000/',

      // REQUIRES: Define the getAllFavoriteTrails proxy target
      // MODIFIES: '/getAllFavoriteTrails' proxy configuration
      // EFFECTS: Proxies requests to '/getAllFavoriteTrails' to 'http://localhost:4000/'
      '/getAllFavoriteTrails': 'http://localhost:4000/',
    },
  },

  // REQUIRES: Add the React plugin
  // MODIFIES: plugins configuration
  // EFFECTS: Includes the 'react' plugin to handle React-specific features in the Vite build process
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react()
  ],
  resolve: {
    alias: {
      '#const': '/src/const',
      '#components': '/src/components',
      '#hooks': '/src/hooks',
      '#utils': '/src/utils',
      '#styles': '/src/styles',
      '#assets': '/src/assets',
      '#routes': '/src/routes',
    },
  }
});

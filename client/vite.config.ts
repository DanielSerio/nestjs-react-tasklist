import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    platform: 'browser'
  },
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react()
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '#const': '/src/const',
      '#components': '/src/components',
      '#hooks': '/src/hooks',
      '#utilities': '/src/utilities',
      '#styles': '/src/styles',
      '#assets': '/src/assets',
      '#routes': '/src/routes',
    },
  }
});

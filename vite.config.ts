import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss,
  },
  server: {
    proxy: {
      // Using the proxy instance
      '/content': 'http://localhost:8080',
    },
  },
  plugins: [react()],
});

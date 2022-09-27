import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss,
  },
  server: {
    proxy: {
      // Using the proxy instance
      '/content': 'http://localhost:8080',
      '/category': 'http://localhost:8080',
      '/link': 'http://localhost:5050',
    },
  },
  plugins: [react(), pluginRewriteAll()],
});

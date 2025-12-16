import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/chat': 'http://localhost:5000',
      '/blogs': 'http://localhost:5000',
      '/payments': 'http://localhost:5000',
    },
  },
  plugins: [
    react(),
    svgr({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeUnknownsAndDefaults: {
                  keepDataAttrs: false,
                },
                removeUselessStrokeAndFill: false,
                cleanupIDs: false,
                collapseGroups: false,
                removeTitle: false,
                convertPathData: false,
                cleanupAttrs: false,
              },
            },
          },
        ],
      },
      throwIfNamespace: false, // Ignore namespace tags
    }),
  ],
});

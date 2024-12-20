import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
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

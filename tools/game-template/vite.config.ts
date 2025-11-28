import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'SHARED_PATH'),
      '@shared/components': path.resolve(__dirname, 'SHARED_PATH/components'),
      '@shared/hooks': path.resolve(__dirname, 'SHARED_PATH/hooks'),
      '@shared/utils': path.resolve(__dirname, 'SHARED_PATH/utils'),
      '@shared/types': path.resolve(__dirname, 'SHARED_PATH/types'),
      '@shared/i18n': path.resolve(__dirname, 'SHARED_PATH/i18n'),
      '@shared/styles': path.resolve(__dirname, 'SHARED_PATH/styles'),
    },
  },
  build: {
    outDir: 'OUTPUT_DIR',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'OUTPUT_FILENAME.js',
        assetFileNames: 'OUTPUT_FILENAME.[ext]',
      },
    },
  },
});

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
      '@shared': path.resolve(__dirname, '../../../shared'),
      '@shared/components': path.resolve(__dirname, '../../../shared/components'),
      '@shared/hooks': path.resolve(__dirname, '../../../shared/hooks'),
      '@shared/utils': path.resolve(__dirname, '../../../shared/utils'),
      '@shared/types': path.resolve(__dirname, '../../../shared/types'),
      '@shared/i18n': path.resolve(__dirname, '../../../shared/i18n'),
      '@shared/styles': path.resolve(__dirname, '../../../shared/styles'),
    },
  },
  build: {
    outDir: '../../../1-ar',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'molmassi.js',
        assetFileNames: 'molmassi.[ext]',
      },
    },
  },
});

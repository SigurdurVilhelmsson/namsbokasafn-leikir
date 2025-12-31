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
    },
  },
  build: {
    outDir: '../../../2-ar',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'lewis-structures': path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'lewis-structures.js',
        assetFileNames: 'lewis-structures.[ext]',
      },
    },
  },
});

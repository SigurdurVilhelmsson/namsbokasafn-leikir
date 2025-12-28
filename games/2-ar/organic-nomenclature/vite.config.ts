import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: '../../../2-ar',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'organic-nomenclature.js',
        assetFileNames: 'organic-nomenclature.[ext]'
      }
    }
  }
})

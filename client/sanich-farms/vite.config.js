import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Ensure base path is set correctly for deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable source maps for production
  },
  server: {
    historyApiFallback: true, // Enable client-side routing fallback during development
  },
  preview: {
    port: 4173,
    historyApiFallback: true, // Enable client-side routing fallback during preview
  }
})

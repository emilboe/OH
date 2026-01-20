import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: base path is set by VITE_BASE_PATH env variable
// If deploying to username.github.io (main repo), set VITE_BASE_PATH to '/'
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
  },
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// For GitHub Pages: base path is set by VITE_BASE_PATH env variable
// If deploying to username.github.io (main repo), set VITE_BASE_PATH to '/'
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        const distPath = join(process.cwd(), 'dist')
        try {
          copyFileSync(join(distPath, 'index.html'), join(distPath, '404.html'))
          console.log('✓ Copied index.html to 404.html')
        } catch (err) {
          console.warn('Failed to copy 404.html:', err)
        }
      }
    }
  ],
  base: base,
  build: {
    outDir: 'dist',
  },
})


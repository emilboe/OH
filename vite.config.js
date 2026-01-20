import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: if your repo is named "OH", use '/OH/'
// If deploying to username.github.io (main repo), use '/'
const base = process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/OH/' : '/')

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
  },
})


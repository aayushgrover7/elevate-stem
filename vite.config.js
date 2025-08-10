import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',              // custom domain lives at the root
  build: {
    outDir: 'docs',       // 👈 GitHub Pages will read from /docs
    emptyOutDir: true
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // fixes broken JS/CSS paths for GitHub Pages + custom domain
})
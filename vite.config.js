import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to your repo name so Pages works
export default defineConfig({
  plugins: [react()],
  base: '/elevate-stem/',
})
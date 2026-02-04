import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base URL for GitHub Pages - uses repo name from environment or defaults to '/'
  // For GitHub Pages: set to '/<repo-name>/' or use environment variable
  base: process.env.GITHUB_ACTIONS ? '/funclick/' : '/',
})

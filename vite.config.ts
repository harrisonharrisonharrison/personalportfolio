import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
  rollupOptions: {
  input: {
  home: '/index.html',
  projects: '/projects.html',
  stats: '/stats.html',
  },
  },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es',
      },
    },
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    headers: {
      'Content-Type': 'text/javascript',
    },
  },
})
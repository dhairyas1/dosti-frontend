import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://dosti-backend-1ign.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    fs: {
      strict: false
    },
    middlewareMode: 'html'
  },
  preview: {
    port: 8000
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1890ff'
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd']
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    }
  },
  optimizeDeps: {
    include: ['antd']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'antd/dist/reset.css': path.resolve(__dirname, 'node_modules/antd/dist/reset.css')
    }
  }
}) 
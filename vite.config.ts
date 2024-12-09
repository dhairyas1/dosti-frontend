import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
      }
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
        'antd/dist/reset.css': 'node_modules/antd/dist/reset.css'
      }
    }
  }
}) 
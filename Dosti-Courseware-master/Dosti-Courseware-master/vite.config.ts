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
          target: command === 'serve' ? 'http://localhost:9000' : env.VITE_API_URL,
          changeOrigin: true,
          secure: command !== 'serve',
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              if (req.headers.userid) {
                proxyReq.setHeader('userid', req.headers.userid);
              }
            });
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
      }
    }
  }
})
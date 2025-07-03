import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://7cf6-103-255-146-15.ngrok-free.app',
      '/uploads': {
        target: 'https://7cf6-103-255-146-15.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          tensorflow: ['@tensorflow/tfjs', '@teachablemachine/image']
        }
      }
    }
  }
})

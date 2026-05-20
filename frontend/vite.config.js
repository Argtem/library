import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'   // ← добавить

export default defineConfig({
  plugins: [react()],
  resolve: {               // ← добавить целиком
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
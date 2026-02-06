import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["bar.ravstormdev.top"],
    proxy: {
      "/api": "http://localhost:5000", // <-- forward all /api requests to backend
    },
  }
    
})

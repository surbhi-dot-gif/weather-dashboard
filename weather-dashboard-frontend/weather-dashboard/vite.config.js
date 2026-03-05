import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://localhost:5000", // local dev backend
      },
    },
    define: {
      // Expose API URL to frontend code
      'process.env.VITE_API_URL': JSON.stringify(
        mode === "development"
          ? "http://localhost:5000/api"
          : "https://your-render-backend.onrender.com/api"
      ),
    },
  }
})

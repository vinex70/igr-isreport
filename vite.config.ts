import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cpg-vite/', //jika ingin menaruh file di laragon
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "http://192.168.226.33:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as process from "process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  define: {
    'process.env.NODE_ENV': `${process.env.NODE_ENV}`
  }
})

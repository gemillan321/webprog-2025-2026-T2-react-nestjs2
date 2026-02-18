import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/guestbook': {
        target: 'http://localhost:5000', // forward requests to backend
        changeOrigin: true,
      },
    },
  },
});
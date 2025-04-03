import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
    },
  },// Specify the output directory for build
  base: '/', // Specify the base path for the application, useful for deployment
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      // Customize Rollup options here
      input: {
        main: './index.html', // Entry point for the application
      },
    },
  },
});

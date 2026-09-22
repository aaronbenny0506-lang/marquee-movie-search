import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps built asset paths relative, so the app works when
export default defineConfig({
  plugins: [react()],
  base: './',
});

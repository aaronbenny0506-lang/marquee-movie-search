import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps built asset paths relative, so the app works when
// served from a GitHub Pages project subpath (username.github.io/repo/).
export default defineConfig({
  plugins: [react()],
  base: './',
});

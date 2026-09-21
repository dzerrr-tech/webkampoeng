import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Jika deploy ke GitHub Pages di sub-path (misalnya username.github.io/repo/),
  // ubah 'base' menjadi '/nama-repo/'. Untuk Netlify/Vercel di root domain, biarkan '/'.
  base: '/',
});

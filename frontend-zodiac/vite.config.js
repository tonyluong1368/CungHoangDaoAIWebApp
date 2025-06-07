import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'CungHoangDaoWebApp';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
});
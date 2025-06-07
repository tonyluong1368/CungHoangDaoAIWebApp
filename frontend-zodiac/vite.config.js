import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'CungHoangDaoAIWebApp';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
});
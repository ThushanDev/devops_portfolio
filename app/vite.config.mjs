import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return entities[char];
  });
}

const appVersion = escapeHtml(process.env.APP_VERSION || '0.1.0');
const gitSha = escapeHtml(process.env.GIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'local');

export default defineConfig({
  root: 'frontend',
  publicDir: '../public',
  plugins: [
    react(),
    {
      name: 'portfolio-build-metadata',
      transformIndexHtml(html) {
        return html.replaceAll('__APP_VERSION__', appVersion).replaceAll('__GIT_SHA__', gitSha);
      },
    },
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

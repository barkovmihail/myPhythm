import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { signup } from './server/signup.mjs'

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.data/**', '**/*.sqlite*'] } },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'early-access',
      configureServer(server) { server.middlewares.use(signup) },
      configurePreviewServer(server) { server.middlewares.use(signup) },
    },
  ],
})

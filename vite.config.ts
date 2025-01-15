import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/my-first-game/', // 레포지토리 이름
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // process.cwd()로 현재 디렉토리 기반 설정
    },
  },
  server: {
    port: 5174,
  },
})

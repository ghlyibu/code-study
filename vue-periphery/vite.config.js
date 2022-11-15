import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
function _resolve(dir) {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  // 配置项目别名
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
})

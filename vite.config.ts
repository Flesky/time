import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Components({
      resolvers: [
        HeadlessUiResolver(),
        IconsResolver(
          // TODO: Configure your icons
          // https://github.com/antfu/unplugin-icons
        ),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      vueTemplate: true,
    }),
    Icons({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

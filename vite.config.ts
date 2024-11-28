import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// 项目中集成了 unplugin-vue-router 时，此处导入VueRouterAutoImports  需用  代替 vue-router
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports:
        [
          'vue',
          'pinia',
          'vue-router'
        ],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 配置路径别名
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src'),
      '@api':path.resolve(__dirname,'src/api'),
      '@config':path.resolve(__dirname,'src/config'),
      '@components':path.resolve(__dirname,'src/components'),
      '@utils':path.resolve(__dirname,'src/utils'),
      '@router':path.resolve(__dirname,'src/router'),
      '@stores':path.resolve(__dirname,'src/stores'),
      '@modules':path.resolve(__dirname,'src/stores/modules'),
      '@views':path.resolve(__dirname,'src/views'),
    },
  },
  // 配置全局css
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true,
        additionalData: `@import "@/styles/global.less";`
      }
    }
  },
  server:{
    // 设置为0.0.0.0 或者true回监听所有的的地址
    host: '0.0.0.0',
    // 项目启动时是否自动在浏览器打开
    open: true,
    // 项目端口
    port: 3000,
    // 代理（解决跨域）
    proxy: {
      '/api':{
        target: 'http://127.0.0.1:8000',// 后端服务器地址
        changeOrigin: true,
        // 去掉请求路径中代理'/api',如果不需要就注释掉
        rewrite:path => path.replace('/api','')
      }
    }
  }
})

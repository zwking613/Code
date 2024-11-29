import App from './App.vue'
import store from '@stores/index.ts'
import router from '@/router'
import  EventBus from "@components/loading/eventBus.ts"
// 引入Element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 样式重置
import "@/styles/reset.less" 
// 全局样式
import "@/styles/common.less";
// 引入tailwindcss样式
import '@/styles/tailwind.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.use(EventBus)
app.use(router)
app.mount('#app')

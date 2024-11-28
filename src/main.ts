import App from './App.vue'
import store from '@stores/index.ts'
import router from '@/router'
import  EventBus from "@components/loading/eventBus.ts"
// 样式重置
import "@/styles/reset.less" 
// 全局样式
import "@/styles/common.less";
// 引入tailwindcss样式
import '@/styles/tailwind.css'

const app = createApp(App)
app.use(router)
app.use(EventBus)
app.use(store)
app.mount('#app')

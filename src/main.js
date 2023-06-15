import { createApp } from 'vue'
import App from './App.vue'

// 引入 Vue-Router
import router from './router'
// 引入 Vuex
import store from './store'
// 引入 Axios
import request from '@/axios'
import VueAxios from 'vue-axios'
// 引入全局混入
import mixin from './mixin'

// 引入 Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入 Element-Plus 图标
import * as ElementPlusIcons from '@element-plus/icons-vue'
// 引入 Element-Plus 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入自定义暗黑模式样式
import '@/assets/css/dark.css'
// 引入国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  if ('Menu' === key) {
    app.component(key + 'Icon', component)
  } else {
    app.component(key, component)
  }
}

app.use(router)
  .use(store)
  .use(VueAxios, request)
  .mixin(mixin)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')

app.provide('axios', request)

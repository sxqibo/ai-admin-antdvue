import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import 'ant-design-vue/dist/reset.css'


axios.defaults.baseURL = process.env.VUE_APP_SERVER

createApp(App).use(store).use(router).use(Antd).mount('#app')

console.log('环境', process.env.NODE_ENV)
console.log('服务端', process.env.VUE_APP_SERVER)

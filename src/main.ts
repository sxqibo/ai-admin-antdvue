/**
 * 引入
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import 'ant-design-vue/dist/reset.css'

/**
 * axios 相关
 */
// 默认请求域
axios.defaults.baseURL = process.env.VUE_APP_SERVER

// axios 请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('请求参数:', config);
    return config;
}, error => {
    console.log('请求错误:', error);
    return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('返回结果:', response)
    return response;
}, error => {
    console.log('返回错误:', error);
    return Promise.reject(error);
})

createApp(App).use(store).use(router).use(Antd).mount('#app')

console.log('环境', process.env.NODE_ENV)
console.log('服务端', process.env.VUE_APP_SERVER)

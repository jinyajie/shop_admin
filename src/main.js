import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElemtntUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'

import axios from 'axios'
Vue.use(ElemtntUI)
// 问题一：每次都要加基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题二：每个组件向使用axios都要引入一次
Vue.prototype.$axios = axios // 以后vue的实例都可以使用$axios(组件 本质就是vue实例)
// 问题三：每次都要携带token 使用请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

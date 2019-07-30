import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElemtntUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
Vue.use(ElemtntUI)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

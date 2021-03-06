import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/user.vue'
import Roles from './components/roles/roles.vue'
import Rights from './components/rights/rights.vue'
import Goods from './components/goods/Goods.vue'
import Categories from './components/categories/Categories.vue'
import GoodsAdd from './components/goods/GoodsAdd.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users/:path?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 1.判断访问的页面是不是登录页
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    // token存在跳转到对应页面，不存在跳转到登录页
    token ? next() : next('/login')
  }
})
export default router

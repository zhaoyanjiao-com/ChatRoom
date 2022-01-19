import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/'){
    console.log(localStorage.getItem('name'));
    if(!localStorage.getItem('name')){
      next('/login')
    }else {
      next()
    }
  }else {
    next()
  }
})
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import register from '../views/Register.vue'
import nf from '../views/404.vue'
import login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '*',
    name: 'notf',
    component: nf
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  const Login = localStorage.Token ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    Login ? next() : next('/login');
  }
})

export default router

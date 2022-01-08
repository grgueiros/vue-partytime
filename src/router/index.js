import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/Login.vue')

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "registrar" */ '../views/Dashboard.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {


  if (to.matched.some(record => record.meta.requiresAuth)) {


    if (!store.getters.authenticated) {
      return next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    }
    return next()
  }

  next()
})

export default router

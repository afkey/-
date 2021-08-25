import Vue from 'vue'
import VueRouter from 'vue-router'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/index'),
    children: [
      {
      path: '/article',
      name: 'article',
      component: () => import('@/views/article/Article')
    },
      {
      path: '/image',
      name: 'image',
      component: () => import('@/views/image/Image')
    },
      {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/publish/Publish')
    },
      {
      path: '/comment',
      name: 'comment',
      component: () => import('@/views/comment/Comment')
    },
      {
      path: '/fans',
      name: 'fans',
      component: () => import('@/views/fans/Fans')
    },
      {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/Settings')
    },
  ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

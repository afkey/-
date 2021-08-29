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
        name: 'img',
        component: () => import('@/views/image/Img')
      },
      {
        path: '/publish/',
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

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next();
    }
    else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router

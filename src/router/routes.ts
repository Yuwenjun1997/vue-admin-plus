import Layout from '@/components/Layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Application',
    path: '/',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/authorize/login.vue'),
  },
  {
    name: 'Redirect',
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index.vue'),
  },
  {
    name: 'NotFound',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
]

export const matchRoute = { path: '/:pathMatch(.*)*', redirect: '/404' }

export default routes

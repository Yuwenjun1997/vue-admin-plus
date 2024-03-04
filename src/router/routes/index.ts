import { REDIRECT_ROUTE } from '@/router/routes/basic'
import { PageEnum } from '@/enums/pageEnum'
import { RouteRecordRaw } from 'vue-router'

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    menuId: 'Root',
    title: 'Root',
  },
}

// 用户登录
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  meta: {
    menuId: 'Login',
    title: '用户登录',
  },
  component: () => import('@/views/sys/authorize/login.vue'),
}

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE]

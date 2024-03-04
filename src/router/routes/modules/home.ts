import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const about: AppRouteModule = {
  path: '/',
  name: 'Home',
  component: LAYOUT,
  redirect: '/dashboard',
  meta: {
    menuId: 'Home',
    icon: 'line-md:home-md-twotone-alt',
    title: '首页',
  },
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        menuId: 'Dashboard',
        title: '工作台',
        icon: 'line-md:compass-loop',
        tabFixed: true,
      },
    },
    {
      name: 'Personnal',
      path: '/personnal',
      component: () => import('@/views/home/personnal/index.vue'),
      meta: {
        menuId: 'Personnal',
        title: '个人中心',
        icon: 'line-md:account',
        tabFixed: true,
      },
    },
  ],
}

export default about

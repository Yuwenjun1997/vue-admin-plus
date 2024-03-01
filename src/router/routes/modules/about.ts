import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '关于我们',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于我们',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
}

export default about

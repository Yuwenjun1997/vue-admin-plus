import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const about: AppRouteModule = {
  path: '/customer',
  name: 'Customer',
  component: LAYOUT,
  redirect: '/customer/manager',
  meta: {
    menuId: 'Customer',
    title: '客资',
    icon: 'line-md:person-search',
  },
  children: [
    {
      name: 'CustomerManager',
      path: '/customer/manager',
      meta: {
        menuId: 'CustomerManager',
        title: '客资管理',
        icon: 'line-md:account',
      },
    },
    {
      name: 'CustomerSetting',
      path: '/customer/setting',
      meta: {
        menuId: 'CustomerSetting',
        title: '系统设置',
        icon: 'line-md:cog-loop',
      },
      children: [
        {
          name: '/setting/menu',
          path: '/setting/menu',
          meta: {
            menuId: '/setting/menu',
            title: '菜单设置',
            icon: 'line-md:person-search',
          },
        },
      ],
    },
  ],
}

export default about

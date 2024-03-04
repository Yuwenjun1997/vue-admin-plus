import { MenuOption } from './types'

export const menus: MenuOption[] = [
  {
    name: 'Home',
    path: '/',
    redirect: '/dashboard',
    meta: {
      menuId: 'Home',
      title: '首页',
      icon: 'line-md:home-md-twotone-alt',
      layout: 'Layout',
    },
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: {
          menuId: 'Dashboard',
          title: '工作台',
          icon: 'line-md:compass-loop',
          tabFixed: true,
          component: '../../views/home/dashboard/index.vue',
        },
      },
      {
        name: 'Personnal',
        path: '/personnal',
        meta: {
          menuId: 'Personnal',
          title: '个人中心',
          icon: 'line-md:account',
          tabFixed: true,
          component: '@/views/home/personnal/index.vue',
        },
      },
    ],
  },
  {
    name: 'Customer',
    path: '/customer',
    redirect: '/customer/manager',
    meta: {
      menuId: 'Customer',
      title: '客资',
      icon: 'line-md:person-search',
      layout: 'Layout',
    },
    children: [
      {
        name: 'CustomerManager',
        path: '/customer/manager',
        meta: {
          menuId: 'CustomerManager',
          title: '客资管理',
          icon: 'line-md:account',
          component: '@/views/customer/manager/index.vue',
        },
      },
      {
        name: 'CustomerSetting',
        path: '/customer/setting',
        meta: {
          menuId: 'CustomerSetting',
          title: '系统设置',
          icon: 'line-md:cog-loop',
          component: '@/views/customer/setting/index.vue',
        },
        children: [
          {
            name: '/setting/menu',
            path: '/setting/menu',
            meta: {
              menuId: '/setting/menu',
              title: '菜单设置',
              icon: 'line-md:person-search',
              component: '@/views/customer/setting/menu/index.vue',
            },
          },
        ],
      },
    ],
  },
]

import { MenuOption } from './types'

export const menus: MenuOption[] = [
  {
    name: 'Home',
    path: '/',
    meta: {
      menuId: 'Home',
      title: '首页',
      icon: 'line-md:home-md-twotone-alt',
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
        },
      },
    ],
  },
  {
    name: 'Customer',
    path: '/customer',
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
            name: '/setting/user',
            path: '/setting/user',
            meta: {
              menuId: '/setting/user',
              title: '用户设置',
              icon: 'line-md:person-search',
            },
          },
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
  },
]

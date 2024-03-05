import { MenuOption } from './types'

export const menus: MenuOption[] = [
  {
    name: 'Home',
    path: '/home',
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
          component: '@/views/home/dashboard/index.vue',
        },
      },
    ],
  },
  {
    name: 'Component',
    path: '/component',
    redirect: '/component/icon',
    meta: {
      menuId: 'Component',
      title: '组件',
      icon: 'line-md:beer-alt-twotone-loop',
      layout: 'Layout',
    },
    children: [
      {
        name: 'ComponentIcon',
        path: '/component/icon',
        redirect: '/component/iconList',
        meta: {
          menuId: 'ComponentIcon',
          title: '图标',
          icon: 'line-md:emoji-smile-wink',
        },
        children: [
          {
            name: 'ComponentIconList',
            path: '/component/iconList',
            meta: {
              menuId: 'ComponentIconList',
              title: '图标列表',
              component: '@/views/sys/components/icons/index.vue',
            },
          },
          {
            name: 'ComponentIconPicker',
            path: '/component/iconPicker',
            meta: {
              menuId: 'ComponentIconPicker',
              title: '图标选择器',
              component: '@/views/sys/components/icon-picker/index.vue',
            },
          },
        ],
      },
    ],
  },
]

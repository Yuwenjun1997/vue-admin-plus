import { MenuOption } from '@/layout/types'

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
              component: '@/views/components/icons/index.vue',
            },
          },
          {
            name: 'ComponentIconPicker',
            path: '/component/iconPicker',
            meta: {
              menuId: 'ComponentIconPicker',
              title: '图标选择器',
              component: '@/views/components/icon-picker/index.vue',
            },
          },
        ],
      },
      {
        name: 'ComponentPermission',
        path: '/component/permission',
        meta: {
          menuId: 'ComponentPermission',
          title: '角色权限',
          icon: 'bi:person-lock',
          component: '@/views/components/permission/index.vue',
        },
      },
    ],
  },
  {
    name: 'Setting',
    path: '/settings',
    redirect: '/settings/userCenter',
    meta: {
      menuId: 'Setting',
      title: '配置',
      icon: 'line-md:cog',
      layout: 'Layout',
    },
    children: [
      {
        name: 'UserCenter',
        path: '/settings/userCenter',
        meta: {
          menuId: 'UserCenter',
          title: '个人中心',
          icon: 'line-md:person',
          component: '@/views/settings/user-center/index.vue',
        },
      },
      {
        name: 'SettingUser',
        path: '/settings/user',
        meta: {
          menuId: 'SettingUser',
          title: '用户管理',
          icon: 'line-md:person-add',
          component: '@/views/settings/user/index.vue',
        },
      },
      {
        name: 'SettingRole',
        path: '/settings/role',
        meta: {
          menuId: 'SettingRole',
          title: '角色管理',
          icon: 'line-md:person-add-twotone',
          component: '@/views/settings/role/index.vue',
        },
      },
      {
        name: 'SettingDepartment',
        path: '/settings/department',
        meta: {
          menuId: 'SettingDepartment',
          title: '部门管理',
          icon: 'line-md:person-search-twotone',
          component: '@/views/settings/department/index.vue',
        },
      },
      {
        name: 'SettingMenu',
        path: '/settings/menu',
        meta: {
          menuId: 'SettingMenu',
          title: '菜单管理',
          icon: 'line-md:list-3-twotone',
          component: '@/views/settings/menu/index.vue',
        },
      },
      {
        name: 'SettingLog',
        path: '/settings/log',
        meta: {
          menuId: 'SettingLog',
          title: '系统日志',
          icon: 'line-md:hash-small',
          component: '@/views/settings/log/index.vue',
        },
      },
    ],
  },
  {
    name: 'Others',
    path: '/others',
    redirect: '/others/visualDsigin',
    meta: {
      menuId: 'Others',
      title: '其他',
      icon: 'line-md:coffee-half-empty-twotone-loop',
      layout: 'Layout',
    },
    children: [
      {
        name: 'OthersVisualDsigin',
        path: '/others/visualDsigin',
        meta: {
          menuId: 'OthersDiyDsigin',
          title: '可视化设计',
          icon: 'line-md:discord-twotone',
          component: '@/views/others/visual-design/index.vue',
        },
      },
      {
        name: 'OthersHighlight',
        path: '/others/highlight',
        meta: {
          menuId: 'OthersHighlight',
          title: '代码高亮',
          icon: 'bi:brightness-alt-high',
          component: '@/views/others/highlight/index.vue',
        },
      },
      {
        name: 'OthersCodeEditor',
        path: '/others/codeEditor',
        meta: {
          menuId: 'OthersCodeEditor',
          title: '代码编辑器',
          icon: 'bi:file-earmark-code',
          component: '@/views/others/code-editor/index.vue',
        },
      },
    ],
  },
]

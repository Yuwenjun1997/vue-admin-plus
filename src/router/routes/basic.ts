import { REDIRECT_NAME, LAYOUT, EXCEPTION_COMPONENT, PAGE_NOT_FOUND_NAME, REDIRECT_COMPONENT } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    menuId: 'ErrorPageLayout',
    title: '错误页面',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        menuId: 'ErrorPage',
        title: '错误页面',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: '重定向',
  meta: {
    menuId: 'RedirectTo',
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: REDIRECT_COMPONENT,
      meta: {
        menuId: 'Redirect',
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
}

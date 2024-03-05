export const REDIRECT_NAME = 'Redirect'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const REDIRECT_PATH = '/redirect'

export const EXCEPTION_COMPONENT = () => import('@/views/sys/exception/index.vue')

export const REDIRECT_COMPONENT = () => import('@/views/sys/redirect/index.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layout/index.vue')

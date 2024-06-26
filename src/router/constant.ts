export const REDIRECT_NAME = 'Redirect'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const REDIRECT_PATH = '/redirect'

export const ROOT_NAME = 'Root'

export const EXCEPTION_COMPONENT = () => import('@/views/system/exception/index.vue')

export const REDIRECT_COMPONENT = () => import('@/views/system/redirect/index.vue')

export const VIEW_COMPONENT = () => import('@/views/index.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layout/index.vue')

export const PREV_ROUTES_KEY = 'visual_prev_routes'

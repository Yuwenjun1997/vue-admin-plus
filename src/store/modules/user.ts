import { defineStore } from 'pinia'

interface UserStoreState {
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    roles: ['admin'],
    permissions: ['settings:add', 'settings:edit', 'settings:menu'],
  }),
})

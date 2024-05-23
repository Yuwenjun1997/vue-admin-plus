import netConfig from '@/config/net.config'
import { removeStorage, setStorage } from '@/utils/storage'
import { defineStore } from 'pinia'

interface UserStoreState {
  token: string
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    token: '',
    roles: ['admin'],
    permissions: ['settings:add', 'settings:edit', 'settings:menu'],
  }),

  actions: {
    login(token: string) {
      this.token = token
      setStorage(netConfig.tokenName, token)
    },
    logout() {
      this.token = ''
      removeStorage(netConfig.tokenName)
    },
  },
})

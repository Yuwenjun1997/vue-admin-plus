import { defineStore } from 'pinia'

interface VisualBoxState {
  device: string
  isFullscreen: boolean
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    device: 'h5',
    isFullscreen: false,
  }),

  actions: {
    setDevice(name: string) {
      this.device = name
    },
  },
})

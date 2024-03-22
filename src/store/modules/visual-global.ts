import { VisualBoxGlobal, VisualBoxGlobalMethod, VisualBoxGlobalVariable } from '@/types/visual-box'
import { defineStore } from 'pinia'

export const useVisualGlobal = defineStore('visualGlobal', {
  state: (): VisualBoxGlobal => ({
    methods: [],
    variables: [],
  }),
  actions: {
    addMethod(method: VisualBoxGlobalMethod) {
      this.methods.push(method)
    },
    removeMethod(method: VisualBoxGlobalMethod) {
      this.methods = this.methods.filter((m) => m.name !== method.name)
    },
    addVariable(variable: VisualBoxGlobalVariable) {
      this.variables.push(variable)
    },
    removeVariable(variable: VisualBoxGlobalVariable) {
      this.variables = this.variables.filter((v) => v.name !== variable.name)
    },
  },
})

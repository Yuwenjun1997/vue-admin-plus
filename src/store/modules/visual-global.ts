import { VisualBoxGlobal, VisualBoxGlobalMethod, VisualBoxGlobalVariable } from '@/types/visual-box'
import { defineStore } from 'pinia'

export const useVisualGlobal = defineStore('visualGlobal', {
  state: (): VisualBoxGlobal => ({
    methods: [],
    variables: [],
  }),
  actions: {
    init(option: VisualBoxGlobal) {
      this.methods = option.methods
      this.variables = option.variables
    },
    saveMethod(method: VisualBoxGlobalMethod) {
      const oldMethod = this.methods.find((m) => m.uuid === method.uuid)
      if (oldMethod) {
        Object.assign(oldMethod, method)
      } else {
        this.methods.push(method)
      }
    },
    removeMethod(method: VisualBoxGlobalMethod) {
      this.methods = this.methods.filter((m) => m.name !== method.name)
    },
    saveVariable(variable: VisualBoxGlobalVariable) {
      if (variable.valueType === 'number') variable.defaultValue = Number(variable.defaultValue)
      const oldVariable = this.variables.find((v) => v.name === variable.name)
      if (oldVariable) {
        Object.assign(oldVariable, variable)
      } else {
        this.variables.push(variable)
      }
    },
    removeVariable(variable: VisualBoxGlobalVariable) {
      this.variables = this.variables.filter((v) => v.name !== variable.name)
    },
  },
})
import { defineStore } from 'pinia'
import { VisualGlobal, VisualGlobalMethod, VisualGlobalVariable } from '../types'

export const useVisualGlobal = defineStore('visualGlobal', {
  state: (): VisualGlobal => ({
    methods: [],
    variables: [],
    reactiveMap: {},
  }),
  actions: {
    addReactiveMap(key: string, value: Record<string, any>) {
      this.reactiveMap[key] = value
    },

    init(option: VisualGlobal) {
      this.methods = option.methods
      this.variables = option.variables
    },
    saveMethod(method: VisualGlobalMethod) {
      const oldMethod = this.methods.find((m) => m.uuid === method.uuid)
      if (oldMethod) {
        Object.assign(oldMethod, method)
      } else {
        this.methods.push(method)
      }
    },
    removeMethod(method: VisualGlobalMethod) {
      this.methods = this.methods.filter((m) => m.name !== method.name)
    },
    saveVariable(variable: VisualGlobalVariable) {
      if (variable.valueType === 'number') variable.defaultValue = Number(variable.defaultValue)
      const oldVariable = this.variables.find((v) => v.name === variable.name)
      if (oldVariable) {
        Object.assign(oldVariable, variable)
      } else {
        this.variables.push(variable)
      }
    },
    removeVariable(variable: VisualGlobalVariable) {
      this.variables = this.variables.filter((v) => v.name !== variable.name)
    },
  },
})

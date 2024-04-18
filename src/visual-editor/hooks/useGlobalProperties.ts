import { storeToRefs } from 'pinia'
import { useVisualGlobal } from '../store/visual-global'
import { VisualGlobalMethod, VisualGlobalVariable } from '../types'

interface GlobalProperties {
  $refs: Record<string, any>
  $variables: Ref<VisualGlobalVariable[]>
  $methods: Ref<VisualGlobalMethod[]>
  $V_STATE: Ref<Record<string, Record<string, any>>>
}

const globalProperties: GlobalProperties = {
  $refs: {},
  $variables: ref([]),
  $methods: ref([]),
  $V_STATE: ref({}),
}

export const useGlobalProperties = () => {
  const { methods, variables, reactiveMap } = storeToRefs(useVisualGlobal())

  // 注册全局变量
  globalProperties.$variables = variables
  globalProperties.$methods = methods
  globalProperties.$V_STATE = reactiveMap

  const registerRef = (el: any, _vid: string) => el && (globalProperties.$refs[_vid] = el)
  return {
    globalProperties,
    registerRef,
  }
}

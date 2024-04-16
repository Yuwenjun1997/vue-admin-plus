interface GlobalProperties {
  $refs: any
}

const globalProperties = {
  $refs: {},
} as GlobalProperties

export const useGlobalProperties = () => {
  const registerRef = (el: any, _vid: string) => el && (globalProperties.$refs[_vid] = el)
  return {
    globalProperties,
    registerRef,
  }
}

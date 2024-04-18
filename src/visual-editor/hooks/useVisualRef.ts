const visualRefMap: Record<string, any> = {}

export const useVisualRef = () => {
  // 注册全局变量
  const registerRef = (el: any, _vid: string) => el && (visualRefMap[_vid] = el)

  return {
    registerRef,
    visualRefMap,
  }
}

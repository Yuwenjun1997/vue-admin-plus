import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualRef } from '@/visual-editor/hooks/useVisualRef'
import { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorColorProp,
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { isArray } from 'lodash'
import { Tabbar, TabbarItem } from 'vant'

const createTabbarItem = ({ title, icon }: { title: string; icon: string }) => ({
  title: createEditorInputProp({ label: '标签名称', defaultValue: title }),
  name: createEditorInputProp({ label: '标签名称，作为匹配的标识符' }),
  icon: createEditorInputProp({ label: '图标名称或图片链接', defaultValue: icon }),
  dot: createEditorSwitchProp({ label: '是否显示图标右上角小红点' }),
  badge: createEditorInputProp({ label: '图标右上角徽标的内容' }),
  url: createEditorInputProp({ label: '点击后跳转的链接地址' }),
  to: createEditorInputProp({ label: '点击后跳转的目标路由对象' }),
  replace: createEditorSwitchProp({ label: '是否在跳转时替换当前页面历史' }),
})

export default {
  key: 'navbar',
  moduleName: 'basicWidgets',
  label: '标签栏',
  preview: () => (
    <Tabbar style={{ width: '100%' }}>
      <TabbarItem icon="home-o">首页</TabbarItem>
      <TabbarItem icon="search">搜索</TabbarItem>
      <TabbarItem icon="friends-o">我的</TabbarItem>
      <TabbarItem icon="setting-o">设置</TabbarItem>
    </Tabbar>
  ),
  render: ({ styles, block, sourceData }) => {
    const { registerRef } = useVisualRef()
    const { genProps } = useVisualProps()
    const { genEvents } = useVisualEvents()

    const props = computed(() => genProps(block))
    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <Tabbar ref={(el) => registerRef(el, block._vid)} {...props.value} {...events.value} fixed={false}>
          {isArray(sourceData.tabbar) &&
            sourceData.tabbar.map((item) => {
              return <TabbarItem {...item}>{item.title}</TabbarItem>
            })}
        </Tabbar>
      </div>
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '当前选中标签的 name' }),
    fixedBottom: createEditorSwitchProp({ label: '是否固定在顶部', defaultValue: true }),
    zIndex: createEditorInputNumberProp({ label: '标签栏 z-index' }),
    border: createEditorSwitchProp({ label: '是否显示外边框', defaultValue: true }),
    activeColor: createEditorColorProp({ label: '选中标签的颜色', defaultValue: '#1989fa' }),
    inactiveColor: createEditorColorProp({ label: '未选中标签的颜色', defaultValue: '#7d7e80' }),
    route: createEditorSwitchProp({ label: '是否开启路由模式', defaultValue: false }),
  },
  sourceData: {
    tabbar: {
      label: '标签栏',
      value: [
        createTabbarItem({ title: '首页', icon: 'home-o' }),
        createTabbarItem({ title: '搜索', icon: 'search' }),
        createTabbarItem({ title: '我的', icon: 'friends-o' }),
        createTabbarItem({ title: '设置', icon: 'setting-o' }),
      ],
      createHandler: () => createTabbarItem({ title: '标签', icon: 'friends-o' }),
    },
  },
  events: [{ label: '切换标签时触发', eventName: 'change' }],
} as VisualEditorComponent

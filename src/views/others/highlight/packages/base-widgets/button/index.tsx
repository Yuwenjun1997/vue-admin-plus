import { Button } from 'vant'

export default {
  key: 'button',
  moduleName: 'baseWidgets',
  label: '按钮',
  render: ({ props, block }) => (
    <div class="component-item">
      <Button {...props}></Button>
    </div>
  ),
}

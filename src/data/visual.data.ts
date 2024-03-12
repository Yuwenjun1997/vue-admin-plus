import { VisualBoxComponents, VisualBoxTemplate } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const templates: VisualBoxTemplate[] = [
  {
    visualBoxKey: uuidv4(),
    isRoot: true,
    isDraggable: false,
    isActive: false,
    showTools: true,
    style: {
      height: '600px',
    },
    children: [],
  },
]

export const visualBoxComponents: VisualBoxComponents[] = [
  {
    title: '容器组件',
    type: 'container',
    components: [
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '栅格',
        visualBoxIcon: 'bi:grid-3x3',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        layoutStyle: {
          border: '1px dashed #ccc',
          padding: '4px',
          outlineOffset: '-1px',
        },
        render: {
          component: 'VisualGrid',
          props: {
            columns: 4,
            gutter: 16,
          },
          options: [
            {
              label: '当前栅格列',
              property: 'columns',
              value: 4,
              formControlType: 'select',
            },
            {
              label: '栅格间隔(px)',
              property: 'columns',
              value: 4,
              formControlType: 'select',
            },
          ],
        },
        children: [
          {
            visualBoxKey: uuidv4(),
            showTools: true,
            isDraggable: false,
            isDeletable: true,
            isEditable: true,
            layoutStyle: {
              border: '1px dashed #ccc',
              outlineOffset: '-1px',
            },
            style: {
              minHeight: '36px',
            },
            render: {
              props: {
                span: 6,
              },
            },
          },
          {
            visualBoxKey: uuidv4(),
            showTools: true,
            isDraggable: false,
            isDeletable: true,
            isEditable: true,
            layoutStyle: {
              border: '1px dashed #ccc',
              outlineOffset: '-1px',
            },
            style: {
              minHeight: '36px',
            },
            render: {
              props: {
                span: 6,
              },
            },
          },
          {
            visualBoxKey: uuidv4(),
            showTools: true,
            isDraggable: false,
            isDeletable: true,
            isEditable: true,
            layoutStyle: {
              border: '1px dashed #ccc',
              outlineOffset: '-1px',
            },
            style: {
              minHeight: '36px',
            },
            render: {
              props: {
                span: 6,
              },
            },
          },
          {
            visualBoxKey: uuidv4(),
            showTools: true,
            isEditable: true,
            isDeletable: true,
            layoutStyle: {
              border: '1px dashed #ccc',
              outlineOffset: '-1px',
            },
            style: {
              minHeight: '36px',
            },
            render: {
              props: {
                span: 6,
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'basic',
    title: '基础组件',
    components: [
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '文本',
        visualBoxIcon: 'bi:file-earmark-font',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        render: {
          component: 'VisualText',
          props: {
            content: '这是一行文本，hello world',
            fontSize: '14px',
            color: '#333',
          },
          options: [
            {
              formControlType: 'input',
              label: '字体大小',
              property: 'fontSize',
              value: '14px',
            },
            {
              formControlType: 'textarea',
              label: '文本内容',
              property: 'content',
              value: '这是一行文本，hello world',
            },
          ],
        },
      },
    ],
  },
]

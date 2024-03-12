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
        component: 'VisualGrid',
        props: {
          columns: 4,
          gutter: 16,
        },
        propOptions: [
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
            props: {
              span: 6,
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
            props: {
              span: 6,
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
            props: {
              span: 6,
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
            props: {
              span: 6,
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
        visualBoxName: '文本组件',
        visualBoxIcon: 'bi:file-earmark-font',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        component: 'VisualText',
        style: {
          fontSize: '16px',
          color: '#333',
          textAlign: 'left',
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        props: {
          content: '这是一行文本，hello world',
        },
        propOptions: [
          {
            formControlType: 'textarea',
            label: '文本内容',
            property: 'content',
            value: '这是一行文本，hello world',
          },
        ],
        options: [
          {
            title: '基础属性',
            target: 'normal',
            options: [
              {
                label: '唯一标识',
                property: 'visualBoxKey',
                formControlType: 'input',
                value: '',
                disabled: true,
              },
              {
                label: '自定义名称',
                property: 'visualBoxName',
                formControlType: 'input',
                value: '文本',
              },
            ],
          },
          {
            title: '样式属性',
            target: 'style',
            options: [
              {
                formControlType: 'input',
                label: '字体大小',
                property: 'fontSize',
              },
              {
                formControlType: 'colorPicker',
                label: '字体颜色',
                property: 'color',
              },
              {
                formControlType: 'select',
                label: '对齐方式',
                property: 'textAlign',
                options: [
                  {
                    label: '左对齐',
                    value: 'left',
                  },
                  {
                    label: '居中对齐',
                    value: 'center',
                  },
                  {
                    label: '右对齐',
                    value: 'right',
                  },
                ],
              },
              {
                formControlType: 'select',
                label: '是否斜体',
                property: 'fontStyle',
                options: [
                  {
                    label: '是',
                    value: 'italic',
                  },
                  {
                    label: '否',
                    value: 'normal',
                  },
                ],
              },
              {
                formControlType: 'select',
                label: '字体粗细',
                property: 'fontWeight',
                options: [
                  {
                    label: 'normal',
                    value: 'normal',
                  },
                  {
                    label: 'bold',
                    value: 'bold',
                  },
                  {
                    label: 'lighter',
                    value: 'lighter',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

import { VisualBoxTemplate } from '@/types/visual-box'

const templates: VisualBoxTemplate[] = [
  {
    visualBoxKey: 'root',
    isRoot: true,
    isDraggable: false,
    isActive: false,
    showTools: true,
    style: {
      height: '600px',
    },
    children: [
      {
        visualBoxKey: '2',
        isActive: false,
        isDraggable: true,
        showTools: true,
        render: {
          component: 'VisualText',
        },
        children: [],
      },
      {
        visualBoxKey: '4',
        isActive: false,
        isDraggable: true,
        showTools: true,
        style: {
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'stretch',
          gap: '16px',
          justifyContent: 'space-between',
        },
        children: [
          {
            visualBoxKey: '5',
            isActive: false,
            isDraggable: false,
            showTools: false,
            layoutStyle: {
              flex: '1',
              outline: '1px dashed #333',
              outlineOffset: '-1px',
            },
            style: {
              width: '100%',
              height: '100%',
            },
          },
          {
            visualBoxKey: '7',
            isActive: false,
            isDraggable: false,
            showTools: false,
            layoutStyle: {
              flex: '1',
              outline: '1px dashed #333',
              outlineOffset: '-1px',
            },
            style: {
              width: '100%',
              height: '100%',
            },
          },
        ],
      },
    ],
  },
]

export default templates

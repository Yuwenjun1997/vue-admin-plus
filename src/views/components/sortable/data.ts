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
        visualBoxKey: 'Text1',
        isActive: false,
        isDraggable: true,
        isDeletable: true,
        showTools: true,
        style: {
          padding: '16px',
          border: '1px solid #ccc',
          background: 'teal',
        },
        render: {
          component: 'VisualText',
        },
      },
      {
        visualBoxKey: 'Text2',
        isActive: false,
        isDraggable: true,
        isDeletable: true,
        showTools: true,
        style: {
          padding: '16px',
          border: '1px solid #ccc',
          background: 'pink',
        },
        render: {
          component: 'VisualText',
        },
      },
      {
        visualBoxKey: 'FlexRow1',
        isActive: false,
        isDraggable: true,
        isDeletable: true,
        showTools: true,
        disabled: true,
        style: {
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'stretch',
          gap: '16px',
          justifyContent: 'space-between',
          minHeight: '60px',
          padding: '8px',
        },
        children: [
          {
            visualBoxKey: 'FlexCol1',
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
            visualBoxKey: 'FlexCol2',
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

import { VisualBasic } from '@/types/visual-box'

export const visualGoodsCard: VisualBasic = {
  visualBoxKey: '0f2dddba-be2a-4c03-8bfb-48e952472840',
  visualBoxGroup: 'basic',
  visualBoxName: '商品卡片',
  visualBoxIcon: 'ep:goods',
  isDeletable: true,
  isEditable: true,
  disabled: false,
  style: {
    display: 'flex !important',
  },
  customStyle: {
    fontStyle: 'normal',
    textShadow: 'none',
    boxShadow: 'none',
    '--visual-box-shadow-inset': 'unset',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    'row-gap': '',
  },
  options: [
    {
      groupName: '布局',
      label: '主轴方向',
      formType: 'select',
      target: 'customStyle',
      property: 'flexDirection',
      options: [
        {
          label: '从左向右',
          value: 'row',
        },
        {
          label: '从右向左',
          value: 'row-reverse',
        },
        {
          label: '从上向下',
          value: 'column',
        },
        {
          label: '从下向上',
          value: 'column-reverse',
        },
      ],
      order: 57,
      value: 'column',
    },
    {
      groupName: '布局',
      label: '水平排列方式',
      formType: 'select',
      target: 'customStyle',
      property: 'justifyContent',
      options: [
        {
          label: '左对齐',
          value: 'flex-start',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'flex-end',
        },
        {
          label: '等间距排列',
          value: 'space-between',
        },
        {
          label: '环绕排列',
          value: 'space-around',
        },
        {
          label: '等间距环绕排列',
          value: 'space-evenly',
        },
      ],
      order: 58,
      value: 'center',
    },
    {
      groupName: '布局',
      label: '垂直排列方式',
      formType: 'select',
      target: 'customStyle',
      property: 'alignItems',
      options: [
        {
          label: '起始位置对齐',
          value: 'flex-start',
        },
        {
          label: '结束位置对齐',
          value: 'flex-end',
        },
        {
          label: '居中对齐',
          value: 'center',
        },
        {
          label: '基线对齐',
          value: 'baseline',
        },
        {
          label: '拉伸',
          value: 'stretch',
        },
      ],
      order: 59,
      value: 'flex-start',
    },
    {
      groupName: '布局',
      label: '内容是否换行',
      formType: 'select',
      target: 'customStyle',
      property: 'flexWrap',
      options: [
        {
          label: '不换行',
          value: 'nowrap',
        },
        {
          label: '换行',
          value: 'wrap',
        },
      ],
      order: 60,
      value: 'nowrap',
    },
    {
      groupName: '布局',
      label: '行间距',
      formType: 'cssInput',
      target: 'customStyle',
      property: 'row-gap',
      order: 61,
      value: '',
    },
    {
      groupName: '布局',
      label: '列间距',
      formType: 'cssInput',
      target: 'customStyle',
      property: 'column-gap',
      order: 62,
    },
  ],
  visualBoxParentKey: 'root',
  layoutStyle: {
    width: '260px',
    opacity: 'unset',
    '--visual-opacity-number': 1,
  },
  children: [
    {
      visualBoxKey: '0f1c39a9-65cd-48ba-a99a-b9389e72524b',
      visualBoxGroup: 'basic',
      visualBoxName: '图片',
      visualBoxIcon: 'ep:picture',
      isDeletable: true,
      isEditable: true,
      disabled: true,
      component: 'VisualImage',
      layoutStyle: {
        width: '',
        opacity: 'unset',
        '--visual-opacity-number': 1,
      },
      customStyle: {
        height: '',
        fontStyle: 'normal',
        textShadow: 'none',
        boxShadow: 'none',
        '--visual-box-shadow-inset': 'unset',
      },
      props: {
        src: 'https://picsum.photos/320/240',
      },
      propsOptions: [
        {
          groupName: '基础信息',
          target: 'props',
          formType: 'input',
          label: '图片的源地址',
          property: 'src',
          order: 57,
          value: 'https://picsum.photos/320/240',
        },
        {
          groupName: '基础信息',
          target: 'props',
          formType: 'select',
          label: '填充',
          property: 'fit',
          value: 'cover',
          options: [
            {
              label: 'fill',
              value: 'fill',
            },
            {
              label: ' contain',
              value: 'contain',
            },
            {
              label: ' cover',
              value: 'cover',
            },
            {
              label: ' none',
              value: 'none',
            },
            {
              label: ' scale-down',
              value: 'scale-down',
            },
          ],
          order: 58,
        },
      ],
      visualBoxParentKey: '0f2dddba-be2a-4c03-8bfb-48e952472840',
    },
    {
      visualBoxKey: 'c604bf7a-ab9c-4135-b4b9-279d42f46ee0',
      visualBoxGroup: 'container',
      visualBoxName: '弹性盒子',
      visualBoxIcon: 'bi:grid-1x2',
      isDeletable: true,
      isEditable: true,
      disabled: false,
      style: {
        display: 'flex !important',
      },
      customStyle: {
        fontStyle: 'normal',
        textShadow: 'none',
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxShadow: 'none',
        '--visual-box-shadow-inset': 'unset',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        'row-gap': '8px',
      },
      options: [
        {
          groupName: '布局',
          label: '主轴方向',
          formType: 'select',
          target: 'customStyle',
          property: 'flexDirection',
          options: [
            {
              label: '从左向右',
              value: 'row',
            },
            {
              label: '从右向左',
              value: 'row-reverse',
            },
            {
              label: '从上向下',
              value: 'column',
            },
            {
              label: '从下向上',
              value: 'column-reverse',
            },
          ],
          order: 57,
          value: 'column',
        },
        {
          groupName: '布局',
          label: '水平排列方式',
          formType: 'select',
          target: 'customStyle',
          property: 'justifyContent',
          options: [
            {
              label: '左对齐',
              value: 'flex-start',
            },
            {
              label: '居中',
              value: 'center',
            },
            {
              label: '右对齐',
              value: 'flex-end',
            },
            {
              label: '等间距排列',
              value: 'space-between',
            },
            {
              label: '环绕排列',
              value: 'space-around',
            },
            {
              label: '等间距环绕排列',
              value: 'space-evenly',
            },
          ],
          order: 58,
          value: 'flex-start',
        },
        {
          groupName: '布局',
          label: '垂直排列方式',
          formType: 'select',
          target: 'customStyle',
          property: 'alignItems',
          options: [
            {
              label: '起始位置对齐',
              value: 'flex-start',
            },
            {
              label: '结束位置对齐',
              value: 'flex-end',
            },
            {
              label: '居中对齐',
              value: 'center',
            },
            {
              label: '基线对齐',
              value: 'baseline',
            },
            {
              label: '拉伸',
              value: 'stretch',
            },
          ],
          order: 59,
          value: 'flex-start',
        },
        {
          groupName: '布局',
          label: '内容是否换行',
          formType: 'select',
          target: 'customStyle',
          property: 'flexWrap',
          options: [
            {
              label: '不换行',
              value: 'nowrap',
            },
            {
              label: '换行',
              value: 'wrap',
            },
          ],
          order: 60,
          value: 'nowrap',
        },
        {
          groupName: '布局',
          label: '行间距',
          formType: 'cssInput',
          target: 'customStyle',
          property: 'row-gap',
          order: 61,
          value: '8px',
        },
        {
          groupName: '布局',
          label: '列间距',
          formType: 'cssInput',
          target: 'customStyle',
          property: 'column-gap',
          order: 62,
        },
      ],
      visualBoxParentKey: '0f2dddba-be2a-4c03-8bfb-48e952472840',
      children: [
        {
          visualBoxKey: '1ae21d3a-b38a-400b-906c-2a7ae5057569',
          visualBoxGroup: 'basic',
          visualBoxName: '文本',
          visualBoxIcon: 'bi:file-earmark-font',
          isDeletable: true,
          isEditable: true,
          disabled: true,
          component: 'VisualText',
          props: {
            content: '420纸巾抽纸60抽国标ios10080，优惠多多，多买多送',
          },
          propsOptions: [
            {
              groupName: '基础信息',
              target: 'props',
              formType: 'textarea',
              label: '文本内容',
              property: 'content',
              order: 57,
              value: '420纸巾抽纸60抽国标ios10080，优惠多多，多买多送',
            },
          ],
          visualBoxParentKey: 'c604bf7a-ab9c-4135-b4b9-279d42f46ee0',
          customStyle: {
            fontSize: '14px',
            color: 'rgba(38, 38, 38, 1)',
            lineHeight: '20px',
            letterSpacing: '',
            textAlign: 'justify',
            fontStyle: 'normal',
            textShadow: 'none',
            boxShadow: 'none',
            '--visual-box-shadow-inset': 'unset',
          },
          layoutStyle: {
            opacity: 'unset',
            '--visual-opacity-number': 1,
          },
        },
        {
          visualBoxKey: 'ef15b01d-17f5-49cb-8831-4cbab2419797',
          visualBoxGroup: 'container',
          visualBoxName: '弹性盒子',
          visualBoxIcon: 'bi:grid-1x2',
          isDeletable: true,
          isEditable: true,
          disabled: false,
          style: {
            display: 'flex !important',
          },
          customStyle: {
            fontStyle: 'normal',
            textShadow: 'none',
            boxShadow: 'none',
            '--visual-box-shadow-inset': 'unset',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexWrap: 'nowrap',
            'row-gap': '',
            'column-gap': '8px',
          },
          options: [
            {
              groupName: '布局',
              label: '主轴方向',
              formType: 'select',
              target: 'customStyle',
              property: 'flexDirection',
              options: [
                {
                  label: '从左向右',
                  value: 'row',
                },
                {
                  label: '从右向左',
                  value: 'row-reverse',
                },
                {
                  label: '从上向下',
                  value: 'column',
                },
                {
                  label: '从下向上',
                  value: 'column-reverse',
                },
              ],
              order: 57,
              value: 'row',
            },
            {
              groupName: '布局',
              label: '水平排列方式',
              formType: 'select',
              target: 'customStyle',
              property: 'justifyContent',
              options: [
                {
                  label: '左对齐',
                  value: 'flex-start',
                },
                {
                  label: '居中',
                  value: 'center',
                },
                {
                  label: '右对齐',
                  value: 'flex-end',
                },
                {
                  label: '等间距排列',
                  value: 'space-between',
                },
                {
                  label: '环绕排列',
                  value: 'space-around',
                },
                {
                  label: '等间距环绕排列',
                  value: 'space-evenly',
                },
              ],
              order: 58,
              value: 'flex-start',
            },
            {
              groupName: '布局',
              label: '垂直排列方式',
              formType: 'select',
              target: 'customStyle',
              property: 'alignItems',
              options: [
                {
                  label: '起始位置对齐',
                  value: 'flex-start',
                },
                {
                  label: '结束位置对齐',
                  value: 'flex-end',
                },
                {
                  label: '居中对齐',
                  value: 'center',
                },
                {
                  label: '基线对齐',
                  value: 'baseline',
                },
                {
                  label: '拉伸',
                  value: 'stretch',
                },
              ],
              order: 59,
              value: 'flex-end',
            },
            {
              groupName: '布局',
              label: '内容是否换行',
              formType: 'select',
              target: 'customStyle',
              property: 'flexWrap',
              options: [
                {
                  label: '不换行',
                  value: 'nowrap',
                },
                {
                  label: '换行',
                  value: 'wrap',
                },
              ],
              order: 60,
              value: 'nowrap',
            },
            {
              groupName: '布局',
              label: '行间距',
              formType: 'cssInput',
              target: 'customStyle',
              property: 'row-gap',
              order: 61,
              value: '',
            },
            {
              groupName: '布局',
              label: '列间距',
              formType: 'cssInput',
              target: 'customStyle',
              property: 'column-gap',
              order: 62,
              value: '8px',
            },
          ],
          visualBoxParentKey: 'c604bf7a-ab9c-4135-b4b9-279d42f46ee0',
          children: [
            {
              visualBoxKey: '2961eee6-5870-4185-9e6a-e3b7672712a5',
              visualBoxGroup: 'basic',
              visualBoxName: '文本',
              visualBoxIcon: 'bi:file-earmark-font',
              isDeletable: true,
              isEditable: true,
              disabled: true,
              component: 'VisualText',
              props: {
                content: '￥20.09',
              },
              propsOptions: [
                {
                  groupName: '基础信息',
                  target: 'props',
                  formType: 'textarea',
                  label: '文本内容',
                  property: 'content',
                  order: 57,
                  value: '￥20.09',
                },
              ],
              visualBoxParentKey: 'ef15b01d-17f5-49cb-8831-4cbab2419797',
              customStyle: {
                fontSize: '16px',
                color: 'rgba(255, 0, 0, 1)',
                fontStyle: 'normal',
                textShadow: 'none',
                boxShadow: 'none',
                '--visual-box-shadow-inset': 'unset',
              },
              layoutStyle: {
                opacity: 'unset',
                '--visual-opacity-number': 1,
                marginTop: '',
              },
            },
            {
              visualBoxKey: '026ecda9-61cc-4317-9ae8-266f9c921f68',
              visualBoxGroup: 'basic',
              visualBoxName: '文本',
              visualBoxIcon: 'bi:file-earmark-font',
              isDeletable: true,
              isEditable: true,
              disabled: true,
              component: 'VisualText',
              props: {
                content: '原价：￥30.00',
              },
              propsOptions: [
                {
                  groupName: '基础信息',
                  target: 'props',
                  formType: 'textarea',
                  label: '文本内容',
                  property: 'content',
                  order: 57,
                  value: '原价：￥30.00',
                },
              ],
              visualBoxParentKey: 'ef15b01d-17f5-49cb-8831-4cbab2419797',
              customStyle: {
                fontSize: '10px',
                color: 'rgba(166, 166, 166, 1)',
                fontStyle: 'normal',
                textShadow: 'none',
                boxShadow: 'none',
                '--visual-box-shadow-inset': 'unset',
              },
              layoutStyle: {
                opacity: 'unset',
                '--visual-opacity-number': 1,
              },
            },
          ],
          layoutStyle: {
            width: '100%',
            opacity: 'unset',
            '--visual-opacity-number': 1,
          },
        },
      ],
      layoutStyle: {
        width: '100%',
        opacity: 'unset',
        '--visual-opacity-number': 1,
      },
    },
  ],
}

export default visualGoodsCard

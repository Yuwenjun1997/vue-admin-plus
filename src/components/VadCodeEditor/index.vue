<template>
  <div class="ace-container">
    <!-- 官方文档中使用id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
    <div ref="aceDom" class="ace-editor" />
  </div>
</template>

<script lang="ts" setup name="VadCodeEditor">
import ace from 'ace-builds'

import 'ace-builds/src-min-noconflict/ext-beautify'
import 'ace-builds/src-min-noconflict/theme-github' // 默认设置的主题
import 'ace-builds/src-min-noconflict/theme-github_dark' // 默认设置的主题
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json' //
import 'ace-builds/src-min-noconflict/mode-css' //
import 'ace-builds/src-min-noconflict/mode-html' //
import 'ace-builds/src-min-noconflict/mode-vue' //
import 'ace-builds/src-min-noconflict/ext-language_tools'
import { useDark } from '@vueuse/core'

const isDark = useDark()

interface Props {
  modelValue: string
  readonly?: boolean
  mode?: string
  userWorker?: boolean
  maxLines?: number
  minLines?: number
}

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  mode: 'javascript',
  userWorker: false,
  maxLines: 40,
  minLines: 40,
})

const aceDom = ref<HTMLElement>()
const aceEditor = ref<ace.Ace.Editor>()
const themePath = ref<string>('ace/theme/github')
const modePath = ref<string>('ace/mode/javascript')
const codeValue = ref<string>(props.modelValue)

watchEffect(() => {
  themePath.value = isDark.value ? 'ace/theme/github_dark' : 'ace/theme/github'
  aceEditor.value?.setTheme(themePath.value)
})

onMounted(() => {
  ace.config.set('basePath', '/lib/ace/src-min-noconflict')
  if (!aceDom.value) return
  aceEditor.value = ace.edit(aceDom.value, {
    maxLines: props.maxLines, // 最大行数，超过会自动出现滚动条
    minLines: props.minLines, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
    fontSize: 12, // 编辑器内字体大小
    theme: themePath.value, // 默认设置的主题
    mode: modePath.value, // 默认设置的语言模式
    tabSize: 2, // 制表符设置为2个空格大小
    readOnly: props.readonly,
    highlightActiveLine: true,
    value: codeValue.value,
  })

  aceEditor.value.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true, // 设置代码片段提示
    enableLiveAutocompletion: true, // 设置自动提示
  })

  if (props.mode === 'json') {
    aceEditor.value.getSession().setMode('ace/mode/json')
  } else if (props.mode === 'css') {
    aceEditor.value.getSession().setMode('ace/mode/css')
  } else if (props.mode === 'html') {
    aceEditor.value.getSession().setMode('ace/mode/html')
  } else if (props.mode === 'vue') {
    aceEditor.value.getSession().setMode('ace/mode/vue')
  }

  if (!props.userWorker) {
    aceEditor.value.getSession().setUseWorker(false)
  }

  ace.require('ace/ext/beautify').beautify(aceEditor.value.session)

  //编辑时同步数据
  aceEditor.value.getSession().on('change', () => {
    if (!aceEditor.value) return
    emit('update:modelValue', aceEditor.value.getValue())
  })
})
</script>

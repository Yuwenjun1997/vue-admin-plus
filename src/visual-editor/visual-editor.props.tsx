import { VisualEditorProps, VisualEditorPropsType, VisualEditorTableOption } from './types'

interface EditorCssInputProp {
  label: string
  defaultValue?: boolean
  tips?: string
}

export function createEditorCssInputProp({ label, defaultValue, tips }: EditorCssInputProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.cssInput,
    label,
    tips,
    defaultValue,
  }
}

interface EditorSwitchProp {
  label: string
  defaultValue?: boolean
  tips?: string
}

export function createEditorSwitchProp({ label, defaultValue, tips }: EditorSwitchProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.switch,
    label,
    tips,
    defaultValue,
  }
}

interface EditorInputProp {
  label: string
  defaultValue?: any
  tips?: string
}

export function createEditorInputProp({ label, defaultValue, tips }: EditorInputProp): VisualEditorProps {
  return { type: VisualEditorPropsType.input, label, tips, defaultValue }
}

interface EditorInputNumberProp {
  label: string
  defaultValue?: any
  tips?: string
  max?: number
  min?: number
}

export function createEditorInputNumberProp({
  label,
  defaultValue,
  max,
  min,
  tips,
}: EditorInputNumberProp): VisualEditorProps {
  return { type: VisualEditorPropsType.inputNumber, label, tips, max, min, defaultValue }
}

interface EditorColorProp {
  label: string
  defaultValue?: string
}

export function createEditorColorProp({ label, defaultValue }: EditorColorProp): VisualEditorProps {
  return { type: VisualEditorPropsType.color, label, defaultValue }
}

export type VisualEditorSelectOptions = {
  label: string
  value: string | number | boolean | object
  [prop: string]: any
}[]

interface EditorSelectProp {
  label: string
  options: VisualEditorSelectOptions
  defaultValue?: any
  multiple?: boolean
  tips?: string
}

export function createEditorSelectProp({
  label,
  options,
  defaultValue,
  tips,
  multiple,
}: EditorSelectProp): VisualEditorProps {
  return { type: VisualEditorPropsType.select, label, defaultValue, tips, options, multiple }
}

interface EditorTableProp<T> {
  label: string
  option: VisualEditorTableOption
  defaultValue?: T
}

export function createEditorTableProp<T = any>({ label, option, defaultValue }: EditorTableProp<T>): VisualEditorProps {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: option,
    defaultValue,
  }
}

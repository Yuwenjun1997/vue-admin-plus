import { MenuEditForm } from '@/apis/menu/type'
import { isComponentPath, isMenuTitle, isRouteName, isRoutePath } from '@/utils/validate'
import { FormRules } from 'element-plus'

type validation = (rule: any, value: any, callback: any) => void

const validateMenuTitle: validation = (_rule, value, callback) => {
  isMenuTitle(value) ? callback() : callback(new Error('中文+英文大小写+数字'))
}

const validateRouteName: validation = (_rule, value, callback) => {
  isRouteName(value) ? callback() : callback(new Error('英文大小写+数字'))
}

const validateComponentPath: validation = (_rule, value, callback) => {
  isComponentPath(value) ? callback() : callback(new Error('请输入合法组件路径'))
}

const validateRoutePath: validation = (_rule, value, callback) => {
  isRoutePath(value) ? callback() : callback(new Error('请输入合法路由路径'))
}

export const editMenuRules: FormRules<MenuEditForm> = {
  title: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    { validator: validateMenuTitle, trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入路由名称', trigger: 'blur' },
    { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' },
    { validator: validateRouteName, trigger: 'blur' },
  ],
  path: [
    { required: true, message: '请输入路由路径', trigger: 'blur' },
    { validator: validateRoutePath, trigger: 'blur' },
  ],
  component: [
    { required: true, message: '请输入组件路径', trigger: 'blur' },
    { validator: validateComponentPath, trigger: 'blur' },
  ],
  link: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
}

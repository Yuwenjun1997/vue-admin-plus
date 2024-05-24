import { isUsername } from '@/utils/validate'

type validation = (rule: any, value: any, callback: any) => void

export const userFormValidate = () => {
  const validateUsername: validation = (_rule, value, callback) => {
    isUsername(value) ? callback() : callback(new Error('只能是英文大小写+数字'))
  }

  return { validateUsername }
}

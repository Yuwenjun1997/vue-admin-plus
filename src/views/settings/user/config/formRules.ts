import { UserEditForm } from '@/apis/user/type'
import { isEmail, isMobile, isNickname, isUsername } from '@/utils/validate'
import { FormRules } from 'element-plus'

type validation = (rule: any, value: any, callback: any) => void

const validateUsername: validation = (_rule, value, callback) => {
  isUsername(value) ? callback() : callback(new Error('只能是英文大小写+数字'))
}

const validateNickname: validation = (_rule, value, callback) => {
  isNickname(value) ? callback() : callback(new Error('昵称只能是中文+英文大小写+数字'))
}

const validateMobile: validation = (_rule, value, callback) => {
  isMobile(value) ? callback() : callback(new Error('请输入正确的手机号'))
}

const validateEmail: validation = (_rule, value, callback) => {
  isEmail(value) || !value ? callback() : callback(new Error('请输入正确的邮箱地址'))
}

export const editUserRules: FormRules<UserEditForm> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' },
  ],
  nickname: [
    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
    { validator: validateNickname, trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validateMobile, trigger: 'blur' },
  ],
  email: [{ validator: validateEmail, trigger: 'blur' }],
}

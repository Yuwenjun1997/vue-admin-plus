<template>
  <div class="h-screen flex justify-center items-center login-container">
    <div class="login-box shadow-lg">
      <div class="VisualLogo flex items-center">
        <img alt="" src="/vite.svg" />
        <div class="ml-2">
          <div>中后台系统</div>
          <div class="VisualLogo-en">system manage</div>
        </div>
      </div>
      <div class="login-box__form">
        <div class="flex items-center w-full">
          <span class="text-lg vad-text-color-primary">用户登录</span>
        </div>
        <div class="mt-4 w-full">
          <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名/手机号/邮箱" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password" />
            </el-form-item>
            <el-button class="w-full" type="primary" @click="handleLogin">登录</el-button>
          </el-form>
        </div>
        <div class="copyright">copyright © email yu277042563@163.com</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userLogin } from '@/apis/auth/api'
import { UserLoginForm } from '@/apis/auth/type'
import { ROOT_NAME } from '@/router/constant'
import { getPrevRoute } from '@/router/helper'
import { useUserStore } from '@/store/modules/user'
import { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const form = ref<UserLoginForm>(new UserLoginForm())

const formRef = ref<FormInstance>()

const rules = ref<FormRules<UserLoginForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    const { data } = await userLogin<string, UserLoginForm>(form.value)
    useUserStore().login(data)
    loginSuccess()
  } catch (error) {
    console.log(error)
  }
}

const loginSuccess = () => {
  const prevRoute = getPrevRoute()
  if (prevRoute && prevRoute.name) {
    router.replace({ ...prevRoute })
  } else {
    router.replace({ name: ROOT_NAME })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

  .VisualLogo {
    position: absolute;
    top: 24px;
    left: 24px;
    font-size: var(--el-font-size-large);
    color: var(--el-text-color-regular);

    .VisualLogo-en {
      color: var(--el-text-color-secondary);
      font-size: 10px;
      text-align: justify;
      text-transform: uppercase;
      margin-top: 2px;
    }
  }

  .login-box {
    position: relative;
    width: 800px;
    height: 400px;
    padding: 32px 48px;
    border-radius: 16px;
    background-color: #fff;
    background-image: url('@/assets/login-icon.svg');
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 400px;

    .login-box__form {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 300px;
      height: 100%;
    }
  }

  .copyright {
    position: absolute;
    font-size: var(--el-font-size-extra-small);
    color: var(--el-color-info-light-3);
    bottom: 36px;
  }
}
</style>

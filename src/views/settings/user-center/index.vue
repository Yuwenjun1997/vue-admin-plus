<template>
  <el-row :gutter="16">
    <el-col :span="7">
      <el-card shadow="hover">
        <div class="p-4">
          <div class="flex items-center flex-col justify-center">
            <el-avatar :size="60" :src="circleUrl" />
            <div class="ml-4 text-center">
              <h2 class="text-lg">yuwenjun1997</h2>
              <p class="vad-text-color-secondary mt-2">富在术数，不在劳身；利在势居，不在力耕。</p>
            </div>
          </div>
          <el-divider />
          <ul class="w-full space-y-2 vad-text-color-regular">
            <li class="flex items-center gap-2"><Icon icon="line-md:account" />前端小白</li>
            <li class="flex items-center gap-2"><Icon icon="bi:cake2-fill" />1997/08/16</li>
            <li class="flex items-center gap-2"><Icon icon="ep:male" />男</li>
            <li class="flex items-center gap-2"><Icon icon="bi:hospital" />集团 - 事业群 - 技术部</li>
            <li class="flex items-center gap-2"><Icon icon="ep:location-information" />中国 • 广东省 • 深圳市</li>
          </ul>
          <el-divider />
          <div class="w-full">
            <div>个性标签</div>
            <div class="mt-2 space-x-2">
              <el-tag>标签一</el-tag>
              <el-tag>标签一</el-tag>
              <el-tag>标签一</el-tag>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="17">
      <el-card shadow="hover">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="basic">
            <el-form label-width="70px" :model="userForm">
              <el-form-item label="姓名">
                <el-input v-model="userForm.name" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="userForm.nickName" placeholder="请输入昵称" />
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="userForm.gender">
                  <el-option label="男" :value="Gender.male" />
                  <el-option label="男" :value="Gender.female" />
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input v-model="userForm.intro" placeholder="请输入个人简介" type="textarea" />
              </el-form-item>
              <el-form-item label="标签">
                <div class="flex items-center flex-wrap gap-2">
                  <el-tag v-for="(item, index) in userTags" :key="index" closable @close="handleTagClose(index)">
                    {{ item }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="!w-20"
                    size="small"
                    @blur="handleInputConfirm"
                    @keyup.enter="handleInputConfirm"
                  />
                  <el-button v-else size="small" @click="showInput">
                    <template #icon>
                      <Icon icon="line-md:plus" />
                    </template>
                    <span>添加标签</span>
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSave">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账号绑定" name="binds">
            <div class="py-4">
              <div class="flex items-center">
                <Icon class="text-3xl text-blue-500" icon="bi:tencent-qq" />
                <div class="ml-2 flex-1">
                  <div>绑定QQ</div>
                  <div class="mt-1 vad-text-color-secondary">当前未绑定QQ账号</div>
                </div>
                <el-button link type="primary">立即绑定</el-button>
              </div>
              <el-divider />
              <div class="flex items-center">
                <Icon class="text-3xl text-green-500" icon="bi:wechat" />
                <div class="ml-2 flex-1">
                  <div>绑定微信</div>
                  <div class="mt-1 vad-text-color-secondary">当前未绑定微信账号</div>
                </div>
                <el-button link type="primary">立即绑定</el-button>
              </div>
              <el-divider />
              <div class="flex items-center">
                <Icon class="text-3xl" icon="bi:github" />
                <div class="ml-2 flex-1">
                  <div>绑定GitHub</div>
                  <div class="mt-1 vad-text-color-secondary">当前未绑定GitHub账号</div>
                </div>
                <el-button link type="primary">立即绑定</el-button>
                <el-button link type="primary">解绑</el-button>
                <el-button link type="primary">更换绑定</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="UserCenter">
import { Gender, UserInfo } from '@/types/user'
import { Icon } from '@iconify/vue'
const circleUrl = ref<string>('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const activeName = ref<string>('basic')

const userForm = ref<UserInfo>(new UserInfo())
const userTags = computed(() => {
  return userForm.value.tags ? userForm.value.tags.split(',') : []
})

// 添加标签
const inputVisible = ref<boolean>(false)
const inputValue = ref<string>('')
const handleInputConfirm = () => {
  if (inputValue.value) {
    userForm.value.tags = [...userTags.value, inputValue.value].join(',')
  }
  inputVisible.value = false
  inputValue.value = ''
}
const showInput = () => {
  inputVisible.value = true
}
const handleTagClose = (index: number) => {
  userForm.value.tags = userTags.value.filter((_, i) => i !== index).join(',')
}
const handleSave = () => {}
</script>

<style scoped></style>

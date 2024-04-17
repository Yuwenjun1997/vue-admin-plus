<template>
  <div>
    <el-tree
      ref="treeRef"
      class="w-full"
      :data="visualPages"
      default-expand-all
      :expand-on-click-node="false"
      highlight-current
      node-key="_vid"
      @current-change="handleCurrentChange"
    >
      <template #default="{ data }">
        <div class="flex items-center justify-between w-full pr-2">
          <span>{{ data.title }}</span>
          <div class="flex items-center gap-1">
            <Icon icon="ion:create-outline" @click="handleEdit(data)" />
            <Icon icon="ion:trash-outline" @click="handleRemove(data)" />
          </div>
        </div>
      </template>
      <template #empty>
        <el-empty description="暂无数据" :image-size="60">
          <template v-if="visualPages.length === 0">
            <el-button size="small" type="primary" @click="handleAdd"> 新增页面 </el-button>
          </template>
        </el-empty>
      </template>
    </el-tree>
    <el-button v-if="visualPages.length" class="w-full mt-2" size="small" @click="handleAdd">
      新增页面
      <Icon class="text-sm" icon="ion:add" />
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
      :title="editTitle"
      width="500"
    >
      <el-form ref="formRef" label-width="80px" :model="form" :rules="rules" size="small">
        <el-form-item label="父级菜单">
          <el-cascader v-model="form.parentId" clearable :options="visualPages" :props="cascaderProps" />
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="form.title" clearable placeholder="请输入菜单标题" />
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="form.path" clearable placeholder="请输入菜单路径" />
        </el-form-item>
        <el-form-item label="背景颜色" prop="config.bgColor">
          <el-color-picker v-model="form.config.bgColor" placeholder="请输入菜单路径" />
        </el-form-item>
        <el-form-item label="背景图片" prop="config.bgImage">
          <VisualImageUpload v-model="form.config.bgImage" placeholder="请输入菜单路径" />
        </el-form-item>
        <el-form-item label="背景重复" prop="config.bgImage">
          <el-switch v-model="form.config.bgRepeat" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="VisualPagesTree">
import { Icon } from '@iconify/vue'
import { VisualEditorPageForm, useVisualPages } from '@/visual-editor/hooks/useVisualPages'
import VisualImageUpload from '@/visual-editor/components/VisualRightPanel/AttrEditor/components/VisualImageUpload.vue'
import { VisualEditorPage } from '@/visual-editor/types'
import { FormRules, FormInstance, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash'

const { visualPages, update, add, setCurrentPage, remove } = useVisualPages()

const dialogVisible = ref(false)

const formRef = ref<FormInstance>()
const form = ref<VisualEditorPage>(new VisualEditorPageForm())

const editTitle = ref<string>('添加菜单')

const handleAdd = () => {
  editTitle.value = '添加菜单'
  form.value = new VisualEditorPageForm()
  dialogVisible.value = true
}

const handleEdit = (data: VisualEditorPage) => {
  form.value = cloneDeep(data)
  editTitle.value = '编辑菜单'
  dialogVisible.value = true
}
const handleRemove = (data: VisualEditorPage) => {
  ElMessageBox.confirm('确定要删除该菜单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      remove(data)
    })
    .catch(() => {
      //
    })
}

const rules: FormRules = {
  title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
  path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
}

const cascaderProps = {
  value: 'id',
  label: 'title',
  emitPath: false,
}

const handleCancel = () => {
  formRef.value?.resetFields()
  dialogVisible.value = false
}
const handleSave = () => {
  formRef.value?.validate((valid) => {
    if (!valid) return
    form.value.id ? update(cloneDeep(form.value)) : add(cloneDeep(form.value))
    dialogVisible.value = false
  })
}

const handleCurrentChange = (data: VisualEditorPage) => {
  setCurrentPage(data)
}

watch(
  visualPages,
  () => {
    console.log(visualPages.value)
  },
  {
    deep: true,
  }
)
</script>

<style scoped></style>

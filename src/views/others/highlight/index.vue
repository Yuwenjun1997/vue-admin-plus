<template>
  <div>
    <el-switch
      v-for="(item, index) in list"
      :key="index"
      v-model="item.value"
      :active-value="item.trueValue"
      :inactive-value="item.falseValue"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
const list = ref<any[]>([{ trueValue: 1, falseValue: 0, value: 1 }])

const handleChange = () => {
  console.log('change')
}

setTimeout(() => {
  list.value.push({ trueValue: 1, falseValue: 0, value: 0 })
  list.value[0].value = 0
}, 200)
</script>

<style scoped></style>

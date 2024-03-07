<template>
  <div />
</template>
<script lang="ts" setup>
import { unref } from 'vue'
import { useRouter } from 'vue-router'
const { currentRoute, replace } = useRouter()
const { params, query } = unref(currentRoute)
const _path = Array.isArray(params.path) ? params.path.join('/') : params.path
Reflect.deleteProperty(params, 'name')
replace({ path: _path, query })
</script>

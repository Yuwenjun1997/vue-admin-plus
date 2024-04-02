<template>
  <div>
    <div class="sort-container p-4 bg-blue-200">
      <div class="sort-container p-4 bg-slate-200" />
    </div>
    <van-field />
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'

onMounted(() => {
  const doms = document.querySelectorAll<HTMLElement>('.sort-container')
  doms.forEach((dom) => {
    new Sortable(dom, {
      group: 'container',
      fallbackOnBody: true,
      animation: 300,
      onEnd(event: Sortable.SortableEvent) {
        console.log(event.newIndex)
      },
    })
  })
  // if (!sortable.value) return
  // new Sortable(sortable.value, {
  //   animation: 300,
  //   onEnd(event: Sortable.SortableEvent) {
  //     console.log(event.newIndex)
  //   },
  // })
})
</script>

<style scoped>
.sort-container {
  position: relative;
}

.sort-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
}
</style>

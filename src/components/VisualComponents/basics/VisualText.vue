<template>
  <!-- <el-text size="large">Large</el-text> -->
  <el-table :data="tableData">
    <el-table-column label="Date" prop="date" width="180" />
    <el-table-column label="Name" prop="name" width="180" />
    <el-table-column label="Address" prop="address" />
  </el-table>
</template>

<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped></style>

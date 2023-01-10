<template>
  <div class="container margin-top">
    <el-table :data="tableData.data" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
      <el-table-column v-for="col in tableColumnList" :key="col.id" :label="col.label" :prop="col.prop" />
      <template slot="empty">无任务列表</template>
    </el-table>
  </div>
</template>

<script>
import { tableData, tableColumnList } from '../constant/index'

export default {
  name: 'TaskList',
  data() {
    return {
      tableData,
      tableColumnList
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
</style>

<template>
  <div class="task-container">
    <div class="task-main">
      <div class="card__header">
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称搜索" size="small" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" @click="onSearch" />
        </div>
      </div>
      <div class="card__content">
        <el-table :data="tableData.data" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column v-for="col in tableColumnList" :key="col.id" :label="col.label" :width="col.width">
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="name-cell">
                <span class="cursor-pointer" @click="goDetails(scope.row.name)">{{ scope.row.name }}</span>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i v-if="scope.row.status === 'running'" class="el-icon-video-play running" />
                <i v-else-if="scope.row.status === 'stop'" class="el-icon-video-pause stop" />
                <i v-else-if="scope.row.status === 'pending'" class="el-icon-loading pending" />
                <span>{{ scope.row.statusText }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看日志</el-dropdown-item>
                    <el-dropdown-item @click.native="handelDelete(scope.row)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
          <template slot="empty">无任务列表</template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from './index'
export default {
  name: 'Task',
  components: {},
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        name: ''
      }
    }
  },
  methods: {
    onSearch() {},
    goDetails(name) {
      console.log(name)
      this.$router.push({
        name: 'TaskDetail',
        query: {
          name: name // 传递的参数: 键值对
        }
      })
    },
    handelDelete(row) {
      const returnMsgList = [`确定删除任务${row.name}吗？`]
      const newData = []
      const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已删除'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.task-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    width: 300px;
    margin-left: auto;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .task-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>

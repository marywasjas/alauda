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
                <div>
                  <span style="color: #1890ff" class="cursor-pointer" @click="goDetails(scope.row.name)">{{
                    scope.row.name
                  }}</span>
                </div>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i v-if="scope.row.status === 'running'" class="el-icon-success running" />
                <i v-else-if="scope.row.status === 'stop'" class="el-icon-warning stop" />
                <span>{{ scope.row.statusText }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看日志</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
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
  .name-cell {
    display: flex;
    justify-content: left;
    align-items: center;

    i {
      margin-right: 10px;
      font-size: $font-size-20;
      padding: 1px;
      border: 1px solid $border-color-one;
      border-radius: $border-radius-l;
      background: $color-primary-rgba1;
      color: $color-primary;
    }
    span {
      display: block;
      margin: 0;
      font-size: $font-size-18;
    }
    span:last-child {
      color: $font-color-text;
      font-size: $font-size-14;
      margin-top: 6px;
    }
  }
  .status-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    i {
      margin-right: 10px;
      font-size: $font-size-20;
    }
    .running {
      color: $button-color-success;
    }
    .stop {
      color: $button-color-info;
    }
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

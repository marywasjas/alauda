<template>
  <div>
    <div class="Group-div">
      <div class="flex-center">
        <el-input placeholder="请输入名称和容器组IP" size="small" class="margin-right10">
          <el-button slot="append" icon="el-icon-search" @click="onSearch" />
        </el-input>
        <el-button icon="el-icon-refresh-right" size="small" @click="onSearch" />
      </div>
      <div class="Group-div-table">
        <el-table :data="tableData.data" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column v-for="col in tableColumnList" :key="col.id" :label="col.label" :width="col.width">
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span class="cursor-pointer">{{ scope.row.name }}</span>
                </div>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i v-if="scope.row.status === 'running'" class="el-icon-video-play running" />
                <i v-else-if="scope.row.status === 'stop'" class="el-icon-video-pause stop" />
                <span>{{ scope.row.statusText }}</span>
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
  name: 'ContainerGroup',
  components: {},
  data() {
    return {
      tableData,
      tableColumnList
    }
  },
  methods: {
    onSearch() {}
  }
}
</script>

<style lang="scss" scoped>
.Group-div {
  margin: 20px 0 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: $border-radius-m;
  box-shadow: 0 0 4px 0 $box-shadow;
  .flex-center {
    width: 400px;
    margin-left: auto;
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
}
</style>

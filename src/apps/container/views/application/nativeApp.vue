<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary">创建原生应用</el-button>
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称搜索" size="small" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" @click="onSearch" />
        </div>
      </div>
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :sortable="col.sortable"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                {{ scope.row[col.id] }}
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
import { tableData, tableColumnList } from './constant/index'
export default {
  name: 'OAM',
  components: { },
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
    // 搜索
    onSearch() {
      console.log(this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display:flex;
    justify-content: space-between;
    align-items:center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .oam-main{
    background:#fff;
    padding:20px
  }
}
</style>

<template>
  <div class="confidentialDictionary-container">
    <div class="nativeApp-main">
      <div class="card__header">
        <el-button type="primary" @click="handelCreate">创建保密字典</el-button>
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称搜索" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" @click="onSearch" />
        </div>
      </div>
      <div class="card__content">
        <el-table :data="tableData.data" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :sortable="col.sortable"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span class="cursor-pointer" @click="goDetails(scope.row)">{{ scope.row.name }}</span>
                  <span>{{ scope.row.desc }}</span>
                </div>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="update" @click.native="handleUpdate(scope.row)">更新</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
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
import { tableData, tableColumnList } from './constant/index'
export default {
  name: 'NativeAppList',
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
    },
    // 创建配置字典
    handelCreate() {
      this.$router.push({
        name: 'ConfidentialDictionaryCreateUpdate',
        query: {
          type: 'add'
        }
      })
    },
    // 详情
    goDetails(row) {
      this.$router.push({
        name: 'ConfidentialDictionaryDetail',
        query: {
          name: row.name
        }
      })
    },
    // 更新
    handleUpdate(row) {
      this.$router.push({
        name: 'ConfidentialDictionaryCreateUpdate',
        query: {
          name: row.name,
          type: 'edit'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.confidentialDictionary-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .nativeApp-main {
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
}
</style>

<template>
  <div class="configureDictionary-container">
    <div class="nativeApp-main">
      <div class="card__header">
        <el-button type="primary" @click="handelCreate">创建配置字典</el-button>
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
              <div v-if="col.id === 'name'">
                <span class="cursor-pointer" @click="goDetails(scope.row)">{{ scope.row.name }}</span>
                <!-- <span>{{ scope.row.desc }}</span> -->
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="update" @click.native="handleUpdate(scope.row)">更新</el-dropdown-item>
                    <el-dropdown-item command="delete" @click.native="handelDelete(scope.row)">删除</el-dropdown-item>
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
    <delete-item-dialog :dialog-table-visible="dialogTableVisible" :dialog-table-title="dialogTableTitle" :dialog-table-name="dialogTableName" @closeDialogTable="closeDialogTable" @submitDialogTable="submitDialogTable" />
  </div>
</template>

<script>
import { tableData, tableColumnList } from './constant/index'
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
export default {
  name: 'NativeAppList',
  components: { DeleteItemDialog },
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        name: ''
      },
      dialogTableVisible: false,
      dialogTableTitle: `确定删除配置字典吗？`,
      dialogTableName: '',
      currentObj: {}
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
        name: 'ConfigureDictionaryCreateUpdate',
        query: {
          type: 'add'
        }
      })
    },
    // 详情
    goDetails(row) {
      this.$router.push({
        name: 'ConfigureDictionaryDetail',
        query: {
          name: row.name
        }
      })
    },
    // 更新
    handleUpdate(row) {
      this.$router.push({
        name: 'ConfigureDictionaryCreateUpdate',
        query: {
          name: row.name,
          type: 'edit'
        }
      })
    },
    handelDelete(row) {
      if (row.id === 1) {
        this.dialogTableVisible = true
        this.dialogTableTitle = `确定删除配置字典${row.name}吗？`
        this.dialogTableName = row.name
        this.currentObj = row
      } else {
        const returnMsgList = [
          `确定删除配置字典${row.name}吗？`
        ]
        const newData = []; const h = this.$createElement
        for (const i in returnMsgList) {
          newData.push(h('p', null, returnMsgList[i]))
        }
        this.$confirm(h('div', null, newData), '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已删除'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    closeDialogTable() {
      this.$message({
        type: 'info',
        message: '已取消'
      })
      this.dialogTableVisible = false
      this.currentObj = {}
    },
    submitDialogTable() {
      console.log(this.currentObj.id)
      this.$message({
        type: 'success',
        message: '已删除'
      })
      this.dialogTableVisible = false
      this.currentObj = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.configureDictionary-container {
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
}
</style>

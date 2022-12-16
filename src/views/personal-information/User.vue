<template>
  <div class="user-container">
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
        :width="col.width"
      >
        <template slot-scope="scope">
          <div v-if="col.id === 'operation'" class="operation-cell">
            <el-dropdown>
              <i class="el-icon-more" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="delete"
                  @click.native="handelDelete(scope.row)"
                >删除</el-dropdown-item>
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
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'User',
  components: {},
  props: {},
  data() {
    const tableColumnList = [{
      id: 'name',
      label: '角色名称'
    }, {
      id: 'type',
      label: '角色类型'
    }, {
      id: 'resetDate',
      label: '项目/命名空间'
    }]
    const tableData = Mock.mock({
      'data|4': [{
        name: '@word(3, 7)',
        'type|1': ['平台'],
        resetDate: '@word(7, 20)'
      }]
    })
    return {
      tableColumnList,
      tableData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelDelete(row) {
      const returnMsgList = [
        `确定废弃API令牌${row.desc}吗？废弃后，改令牌将永久失效。`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'error'
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
  }
}
</script>
<style lang="scss" scoped>
.user-container {
}
</style>

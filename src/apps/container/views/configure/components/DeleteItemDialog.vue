<template>
  <div>
    <el-dialog :visible.sync="dialogTableVisible">
      <div slot="title" class="flex-start">
        <i class="el-icon-warning margin-right10" style="color: #ffba00;font-size: 24px;" />
        <span>{{ dialogTableTitle }}</span>
      </div>
      <span>配置字典{{ dialogTableName }}已经被以下资源引用。</span>
      <el-table :data="tableData.data" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
        <el-table-column
          v-for="col in tableColumnList"
          :key="col.id"
          :label="col.label"
          :sortable="col.sortable"
          :width="col.width"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row[col.id] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogTable">取消</el-button>
        <el-button type="primary" @click="submitDialogTable">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'DeleteItemDialog',
  components: {},
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    dialogTableTitle: {
      type: String,
      default: ''
    },
    dialogTableName: {
      type: String,
      default: ''
    }
  },
  data() {
    const tableColumnList = [{
      id: 'name',
      label: '名称'
    }, {
      id: 'type',
      label: '类型'
    }]
    const tableData = Mock.mock({
      'data|3': [{
        name: '@word(3, 7)',
        desc: '@cword(3, 7)',
        'status|1': ['running', 'stop'],
        'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
        type: '@cword(3, 7)',
        date: '@date'
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
    closeDialogTable() {
      this.$emit('closeDialogTable')
    },
    submitDialogTable() {
      this.$emit('submitDialogTable')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

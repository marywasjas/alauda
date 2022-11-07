<template>
  <div>
    <el-dialog
      title="事件"
      :visible.sync="visible"
      width="960px"
      :before-close="closeDialog"
    >
      <div>
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item label="时间范围">
            <el-select v-model="formInline.time" placeholder="时间范围">
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formInline.time === '自定义'" label="时间范围">
            <el-date-picker
              v-model="formInline.zdyTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="查询条件">
            <el-select
              v-model="formInline.type"
              placeholder="查询条件"
              multiple
              collapse-tags
              style="width: 300px"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData.data"
          style="width: 100%"
          height="400px"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in columnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'time'">
                {{ scope.row.startTime }}~{{ scope.row.endTime }}
              </div>
              <div v-else-if="col.id === 'operation'">
                <span
                  class="cursor-pointer"
                  @click="openDetails(scope.row)"
                >事件详情</span>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="事件详情"
      :visible.sync="detailVisible"
      width="900px"
      :before-close="closeDetailsDialog"
    >
      <div>
        <div class="editor-toolbar">
          <div class="editor-toolbar__language">JSON (只读)</div>
          <div class="editor-toolbar-wrap">
            <el-button icon="el-icon-download" size="mini" @click="handleDownload">导出</el-button>
            <el-button icon="el-icon-search" size="mini">查找</el-button>
            <el-button icon="el-icon-copy-document" size="mini">复制</el-button>
            <el-button icon="el-icon-thumb" size="mini">自动</el-button>
            <el-button icon="el-icon-full-screen" size="mini">全屏</el-button>
          </div>
        </div>
        <div class="border-box">
          <monaco-editor v-if="detailVisible" :code="currentCode" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { columnList, tableData } from './constant/index'
import MonacoEditor from '../MonacoEditor.vue'
import FileSaver from 'file-saver'
export default {
  name: 'EventDialog',
  components: {
    MonacoEditor
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formInline: {
        time: '',
        zdyTime: [],
        type: []
      },
      timeOptions: [
        {
          value: '近 5 分钟',
          label: '近 5 分钟'
        },
        {
          value: '近 15 分钟',
          label: '近 15 分钟'
        },
        {
          value: '近 30 分钟',
          label: '近 30 分钟'
        },
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
        },
        {
          value: '近 6 小时',
          label: '近 6 小时'
        },
        {
          value: '近 12 小时',
          label: '近 12 小时'
        },
        {
          value: '近 1 天',
          label: '近 1 天'
        },
        {
          value: '近 2 天',
          label: '近 2 天'
        },
        {
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        },
        {
          value: '自定义',
          label: '自定义'
        }
      ],
      typeOptions: [
        {
          value: '类别:Normal',
          label: '类别:Normal'
        },
        {
          value: '类别:Warning',
          label: '类别:Warning'
        },
        {
          value: '资源类型:Deployment',
          label: '资源类型:Deployment'
        },
        {
          value: '资源类型:Application',
          label: '资源类型:Application'
        },
        {
          value: '资源类型:DaemonSet',
          label: '资源类型:DaemonSet'
        },
        {
          value: '资源类型:StatefulSet',
          label: '资源类型:StatefulSet'
        },
        {
          value: '资源类型:Pod',
          label: '资源类型:Pod'
        },
        {
          value: '资源类型:ReplicaSet',
          label: '资源类型:ReplicaSet'
        },
        {
          value: '资源类型:PersistentVolumeClaim',
          label: '资源类型:PersistentVolumeClaim'
        }
      ],
      columnList,
      tableData,
      detailVisible: false,
      currentCode: '',
      currentName: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 打开弹窗
    openDialog() {
      this.$emit('openDialog')
    },
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    // 时间详情
    openDetails(row) {
      this.detailVisible = true
      this.currentCode = row.spec
      this.currentName = row.name
      this.closeDialog()
    },
    closeDetailsDialog() {
      this.detailVisible = false
      this.openDialog()
    },
    // 导出
    handleDownload() {
      const blob = new Blob([JSON.stringify(this.currentCode, null, 2)], { type: 'application/json' })
      FileSaver.saveAs(blob, `${this.currentName}.json`)
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-toolbar{
  height: 46px;
  padding: 0 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.editor-toolbar__language {
  font-size: 16px;
  margin-right: 25px;
  white-space: nowrap;
  font-weight: 500;
}
</style>

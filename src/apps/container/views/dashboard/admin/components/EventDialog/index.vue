<template>
  <div>
    <el-dialog
      title="事件"
      :visible.sync="visible"
      width="960px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
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
                <span @click="handelDetails(scope.row)">{{ scope.row[col.id] }}</span>
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
    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="事件详情"
      :visible="detailVisible"
      :code="code"
      :read-only="true"
      :btn-visible="btnVisible"
      :language="language"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import { columnList, tableData } from './constant/index'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'
export default {
  name: 'EventDialog',
  components: {
    MonacoEditorDialog
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
        time: '近 1 小时',
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
      // 事件详情数据
      detailVisible: false,
      code: '',
      language: 'json',
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true
      }
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
    handelDetails(row) {
      this.$router.push({
        name: 'ContainerGroupDetail',
        query: {
          name: row.name
        }
      })
    },
    // 事件详情
    openDetails(row) {
      this.detailVisible = true
      this.code = JSON.stringify(row.spec, null, 2)
      this.closeDialog()
    },
    closeDetailsDialog() {
      this.detailVisible = false
      this.openDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

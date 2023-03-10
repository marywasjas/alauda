<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div>
          时间范围：
          <el-select
            v-model="resourceTime"
            filterable
            placeholder="请选择"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button icon="el-icon-refresh-right" class="margin-left10" @click="onSearch" />
        </div>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'date'">
                {{ scope.row.startTime }} 至 {{ scope.row.endTime }}
              </div>
              <div v-else-if="col.id === 'operation'">
                <el-button type="text" @click="handelDetails(scope.row)">事件详情</el-button>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          class="margin-top text-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>
    </BaseCard>
    <monaco-editor-dialog
      v-if="detailVisible"
      title="事件详情"
      :visible="detailVisible"
      sub-title="JSON (只读)"
      :code="currentCode"
      :language="language"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'

export default {
  name: 'Event',
  components: { MonacoEditorDialog },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      detailVisible: false,
      currentCode: '',
      language: 'json',
      page: {
        total: 10,
        current: 1,
        pageSize: 10
      },
      resourceTime: '近 1 小时',
      timeOptions: [
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
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
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 搜索
    onSearch() {
      console.log(this.resourceTime)
    },
    handelDetails(row) {
      console.log(row)
      this.detailVisible = true
      this.currentCode = JSON.stringify(row.spec, null, 2)
    },
    closeDetailsDialog() {
      this.detailVisible = false
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.current = val
    }
  }
}
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}

</style>

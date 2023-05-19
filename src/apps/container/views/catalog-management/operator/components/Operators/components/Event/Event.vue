<template>
  <div class="calculation-container-group">
    <BaseCard>
      <div class="flex-center">
        <div>
          时间范围：
          <el-select
            @change="handleSearch"
            v-model="typeSearch"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-date-picker
            v-if="typeSearch == 'custom'"
            style="margin-right: 10px"
            v-model="timeSearch"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>

          <el-button icon="el-icon-refresh-right" @click="handleRefresh" />
        </div>
      </div>

      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
          empty-text="无实例"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  col.id === 'type' || col.id === 'name' || col.id === 'reason'
                "
              >
                {{
                  scope.row[col.id].length > 13
                    ? scope.row[col.id].substring(0, 13) + "..."
                    : scope.row[col.id]
                }}
              </div>

              <div v-else-if="col.id === 'time'">
                <div>{{ scope.row.startTime }}</div>
                <div>{{ scope.row.endTime }}</div>
              </div>

              <div v-else-if="col.id === 'message'">
                {{
                  scope.row[col.id].length > 35
                    ? scope.row[col.id].substring(0, 35) + "..."
                    : scope.row[col.id]
                }}
              </div>

              <div v-else-if="col.id === 'operation'">
                <el-button type="text" @click="handleDetail"
                  >事件详情</el-button
                >
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
      id="eventMonacoEditorDialog"
      title="事件详情"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";

export default {
  name: "Event",
  components: { MonacoEditorDialog },
  props: {},
  data() {
    return {
      detailVisible: false,
      
      tableColumnList,
      tableData,

      page: {
        total: 10,
        current: 1,
        pageSize: 10,
      },

      nameSearch: "",
      typeSearch: "",
      typeOptions: [{ label: "postgresql", value: "postgresql" }],
      timeSearch: "",

      timeOptions: [
        {
          value: "custom",
          label: "自定义时间",
        },
        {
          value: "过去 10 分钟",
          label: "过去 10 分钟",
        },
        {
          value: "近 30 分钟",
          label: "近 30 分钟",
        },
        {
          value: "近 1 小时",
          label: "近 1 小时",
        },
        {
          value: "近 3 小时",
          label: "近 3 小时",
        },
        {
          value: "近 6 小时",
          label: "近 6 小时",
        },
        {
          value: "近 12 小时",
          label: "近 12 小时",
        },
        {
          value: "近 1 天",
          label: "近 1 天",
        },
        {
          value: "过去 2 天",
          label: "过去 2 天",
        },
        {
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "过去 5 天",
          label: "过去 5 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
      ],

      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      spec: {
        detail: {
          cluster_name: "global",
          event: {
            count: 6713,
            eventTime: null,
            firstTimestamp: "2022-10-14T05:33:11Z",
            involvedObject: {
              apiVersion: "v1",
              fieldPath: "spec.containers{ubuntu}",
              kind: "Pod",
              name: "ubuntu-bq84l",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "519516627",
              uid: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
            },
            lastTimestamp: "2022-11-07T01:33:22Z",
            message:
              'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
            metadata: {
              creationTimestamp: "2022-11-07T01:18:15Z",
              name: "ubuntu-bq84l.171dd899b971f3ab",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "603142979",
              uid: "c61582db-0ce2-469d-8606-9854962ffc82",
            },
            reason: "Pulled",
            reportingComponent: "",
            reportingInstance: "",
            source: {
              component: "kubelet",
              host: "172.16.129.51",
            },
            type: "Normal",
          },
          operation: "Pulled",
          operator: "kubelet@172.16.129.51",
          source: "kubernetes",
        },
        log_level: 0,
        resource_id: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
        resource_type: "Pod",
        time: "1667783895000000",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.handleSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.handleSearch();
    },

    handleSearch() {},

    handleCreate() {},

    handleRefresh() {},

    handleDetail() {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
</style>

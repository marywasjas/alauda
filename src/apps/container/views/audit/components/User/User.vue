<template>
  <div class="container margin-top">
    <el-form
      :model="tabForm"
      label-width="75px"
      :rules="tabFormRules"
      ref="tabForm"
    >
      <el-row>
        <!-- 操作人 -->
        <el-col :span="8">
          <el-form-item label="操作人">
            <el-select
              v-model="tabForm.operator"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
              <el-option
                v-for="con in operatorOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 操作 -->
        <el-col :span="8">
          <el-form-item label="操作">
            <el-select
              v-model="tabForm.operation"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
              <el-option
                v-for="con in operationOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 资源类型 -->
        <el-col :span="8">
          <el-form-item label="资源类型">
            <el-select
              v-model="tabForm.resourceType"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
              <el-option
                v-for="con in resourceTypeOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-col :span="8">
          <el-form-item label="资源名称">
            <el-input
              multiple
              clearable
              placeholder="按资源名称模糊搜索"
              v-model="tabForm.resourceName"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <div>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>

      <el-divider></el-divider>

      <div style="display: flex; justify-content: flex-end">
        <div>
          <el-form-item label="" style="width: 500px" prop="filerTime">
            <el-select
              v-if="timepicker"
              v-model="tabForm.filerTime"
              @focus="setMinWidthEmpty"
              style="width: 100%"
              @change="handleTime"
            >
              <el-option
                v-for="con in timeOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>

            <el-date-picker
              v-else
              v-model="tabForm.filerTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              @input="handlePicker"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <div style="margin-left: 10px">
          <el-tooltip
            class="item"
            effect="dark"
            content="刷新"
            placement="top-start"
          >
            <el-button icon="el-icon-refresh-right" />
          </el-tooltip>
        </div>

        <div style="margin-left: 10px">
          <download-excel
            class="export-excel-wrapper"
            :data="tableData.data"
            :fields="json_fields"
            :header="exportHeader"
            :name="`平台审计记录 - ${titleTime}.xls`"
            type="csv"
            :before-generate="handleExcel"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="exportDisable ? '当前页面无数据，无法导出' : '导出'"
              placement="top-start"
            >
              <div>
                <el-button
                  icon="el-icon-arrow-right"
                  @click="changeTime"
                  :disabled="exportDisable"
                />
              </div>
            </el-tooltip>
          </download-excel>
        </div>
      </div>
    </el-form>

    <div>
      <el-table
        :data="tableData.data"
        style="width: 100%"
        header-row-class-name="headerStyle"
        empty-text="无审计"
      >
        <el-table-column
          v-for="col in tableColumnList"
          :key="col.id"
          :label="col.label"
          :show-overflow-tooltip="col['show-overflow-tooltip']"
          :sortable="col.sortable"
          :width="col.width"
          :fixed="col.fixed"
        >
          <template slot-scope="scope">
            <div v-if="col.id === 'result'">
              <i
                :class="
                  scope.row.result === '成功'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              <span> {{ scope.row[col.id] }} </span>
            </div>

            <div v-else-if="col.id === 'clientIP'">
              <span :title="scope.row.clientIP">
                {{
                  scope.row[col.id].length > 6
                    ? scope.row[col.id].substring(0, 5) + "..."
                    : scope.row[col.id]
                }}
              </span>
            </div>

            <div v-else-if="col.id === 'namespace'">
              <span :title="scope.row.namespace">
                {{
                  scope.row[col.id].length > 12
                    ? scope.row[col.id].substring(0, 11) + "..."
                    : scope.row[col.id]
                }}
              </span>
            </div>

            <div v-else-if="col.id === 'time'">
              <span>
                {{
                  scope.row[col.id].length > 6
                    ? scope.row[col.id].substring(0, 4) + "..."
                    : scope.row[col.id]
                }}
              </span>
            </div>

            <div v-else-if="col.id === 'resourceName'">
              <div>{{ scope.row[col.id] ? scope.row[col.id] : "-" }}</div>
              <div style="font-size: 12px; color: rgba(150, 152, 155)">
                {{ scope.row.type ? scope.row.type : "-" }}
              </div>
            </div>

            <div v-else-if="col.id === 'details'" class="operation-cell">
              <el-button type="text" @click="handleEdit(scope.row)">
                详情
              </el-button>
            </div>

            <div v-else>
              <span> {{ scope.row[col.id] ? scope.row[col.id] : "-" }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 15px; margin-left: 55%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="page.count"
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <monaco-editor-dialog
      id="eventMonacoEditorDialog"
      v-if="editVisible"
      :visible="editVisible"
      :autoUpdate="autoUpdate"
      title="审计详情"
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
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { MonacoEditorDialog },
  props: {},
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },

      titleTime: "",
      exportHeader: "",

      exportDisable: false,

      json_fields: {
        操作人: "operator",
        操作: "operation",
        资源名称: "resourceName",
        资源类型: "type",
        集群: "cluster",
        命名空间: "namespace",
        操作结果: "result",
        "客户端 IP": "clientIP",
        操作时间: "time",
      },

      tabForm: {
        operator: "全部",
        operation: "全部",
        resourceType: "全部",
        resourceName: "",

        filerTime: "近 30 分钟",
      },

      tabFormRules: {},

      operatorOptions: [
        { value: "全部", label: "全部" },
        { value: "k01137", label: "k01137" },
        { value: "k00326", label: "k00326" },
        { value: "k01021", label: "k01021" },
      ],

      operationOptions: [
        { value: "全部", label: "全部" },
        { value: "绑定", label: "绑定" },
        { value: "清理", label: "清理" },
        { value: "创建", label: "创建" },
        { value: "删除", label: "删除" },
        { value: "删除资源集", label: "删除资源集" },
        { value: "下载", label: "下载" },
        { value: "导出", label: "导出" },
        { value: "导出chart包", label: "导出chart包" },
        { value: "联邦化", label: "联邦化" },
        { value: "导入", label: "导入" },
        { value: "集成", label: "集成" },
        { value: "登录", label: "登录" },
        { value: "登录失败", label: "登录失败" },
        { value: "退出登录", label: "退出登录" },
        { value: "修改", label: "修改" },
        { value: "替换", label: "替换" },
        { value: "重启", label: "重启" },
        { value: "回滚", label: "回滚" },
        { value: "扫描", label: "扫描" },
        { value: "快照", label: "快照" },
        { value: "启动", label: "启动" },
        { value: "停止", label: "停止" },
        { value: "同步", label: "同步" },
        { value: "触发", label: "触发" },
        { value: "移除角色", label: "移除角色" },
        { value: "更新", label: "更新" },
        { value: "激活用户", label: "激活用户" },
        { value: "禁用用户", label: "禁用用户" },
        { value: "锁定用户", label: "锁定用户" },
        { value: "查看", label: "查看" },
      ],

      resourceTypeOptions: [
        { value: "全部", label: "全部" },
        { value: "configmaps", label: "configmaps (配置字典)" },
        { value: "deployments", label: "deployments (部署)" },
        { value: "ingresses", label: "ingresses" },
        { value: "pods", label: "pods (容器组)" },
        { value: "services", label: "services (内部路由)" },
        { value: "status", label: "services (内部路由)" },
      ],

      clusterOptions: [
        { value: "全部", label: "全部集群" },
        { value: "region", label: "region (region)" },
        { value: "global", label: "global (global)" },
      ],

      timeOptions: [
        {
          value: "近 15 分钟",
          label: "近 15 分钟",
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
          value: "近 6 小时",
          label: "近 6 小时",
        },
        {
          value: "近 1 天",
          label: "近 1 天",
        },
        {
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
        {
          value: "自定义",
          label: "自定义",
        },
      ],

      timepicker: true,

      pickerOptions: {
        shortcuts: [
          {
            text: "近 15 分钟",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 6 * 1000 * 15);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 30 分钟",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 60 * 1000 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 1 小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 60 * 1000 * 60);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 6 小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 60 * 1000 * 60 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 1 天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 3 天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近 7 天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      tableData,
      tableColumnList,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      // 事件详情数据
      editVisible: false,
      readOnly: true,
      autoUpdate: false,
      title: "审计详情",
      code: "",
      language: "json",
      submitTxt: "",
      btnVisible: {
        autoUpdate: false, //自动更新
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      spec: {
        apiVersion: "operators.coreos.com/vlalpha1",
        kind: "Subscription",
        metadata: {
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
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    // 搜索
    handleSearch() {},

    // 重置
    handleReset() {
      this.timepicker = true;
      this.tabForm = {
        operator: "全部",
        operation: "全部",
        resourceType: "全部",
        resourceName: "",

        filerTime: "近 30 分钟",
      };

      this.handleSearch();
    },

    handleSizeChange(val) {
      this.page.size = val;
      this.handleSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.handleSearch();
    },

    handleTime(val) {
      if (val == "自定义") {
        this.timepicker = false;
      } else {
        this.timepicker = true;
      }
    },

    handlePicker(val) {
      this.tabForm.filerTime = ["", ""];
      if (val) {
        //设置
        this.$set(this.tabForm.filerTime, 0, val[0]);
        this.$set(this.tabForm.filerTime, 1, val[1]);
      } else {
        //清空
        this.$set(this.tabForm.filerTime, 0, "");
        this.$set(this.tabForm.filerTime, 1, "");
        this.timepicker = true;
      }
    },

    //把日期格式转换成数字形式
    changeTime() {
      var date = new Date();
      // 月
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      // 日
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      // 小时
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      // 分钟
      var minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // 秒
      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 当前时间
      var currentTime =
        date.getFullYear() + month + strDate + hour + minute + second;

      this.titleTime = currentTime;

      if (this.timepicker == false) {
        this.tabForm.filerTime = this.tabForm.filerTime
          .join(",")
          .replace(",", " - ")
          .replace('"', "");
      }

      this.exportHeader = [
        `平台审计记录 - ${this.titleTime}.xls`,
        `时间范围：${this.tabForm.filerTime}`,
        `审计范围：用户操作，操作人：${this.tabForm.operator}，操作：${
          this.tabForm.operation
        }，集群：region，资源类型：${this.tabForm.resourceType}，资源名称：${
          this.tabForm.resourceName ? this.tabForm.resourceName : "全部"
        }`,
        `记录总数：${this.tableData.data.length} 条`,
      ];

      console.log(this.exportHeader);
    },

    handleExcel(a, b, c) {
      console.log(a, b, c);
    },

    closeDetailsDialog() {
      this.editVisible = false;
    },

    handleEdit(obj) {
      this.editVisible = true;
      // this.title = `编辑订阅 ${obj.name}`;
      this.code = JSON.stringify(this.spec, null, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 20px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
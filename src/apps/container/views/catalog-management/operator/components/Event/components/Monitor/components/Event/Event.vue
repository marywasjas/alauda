<template>
  <div class="calculation-container-group">
    <BaseCard style="height: 125px">
      <header></header>
      <section>
        <el-row>
          <el-col :span="6">
            <div class="card-title left-header" style="margin-bottom: 30px">
              <i class="el-icon-cpu primary2-text" />
              <span> CPU 使用总量</span>
              <br />
              <span style="font-size: 40px; margin-left: 10px">31.74m</span>
            </div></el-col
          >
          <el-col :span="6">
            <div class="card-title left-header" style="">
              <i class="el-icon-bank-card primary-text" />

              <span> 内存使用总量</span>
              <br />
              <span style="font-size: 40px; margin-left: 10px">0.20Gi</span>
            </div></el-col
          >
          <el-col :span="6">
            <div class="card-title left-header" style="">
              <i class="el-icon-switch-button primary-text" />

              <span> 5 分钟内重启总次数</span>
              <br />
              <span style="font-size: 40px; margin-left: 10px">0</span>
            </div></el-col
          >
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <!-- <el-table-column fixed prop="date" label="名称" >
          </el-table-column> -->
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
                <div v-if="col.id === 'name'">
                  <span>
                    {{ scope.row[col.id] }}
                  </span>
                </div>
                <div v-else-if="col.id === 'cpu'" class="cursor-pointer">
                  <!-- <span @click="handelDetails(scope.row)">
                    {{ scope.row[col.id] }}
                  </span> -->
                  <progress-card :chartData="progressData" />
                </div>
                <div v-else-if="col.id === 'memory'" class="cursor-pointer">
                  <!-- <span @click="handelDetails(scope.row)">
                    {{ scope.row[col.id] }}
                  </span> -->
                  <progress-card :chartData="progressData" />
                </div>
                <div v-else-if="col.id === 'storage'" class="cursor-pointer">
                  <!-- <span @click="handelDetails(scope.row)">
                    {{ scope.row[col.id] }}
                  </span> -->
                  <progress-card :chartData="progressData" />
                </div>
                <div v-else-if="col.id === 'total'">
                  <p class="margin0">
                    <i class="el-icon-cpu primary2-text" />
                    {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                  </p>
                  <p class="margin0">
                    <i class="el-icon-bank-card primary-text" />
                    {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                  </p>
                </div>

                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>控制趋势统计</span>
          <el-select
            v-model="resourceTime"
            filterable
            placeholder="请选择"
            size="small"
            style="margin-left: 800px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </header>
      <section class="component-div">
        <div style="margin-bottom: -50px; margin-top: 40px">
          <span style="margin-left: 30px"> CPU 用量 (m) </span>
          <span style="margin-left: 460px"> 内存用量 (Gi) </span>
        </div>
        <el-row>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>

        <div style="margin-bottom: -50px; margin-top: 40px">
          <span style="margin-left: 30px"> 排队平均延迟 (ms) </span>
          <span style="margin-left: 460px"> 处理平均延迟 (ms) </span>
        </div>
        <el-row>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>

        <div style="margin-bottom: -50px; margin-top: 40px">
          <span style="margin-left: 30px"> 资源添加速率 (次/分钟) </span>
          <span style="margin-left: 460px"> 队列深度 (个) </span>
        </div>
        <el-row>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import {
  tableColumnList,
  tableData,
  containerLineData,
} from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import ProgressCard from "./ProgressCard.vue";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";
import LineChart from "./LineChart";

import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock, ProgressCard, MonacoEditorDialog, LineChart },

  props: {},
  data() {
    return {
      resourceTime: "近 1 小时",
      timeOptions: [
        {
          value: "近 1 小时",
          label: "近 1 小时",
        },
        {
          value: "近 3 小时",
          label: "近 3 小时",
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
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
      ],

      tableData,
      tableColumnList,
      containerLineData,

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
      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      updateNodeVisible: false,
      nodeDialogVisible: false,
      setSpotVisible: false,
      stopDispatchVisible: false,
      deleteVisible: false,
      typeOptions: [
        {
          key: "NoSchedule",
          value: "NoSchedule",
        },
        {
          key: "PerferNoSchedule",
          value: "PerferNoSchedule",
        },

        {
          key: "NoExecute",
          value: "NoExcute",
        },
      ],
      tableColumnList,
      tableData,
      deleteName: "",
      nodeForm: {
        nodeItems: [
          {
            id: nanoid(),
            selected: "",
            showName: "",
            ipv4: "",
            sship: "",
            netCard: "",
            type: "",
          },
        ],
        config: false,
        sshPort: "",
        node: "密码",
        nodeName: "",
        password: "",
        key: "",
        keyPassword: "",
      },
      nodeRules: {
        sshPort: [
          { required: true, message: "SSH 端口是必填项", trigger: "blur" },
        ],
        nodeName: [
          { required: true, message: "节点用户名是必填项", trigger: "blur" },
        ],
        key: [{ required: true, message: "私钥是必填项", trigger: "blur" }],
      },
      nodeUpdateForm: {
        nodeUpdateItems: [
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd54" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd64" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd74" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd84" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd94" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd104" },
        ],
      },
      nodeUpdateRules: {},

      setSpotForm: {
        setSpotItems: [
          {
            id: nanoid(),
            key: "node-role.kubernetes.io/master",
            value: "",
            type: "",
          },
        ],
      },
      setSpotRules: {},

      page: {
        total: 10,
        current: 1,
        pageSize: 10,
      },

      handleDeleteVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.deleteName = this.$route.query.name;
  },
  mounted() {},
  methods: {
    openDetails(row) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.code = JSON.stringify(this.spec, null, 2);
    },
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
    onSearch() {
      console.log("搜索");
    },

    handleCreateNode() {
      this.nodeDialogVisible = true;
    },

    // 取消dialog
    cancelDialog() {
      this.nodeDialogVisible = false;
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    handleCreate() {},
    handleSure() {},

    handleAddNode(filed) {
      const obj = {
        id: nanoid(),
        selected: "",
        showName: "",
        ipv4: "",
        sship: "",
        netCard: "",
        type: "",
      };
      this.nodeForm[filed].push(obj);
    },

    // 删除
    handleDeleteNode(filed, item, index) {
      this.nodeForm[filed].splice(index, 1);
    },

    // ====================================================================
    handleUpdateLabel() {
      this.updateNodeVisible = true;
    },
    cancelNodeUpdate() {
      this.updateNodeVisible = false;
    },
    handleUpdate() {},
    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.nodeUpdateForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.nodeUpdateForm[filed].splice(index, 1);
    },

    // ====================================================================
    handleSetSpot() {
      this.setSpotVisible = true;
    },
    cancelSetSpot() {
      this.setSpotVisible = false;
    },
    handleSet() {},

    handleAddSetSpot(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
        type: "",
      };
      this.setSpotForm[filed].push(obj);
    },
    // 删除
    handleDeleteSetSpot(filed, item, index) {
      this.setSpotForm[filed].splice(index, 1);
    },
    // ====================================================================
    handleStopDispatch() {
      this.stopDispatchVisible = true;
    },
    cancelStop() {
      this.stopDispatchVisible = false;
    },
    handleStop() {},

    // ====================================================================

    handleDelete() {
      this.deleteVisible = true;
    },
    canceldelete() {
      this.deleteVisible = false;
    },
    // ====================================================================

    handle_delete() {
      this.deleteVisible = true;
    },
    handleDeleteContainer() {
      this.handleDeleteVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
.row-bg {
  padding: 0;
  background-color: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
</style>
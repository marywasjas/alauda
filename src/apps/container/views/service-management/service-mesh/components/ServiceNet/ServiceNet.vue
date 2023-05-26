<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ titleName }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10" type="primary">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate">
                  更新网格配置
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleSilence">
                  配置地域负载
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete">
                  添加集群
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            class="label-value"
            v-for="item in detailData"
            :key="item.label"
            :span="12"
          >
            <span> {{ item.label }} </span>
            : &nbsp;&nbsp;

            <span v-if="item.label == '显示名称'">
              {{ item.value }}
              <i
                :class="item.afterIcon"
                class="cursor-pointer margin-left10"
                @click="handleUpdate(item)"
              />
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">网格部署</span>
      </div>
      <el-row :gutter="24">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
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
              <div v-if="col.id === 'cluster'">
                <div class="cursor-pointer">{{ scope.row[col.id] }}</div>
                <div style="color: rgba(150, 152, 155)">
                  {{ scope.row[col.id] }}
                </div>
              </div>

              <div v-else-if="col.id === 'status'">
                <i
                  :class="
                    scope.row.status === '运行中'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                {{ scope.row[col.id] }}
                <i
                  class="el-icon-document cursor-pointer"
                  @click="handleTablet"
                />
              </div>

              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleRemove(scope.row)">
                      移除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">网格配置</span>
      </div>

      <el-row :gutter="24" style="margin-top: 10px">
        <el-col :span="12">
          <span
            style="
              font-size: 18px;
              font-weight: 500;
              margin-bottom: 14px;
              margin-left: 15px;
            "
          >
            服务器配置
          </span>
          <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
            <el-col
              v-for="item in detailResData"
              :key="item.label"
              :span="24"
              class="label-value"
            >
              <span> {{ item.label }} </span>: &nbsp;&nbsp;
              <span
                ><i class="el-icon-cpu primary2-text" /> {{ `${item.cpu} 核` }}
              </span>
              <span>
                <i class="el-icon-bank-card primary-text" />
                {{ `${item.memory} Mi` }}
              </span>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <span
            style="
              font-size: 18px;
              font-weight: 500;
              margin-bottom: 14px;
              margin-left: 15px;
            "
          >
            调用链配置
          </span>
          <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
            <el-col
              v-for="item in detailResData2"
              :key="item.label"
              :span="12"
              class="label-value"
            >
              <span> {{ item.label }} </span>: &nbsp;&nbsp;
              <span v-if="item.label == '对接 Kafka'">
                {{ item.value }}
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <div style="max-width: 400px">
                      开启时，调用链数据将通过 Kafka 写入
                      Elasticsearch，避免流量过大时增加对 Elasticsearch
                      的写入压力，但存在一定的调用链查询延迟；关闭时，调用链数据将直接写入
                      Elasticsearch。
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </span>
              <span v-else> {{ item.value }} </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 10px">
        <el-col :span="12">
          <span
            style="
              font-size: 18px;
              font-weight: 500;
              margin-bottom: 14px;
              margin-left: 15px;
            "
          >
            监控系统对接
          </span>
          <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
            <el-col
              v-for="item in detailResData3"
              :key="item.label"
              :span="24"
              class="label-value"
            >
              <span> {{ item.label }} </span>: &nbsp;&nbsp;
              <span> {{ item.value }} </span>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <span
            style="
              font-size: 18px;
              font-weight: 500;
              margin-bottom: 14px;
              margin-left: 15px;
            "
          >
            Elasticsearch 对接
          </span>
          <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
            <el-col
              v-for="item in detailResData4"
              :key="item.label"
              :span="24"
              class="label-value"
            >
              <span> {{ item.label }} </span>: &nbsp;&nbsp;
              <span> {{ item.value }} </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <!-- <header>
          <div class="card-title left-header">
            <span>{{ "网格" }}</span>
          </div>
        </header> -->
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">命名空间</span>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="global" name="1">
          <el-table
            class="margin-top"
            :data="tableData.data"
            style="width: 100%"
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
                <div v-if="col.id === 'message'">
                  {{
                    scope.row[col.id].length > 20
                      ? scope.row[col.id].substring(0, 20) + "..."
                      : scope.row[col.id]
                  }}
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      title="更新网格配置"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
      width="80%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        :rules="updateRules"
        label-width="135px"
      >
        <label class="el-form-item__label" style="width: 135px">
          Sidecar 资源配置
        </label>
        <div class="component-div-dialog">
          <el-row type="flex" class="container-div" style="padding-top: 20px">
            <el-col :span="11">
              <el-form-item prop="cpu">
                <el-input v-model="updateForm.cpu">
                  <template slot="prepend">CPU</template>
                  <template slot="append">核</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" style="margin-left: -100px">
              <el-form-item prop="memory">
                <el-input v-model="updateForm.memory">
                  <template slot="prepend">内存</template>
                  <template slot="append">Mi</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <label class="el-form-item__label" style="width: 135px">
          调用链配置
        </label>
        <div class="component-div-dialog">
          <el-row type="flex" class="container-div" style="padding-top: 20px">
            <el-col :span="11">
              <el-form-item label="采样率">
                <el-input v-model="updateForm.sampleRate" style="width: 85%">
                  <template slot="append">%</template>
                </el-input>
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <div style="max-width: 450px">
                      为减少数据采集对系统的压力，根据业务需要设置监控数据的采样率，用于控制调用链数据采集的比率，默认为
                      100%
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="对接 Kafka">
                <el-switch v-model="updateForm.kafka"></el-switch>
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <div style="max-width: 450px">
                      开启时，调用链数据将通过 Kafka 写入
                      Elasticsearch，避免流量过大时增加对 Elasticsearch
                      的写入压力，但存在一定的调用链查询延迟；关闭时，调用链数据将直接写入
                      Elasticsearch。
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <label class="el-form-item__label" style="width: 135px">
          Elasticsearch 对接
        </label>
        <div class="component-div-dialog">
          <el-row class="container-div" style="padding-top: 20px">
            <el-col :span="24">
              <el-form-item label="来源">
                <el-radio-group
                  v-model="updateForm.origin_elastic"
                  @input="handleRadio"
                >
                  <el-radio-button label="平台提供"></el-radio-button>
                  <el-radio-button label="自定义"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="22">
              <el-form-item label="URL" prop="url">
                <el-input
                  v-model="updateForm.url_elastic"
                  placeholder="请输入 Elasticsearch 地址"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="updateForm.origin_elastic == '自定义'">
              <el-form-item label="保密字典">
                <el-select
                  v-model="updateForm.dictionary_elastic"
                  @focus="setMinWidthEmpty"
                  style="width: 65%"
                  placeholder="请选择保密字典"
                >
                  <el-option
                    v-for="item in dictionaryOptions_elastic"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

                <el-button
                  type="primary"
                  style="margin-left: 40px"
                  @click="handleCreateDict('elastic')"
                  >新建保密字典</el-button
                >
              </el-form-item>
              <el-descriptions
                size="small"
                :colon="false"
                :contentStyle="rowCenter"
              >
                <el-descriptions-item>
                  您可前往 global 集群的 cpaas-system
                  命名空间管理存储了认证信息的保密字典
                </el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
        </div>

        <label class="el-form-item__label" style="width: 135px">
          监控系统对接
        </label>
        <div class="component-div-dialog">
          <el-row class="container-div" style="padding-top: 20px">
            <el-col :span="24">
              <el-form-item label="来源">
                <el-radio-group v-model="updateForm.origin_monitor">
                  <el-radio-button label="平台提供"></el-radio-button>
                  <el-radio-button label="自定义"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="22">
              <el-form-item label="监控系统类型">
                <span v-if="updateForm.origin_monitor == '平台提供'">
                  Prometheus
                </span>

                <el-select
                  v-else
                  v-model="updateForm.monitorType"
                  @focus="setMinWidthEmpty"
                  style="width: 100%"
                  placeholder="请选择保密字典"
                >
                  <el-option
                    v-for="item in monitorOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="22">
              <el-form-item label="URL" prop="url_monitor">
                <el-input
                  v-model="updateForm.url_monitor"
                  :disabled="urlDisabled2"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="updateForm.origin_monitor == '自定义'">
              <el-form-item label="保密字典">
                <el-select
                  v-model="updateForm.dictionary"
                  @focus="setMinWidthEmpty"
                  style="width: 65%"
                  placeholder="请选择保密字典"
                >
                  <el-option
                    v-for="item in dictionaryOptions_monitor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

                <el-button
                  type="primary"
                  style="margin-left: 40px"
                  @click="handleCreateDict('monitor')"
                  >新建保密字典</el-button
                >
              </el-form-item>
              <el-descriptions
                size="small"
                :colon="false"
                :contentStyle="rowCenter"
              >
                <el-descriptions-item>
                  您可前往 global 集群的 cpaas-system
                  命名空间管理存储了认证信息的保密字典
                </el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_update">更新</el-button>
        <el-button @click="updateVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";

import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock, MonacoEditor },
  props: {},
  data() {
    return {
      activeName: "1",

      updateVisible: false,

      updateForm: {
        cpu: "0.1",
        memory: "128",
        sampleRate: "100",
        kafka: false,
        origin_elastic: "平台提供",
        url_elastic: "http://25.2.20.203:443/es_proxy",
        dictionary_elastic: "",
        origin_monitor: "平台提供",
        url_monitor: "http://25.2.20.203:443/es_proxy",
        monitorType: "victoriaMetrics",
        automatic: false,

        nodeAntiAffi: "期望",

        instanceNum: 1,

        cpu_gateway: "0.5",
        memory_gateway: "0.5",
      },

      updateRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        version: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cluster: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        memory: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        url_elastic: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        url_monitor: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instanceNum: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_gateway: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_gateway: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      urlDisabled: false,
      urlDisabled2: false,

      monitorOptions: [
        { label: "Prometheus", value: "prometheus" },
        { label: "VictoriaMetrics", value: "victoriaMetrics" },
      ],

      detailResData: [
        {
          label: "Sidecar 资源配额",
          cpu: "0.1",
          memory: "128",
        },
      ],

      detailResData2: [
        { label: "采样率", value: "100%" },
        { label: "对接 Kafka", value: "关闭" },
      ],

      detailResData3: [
        { label: "来源", value: "平台提供" },
        { label: "监控系统类型", value: "Prometheus" },
        { label: "URL", value: "http://25.2.2.2:80/cluster/global/prometheus" },
      ],

      detailResData4: [
        { label: "来源", value: "平台提供" },
        { label: "URL", value: "http://25.2.2.2:80/es_proxy" },
      ],

      titleName: "",

      updateVisible: false,
      deployVisible: false,

      detailData: [
        {
          label: "显示名称",
          value: "service-mesh",
          afterIcon: "el-icon-edit",
        },
        {
          label: "更新时间",
          value: "2023-05-22 10:14:24",
        },
        {
          label: "Istio 版本",
          value: "1.12.4",
        },
        {
          label: "命名空间",
          value: "所有命名空间",
        },
      ],

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

      language: "yaml",

      currentCode: "",
      inputCode: {},
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: false,
        reset: false,
        find: false,
        copy: false,
        full: true,
      },

      currentCode2: "",
      inputCode2: {},
      btnVisible2: {
        autoUpdate: false,
        import: false,
        export: false,
        reset: false,
        find: true,
        copy: false,
        full: true,
      },

      defaultCode: {
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
  created() {
    this.titleName = this.$route.query.name;
  },
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

    handleUpdate() {
      this.updateVisible = true;
    },

    handleRadio(val) {
      if (val == "自定义") {
        this.updateForm.url_elastic = "";
      } else {
        this.updateForm.url_elastic = "http://25.2.20.203:443/es_proxy";
      }
    },

    handle_update() {},

    handleTablet() {
      this.deployVisible = true;
    },

    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },

    // 编辑器失去焦点
    handleBlur2(value) {
      this.inputCode2 = value;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    // color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%; //更改竖向分割线长度
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
}
.component-div-computed {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
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
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 290px;
  height: 180px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  font-size: 14px;
  height: 65px;
  line-height: 21px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.yamlStyle {
  // margin-top: 10px;
  padding: 0px;
  // background: rgba(150, 152, 155);
  -webkit-box-shadow: 0px 0px 0px 0px rgba(50, 52, 55, 0.16);
  box-shadow: 0px 0px 0px 0px rgba(50, 52, 55, 0.16);
  border-radius: 0px;
  margin-bottom: 16px;
}
.component-div-dialog {
  margin-top: 16px;
  margin-left: 136px;
  padding: 10px;
  background: rgba(247, 249, 252);
  .container-div {
    background: #fff;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.label-value {
  margin-bottom: 12px;
  margin-top: 12px;
  span {
    font-size: $font-size-14;
    font-weight: bold;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
::v-deep .el-tabs__item:hover {
  // color: orange;
  // background-color: orange;
  border-bottom-color: orange;
}
::v-deep .el-tabs__item.is-active {
  // color: orange;
  // background-color: orange;
  border-bottom-color: orange;
}
</style>
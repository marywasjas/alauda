<template>
  <div class="create-container">
    <div class="scroll-div">
      <!-- 基本信息 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">基本信息</span>
        </div>
        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <el-form-item label="名称" prop="name">
            <el-col :span="16">
              <span v-if="name">{{ infoForm.name }}</span>
              <el-input
                v-else
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称" prop="showname">
            <el-col :span="16">
              <el-input
                :disabled="disabled.showname"
                v-model="infoForm.showname"
                placeholder="最多 64 个字符"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="描述">
            <el-col :span="16">
              <el-input v-model="infoForm.desc" :disabled="disabled.desc" />
            </el-col>
          </el-form-item>

          <el-form-item label="资源类型">
            <el-col :span="16">
              <span v-if="name">{{ infoForm.resourceType }}</span>
              <el-radio-group v-model="infoForm.resourceType" v-else>
                <el-radio-button label="cluster">集群</el-radio-button>
                <el-radio-button label="node">节点</el-radio-button>
                <el-radio-button label="microservice">微服务</el-radio-button>
                <el-radio-button label="component">计算组件</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item
            label="资源名称"
            v-if="
              infoForm.resourceType == 'cluster' ||
              infoForm.resourceType == 'node'
            "
          >
            <el-col :span="16">
              <span v-if="infoForm.resourceType == 'cluster'">
                {{ "global(global)" }}
              </span>

              <el-select
                v-if="infoForm.resourceType == 'node'"
                v-model="infoForm.resourceName"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in nodeOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="资源对象" v-else>
            <el-col :span="16">
              <el-select
                v-model="infoForm.namespace"
                @focus="setMinWidthEmpty"
                style="width: 48%; margin-right: 15px"
              >
                <span slot="prefix" class="">命名空间：</span>
                <el-option
                  v-for="item in namespaceOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>

              <el-select
                v-model="infoForm.microService"
                @focus="setMinWidthEmpty"
                style="width: 48%"
              >
                <span slot="prefix">
                  {{
                    infoForm.resourceType == "microservice"
                      ? "微服务:"
                      : "资源名称: "
                  }}
                </span>
                <el-option
                  v-for="item in []"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
      </el-card>


    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleSubmit">
        <span>{{ name ? "更新" : " 创建" }}</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

import Mock from "mockjs";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor, FoldableBlock },
  data() {
    return {
      name: "",

      containerLineData: null,

      btnText: "",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      infoForm: {
        name: "",
        showname: "",
        desc: "",
        resourceType: "cluster",
        resourceName: "",
        microService: "",
      },

      infoRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        showname: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
      measureOptions: [
        { label: "%", value: "%" },
        { label: "byte/second", value: "byte/second" },
        { label: "byte", value: "byte" },
        { label: "kb", value: "kb" },
        { label: "mb", value: "mb" },
        { label: "gb", value: "gb" },
        { label: "core", value: "core" },
        { label: "s", value: "s" },
        { label: "ms", value: "ms" },
      ],
      metricNameOptions: [
        {
          label: "集群内的处于告警状态的告警数(cluster.alert.firing)",
          value: "集群内的处于告警状态的告警数(cluster.alert.firing)",
        },
        {
          label: "集群内的cpu使用率(cluster.cpu.utilization)",
          value: "集群内的cpu使用率(cluster.cpu.utilization)",
        },
        {
          label: "集群物理GPU显存使用率(cluster.gpu.memory.utilization)",
          value: "集群物理GPU显存使用率(cluster.gpu.memory.utilization)",
        },
        {
          label: "集群的物理GPU使用率(cluster.gpu.utilization)",
          value: "集群的物理GPU使用率(cluster.gpu.utilization)",
        },
      ],
      operatorOptions: [
        { label: ">", value: ">" },
        { label: ">=", value: ">=" },
        { label: "==", value: "==" },
        { label: "<=", value: "<=" },
        { label: "<", value: "<" },
        { label: "!=", value: "!=" },
      ],
      persistOptions: [
        { label: "持续 30 秒", value: "30s" },
        { label: "持续 1 分钟", value: "1min" },
        { label: "持续 2 分钟", value: "2min" },
        { label: "持续 3 分钟", value: "3min" },
        { label: "持续 5 分钟", value: "5min" },
        { label: "持续 10 分钟", value: "10min" },
        { label: "持续 30 分钟", value: "30min" },
      ],
      policyOptions: [
        {
          label: "cpass-admin-notification",
          value: "cpass-admin-notification",
        },
      ],
      timeOptions: [
        { label: "5分钟", value: "5min" },
        { label: "10分钟", value: "10min" },
        { label: "15分钟", value: "15min" },
        { label: "30分钟", value: "30min" },
        { label: "1小时", value: "1h" },
        { label: "3小时", value: "3h" },
        { label: "6小时", value: "6h" },
        { label: "12小时", value: "12h" },
        { label: "1天", value: "1day" },
        { label: "不重复", value: "no-repeat" },
      ],

      configForm: {
        noticePolicy: "",
        sendInterval: "global",
        disaster: "5min",
        serious: "5min",
        warning: "5min",
        tips: "5min",
      },
      configRules: {},

      alarmForm: {
        nodeUpdateItems: [],
      },
      alarmRules: {},

      // 告警规则
      alarmRulesVisible: false,
      alarmRulesTitle: "",
      alarmRulesForm: {
        type: "metric",
        metricName: "集群内的处于告警状态的告警数(cluster.alert.firing)",
        metricName2: "",
        triggerCond: ">",
        number: "",
        persist: "30s",
        level: "disaster",
        // disabled: true,
        expression: "",
        measure: "",
        params: "",
        labelItems: [],
        noteItems: [],
      },
      alarmRulesRules: {
        metricName: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        metricName2: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        triggerCond: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        expression: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      nodeOptions: [
        { id: "all", label: "全部节点" },
        { id: "25.2.20.11", label: "25.2.20.11(25.2.20.11)" },
        { id: "25.2.25.11", label: "25.2.25.11(25.2.25.11)" },
        { id: "25.2.20.216", label: "25.2.20.216(25.2.20.216)" },
        { id: "25.25.20.1", label: "25.25.20.1(25.25.20.1)" },
      ],

      namespaceOptions: [
        { id: "baas", label: "baas" },
        { id: "cert-manager", label: "cert-manager" },
        { id: "chaos", label: "chaos" },
        { id: "cpaas-dev", label: "cpaas-dev" },
      ],

      alarmRulesItems: [],

      alarmDialogVisible: false,

      disabled: {
        showname: false,
        desc: false,
        addRules: false,
        disable: false,
        sendInterval: false,
      },
    };
  },

  created() {
    this.containerLineData = Mock.mock({
      fields: [
        { name: "global", flied: "yxz" },
        { name: "region", flied: "abc" },
      ],
      "data|6": [
        {
          name: "@now('hour')",
          yxz: "@integer(0 ,1)",
          abc: "@integer(0 ,1)",
        },
      ],
    });

    this.name = this.$route.query.name;

    if (this.$route.query.name) {
      const obj = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [],
        noteItems: [],
      };
      const obj2 = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [{ key: "a", value: "b" }],
        noteItems: [{ key: "c", value: "d" }],
      };
      const obj3 = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [{ key: "a", value: "b" }],
        noteItems: [{ key: "c", value: "d" }],
      };
      const obj4 = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [{ key: "a", value: "b" }],
        noteItems: [{ key: "c", value: "d" }],
      };
      this.alarmForm["nodeUpdateItems"].push(obj, obj2, obj3, obj4);

      this.infoForm = {
        name: this.name,
        showname: "平台组件Cert-manager",
        desc: "Cpaas平台组件Cert-manager的告警策略",
        // resourceType: "component",
        resourceType: "计算组件",
        resourceName: "cert-manager",
        microService: "cert-manager",
        namespace: "cert-manager",
      };

      this.configForm = {
        noticePolicy: ["cpass-admin-notification"],
        sendInterval: "global",
      };

      this.disabled = {
        showname: true,
        desc: true,
        addRules: true,
        disable: true,
        sendInterval: true,
      };
    }
  },

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

    handleSubmit() {},

    cancelCreate() {
      this.$router.go(-1);
    },

    // 添加
    handleAddAlarmRules() {
      this.alarmRulesTitle = "添加告警规则";
      this.btnText = "添加";
      this.alarmRulesForm = this.$options.data().alarmRulesForm;
      this.alarmRulesVisible = true;
    },
    // 删除
    handleDeleteAlarmRules(filed, item, index) {
      this.alarmForm[filed].splice(index, 1);
    },

    handleEditAlarmRules(filed, item, index) {
      this.alarmRulesTitle = "编辑告警规则";
      this.btnText = "确定";
      this.alarmRulesVisible = true;
      this.alarmRulesForm = Object.assign(
        {
          type: "metric",
          metricName: "集群内的处于告警状态的告警数(cluster.alert.firing)",
          metricName2: "",
          triggerCond: ">",
          number: "30",
          persist: "30s",
          level: "disaster",
          expression: "",
          measure: "",
          params: "",
          labelItems: [],
          noteItems: [],
        },
        { ...item, type: "metric", level: "disaster" }
      );
    },

    handleAddRules(filed) {
      this.alarmRulesVisible = false;
      const obj = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [],
        noteItems: [],
      };
      const obj2 = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        disabled: true,
        labelItems: [{ key: "a", value: "b" }],
        noteItems: [{ key: "c", value: "d" }],
      };
      this.alarmForm[filed].push(obj, obj2);
    },

    // 添加
    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.alarmRulesForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.alarmRulesForm[filed].splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .fixed-div {
    // width: calc(100% - 42px);
    width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}

.create-container[data-v-5e8ccdd2] {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100%;
  position: relative;
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 9px;
  height: 40px;
  line-height: 40px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.el-card__body {
  padding: 20px;
  padding-top: 0;
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
::v-deep .el-input--prefix {
  // position: absolute;
  height: 100%;
  left: 5px;
  top: 1px;
  .el-input__inner {
    padding-left: 70px;
    // padding-top: -5px;
  }
}
.left-cell {
  float: left;
  margin-left: 1px;
}
</style>
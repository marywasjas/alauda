<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            基本信息
          </div>
        </div>
        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <el-form-item label="名称" prop="name">
            <el-col :span="16">
              <el-input
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称" prop="showname">
            <el-col :span="16">
              <el-input
                v-model="infoForm.namespace"
                placeholder="最多 64 个字符"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="描述">
            <el-col :span="16">
              <el-input v-model="infoForm.desc" />
            </el-col>
          </el-form-item>

          <el-form-item label="资源类型">
            <el-col :span="16">
              <el-radio-group v-model="infoForm.resourceType">
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

      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            告警规则
          </div>
        </div>

        <table border="0" style="width: 100%">
          <thead>
            <tr class="headerStyle">
              <th>
                <div class="cell">规则</div>
              </th>
              <th>
                <div class="cell">告警类型</div>
              </th>
              <th>
                <div class="cell">等级</div>
              </th>
              <th>
                <div class="cell">禁用/启用</div>
              </th>
              <th>
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(domain, index) in alarmRulesItems" :key="domain.id">
              <td>
                <el-form-item>
                  <span>{{ "asfasfage" }}</span>
                </el-form-item>
              </td>
              <td>
                <el-form-item>
                  <span>{{ "asfasfage" }}</span>
                </el-form-item>
              </td>
              <td class="text-center">
                <el-button
                  icon="el-icon-remove-outline"
                  class="cursor-pointer margin-left10 margin-right10"
                  type="text"
                  @click="handleDeleteParams('alarmRulesItems', domain, index)"
                />
                <el-button
                  icon="el-icon-remove-outline"
                  class="cursor-pointer margin-left10 margin-right10"
                  type="text"
                  @click="handleDeleteParams('alarmRulesItems', domain, index)"
                />
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <div
                  class="cursor-pointer text-center hover-div"
                  @click="handleAddParams('alarmRulesItems')"
                >
                  <i class="el-icon-circle-plus-outline" />
                  添加告警规则
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="prevSubmit">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <!-- v-if="policyHitDialogStatus" -->
    <el-dialog
      title="添加/更新 告警规则 (集群)"
      @close="alarmDialogVisible = false"
      :visible.sync="alarmDialogVisible"
      width="75%"
    >
      <line-chart />
      <!-- <line-chart  style="width: 100%; height: 400px" /> -->
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";
// import lineChart from "./lineChart.vue";
import lineChart from "@/apps/container/views/components/LineChart.vue";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor, FoldableBlock, lineChart },
  data() {
    return {
      chartData: null,

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
        // resourceObj: "",
        namespace: "baas",
        microService: "",
      },

      infoRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        showname: [
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
    };
  },

  created() {},

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

    handleAddParams(filed) {
      // const obj = {
      //   id: nanoid(),
      //   rule: "",
      //   type: "",
      //   grade: "",
      //   disable: "",
      // };
      // this.alarmRulesItems.push(obj);

      this.alarmDialogVisible = true;
    },

    handleDeleteParams(filed, item, index) {
      this.alarmRulesItems.splice(index, 1);
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
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 70px;
  // padding-top: -5px;
}
</style>
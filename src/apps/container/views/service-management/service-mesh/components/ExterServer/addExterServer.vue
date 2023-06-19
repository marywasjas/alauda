<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div>
            <div class="titleStyle">添加外部服务(集群: global)</div>
          </div>

          <el-steps :active="active" align-center style="margin-top: 10px">
            <el-step title="基本信息"></el-step>
            <el-step title="绑定出口网关"></el-step>
          </el-steps>
        </div>

        <div class="text item event-container">
          <el-form
            v-if="active == 0"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <el-form-item label="服务名称" prop="serverName">
              <el-input v-model="ruleForm.serverName" />
            </el-form-item>

            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>

            <el-form-item label="服务协议" prop="serverProtocol">
              <el-select
                v-model="ruleForm.serverProtocol"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in [
                    { value: 'http', label: '七层(HTTP/HTTP2/HTTPS)' },
                    { value: 'tcp', label: '四层(TCP)' },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="服务地址"
              prop="serverAddress"
              v-if="ruleForm.serverProtocol == 'http'"
            >
              <el-input
                v-model="ruleForm.serverAddress"
                placeholder="填写域名, 如 www.example.com。"
              />
            </el-form-item>

            <el-form-item
              label="服务 IP"
              v-if="ruleForm.serverProtocol == 'http'"
            >
              <el-input
                v-model="ruleForm.serverIP"
                placeholder="填写服务的实例 IP 。支持填写多个, 按回车键确认。对外部服务的访问流量可在对各服务 IP 之间负载均衡据。"
              />
            </el-form-item>

            <el-form-item
              label="IP 地址"
              prop="ipAddress"
              v-if="ruleForm.serverProtocol == 'tcp'"
            >
              <el-input
                v-model="ruleForm.ipAddress"
                placeholder="可填写外部服务 IP 。支持多个, 按回车确认"
              />
            </el-form-item>

            <el-form-item label="服务端口" prop="serverPort">
              <table border="0" style="width: 100%">
                <thead>
                  <tr class="headerStyle">
                    <th>
                      <div class="cell">协议</div>
                    </th>
                    <th>
                      <div class="cell">端口</div>
                    </th>
                    <th>
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style="margin-bottom: 5px"
                    v-for="(item, index) in ruleForm.portItems"
                    :key="item.id"
                  >
                    <td>
                      <el-form-item
                        label=""
                        :prop="'portItems.' + index + '.key'"
                        :rules="{
                          required: true,
                          message: '键不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input v-model="item.key" />
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item
                        label=""
                        :prop="'portItems.' + index + '.value'"
                        :rules="{
                          required: true,
                          message: '值不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input v-model="item.value" />
                      </el-form-item>
                    </td>
                    <td>
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="handlePortDelete(item, index)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handlePortAdd"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </el-form>

          <LineAlert
            v-if="active == 1"
            content='如果当前服务网格和外部服务之间的网络不同, 请点击下方 "绑定出口网关" 按钮, 开启绑定出口网关功能。开启后, 可通过出口网关将流量转发到外部服务上。'
          />

          <el-form
            v-if="active == 1"
            ref="ruleForm"
            :model="ruleForm2"
            :rules="rules2"
            label-width="135px"
          >
            <el-form-item label="绑定出口网关">
              <el-switch v-model="ruleForm2.egressGateway"></el-switch>
            </el-form-item>

            <label
              class="el-form-item__label"
              style="width: 135px"
              v-if="ruleForm2.egressGateway == true"
            >
              监控系统对接
            </label>
            <LineAlert
              v-if="ruleForm2.egressGateway == true"
              content="若选择的出口网关在网格内其他集群的同名命名空间也存在, 则必须在其他集群创建相同的外部服务且绑定对应的出口网关。"
            />

            <div
              class="component-div-dialog"
              v-if="ruleForm2.egressGateway == true"
            >
              <el-row class="container-div" style="padding-top: 20px">
                <el-form-item label="所属命名空间" prop="namespace">
                  <el-select
                    v-model="ruleForm2.namespace"
                    @focus="setMinWidthEmpty"
                    style="width: 90%"
                  >
                    <el-option
                      v-for="item in namespaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="出口网关" prop="egress">
                  <el-select
                    v-model="ruleForm2.egress"
                    @focus="setMinWidthEmpty"
                    style="width: 90%"
                  >
                    <el-option
                      v-for="item in namespaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="出口网关">
                  <el-select
                    v-model="ruleForm2.egress"
                    @focus="setMinWidthEmpty"
                    style="width: 90%"
                  >
                    <el-option
                      v-for="item in namespaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <!-- <el-col :span="22">
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
                </el-col> -->
              </el-row>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div" v-if="active == 0">
      <el-button type="primary" @click="nextSubmit">
        <span>下一步</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <div class="fixed-div" v-else>
      <el-button @click="prevSubmit">上一步</el-button>
      <el-button type="primary" @click="submitCreate">
        <span>接入</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import { nanoid } from "nanoid";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor, FoldableBlock },
  data() {
    return {
      currentCode: "{}",
      inputCode: {},
      language: "yaml",
      rowCenter: {
        "max-width": "600px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      namespaceOptions: [
        {
          value: "istio-system",
          label: "istio-system",
        },
      ],

      namespaceOptions: [
        {
          value: "istio-system",
          label: "istio-system",
        },
      ],

      active: 0,
      method: "表单",

      ruleForm: {
        serverName: "",
        showName: "",

        portItems: [
          {
            id: nanoid(),
            key: "",
            value: "",
          },
        ],
      },

      rules: {},

      ruleForm2: {
        egressGateway: false,
        namespace: "",
        egress: "",
      },

      rules2: {},
    };
  },

  created() {},

  methods: {
    permission() {
      this.permVisible = true;
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

    // 提交创建表单
    submitCreate() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },

    nextSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.active = 1;
          // this.$refs["ruleForm"].resetFields();
          this.$refs["ruleForm"].clearValidate();
          this.ruleForm = this.$options.data().ruleForm;
        } else {
          return false;
        }
      });
    },
    prevSubmit() {
      this.active = 0;
      this.$refs["ruleForm"].clearValidate();
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },

    handlePortDelete(item, index) {
      this.ruleForm.portItems.splice(this.ruleForm.portItems.indexOf(item), 1);
    },

    handlePortAdd() {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.ruleForm.portItems.push(obj);
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
    width: calc(100% - 250px);
    // width: calc(100% - 250px);
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
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}
.event-container {
  .event-list-wrapper {
    margin-top: 10px;
    .event-card {
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border: 1px solid $border-color-one;
      .card-header {
        box-sizing: border-box;
      }
      .text {
        color: $font-color-title;
        font-weight: bold;
      }
      .number,
      .time {
        color: $font-color-text;
        font-size: $font-size-14;
      }
      .circle {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $color-primary;
        margin-right: 8px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
}
.titleStyle {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-form-item .el-form-item {
  margin-bottom: 5px;
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
</style>
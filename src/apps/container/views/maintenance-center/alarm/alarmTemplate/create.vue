<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">基本信息</span>
        </div>
        <div class="text item event-container">
          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="infoRules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="infoForm.name"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述" prop="desc">
                  <el-input v-model="infoForm.desc" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 描述 -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述">
                  <el-radio-group v-model="infoForm.type">
                    <el-radio-button label="cluster">集群</el-radio-button>
                    <el-radio-button label="node">节点</el-radio-button>
                    <el-radio-button label="microserver"
                      >微服务</el-radio-button
                    >
                    <el-radio-button label="component"
                      >计算组件</el-radio-button
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">告警规则</span>
        </div>
        <div class="text item event-container">
          <el-form ref="alarmForm" :model="alarmForm" :rules="alarmRules">
            <el-form-item>
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
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(domain, index) in alarmForm.nodeUpdateItems"
                    :key="domain.id"
                  >
                    <td>
                      <el-form-item>
                        <el-input v-model="domain.key"> </el-input>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item>
                        <el-input v-model="domain.value"> </el-input>
                      </el-form-item>
                    </td>
                    <td class="text-center">
                      <el-button
                        icon="el-icon-edit-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="
                          handleDeleteLabel('nodeUpdateItems', domain, index)
                        "
                      />
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="
                          handleDeleteLabel('nodeUpdateItems', domain, index)
                        "
                      />
                    </td>
                  </tr>

                  <tr v-if="alarmForm.nodeUpdateItems.length == 0">
                    <td colspan="5">
                      <div class="text-center" style="color: #a6a6a6">
                        <i class="el-icon-warning" style="color: orange" />
                        请至少添加一条告警规则
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handleAddLabel('nodeUpdateItems')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加告警规则
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px">搜索设置</div>
          <div style="float: right; margin-top: -15px">
            <el-checkbox label="组搜索设置" v-model="quotaForm.method" />
          </div>
        </div>

        <div class="text item event-container" style="margin-top: 10px">
          <el-form
            ref="userForm"
            :model="userForm"
            :rules="userRules"
            label-width="135px"
          >
            <div class="recomend-list">
              <h2>{{ "用户" }}</h2>
            </div>

            <el-form-item label="对象类型" prop="objType">
              <el-col :span="14">
                <el-input v-model="userForm.objType" />
              </el-col>
            </el-form-item>

            <el-form-item label="登录字段" prop="loginField">
              <el-col :span="14">
                <el-input v-model="userForm.loginField" />
              </el-col>
            </el-form-item>

            <el-form-item label="过滤条件">
              <el-col :span="14">
                <el-input v-model="userForm.filterCondition" />
              </el-col>
            </el-form-item>

            <el-form-item label="搜索起点" prop="searchStart">
              <el-col :span="14">
                <el-input v-model="userForm.searchStart" />
              </el-col>
            </el-form-item>

            <el-form-item label="搜索范围">
              <el-col :span="14">
                <el-input v-model="userForm.searchScope" />
              </el-col>
            </el-form-item>

            <el-form-item label="登录属性" prop="loginAttr">
              <el-col :span="14">
                <el-input v-model="userForm.loginAttr" />
              </el-col>
            </el-form-item>

            <el-form-item label="名称属性" prop="nameAttr">
              <el-col :span="14">
                <el-input v-model="userForm.nameAttr" />
              </el-col>
            </el-form-item>

            <el-form-item label="邮箱属性" prop="emailAttr">
              <el-col :span="14">
                <el-input v-model="userForm.emailAttr" />
              </el-col>
            </el-form-item>
          </el-form>

          <el-form
            v-if="quotaForm.method == true"
            ref="groupForm"
            :model="groupForm"
            :rules="groupRules"
            label-width="135px"
          >
            <div class="recomend-list">
              <h2>{{ "组" }}</h2>
            </div>

            <el-form-item label="对象类型" prop="objType">
              <el-col :span="14">
                <el-input v-model="groupForm.objType" />
              </el-col>
            </el-form-item>

            <el-form-item label="登录字段" prop="loginField">
              <el-col :span="14">
                <el-input v-model="groupForm.loginField" />
              </el-col>
            </el-form-item>

            <el-form-item label="过滤条件">
              <el-col :span="14">
                <el-input v-model="groupForm.filterCondition" />
              </el-col>
            </el-form-item>

            <el-form-item label="搜索起点" prop="searchStart">
              <el-col :span="14">
                <el-input v-model="groupForm.searchStart" />
              </el-col>
            </el-form-item>

            <el-form-item label="搜索范围">
              <el-col :span="14">
                <el-input v-model="groupForm.searchScope" />
              </el-col>
            </el-form-item>

            <el-form-item label="登录属性" prop="loginAttr">
              <el-col :span="14">
                <el-input v-model="groupForm.loginAttr" />
              </el-col>
            </el-form-item>

            <el-form-item label="名称属性" prop="nameAttr">
              <el-col :span="14">
                <el-input v-model="groupForm.nameAttr" />
              </el-col>
            </el-form-item>

            <el-form-item label="邮箱属性" prop="emailAttr">
              <el-col :span="14">
                <el-input v-model="groupForm.emailAttr" />
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleSubmit">
        <span>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <el-dialog
      :title="alarmRulesTitle"
      @close="alarmRulesVisible = false"
      :visible.sync="alarmRulesVisible"
      width="70%"
    >
      <el-form
        ref="alarmRulesForm"
        :model="alarmRulesForm"
        :rules="alarmRulesRules"
        label-width="135px"
      >
        <el-form-item label="告警类型">
          <el-radio-group v-model="alarmRulesForm.type">
            <el-radio-button label="metric">指标告警</el-radio-button>
            <el-radio-button label="custom">自定义告警</el-radio-button>
          </el-radio-group>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                平台支持如下 2 种警告类型：<br />
                指标警告：是平台根据客户需求而提炼的满足大部分客户需求大多数的指标项目，通过选择企业可快速达到对业务的监控及警告。<br />
                自定义警告：则可由客户根据自己公司的使用特定，添加企业专属的<br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="指标名称" prop="metricName">
          <el-select v-model="alarmRulesForm.metricName" style="width: 80%">
            <el-option
              v-for="item in metricNameOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="触发条件" prop="triggerCond">
          <el-row>
            <el-col :span="6">
              <el-select
                v-model="alarmRulesForm.triggerCond"
                style="width: 95%"
              >
                <el-option
                  v-for="item in operatorOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="10">
              <el-input
                style="width: 95%"
                v-model="alarmRulesForm.number"
                placeholder="仅支持数字，最多 17 位整数、4 位小数"
              />
            </el-col>

            <el-col :span="8">
              <el-select v-model="alarmRulesForm.persist" style="width: 95%">
                <el-option
                  v-for="item in persistOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="告警等级">
          <el-radio-group v-model="alarmRulesForm.level">
            <el-radio-button label="disaster">灾难告警</el-radio-button>
            <el-radio-button label="serious">严重告警</el-radio-button>
            <el-radio-button label="warning">警告告警</el-radio-button>
            <el-radio-button label="tips">提示告警</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddRules">添加</el-button>
        <el-button @click="alarmRulesVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      infoForm: {
        name: "",
        desc: "",
        type: "cluster",
      },

      infoRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
      },

      alarmForm: {
        nodeUpdateItems: [],
      },

      alarmRules: {},

      alarmRulesVisible: false,
      alarmRulesTitle: "",
      alarmRulesForm: {
        type: "metric",
        metricName: "集群内的处于告警状态的告警数(cluster.alert.firing)",
        triggerCond: ">",
        number: "",
        persist: "30s",
        level: "disaster",
      },
      alarmRulesRules: {
        metricName: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        triggerCond: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

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

      quotaForm: {
        method: false,
      },

      userForm: {
        objType: "inetOrgPerson",
        loginField: "mail",
        filterCondition: "",
        searchStart: "dc=example,dc=org",
        searchScope: "",
        loginAttr: "uid",
        nameAttr: "cn",
        emailAttr: "mail",
      },

      userRules: {
        objType: [
          { required: true, message: "对象类型是必填项", trigger: "blur" },
        ],
        loginField: [
          { required: true, message: "登陆字段是必填项", trigger: "blur" },
        ],
        searchStart: [
          { required: true, message: "搜索起点是必填项", trigger: "blur" },
        ],
        loginAttr: [
          { required: true, message: "登录属性是必填项", trigger: "blur" },
        ],
        nameAttr: [
          { required: true, message: "名称属性是必填项", trigger: "blur" },
        ],
        emailAttr: [
          { required: true, message: "邮箱属性是必填项", trigger: "blur" },
        ],
      },

      groupForm: {
        objType: "inetOrgPerson",
        loginField: "mail",
        filterCondition: "",
        searchStart: "dc=example,dc=org",
        searchScope: "",
        loginAttr: "uid",
        nameAttr: "cn",
        emailAttr: "mail",
      },

      groupRules: {
        objType: [
          { required: true, message: "对象类型是必填项", trigger: "blur" },
        ],
        loginField: [
          { required: true, message: "登陆字段是必填项", trigger: "blur" },
        ],
        searchStart: [
          { required: true, message: "搜索起点是必填项", trigger: "blur" },
        ],
        loginAttr: [
          { required: true, message: "登录属性是必填项", trigger: "blur" },
        ],
        nameAttr: [
          { required: true, message: "名称属性是必填项", trigger: "blur" },
        ],
        emailAttr: [
          { required: true, message: "邮箱属性是必填项", trigger: "blur" },
        ],
      },
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

    handleSubmit() {
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

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleAddLabel(filed) {
      this.alarmRulesTitle = "添加告警规则";
      this.ruleForm = this.$options.data().ruleForm;
      this.alarmRulesVisible = true;
      // const obj = {
      //   id: nanoid(),
      //   key: "",
      //   value: "",
      // };
      // this.alarmForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.alarmForm[filed].splice(index, 1);
    },

    handleAddRules() {},
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
  left: -5px;
  top: 48%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>
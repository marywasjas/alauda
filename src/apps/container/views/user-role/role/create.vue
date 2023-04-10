<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- <span style="font-size: 18px; line-height: 24px; font-weight: bold">
            创建用户
          </span> -->
          <el-steps :active="active">
            <el-step title="基本信息"></el-step>
            <el-step title="权限配置"></el-step>
          </el-steps>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="用户名" prop="userName">
                  <el-input
                    v-model="ruleForm.userName"
                    placeholder="以 a-z、0-9 开头结尾, 支持使用 a-z、0-9、-, 最多32个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称" prop="showName">
                  <el-input
                    v-model="ruleForm.showName"
                    placeholder="最多 64 个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="密码类型">
              <el-radio-group v-model="ruleForm.passwordType">
                <el-radio-button label="自定义"></el-radio-button>
                <el-radio-button label="随机"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="密码"
              v-if="ruleForm.passwordType == '自定义'"
              prop="password"
            >
              <el-input
                v-model="ruleForm.password"
                show-password
                placeholder="必须包含英文字母、数字、特殊字符~!@#$%^&*()-_=+?..."
                style="width: 70%"
              />
            </el-form-item>

            <el-form-item label="密码" v-else prop="password">
              <el-input
                v-model="ruleForm.password2"
                show-password
                style="width: 70%"
              />
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="ruleForm.email" style="width: 70%" />
            </el-form-item>

            <el-form-item label="有效期">
              <el-radio-group v-model="ruleForm.period">
                <el-radio-button label="永久"></el-radio-button>
                <el-radio-button label="自定义"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="时间范围"
              v-if="ruleForm.period == '自定义'"
              prop="date"
            >
              <el-date-picker
                v-model="ruleForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="角色" style="margin-bottom: 0">
              <table border="0" style="width: 100%">
                <thead>
                  <tr class="headerStyle">
                    <th>
                      <div class="cell">角色名称</div>
                    </th>
                    <th>
                      <div class="cell">项目</div>
                    </th>
                    <th>
                      <div class="cell">命名空间</div>
                    </th>
                    <th>
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(domain, index) in ruleForm.roleItems"
                    :key="domain.id"
                  >
                    <td>
                      <el-form-item>
                        <el-select
                          v-model="domain.selectData.roleName"
                          @change="handleRoleChange"
                          size="small"
                          placeholder="请选择角色"
                          @focus="setMinWidthEmpty"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in optionData.com1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item>
                        <el-select
                          v-model="domain.selectData.project"
                          @change="handleProjectChange"
                          size="small"
                          placeholder="请选择项目"
                          @focus="setMinWidthEmpty"
                          style="width: 100%"
                          :disabled="projectDisable"
                        >
                          <el-option
                            v-for="item in optionData.com2[selectData.roleName]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item>
                        <el-select
                          v-model="domain.selectData.space"
                          @change="handleSpaceChange"
                          size="small"
                          placeholder="请选择命名空间"
                          @focus="setMinWidthEmpty"
                          style="width: 100%"
                          :disabled="spaceDisable"
                        >
                          <el-option
                            v-for="item in optionData.com3[selectData.project]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <td class="text-center">
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="handleDeleteParams('roleItems', domain, index)"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handleAddParams('roleItems')"
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
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
        <span>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor },
  data() {
    return {
      active: 0,

      ruleForm: {
        userName: "",
        showName: "",
        passwordType: "自定义",
        password: "",
        password2: "password",
        email: "",
        period: "永久",
        date: "",
        roleItems: [],
      },

      rules: {
        userName: [
          { required: true, message: "名称是必填项", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/,
            message: "以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-",
            trigger: "blur",
          },
        ],
        showName: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码是必填项", trigger: "blur" },
        ],
        date: [
          { required: true, message: "时间范围是必填项", trigger: "blur" },
        ],
      },

      roleNameOptions: [
        {
          value: "platform-admin-system",
          label: "platform-admin-system(平台管理员)",
        },
        {
          value: "platform-auditor-system",
          label: "platform-auditor-system(平台审计人员)",
        },
        {
          value: "project-admin-system",
          label: "project-admin-system(项目管理员)",
        },
        {
          value: "namespace-admin-system",
          label: "namespace-admin-system(命名空间管理员)",
        },
        {
          value: "platform-developer-system",
          label: "platform-developer-system(开发人员)",
        },
      ],
      projectOptions: [],
      spaceOptions: [],

      projectDisable: true,
      spaceDisable: true,

      optionData: {
        com1: [
          {
            value: "platform-admin-system",
            label: "platform-admin-system(平台管理员)",
          },
          {
            value: "platform-auditor-system",
            label: "platform-auditor-system(平台审计人员)",
          },
          {
            value: "project-admin-system",
            label: "project-admin-system(项目管理员)",
          },
          {
            value: "namespace-admin-system",
            label: "namespace-admin-system(命名空间管理员)",
          },
          {
            value: "platform-developer-system",
            label: "platform-developer-system(开发人员)",
          },
        ],

        com2: {
          "platform-admin-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
          "platform-auditor-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
          "project-admin-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
        },

        com3: {
          baas: [{ value: "baas", label: "bass(云信)" }],
          chaos: [{ value: "chaos", label: "chaos" }],
          "cpaas-dev": [{ value: "cpaas-dev", label: "cpass-dev" }],
          "cpaas-system": [{ value: "cpaas-system", label: "cpaas-system" }],
        },
      },

      selectData: {},
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

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        selectData: {
          roleName: "",
          project: "",
          space: "",
        },
      };
      this.selectData = obj.selectData;
      this.ruleForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },

    handleRoleChange(val) {
      // if (val) {
      //   this.projectDisable = false;
      //   this.projectOptions = [
      //     { value: "baas", label: "baas(云信)" },
      //     { value: "chaos", label: "chaos" },
      //   ];
      // }
      if (val) {
        this.projectDisable = false;
        console.log(this.optionData.com2[val]);
        this.selectData.project = this.optionData.com2[val][0].value; //根据第一个控件所选项确定第二个控件下拉内容的对象数组，并使默认为第一个数组项
        this.handleProjectChange();
      } else {
        this.selectData.project = "";
        this.handleProjectChange();
      }
    },

    handleProjectChange(val) {
      // if (val) {
      //   this.spaceDisable = false;
      //   this.spaceOptions = [{ value: "faq-robot", label: "faq-robot" }];
      // }
      var val = this.selectData.project;
      if (val) {
        this.spaceDisable = false;
        this.selectData.space = this.optionData.com3[val][0].value;
      } else {
        this.selectData.space = "";
      }
    },

    handleSpaceChange() {},
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
</style>
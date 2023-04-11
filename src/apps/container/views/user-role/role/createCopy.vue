<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-steps :active="active" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="权限配置"></el-step>
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
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称" prop="showName">
                  <el-input v-model="ruleForm.showName" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 描述 -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述" prop="desc">
                  <el-input v-model="ruleForm.desc" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="角色类型">
              <el-radio-group v-model="ruleForm.roleType">
                <el-radio-button label="平台角色"></el-radio-button>
                <el-radio-button label="项目角色"></el-radio-button>
                <el-radio-button label="空间命名角色"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <el-tabs tab-position="left" style="height: 100%" v-else>
            <el-tab-pane
              :label="item.label"
              v-for="item in divData"
              :key="item.id"
              class="event-card"
              max-height="300"
            >
              <div class="event-list-wrapper">
                <div class="event-card">
                  <div class="card-header">
                    <div class="resource">
                      <foldable-block :btn-tex="item.label">
                        <BaseCard>
                          <section class="component-div">
                            <el-table
                              :data="tableData3.data"
                              style="width: 100%"
                              header-row-class-name="headerStyle"
                              class="margin-top"
                              max-height="600"
                            >
                              <!-- <el-table-column width="50" type="selection" /> -->

                              <el-table-column
                                v-for="col in tableColumnList3"
                                :key="col.id"
                                :label="col.label"
                                :show-overflow-tooltip="true"
                                :sortable="col.sortable"
                                :width="col.width"
                                :fixed="col.fixed"
                              >
                                <template slot-scope="scope">
                                  <div>
                                    <el-checkbox v-model="checked">
                                      {{ scope.row[col.id] }}
                                    </el-checkbox>
                                  </div>
                                </template>
                              </el-table-column>
                            </el-table>
                          </section>
                        </BaseCard>
                      </foldable-block>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
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
      <el-button @click="permission">添加自定义权限</el-button>

      <el-button @click="prevSubmit">上一步</el-button>
      <el-button type="primary" @click="submitCreate">
        <span>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
    <el-dialog
      title="添加自定义权限"
      @close="permVisible = false"
      :visible.sync="permVisible"
      width="60%"
    >
      <el-form
        ref="permForm"
        :model="permForm"
        :rules="permRules"
        label-width="135px"
      >
        <el-form-item label="API 组" prop="api">
          <el-radio-group v-model="permForm.api">
            <el-radio label="system"></el-radio>
            <el-radio label="自定义"></el-radio>
          </el-radio-group>
        </el-form-item>

        <div style="margin-top: 20px" v-if="permForm.api == '自定义'">
          <el-form-item label="组名称" prop="groupName">
            <el-input
              v-model="permForm.resourceName"
              placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-，最多253个字符"
            >
            </el-input>
          </el-form-item>
        </div>

        <div style="margin-top: 20px">
          <el-form-item label="资源名称" prop="resourceName">
            <el-input
              v-model="permForm.resourceName"
              placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-，最多63个字符"
            >
            </el-input>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                填写 Kubernetes 资源名称，按回车键确认添加，支持多个
              </el-descriptions-item>
            </el-descriptions>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd"> 添加 </el-button>
        <el-button @click="permVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
       rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      active: 0,

      checked: false,

      permVisible: false,
      permForm: {
        api: "system",
        resourceName: "",
        groupName: "",
      },
      permRules: {
        api: [{ required: true, message: "api is required", trigger: "blur" }],
        resourceName: [
          {
            required: true,
            message: " resourceName is required",
            trigger: "blur",
          },
        ],
        groupName: [
          { required: true, message: "groupName is required", trigger: "blur" },
        ],
      },

      divData: [
        { id: 1, label: "视图", children: [] },
        { id: 2, label: "平台管理", children: [] },
        { id: 3, label: "项目管理", children: [] },
        { id: 4, label: "Container Platform", children: [] },
        { id: 5, label: "DevOps", children: [] },
        { id: 6, label: "Service Mesh", children: [] },
        { id: 7, label: "数据服务", children: [] },
      ],
      tableData3: {
        data: [
          {
            func: "平台管理视图",
            view: "",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "项目管理视图",
            view: "",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "Container Platform 视图",
            view: "",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "DevOps 视图",
            view: "",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "Service Mesh 视图",
            view: "",
            create: "",
            update: "",
            delete: "",
          },
          { func: "功能开关", view: "", create: "", update: "", delete: "" },
          { func: "Portal", view: "", create: "", update: "", delete: "" },
        ],
      },
      tableColumnList3: [
        {
          id: "func",
          label: "功能",
        },
        {
          id: "view",
          label: "查看",
          checked: true,
        },
        {
          id: "create",
          label: "创建",
          checked: true,
        },
        {
          id: "update",
          label: "更新",
          checked: true,
        },
        {
          id: "delete",
          label: "删除",
          checked: true,
        },
      ],

      ruleForm: {
        name: "platform-admin-system",
        showName: "平台管理员副本",
        desc: "具备平台所有业务及资源的全部权限",
        roleType: "平台角色",
      },

      rules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        showName: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
      },

      ruleForm2: {
        name: "",
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
          // this.ruleForm = {
          //   name: "",
          //   showName: "",
          //   desc: "",
          //   roleType: "平台角色",
          // };
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

    handleAdd() {},
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
</style>
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
</style>
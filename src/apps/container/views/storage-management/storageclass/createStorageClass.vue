<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px; line-height: 24px; font-weight: bold">
              选择存储类
            </div>

            <el-radio-group v-model="activeTab" v-if="active == 1">
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="yaml">YAML</el-radio-button>
            </el-radio-group>
          </div>

          <el-steps :active="active" align-center>
            <el-step title="选择存储方案"></el-step>
            <el-step title="参数配置"></el-step>
          </el-steps>
        </div>

        <div class="text item event-container">
          <el-form
            v-if="active == 0"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
            inline
          >
            <el-form-item>
              <el-select v-model="ruleForm.provider">
                <span slot="prefix">提供方：</span>
                <el-option
                  v-for="item in [
                    { id: '全部', name: '全部' },
                    { id: '平台', name: '平台' },
                    { id: '第三方', name: '第三方' },
                  ]"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select v-model="ruleForm.type">
                <span slot="prefix">类型：</span>
                <el-option
                  v-for="item in [
                    { id: '全部', name: '全部' },
                    { id: '块存储', name: '块存储' },
                    { id: '对象存储', name: '对象存储' },
                    { id: '文件存储', name: '文件存储' },
                  ]"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input
                style="width: 230px; margin: 0 1px"
                suffix-icon="el-icon-search"
                clearable
                placeholder="按名称过滤"
                v-model="ruleForm.name"
                @keyup.enter.native="handleSearch"
              >
              </el-input>
            </el-form-item>
          </el-form>

          <div class="text item event-container" v-if="active == 0">
            <div style="padding: 12px; background-color: rgba(247, 249, 252)">
              <div style="font-size: 10px; margin: 20px 0 -20px 20px">
                <el-row style="height: 200px">
                  <el-col :span="24">
                    <el-button class="buttonClass" :disabled="true">
                      <div
                        style="position: relative; padding: 32px; display: flex"
                      >
                        <div
                          style="
                            width: 60px;
                            height: 100px;
                            margin-right: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <el-checkbox
                            v-model="checked01"
                            :disabled="true"
                          ></el-checkbox>
                        </div>

                        <div
                          style="
                            width: 15px;
                            height: 110px;
                            border-left: solid #c0c4cc 1px;
                            margin-left: -15px;
                            padding-right: 30px;
                          "
                        ></div>

                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                          "
                        >
                          <div
                            style="
                              font-size: 18px;
                              color: rgba(50, 52, 55);
                              margin-bottom: 10px;
                            "
                          >
                            CephRBD 块存储
                            <el-tag size="mini" effect="plain">快照</el-tag>
                            <el-tag size="mini" effect="plain">扩容</el-tag>
                          </div>

                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              margin-bottom: 5px;
                            "
                          >
                            <div>
                              <span style="color: black"> 提供方：</span>
                              <span style="color: rgba(150, 152, 155)"
                                >平台</span
                              >
                            </div>
                            <div>
                              <span style="color: black"> 卷插件：</span>
                              <span style="color: rgba(150, 152, 155)"
                                >rook-ceph.rbd.csi.ceph.com</span
                              >
                            </div>
                            <div>
                              <span style="color: black"> 状态：</span>
                              <span style="color: rgba(150, 152, 155)">
                                <i class="el-icon-remove" />
                                未部署
                                <el-link
                                  style="margin-left: 5px"
                                  href="/#/storage-management/distributed-storage/list"
                                  target="_blank"
                                >
                                  <i
                                    class="
                                      el-icon-link el-icon-left
                                      question-icon
                                    "
                                    style="color:#409EFF; margin-left10; margin-top:-10px"
                                  >
                                  </i>
                                  部署
                                </el-link>
                              </span>
                            </div>
                          </div>

                          <div
                            style="
                              margin: 10px 0 12px;
                              color: rgba(150, 152, 155);
                            "
                          >
                            基于平台内置的 Ceph 分布式存储，提供高
                            IOPS，低延迟的存储服务，适用于数据库、虚拟化等场景
                          </div>
                        </div>
                      </div>
                    </el-button>
                  </el-col>
                </el-row>

                <el-row style="height: 200px">
                  <el-col :span="24">
                    <el-button class="buttonClass">
                      <div
                        style="position: relative; padding: 32px; display: flex"
                      >
                        <div
                          style="
                            width: 60px;
                            height: 100px;
                            margin-right: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <el-checkbox v-model="checked02"></el-checkbox>
                        </div>

                        <div
                          style="
                            width: 15px;
                            height: 110px;
                            border-left: solid #c0c4cc 1px;
                            margin-left: -15px;
                            padding-right: 30px;
                          "
                        ></div>

                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                          "
                        >
                          <div
                            style="
                              font-size: 18px;
                              color: rgba(50, 52, 55);
                              margin-bottom: 10px;
                            "
                          >
                            TopoLVM
                            <el-tag size="mini" effect="plain">扩容</el-tag>
                          </div>

                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              margin-bottom: 5px;
                            "
                          >
                            <div>
                              <span style="color: black"> 提供方：</span>
                              <span style="color: rgba(150, 152, 155)"
                                >平台</span
                              >
                            </div>
                            <div>
                              <span style="color: black"> 卷插件：</span>
                              <span style="color: rgba(150, 152, 155)"
                                >topolvm.cybozu.com</span
                              >
                            </div>
                            <div>
                              <span style="color: black"> 状态：</span>
                              <span style="color: rgba(150, 152, 155)">
                                <i class="el-icon-remove" />
                                未部署
                                <el-link
                                  style="margin-left: 5px"
                                  href="/#/storage-management/local-storage/list"
                                  target="_blank"
                                >
                                  <i
                                    class="
                                      el-icon-link el-icon-left
                                      question-icon
                                    "
                                    style="color:#409EFF; margin-left10; margin-top:-10px"
                                  >
                                  </i>
                                  部署
                                </el-link>
                              </span>
                            </div>
                          </div>

                          <div
                            style="
                              margin: 10px 0 12px;
                              color: rgba(150, 152, 155);
                            "
                          >
                            基于 LVM
                            的本地存储方案，提供简单、易维护和高性能的本地存储服务，适用于数据库、中间件等场景
                          </div>
                        </div>
                      </div>
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <el-form
            v-if="active == 1 && activeTab == 'form'"
            ref="paramsForm"
            :model="paramsForm"
            :rules="paramsRules"
            label-width="135px"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-model="paramsForm.name" style="width: 80%"></el-input>
            </el-form-item>

            <el-form-item label="显示名称" prop="">
              <el-input
                v-model="paramsForm.showName"
                style="width: 80%"
              ></el-input>
            </el-form-item>

            <el-form-item label="回收策略" prop="">
              <el-radio-group v-model="paramsForm.recycPolicy">
                <el-radio-button label="remain">保留</el-radio-button>
                <el-radio-button label="delete">删除</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="访问模式" prop="">
              <span>{{
                "单节点读写(RWO)，多节点读写(RWX)，多节点只读(ROW)"
              }}</span>
            </el-form-item>

            <el-form-item label="分配项目">
              <el-radio-group v-model="paramsForm.project">
                <el-radio-button label="所有项目"></el-radio-button>
                <el-radio-button label="指定项目"></el-radio-button>
                <el-radio-button label="不分配"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="指定项目"
              prop="specProject"
              v-if="paramsForm.project == '指定项目'"
            >
              <el-select
                v-model="paramsForm.specProject"
                @focus="setMinWidthEmpty"
                style="width: 80%"
              >
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>

          <monaco-editor
            v-if="active == 1 && activeTab === 'yaml'"
            ref="monacoEditor"
            :code="currentCode"
            :read-only="false"
            :language="language"
            @handleBlur="handleBlur"
          />
        </div>
      </el-card>
    </div>

    <div class="fixed-div" v-if="active == 0">
      <el-button
        type="primary"
        @click="nextSubmit"
        :disabled="checked01 == false && checked02 == false"
      >
        <span>下一步</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <div class="fixed-div" v-else>
      <el-button @click="prevSubmit">上一步</el-button>
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
      activeTab: "form",
      checked01: false,
      checked02: false,

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

      ruleForm: {
        provider: "全部",
        type: "全部",
        name: "",
      },
      rules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
      },
      paramsForm: {
        name: "",
        showName: "",
        recycPolicy: "delete",
        project: "不分配",
        specProject: "",
      },
      paramsRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        specProject: [
          { required: true, message: "名称是必填项", trigger: "blur" },
        ],
      },

      currentCode: "{}",
      inputCode: {},
      language: "yaml",
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

    handleBlur(value) {
      this.inputCode = value;
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
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleSearch() {},

    handleDetail() {},
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
::v-deep .el-input__prefix {
  position: absolute;
  height: 100%;
  left: 5px;
  top: 1px;
  text-align: center;
  color: #c0c4cc;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  // margin-right: 15px;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 55px;
}
.buttonClass {
  width: 900px;
  height: 160px;
  padding: 0;
  white-space: inherit;
  text-align: left;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  margin-right: 12px;
  border: 1px solid #2794f8;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 #f4f4f4;
  color: #2794f8;
  background: white;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  color: #2794f8;
}
/*鼠标按下，没有抬起*/
.buttonClass:active {
  // background: #2794f8;
  color: white;
}
.el-tag + .el-tag {
  margin-left: 5px;
}
</style>
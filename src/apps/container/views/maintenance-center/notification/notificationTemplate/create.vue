<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold">
            基本信息
          </span>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <!-- 模板类型 -->
            <el-form-item label="模板类型" prop="templateType">
              <el-radio-group v-model="ruleForm.templateType">
                <el-radio :label="1">邮箱</el-radio>
                <el-radio :label="2">短信</el-radio>
                <el-radio :label="3">企业微信 / 钉钉</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 消息类型 -->
            <el-form-item label="消息类型" prop="msgType">
              <el-radio-group v-model="ruleForm.msgType">
                <el-radio :label="1">告警消息</el-radio>
                <el-radio :label="2">安全通知消息</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <span v-if="name">{{ name }}</span>
                  <el-input
                    v-else
                    v-model="ruleForm.name"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
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
                    placeholder="输入显示名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 描述 -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    :row="1"
                    v-model="ruleForm.desc"
                    placeholder="输入描述信息"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold">
            模板配置
          </span>
        </div>
        <div class="text item">
          <el-form
            ref="templateForm"
            :model="templateForm"
            :rules="templateRules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="邮件主题" prop="emailTitle">
                  <el-input
                    v-model="templateForm.emailTitle"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 模板类型 -->
            <el-form-item label="通知内容" prop="content">
              <el-radio-group v-model="templateForm.content">
                <el-radio :label="1">HTML 格式</el-radio>
                <el-radio :label="2">文本格式</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-input
                type="textarea"
                resize="none"
                :autosize="{ minRows: 20, maxRows: 20 }"
                v-model="templateForm.textarea"
                style="width: 60%; margin-right: 10px"
              ></el-input>
              <el-input
                type="textarea"
                resize="none"
                :autosize="{ minRows: 20, maxRows: 20 }"
                v-model="templateForm.desc"
                style="width: 30%"
              ></el-input>

              <el-tooltip effect="dark" class="item" placement="left">
                <template slot="content">
                  <div style="max-width: 400px">
                    可以直接编辑模板，模板内容只支持文本方式，支持填写中文信息
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>

              <el-button type="text" @click="handlePreview">预览通知</el-button>
              <div style="margin-top: -10px; margin-left: -40px">
                <span style="margin-right: 10px">
                  样例：HTML格式通知内容示例
                </span>
                <el-button type="text" @click="handleView">查看</el-button>
                <el-button type="text" @click="handleTrans">
                  <i class="el-icon-top-right" />
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
        <span v-if="name">更新</span>
        <span v-else>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <el-dialog
      title="通知预览"
      @close="previewVisible = false"
      :visible.sync="previewVisible"
      width="60%"
    >
      <section class="component-div">
        <span style="font-size: 14px; font-weight: 500"> 服务器配置 </span>
        <h3>
          【告警中】 PAAS 平台告警：节点192.168.16.53的节点的CPU使用率超过80%
        </h3>

        <span style="font-size: 14px; font-weight: 500"> 通知内容 </span>
        <el-row :gutter="24" style="margin-top: 14px">
          <el-col
            v-for="item in detailResData"
            :key="item.label"
            :span="24"
            style="margin-top: 5px"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;
            <span
              v-if="item.label == '告警状态' || item.label == '触发数值'"
              style="color: red"
            >
              {{ item.value }}
            </span>
            <span v-else>
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>

      <div slot="footer" class="dialog-footer">
        <el-button @click="previewVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="查看"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />

    <DeleteRemoveDialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      :width="width"
      :titleContext="titleContext"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import LineAlert from "@/apps/container/views/components/LineAlert";
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditorDialog, DeleteRemoveDialog },
  data() {
    return {
      buttonText: "",
      titleContext: "",
      formVisible: false,
      width: "",

      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: false,
        reset: false,
        find: false,
        copy: false,
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

      ruleForm: {
        templateType: 1,
        msgType: 1,
        name: "",
        showName: "",
        desc: "",
        notMethodItems: [],
      },

      rules: {
        templateType: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        msgType: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        name: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/,
            message: "以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-",
            trigger: "blur",
          },
        ],
        showName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      templateForm: {
        emailTitle: "",
        content: 1,
        textarea: "",
        desc: `<h1>书写说明</h1>`,
      },

      templateRules: {
        emailTitle: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      previewVisible: false,

      detailResData: [
        { label: "告警状态", value: "告警中" },
        { label: "告警等级", value: "警告" },
        { label: "告警集群", value: "global" },
        { label: "告警对象", value: "节点192.168.16.53" },
        { label: "策略名称", value: "cpaas-node-rules" },
        { label: "告警描述", value: "节点的CPU使用率超过80%" },
        { label: "触发数值", value: "90%" },
        { label: "告警时间", value: "2020-11-23 09:50:56" },
      ],

      name: "",
    };
  },

  created() {
    this.name = this.$route.query.name;
    this.templateForm.textarea = JSON.stringify(this.spec);
    if (this.name) {
      this.ruleForm.showName = "showName";
    }
  },

  methods: {
    handleBlur(value) {
      this.inputCode = value;
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

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handlePreview() {
      this.previewVisible = true;
    },

    handleView() {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    handleTrans() {
      this.buttonText = "替换";
      this.titleContext =
        '确定将原有模板内容替换为 "HTML 格式通知内容示例" 吗？';
      this.formVisible = true;
      this.width = "55%";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
.el-textarea__inner {
  font-family: "Microsoft";
  font-size: 20px;
}
</style>
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
                  <el-input
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
            <monaco-editor
              :read-only="false"
              ref="monacoEditor"
              :code="currentCode"
              :language="language"
              @handleBlur="handleBlur"
            />
            <!-- <el-input type="textarea" :row="6" v-model="textarea"></el-input> -->
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
      currentCode: "{}",
      inputCode: {},
      language: "",
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
      },

      templateRules: {
        emailTitle: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.currentCode = JSON.stringify(this.defaultCode, null, 2);
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
<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold"
            >接入集群</span
          >
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <!-- 1  -->
            <el-form-item label="集群类型">
              <el-radio-group v-model="ruleForm.clusterType">
                <el-radio-button label="标准 Kubernetes 集群"></el-radio-button>
                <el-radio-button label="OpenShfit 集群"></el-radio-button>
                <el-radio-button label="Amazon EKS 集群"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <!-- 2 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="以 a-z、0-9 开头结尾, 支持使用 a-z、0-9、-, 最多32个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 3 显示名称 showName -->
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

            <!-- 4 ip/port -->
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="集群地址" prop="clusterIp">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.clusterIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8" style="margin-left: -145px">
                <el-form-item prop="clusterPort">
                  <el-input v-model="ruleForm.clusterPort">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 5 镜像仓库 -->
            <el-form-item label="镜像仓库">
              <el-radio-group v-model="ruleForm.repository">
                <el-radio-button label="平台默认"></el-radio-button>
                <el-radio-button label="外部"></el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <p style="max-width: 450px">
                    存储业务集群使用的平台组件镜像<br />
                    • 选择 "平台默认"
                    时，业务集群通过部署平台时配置的镜像仓库拉取所需的镜像<br />
                    • 选择 "外部" 时，业务集群通过外部镜像仓库拉取所需的镜像<br />
                  </p>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <!-- 6 私有镜像仓库 -->
            <el-row :gutter="20" v-if="ruleForm.repository == '外部'">
              <el-col :span="16">
                <el-form-item label="私有镜像仓库地址" prop="privateIp">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.privateIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="margin-left: -145px">
                <el-form-item>
                  <el-input v-model="ruleForm.privatePort">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="ruleForm.repository == '外部'">
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="ruleForm.userName">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-left: -145px">
                <el-form-item>
                  <el-input v-model="ruleForm.password" show-password>
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="令牌" prop="token">
              <el-input
                type="textarea"
                :rows="4"
                v-model="ruleForm.token"
              ></el-input>
            </el-form-item>

            <el-form-item label="CA 证书" prop="caCert">
              <el-input
                type="textarea"
                :rows="4"
                v-model="ruleForm.caCert"
                placeholder="以 ————BEGIN CERTIFICATE———— 开头，以 ————END CERTIFICATE———— 结束"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
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

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor },
  data() {
    return {
      ruleForm: {
        clusterType: "标准 Kubernetes 集群",
        name: "",
        showName: "",
        clusterIp: "",
        clusterPort: "",
        repository: "平台默认",
        privateIp: "",
        privatePort: "",
        userName: "",
        password: "",
        token: "",
        caCert: "",
      },

      rules: {
        name: [
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
        clusterIp: [
          { required: true, message: "集群地址是必填项", trigger: "blur" },
        ],
        clusterPort: [
          { required: true, message: "端口是必填项", trigger: "blur" },
        ],
        privateIp: [
          {
            required: true,
            message: "私有镜像仓库地址是必填项",
            trigger: "blur",
          },
        ],
        token: [{ required: true, message: "令牌是必填项", trigger: "blur" }],
        caCert: [
          { required: true, message: "CA 证书是必填项", trigger: "blur" },
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
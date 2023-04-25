<template>
  <div class="create-container">
    <LineAlert
      content="备份 ETCD 数据时，会占用系统资源，建议选择系统空闲时段进行备份"
    />

    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-steps :active="active" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="存储配置"></el-step>
            <el-step title="备份方式"></el-step>
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
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <span v-if="type == 'update'">{{ this.ruleForm.name }}</span>
                  <el-input
                    v-if="type == 'add'"
                    v-model="ruleForm.name"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-，最多 32 个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="描述" prop="desc">
                  <el-input
                    v-model="ruleForm.desc"
                    placeholder="最长 64 字符，不限制字符类型"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-form
            v-if="active == 1"
            ref="ruleForm2"
            :model="ruleForm2"
            :rules="rules2"
            label-width="135px"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="备份节点" prop="backupNode">
                  <el-select
                    v-model="ruleForm2.backupNode"
                    @focus="setMinWidthEmpty"
                    style="width: 60%"
                    placeholder="请选择 ETCD 备份节点"
                  >
                    <!-- <el-tooltip
                      class="item"
                      effect="dark"
                      content="系统资源，不允许删除"
                      placement="left-start"
                    > -->
                    <el-option
                      v-for="item in backupNodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.value == '25.2.20.156'"
                    />
                    <!-- </el-tooltip> -->
                  </el-select>
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 500px">
                        备份节点仅展示控制节点，仅支持选择一个
                      </div>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="备份路径" prop="backupPath">
                  <el-input v-model="ruleForm2.backupPath" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="外部存储" prop="ExternalStorage">
                  <el-switch v-model="ruleForm2.ExternalStorage" />
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 500px">
                        外部存储仅支持"对象存储"
                      </div>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="地域" prop="region">
                  <el-input
                    v-model="ruleForm2.region"
                    placeholder="请输入区域"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="桶名称" prop="bucketName">
                  <el-input
                    v-model="ruleForm2.bucketName"
                    placeholder="请输入桶名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="文件夹" prop="directory">
                  <el-input
                    v-model="ruleForm2.directory"
                    placeholder="请输入文件夹"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="Endpoint" prop="endpoint">
                  <el-input
                    v-model="ruleForm2.endpoint"
                    placeholder="请输入 Endpoint"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="Secret Id" prop="secretID">
                  <el-input
                    v-model="ruleForm2.secretID"
                    placeholder="请输入 Secret Id"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                <!-- {{`对象存储兼容的 S3 API 访问地址。请注意该访问地址中的域名不是存储桶的公共访问域名。例如：https://cos.`+'<'+'region'+'>'+`.myqcloud.com`}} -->
              </el-descriptions-item>
            </el-descriptions>

            <el-row v-if="ruleForm2.ExternalStorage == true">
              <el-col :span="22">
                <el-form-item label="Secret Key" prop="secretKey">
                  <el-input
                    v-model="ruleForm2.secretKey"
                    placeholder="请输入 Secret Key"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-form
            v-if="active == 2"
            ref="ruleForm3"
            :model="ruleForm3"
            :rules="rules3"
            label-width="135px"
          >
            <el-form-item label="备份方式">
              <el-radio-group v-model="ruleForm3.backupMethod">
                <el-radio-button label="手动备份"></el-radio-button>
                <el-radio-button label="定时备份"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-row v-if="ruleForm3.backupMethod == '定时备份'">
              <el-col :span="22">
                <el-form-item label="备份规则" prop="backupRules">
                  <el-select
                    v-model="ruleForm3.backupRules"
                    @focus="setMinWidthEmpty"
                    style="width: 63%"
                  >
                    <el-option
                      v-for="item in backupRulesOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-link icon="el-icon-document-copy"
                    >如何输入备份规则？</el-link
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-descriptions
              v-if="ruleForm3.backupMethod == '定时备份'"
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                注意：触发规则按 UTC 标准时间执行，进行配置时，请将当前时间转换
                UTC 时区时间
              </el-descriptions-item>
            </el-descriptions>

            <el-row>
              <el-col :span="15">
                <el-form-item label="备份保留时长" prop="duration">
                  <el-input v-model="ruleForm3.duration">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button
        v-if="active != 0"
        @click="
          () => {
            active = active - 1;
          }
        "
      >
        <span>上一步</span>
      </el-button>
      <el-button type="primary" @click="nextSubmit" v-if="active != 2">
        <span>下一步</span>
      </el-button>
      <el-button type="primary" @click="handleAdd" v-if="active == 2">
        <span>{{ this.type == "add" ? "创建" : "更新" }}</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: { LineAlert },
  data() {
    return {
      type: "",
      name: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      active: 0,

      backupNodeOptions: [
        { value: "25.2.20.156", label: "25.2.20.156" },
        { value: "25.2.20.27", label: "25.2.20.27" },
        { value: "25.2.20.87", label: "25.2.20.87" },
      ],

      backupRulesOptions: [
        { value: "25.2.20.156", label: "25.2.20.156" },
        { value: "25.2.20.27", label: "25.2.20.27" },
        { value: "25.2.20.87", label: "25.2.20.87" },
      ],

      ruleForm: {
        name: "",
        desc: "",
      },

      rules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
      },

      ruleForm2: {
        backupNode: "",
        backupPath: "",
        ExternalStorage: false,
        region: "",
        bucketName: "",
        directory: "",
        endpoint: "",
        secretID: "",
      },
      rules2: {
        backupNode: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        backupPath: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        region: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        bucketName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        directory: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        endpoint: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        secretID: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        secretKey: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      ruleForm3: {
        backupMethod: "手动备份",
        duration: "3",
        backupRules: "",
      },

      rules3: {
        duration: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        backupRules: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.type = this.$route.query.type;
    this.name = this.$route.query.name;
    if (this.type == "update") {
      this.ruleForm = {
        name: this.name,
        desc: "",
      };

      this.ruleForm2 = {
        ...this.ruleForm2,
        backupNode: "25.2.20.156",
        backupPath: "/cpaas-backup",
        ExternalStorage: false,
      };

      this.ruleForm3 = {
        ...this.ruleForm3,
        backupMethod: "定时备份",
        duration: "90",
        backupRules: "0 0 1 * *",
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

    nextSubmit() {
      if (this.active < 2) {
        this.active = this.active + 1;
      }

      // if (this.active == 0) {
      //   this.$refs["ruleForm"].validate((valid) => {
      //     if (valid) {
      //       if (this.active < 2) {
      //         this.active = this.active + 1;
      //       }
      //       // this.$refs["ruleForm"].resetFields();
      //       this.$refs["ruleForm"].clearValidate();
      //       this.ruleForm = this.$options.data().ruleForm;
      //     } else {
      //       return false;
      //     }
      //   });
      // } else if (this.active == 1) {
      //   this.$refs["ruleForm2"].validate((valid) => {
      //     if (valid) {
      //       if (this.active < 2) {
      //         this.active = this.active + 1;
      //       }
      //       // this.$refs["ruleForm"].resetFields();
      //       this.$refs["ruleForm2"].clearValidate();
      //       this.ruleForm2 = this.$options.data().ruleForm2;
      //     } else {
      //       return false;
      //     }
      //   });
      // }
    },

    // 取消-返回
    cancelCreate() {
      this.$router.push({
        path: "/cluster-management/backup-manage/backuplist",
      });
    },

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
.line-alert[data-v-0e1192b5] {
  background-color: #fdf6ec;
  border: 1px solid #e6a23c;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  padding: 11px 15px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
::v-deep .line-alert i[data-v-0e1192b5] {
  margin-right: 8px;
  color: #e6a23c;
}
.el-link.el-link--default {
  color: #409eff;
  margin-left: 10px;
}
</style>
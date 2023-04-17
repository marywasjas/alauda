<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            创建凭据
          </div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>

          <el-form-item label="凭据名称" prop="name">
            <el-col :span="16">
              <el-input
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
              >
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称">
            <el-col :span="16">
              <el-input v-model="infoForm.showName"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="工具类型">
            <el-col :span="16">
              <el-select
                v-model="infoForm.toolType"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in [{ id: 'region', label: 'region(region)' }]"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>

        <el-form
          ref="regionForm"
          :model="regionForm"
          :rules="regionRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "数据" }}</h2>
          </div>

          <line-alert
            :content="
              `1. DevOps 工具对应支持的凭据类型，请参照 帮助文档` +
              `\n` +
              `  2. 找不到你想要的类型？可以选择对应的工具类型试试`
            "
          />
          <el-form-item label="类型">
            <el-col :span="16">
              <el-radio-group v-model="regionForm.type">
                <el-radio-button label="用户名/密码"></el-radio-button>
                <el-radio-button label="OAuth2"></el-radio-button>
                <el-radio-button label="SSH"></el-radio-button>
                <el-radio-button label="镜像服务"></el-radio-button>
                <el-radio-button label="动态密钥"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == '镜像服务'"
            label="镜像服务地址"
            prop="serverAddress"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.serverAddress"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="
              regionForm.type == '用户名/密码' || regionForm.type == '镜像服务'
            "
            label="用户名"
            prop="userName"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.userName"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="
              regionForm.type == '用户名/密码' || regionForm.type == '镜像服务'
            "
            label="密码"
            prop="password"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.password" show-password> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == '镜像服务'"
            label="邮箱地址"
            prop="mailAddress"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.mailAddress"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == 'OAuth2'"
            label="Client ID"
            prop="clientID"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.clientID"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == 'OAuth2'"
            label="Client Secret"
            prop="clientSecret"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.clientSecret" show-password>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item v-if="regionForm.type == 'SSH'" label="SSH" prop="ssh">
            <el-col :span="16">
              <el-input v-model="regionForm.ssh" type="textarea" :rows="4">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == '动态密钥'"
            label="密钥 ID"
            prop="keyID"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.keyID"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="regionForm.type == '动态密钥'"
            label="密钥"
            prop="key"
          >
            <el-col :span="16">
              <el-input v-model="regionForm.key" show-password> </el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">创建</el-button>
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
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      divData: [
        { id: 1, label: "global" },
        { id: 2, label: "region" },
      ],

      clusterOptions: [
        { label: "global", value: "global" },
        { label: "region", value: "region" },
      ],
      regionForm: {
        type: "用户名/密码",
        userName: "",
        password: "",
        serverAddress: "",
        mailAddress: "",
      },

      regionRules: {
        userName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        serverAddress: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        mailAddress: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        clientSecret: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        clientID: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        ssh: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        keyID: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        key: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
      },

      infoForm: {
        name: "",
        showName: "",
        toolType: "",
      },
      infoRules: {
        name: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
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
      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     console.log(this.ruleForm);
      //   } else {
      //     return false;
      //   }
      // });
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
</style>
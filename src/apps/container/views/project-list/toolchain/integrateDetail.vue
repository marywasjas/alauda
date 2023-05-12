<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">
            <span>集成</span>
          </span>
        </div>

        <div class="text item event-container">
          <div class="titleStyle" style="background: #ecf5ff">
            <div style="width: 48px; height: 48px">
              <i class="el-icon-picture-outline" style="font-size: 48px" />
            </div>

            <div style="flex: 1">
              <div class="wordStyle">{{ name }}</div>
              <div style="font-size: 12px; color: rgba(150, 152, 155)">
                <span>制品管理</span>
              </div>
            </div>
            <el-button @click="handleSelectTool">重新选择工具</el-button>
          </div>

          <line-alert :content="content" />

          <el-form
            ref="inteForm"
            :model="inteForm"
            :rules="inteRules"
            label-position="right"
            label-width="100px"
          >
            <el-form-item label="集成名称" prop="name" style="width: 70%">
              <el-input v-model="inteForm.name" />
            </el-form-item>
            <el-form-item label="访问地址" prop="address" style="width: 70%">
              <el-input
                v-model="inteForm.address"
                placeholder='请输入以"http://"或"https://"开头的域名或IP 地址'
              />
            </el-form-item>
            <el-form-item label="API 地址" prop="apiAddress" style="width: 70%">
              <el-input
                v-model="inteForm.apiAddress"
                placeholder='请输入以"http://"或"https://"开头的域名或IP 地址'
              />
            </el-form-item>
            <el-form-item label="凭据" prop="secret" style="width: 70%">
              <el-select
                clearable
                v-model="inteForm.secret"
                @change="handleSecretChange"
                style="width: 75%"
                placeholder="请选择凭证"
              >
                <!-- 其他工具类型凭据 -->
                <el-option
                  v-for="item in secretOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button style="margin-left: 45px" @click="handleAddSecret">
                添加凭证
              </el-button>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                该工具使用的凭据，将该工具分配给项目时，默认将使用此凭据
              </el-descriptions-item>
            </el-descriptions>
          </el-form>

          <div style="float: right; margin-bottom: 20px">
            <el-button type="primary" @click="handleInte">集成</el-button>
            <el-button
              @click="
                () => {
                  this.$router.push('/project-list/toolchain/integrationList');
                }
              "
              >取消</el-button
            >
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
      title="创建凭证"
      @close="addSecretVisible = false"
      :visible.sync="addSecretVisible"
      width="60%"
    >
      <div class="recomend-list">
        <h2>{{ "基本信息" }}</h2>
      </div>
      <el-form
        ref="infoForm"
        :model="infoForm"
        :rules="infoRules"
        label-width="135px"
      >
        <el-form-item label="凭据名称" style="width: 80%" prop="secretName">
          <el-input
            v-model="infoForm.secretName"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="显示名称" style="width: 80%">
          <el-input v-model="infoForm.showName"> </el-input>
        </el-form-item>
      </el-form>

      <div class="recomend-list">
        <h2>{{ "数据" }}</h2>
      </div>
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRules"
        label-width="135px"
      >
        <el-form-item label="类型">
          <el-radio-group v-model="dataForm.type">
            <el-radio-button label="用户名/密码"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户名" style="width: 80%" prop="name">
          <el-input
            v-model="dataForm.name"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
          >
          </el-input>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter_secret">
          <el-descriptions-item
            >请输入登录 {{ name }} 时使用的用户名</el-descriptions-item
          >
        </el-descriptions>

        <el-form-item label="密码" style="width: 80%" prop="password">
          <el-input v-model="dataForm.password" show-password> </el-input>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter_secret">
          <el-descriptions-item
            >请输入登录 {{ name }} 时使用的密码</el-descriptions-item
          >
        </el-descriptions>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate">创建</el-button>
        <el-button @click="addSecretVisible = false">取消</el-button>
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
      addSecretVisible: false,
      name: "",
      content: "推荐版本: v2.7",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "90px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      rowCenter_secret: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      inteForm: {
        name: "docker-registry",
        address: "",
        apiAddress: "",
        secret: "",
      },
      inteRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        apiAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
      secretOptions: [
        { value: "18000664", label: "18000664" },
        { value: "baas-harbor", label: "baas-harbor" },
      ],
      infoForm: {
        secretName: "",
        showName: "",
      },
      infoRules: {
        secretName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
      },
      dataForm: {
        type: "用户名/密码",
        name: "",
        password: "",
      },
      dataRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.name = this.$route.query.name;
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

    handleSecretChange() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleSelectTool() {
      this.$router.go(-1);
    },

    handleDetail(name) {
      this.$router.push({
        path: "/project-list/toolchain/integrateDetail",
        query: { name },
      });
    },

    handleAddSecret() {
      this.addSecretVisible = true;
    },
    handleCreate() {},

    handleInte() {},
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
.buttonClass {
  width: 200px;
  height: 40px;
  padding: 0;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  margin-right: 12px;
  border: 1px solid #2794f8;
  border-radius: 25px;
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
  background: #2794f8;
  color: white;
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
.titleStyle {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background: "#b3d8f";
}
.wordStyle {
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}
</style>
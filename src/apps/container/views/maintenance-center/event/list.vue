<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">
            <span>重要事件总览</span>
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 400px">
                  • 选定时间范围内，发生同类事件的资源数量<br />
                  •
                  点击卡片是，可快速查询选定时间范围内对应事件原因的全部资源事件
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </span>
        </div>

        <div class="text item event-container">
          <div style="margin-bottom: 40px">
            <div style="font-size: 10px; margin: 15px 0 0 20px">
              <el-row style="height: 80px">
                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>
              </el-row>
              <el-row style="height: 80px">
                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>
              </el-row>
              <el-row style="height: 80px">
                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>

                <el-col style="margin-left: 20px" :span="4">
                  <el-button
                    class="buttonClass"
                    @click="handleDetail('DcokerRegistry')"
                    >Dcoker Registry</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>

          <el-tag>资源类型：全部</el-tag>
          <el-tag>命名空间：全部</el-tag>
          <el-tag>事件原因：全部</el-tag>
        </div>
      </el-card>
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
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      infoForm: {
        name: "",
        showName: "",
        desc: "",
      },
      infoRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        showName: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
      },
      serverForm: {
        address: "",
        userName: "",
        password: "",
        nameTips: "",
      },
      serverRules: {
        address: [
          {
            required: true,
            message: "服务提供方 URL是必填项",
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "客户端 ID是必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "客户端秘钥是必填项", trigger: "blur" },
        ],
        nameTips: [
          { required: true, message: "重定向 URI是必填项", trigger: "blur" },
        ],
      },

      quotaForm: {
        method: false,
      },

      idpForm: {
        userName: "",
        password: "",
      },
      idpRules: {
        userName: [
          { required: true, message: "用户名是必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码是必填项", trigger: "blur" },
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

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleDetail(name) {
      this.$router.push({
        path: "/project-list/toolchain/integrateDetail",
        query: { name },
      });
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
  width: 175px;
  height: 70px;
  padding: 0;
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
  background: #2794f8;
  color: white;
}
</style>
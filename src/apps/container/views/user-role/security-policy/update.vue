<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">更新用户安全策略</span>
        </div>

        <div class="text item event-container">
          <el-checkbox
            label="密码安全策略"
            v-model="checkbox.passwordPolicy"
            @change="passwordChange"
          />
          <el-form
            ref="serverForm"
            :model="serverForm"
            :rules="serverRules"
            label-width="150px"
            label-position="right"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="首次登录修改密码" prop="address">
                  <el-switch
                    v-model="serverForm.password"
                    :disabled="passwordDisable"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称" prop="userName">
                  <el-input-number
                    v-model="serverForm.day"
                    :max="9999"
                    :min="2"
                    size="small"
                    :disabled="passwordDayDisable"
                  ></el-input-number>
                  天修改一次
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-checkbox
            label="用户禁用策略"
            v-model="checkbox.disablePolicy"
            @change="disableChange"
          />
          <el-form
            ref="serverForm"
            :model="serverForm2"
            :rules="serverRules2"
            label-width="150px"
            label-position="right"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="不登录期限" prop="userName">
                  <el-input-number
                    v-model="serverForm2.day"
                    :max="9999"
                    :min="2"
                    size="small"
                    :disabled="disDayDisable"
                  ></el-input-number>
                  天不禁止登录
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-checkbox label="用户锁定策略" v-model="checkbox.lockPolicy" />
          <el-form
            ref="serverForm"
            :model="serverForm3"
            :rules="serverRules3"
            label-width="150px"
            label-position="right"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="连续登录失败次数" prop="userName">
                  <el-input-number
                    v-model="serverForm3.day"
                    :max="9999"
                    :min="2"
                    size="small"
                  ></el-input-number>
                  次后锁定
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="用户锁定时间" prop="userName">
                  <el-input-number
                    v-model="serverForm3.min"
                    :max="9999"
                    :min="2"
                    size="small"
                  ></el-input-number>
                  分钟
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-checkbox label="通知策略" v-model="checkbox.infoPolicy" />
          <el-form
            ref="serverForm"
            :model="serverForm4"
            :rules="serverRules4"
            label-width="150px"
            label-position="right"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="通知发送人" prop="userName">
                  <el-select v-model="serverForm4.sender">
                    <el-option
                      v-for="item in []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-link style="margin-left: 5px">
                    <i
                      class="
                        el-icon-link el-icon-left
                        margin-left10
                        question-icon
                      "
                    />
                    添加发送人
                  </el-link>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item
                  label="用户创建成功后通过邮箱发送密码"
                  prop="userName"
                >
                  <el-switch v-model="serverForm4.min"> </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-checkbox label="访问控制" v-model="checkbox.viewControl" />
          <el-form
            ref="serverForm"
            :model="serverForm5"
            :rules="serverRules5"
            label-width="170px"
            label-position="right"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="无响应结束会话时间" prop="userName">
                  <el-input-number
                    v-model="serverForm5.day"
                    :max="9999"
                    :min="2"
                    size="small"
                  ></el-input-number>
                  分钟
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="平台在线人数限制" prop="userName">
                  <el-switch v-model="serverForm5.min1"> </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="关闭浏览器自动结束会话" prop="userName">
                  <el-switch v-model="serverForm5.min2"> </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="禁止用户重复登录" prop="userName">
                  <el-switch v-model="serverForm5.min3"> </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="nextSubmit">
        <span>更新</span>
      </el-button>
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
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      passwordDayDisable: true,
      passwordDisable: true,
      disDayDisable: true,
      checkbox: {
        passwordPolicy: false,
        disablePolicy: false,
        lockPolicy: true,
        viewControl: false,
        infoPolicy: false,
      },

      serverForm: {
        day: 90,
        password: false,
      },
      serverForm2: {
        day: 90,
      },
      serverForm3: {
        day: 5,
        min: 20,
      },
      serverForm4: {
        sender: "",
        min: false,
      },
      serverForm5: {
        day: 60,
        min1: false,
        min2: false,
        min3: false,
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

    passwordChange(val) {
      if (val == true) {
        this.passwordDayDisable = false;
        this.passwordDisable = false;
      } else {
        this.passwordDayDisable = true;
        this.passwordDisable = true;
      }
    },

    disableChange(val) {
      if (val == true) {
        this.disDayDisable = false;
      } else {
        this.disDayDisable = true;
      }
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
</style>
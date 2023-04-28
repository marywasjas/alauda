<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px; margin-right: 70%">
            告警发送间隔 (全局)
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 350px">
                  • 如告警发生后未恢复正常，可设置间隔多久发送一次告警消息；<br />
                  • 如设置未 "不重复"，则只在告警和恢复时发送告警信息；
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </span>

          <el-button type="primary" @click="updateDialog" size="medium">
            更新
          </el-button>
        </div>

        <div class="text item event-container grid">
          <div class="gridbox" style="font-size: 14px">
            {{ `灾难告警: ${alarmForm.disaster} ` }}
          </div>

          <div class="gridbox" style="font-size: 14px">
            {{ `严重告警: ${alarmForm.serious} ` }}
          </div>

          <div class="gridbox" style="font-size: 14px">
            {{ `警告告警: ${alarmForm.warning} ` }}
          </div>

          <div class="gridbox" style="font-size: 14px">
            {{ `提示告警: ${alarmForm.tips} ` }}
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
      title="更新告警发送间隔"
      @close="cancelDialog"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
        ref="alarmForm"
        :model="alarmForm"
        :rules="alarmRules"
        label-width="135px"
      >
        <el-form-item label="灾难告警" prop="disaster">
          <el-select
            v-model="alarmForm.disaster"
            @focus="setMinWidthEmpty"
            style="width: 30%"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="严重告警" prop="serious">
          <el-select
            v-model="alarmForm.serious"
            @focus="setMinWidthEmpty"
            style="width: 30%"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="警告告警" prop="warning">
          <el-select
            v-model="alarmForm.warning"
            @focus="setMinWidthEmpty"
            style="width: 30%"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="提示告警" prop="tips">
          <el-select
            v-model="alarmForm.tips"
            @focus="setMinWidthEmpty"
            style="width: 30%"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">更新</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: {},
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

      dialogVisible: false,

      timeOptions: [
        { label: "5分钟", value: "5分钟" },
        { label: "10分钟", value: "10分钟" },
        { label: "15分钟", value: "15分钟" },
        { label: "30分钟", value: "30分钟" },
        { label: "1小时", value: "1小时" },
        { label: "3小时", value: "3小时" },
        { label: "6小时", value: "6小时" },
        { label: "12小时", value: "12小时" },
        { label: "1天", value: "1天" },
        { label: "不重复", value: "不重复" },
      ],

      alarmForm: {
        disaster: "5分钟",
        serious: "15分钟",
        warning: "30分钟",
        tips: "1小时",
      },

      alarmRules: {
        disaster: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        serious: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        warning: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        tips: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
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

    cancelDialog() {
      this.dialogVisible = false;
    },

    updateDialog() {
      this.dialogVisible = true;
    },

    handleUpdate() {
      this.alarmForm = this.alarmForm;
      this.dialogVisible = false;
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
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列等分 */
  grid-gap: 10px; /* 设置间距，可省略 */
}
.gridbox {
  height: 30px; /* 设置高度，可根据实际情况调整 */
  // background-color: #ccc; /* 设置背景色，可根据实际需求修改 */
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// .container > *:first-child {
//   margin-right: auto;
// }

// .container > *:last-child {
//   margin-left: auto;
// }
</style>
<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px; margin-right: 70%"> 基本信息 </span>
        </div>

        <div class="text item event-container">
          <el-form
            ref="ruleForm"
            :model="listQuery"
            label-position="right"
            label-width="90px"
          >
            <el-row class="filter-row">
              <el-col :span="6">
                <el-form-item label="时间范围" class="filter-item">
                  <el-select v-model="listQuery.startEndTime" size="small">
                    <el-option label="过去30分钟" value="过去30分钟" />
                    <el-option label="过去1小时" value="过去1小时" />
                    <el-option label="过去6小时" value="过去6小时" />
                    <el-option label="过去1天" value="过去1天" />
                    <el-option label="过去3天" value="过去3天" />
                    <el-option label="过去7天" value="过去7天" />
                    <el-option label="自定义时间" value="自定义时间" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="filter-row">
              <el-col :span="6">
                <el-form-item label="资源类型" class="filter-item" size="small">
                  <el-select v-model="listQuery.resourceType">
                    <el-option label="部署" value="部署" />
                    <el-option label="守护进程集" value="守护进程集" />
                    <el-option label="有状态副本集" value="有状态副本集" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="告警策略" class="filter-item" size="small">
                  <el-select v-model="listQuery.policy">
                    <el-option label="全部" value="全部" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="filter-row" style="display: flex">
              <el-form-item
                label="关联资源"
                class="filter-item"
                style="flex: 1"
              >
                <el-input
                  v-model="listQuery.resource"
                  placeholder="请输入部署名称"
                  size="small"
                />
              </el-form-item>
              <el-form-item
                label=""
                label-width="10px"
                class="filter-item"
                style="text-align: right"
              >
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
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
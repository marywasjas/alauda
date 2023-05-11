<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="headerStyle">
          <span style="font-size: 20px; flex: 1">
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

          <el-select v-model="containerTime" filterable placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="text item event-container">
          <div style="font-size: 10px">
            <div style="display: grid" class="row-bg wrapper">
              <div v-for="item in table" :key="item.index">
                <el-button class="buttonClass" @click="handleDetail">
                  <div
                    style="padding: 12px; display: grid; justify-content: start"
                  >
                    <div style="">
                      <i class="el-icon-document-copy"> {{ item.label }} </i>
                    </div>

                    <div style="margin-top: 10px; margin-left: -80%">
                      <span style="font-size: 30px">
                        {{ item.num }}
                      </span>
                    </div>
                  </div>
                </el-button>
              </div>
            </div>
          </div>

          <el-tag style="margin: 40px 0 20px 0">资源类型：全部</el-tag>
          <el-tag>命名空间：全部</el-tag>
          <el-tag>事件原因：全部</el-tag>
          <el-tag>资源名称：全部</el-tag>
          <span
            style="
              margin-left: 10px;
              font-size: 12px;
              color: rgba(150, 152, 155);
            "
            >共 {{ 7 }} 条</span
          >

          <foldable-block btn-tex="条件查询">
            <el-form :model="tabForm" label-suffix=":" label-width="75px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="资源类型">
                    <el-select v-model="tabForm.logType">
                      <el-option
                        v-for="con in []"
                        :key="con.value"
                        :label="con.label"
                        :value="con.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="命名空间">
                    <el-select v-model="tabForm.project">
                      <el-option
                        v-for="con in []"
                        :key="con.value"
                        :label="con.label"
                        :value="con.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="事件原因">
                    <el-select v-model="tabForm.namespace">
                      <el-option
                        v-for="con in []"
                        :key="con.value"
                        :label="con.label"
                        :value="con.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="flex-center">
                <el-form-item
                  label="查询条件"
                  style="margin-bottom: 10px; flex: 1"
                >
                  <el-select
                    v-model="tabForm.resName"
                    placeholder="可输可选，按回车确定，支持添加多个资源名称"
                    multiple
                    style="width: 100%"
                  >
                    <el-option
                      v-for="con in []"
                      :key="con.value"
                      :label="con.label"
                      :value="con.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  label=""
                  style="margin-bottom: 10px; margin-left: 10px"
                  label-width="0px"
                >
                  <el-button type="primary" @click="handleSearch">
                    搜索
                  </el-button>
                  <el-button @click="handleReset">重置</el-button>
                </el-form-item>
              </div>
            </el-form>
          </foldable-block>

          <div style="display: grid" class="row-bg">
            <div
              style="
                background: #fff;
                padding: 20px;
                margin-bottom: 10px;
                border: 1px solid black;
              "
              v-for="n in count"
              :key="n"
            >
              <div style="display: flex; justify-content: space-between">
                <div style="flex-basis: 50%">
                  <el-tag type="info" effect="dark">
                    {{ "ClusterServiceVersion" }}
                  </el-tag>
                  <span>devops-tool-operator.v3.8.22</span>
                  <i
                    class="el-icon-tickets"
                    style="cursor: pointer"
                    @click="openDetails"
                  />
                </div>

                <div style="flex-basis: 20%">
                  <el-tag
                    style="background-color: rgba(196, 130, 0)"
                    effect="dark"
                  >
                    {{ "NS" }}
                  </el-tag>
                  <span>cpaas-system</span>
                </div>
                <div style="flex-basis: 20%">
                  <i class="el-icon-timer" />
                  <span>1 小时 4 分钟前</span>
                </div>
              </div>

              <div style="margin-top: 50px">
                <span style="float: left"
                  >Pulling: Pulling image
                  "25.2.20.203:60080/ait/falco:v0.30.0-v3.8.24"</span
                >

                <span
                  style="
                    float: right;
                    font-size: 12px;
                    color: rgba(150, 152, 155);
                  "
                  >过去 183 天 发生 4310 次</span
                >
              </div>
            </div>
          </div>

          <div style="margin-top: 15px; margin-left: 55%">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="page.count"
              :current-page="page.current"
              :page-size="page.size"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="事件详情"
      :visible="detailVisible"
      :code="code"
      :read-only="true"
      :btn-visible="btnVisible"
      :language="language"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor, FoldableBlock, MonacoEditorDialog },
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tabForm: {
        logType: "系统日志",
        project: "",
        namespace: "",
        resName: "",
      },
      count: 4,
      detailVisible: false,
      code: "",
      language: "json",
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      table: [
        { index: "1", label: "节点重启", num: 0 },
        { index: "2", label: "节点 OOM", num: 0 },
        { index: "3", label: "节点磁盘空间不足", num: 0 },
        { index: "4", label: "节点 FD 不足", num: 0 },
        { index: "5", label: "节点 PID 不足", num: 0 },
        { index: "6", label: "节点内存不足", num: 0 },
        { index: "7", label: "节点 NotReady", num: 0 },
        { index: "8", label: "容器组 OOM", num: 0 },
        { index: "9", label: "容器组被驱逐", num: 0 },
        { index: "10", label: "容器组调度失败", num: 0 },
        { index: "11", label: "容器组健康检查异常", num: 0 },
        { index: "12", label: "容器组重启失败", num: 0 },
        { index: "13", label: "容器组启动失败", num: 0 },
        { index: "14", label: "容器组运行失败", num: 0 },
        { index: "15", label: "存储卷挂载失败", num: 0 },
      ],

      containerTime: "近 1 小时",
      timeOptions: [
        { value: "近 5 分钟", label: "近 5 分钟" },
        { value: "近 15 分钟", label: "近 15 分钟" },
        { value: "近 30 分钟", label: "近 30 分钟" },
        { value: "近 1 小时", label: "近 1 小时" },
        { value: "近 3 小时", label: "近 3 小时" },
        { value: "近 6 小时", label: "近 6 小时" },
        { value: "近 12 小时", label: "近 12 小时" },
        { value: "近 1 天", label: "近 1 天" },
        { value: "近 2 天", label: "近 2 天" },
        { value: "近 3 天", label: "近 3 天" },
        { value: "近 7 天", label: "近 7 天" },
        { value: "自定义", label: "自定义" },
      ],
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

    // 关闭弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 打开弹窗
    openDialog() {
      this.$emit("openDialog");
    },

    // 事件详情
    openDetails(row) {
      this.detailVisible = true;
      this.code = JSON.stringify("xxxxx", null, 2);
      this.closeDialog();
    },
    closeDetailsDialog() {
      this.detailVisible = false;
      this.openDialog();
    },

    handleDetail() {},

    handleSizeChange(val) {
      this.page.size = val;
      // this.onSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      // this.onSearch();
    },

    handleSearch() {},
    handleReset() {},
  },
};
</script>

<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .headerStyle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
    margin: 20px 0 0 0;
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
    padding: 20px;
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
  width: 170px;
  height: 80px;
  padding: 0;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  // margin-right: 12px;
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
  // background: #2794f8;
  color: white;
}
// .last{
//   margin-right: -25px;
// }
.wrapper {
  // margin: 60px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(5, 178px);
  /*  声明行间距和列间距  */
  grid-gap: 12px;
  /*  声明行的高度  */
  // grid-template-rows: 100px 200px;
}
.el-tag + .el-tag {
  margin-left: 10px;
  border-radius: 13px;
  border: transparent;
}
.el-tag {
  border-radius: 13px;
  border: transparent;
}
</style>
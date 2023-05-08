<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="headerStyle">
          <span style="font-size: 20px; flex: 1"> 巡检 </span>
          <el-button type="primary" icon="el-icon-odometer">巡检</el-button>
          <el-button icon="el-icon-download" @click="handleLoad"
            >下载报告</el-button
          >
        </div>

        <div class="text item event-container">
          <div class="titleStyle">最后一次巡检</div>
          <el-row :gutter="24" style="margin: 15px 0 0 25px; font-size: 14px">
            <el-col>
              <div style="margin-bottom: 10px">
                巡检时间: {{ "2023-05-05 08:40:50~2023-05-05 08:41:00" }}
              </div>
              <div>
                巡检资源总数: {{ 668 }}&nbsp;&nbsp;
                <span style="margin-left: 20px">风险:</span>
                <i
                  class="el-icon-warning"
                  style="color: red; margin-left: 5px"
                />
                故障{{ `(${27})` }}
                <i
                  class="el-icon-warning"
                  style="color: orange; margin-left: 5px"
                />
                预警{{ `(${18})` }}
              </div>
            </el-col>
          </el-row>
          <div class="tab-header__header-wrapper" style="margin-left: 10px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="tab in tabList"
                :key="tab.name"
                :label="tab.label"
                :name="tab.name"
              />
            </el-tabs>
          </div>
        </div>
      </el-card>
      <component :is="comName" />
    </div>

    <el-dialog
      title="下载报告"
      @close="loadVisible = false"
      :visible.sync="loadVisible"
      width="60%"
    >
      <LineAlert
        content="1.PDF 格式巡检报告内容不包含资源风险详情页面；2.Excel 格式巡检报告内容为巡检的全部数据。"
      />

      <el-form
        ref="loadForm"
        :model="loadForm"
        :rules="loadRules"
        label-width="125px"
      >
        <el-form-item label="格式">
          <el-checkbox-group v-model="loadForm.format">
            <el-checkbox label="PDF" name="format"></el-checkbox>
            <el-checkbox label="Excel" name="format"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_load"> 下载 </el-button>
        <el-button @click="loadVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import Node from "./components/Node/Node.vue";
import Event from "./components/Event/Event.vue";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "ClusterCreate",
  components: { Node, Event, LineAlert },
  computed: {
    comName: function () {
      if (!this.activeName) return "";
      const item = this.tabList.filter((el) => el.name === this.activeName);
      return item[0].com;
    },
  },
  created() {
    this.name = this.$route.query.name;
    this.desc = this.$route.query.desc;
    this.activeName = this.tabList[0].name;
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "资源风险巡检",
          name: "node",
          com: "Node",
        },
        {
          label: "资源用量巡检",
          name: "event",
          com: "Event",
        },
      ],
      activeName: "",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      loadVisible: false,

      loadForm: {
        format: [],
      },
      loadRules: {},
    };
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
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

    handleLoad() {
      this.loadForm.format = [];
      this.loadVisible = true;
    },
    handle_load() {},
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
  .titleStyle {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-left: 10px;
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
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
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
::v-deep .el-card__body {
  padding: 20px;
  padding-bottom: 0;
}
</style>
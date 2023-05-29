<template>
  <div class="oam-container">
    <LineAlert
      content="平台可保留近 540 天的报表数据，一次最多支持查看 31 天的数据。"
    />
    <div class="oam-main">
      <el-form :model="tabForm" label-width="75px">
        <el-row>
          <!-- 统计项 -->
          <el-col :span="8">
            <el-form-item label="统计项">
              <el-select
                v-model="tabForm.stats"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="con in statsOption"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 时间范围 -->
          <el-col :span="10">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="tabForm.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 项目 -->
          <el-col :span="8">
            <el-form-item label="项目">
              <el-select
                v-model="tabForm.project"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="con in projectOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 集群 -->
          <el-col :span="8">
            <el-form-item label="集群">
              <el-select
                v-model="tabForm.cluster"
                @focus="setMinWidthEmpty"
                @change="handleChangeTitle"
                style="width: 100%"
              >
                <el-option
                  v-for="con in clusterOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 命名空间 -->
          <el-col :span="8">
            <el-form-item label="命名空间">
              <el-select
                v-model="tabForm.namespace"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="con in namespaceOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              style="margin-bottom: 10px; margin-left: 73%"
              label-width="0px"
            >
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  未配置存储，无法导出<br />
                  <el-link>
                    <i
                      class="el-icon-link el-icon-left question-icon"
                      style="color:#409EFF; margin-left10; margin-top:-15px;font-size:10px"
                    >
                      如何配置存储？
                    </i>
                  </el-link>
                </div>
                <span style="margin-left: 10px">
                  <el-button disabled type="primary">导出结果</el-button>
                </span>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 2 表格 和 分页器-->
      <div class="text item event-container" style="background: pink">
        <div class="event-list-wrapper">
          <div class="titleWrapperStyle">
            <div>{{ statsTitle }} - {{ clusterTitle }}</div>
            <div style="display: flex; font-size: 14px">
              <div style="margin-right: 20px" class="titleStyle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-memory"
                  viewBox="0 0 16 16"
                  color="#5200f5"
                >
                  <path
                    d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
                  />
                </svg>
                <span style="margin-left: 5px">CPU 使用总量:</span>
                <span style="color: #5200f5">{{ "4687.51" }}</span>
                <span style="margin-left: 5px">核 * 小时</span>
              </div>

              <div class="titleStyle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-memory"
                  viewBox="0 0 16 16"
                  color="#00b2d6"
                >
                  <path
                    d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1Zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4ZM2 10v2H1v-2h1Zm2 0v2H3v-2h1Zm2 0v2H5v-2h1Zm3 0v2H8v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Z"
                  />
                </svg>
                <span style="margin-left: 5px">内存使用总量:</span>
                <span style="color: #00b2d6">{{ "51771.43" }}</span>
                <span style="margin-left: 5px">GB * 小时</span>
              </div>
            </div>
          </div>

          <div v-for="item in divData" :key="item.id" class="event-card">
            <div class="card-header">
              <div class="resource">
                <foldable-block :btn-tex="item.id">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-bottom: 20px;
                    "
                  >
                    <div>{{ item.id }}</div>
                    <div style="display: flex; align-items: center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="21"
                        fill="currentColor"
                        class="bi bi-memory"
                        viewBox="0 0 16 16"
                        color="#5200f5"
                      >
                        <path
                          d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
                        />
                      </svg>
                      <span style="margin: 0 80px 0 5px">0.00</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="21"
                        fill="currentColor"
                        class="bi bi-memory"
                        viewBox="0 0 16 16"
                        color="#00b2d6"
                      >
                        <path
                          d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1Zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4ZM2 10v2H1v-2h1Zm2 0v2H3v-2h1Zm2 0v2H5v-2h1Zm3 0v2H8v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Z"
                        />
                      </svg>
                      <span style="margin-left: 5px">0.00</span>
                    </div>
                  </div>
                  <el-table
                    :data="tableData.data"
                    style="width: 100%"
                    header-row-class-name="headerStyle"
                  >
                    <el-table-column
                      v-for="col in tableColumnList"
                      :key="col.id"
                      :label="col.label"
                      :show-overflow-tooltip="col['show-overflow-tooltip']"
                      :sortable="col.sortable"
                      :width="col.width"
                      :fixed="col.fixed"
                    >
                      <template slot="header">
                        <span
                          style="font-size: 13px"
                          v-if="col.id == 'namespace'"
                        >
                          {{ "所属命名..." }}
                        </span>
                        <span style="font-size: 13px" v-else>
                          {{ col.label }}
                        </span>
                      </template>

                      <template slot-scope="scope">
                        <div>
                          <!-- {{ scope.row[col.id] }} -->
                          {{
                            scope.row[col.id].length > 10
                              ? scope.row[col.id].substring(0, 9) + "..."
                              : scope.row[col.id]
                          }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </foldable-block>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import Mock from "mockjs";

import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "UserList",
  components: { LineAlert, FoldableBlock },
  data() {
    return {
      divData: [],

      tabForm: {
        stats: "containerUsage",
        time: "",
        project: "baas",
        cluster: "all",
        namespace: "all",
      },

      statsTitle: "",
      clusterTitle: "",

      statsOption: [
        { value: "containerUsage", label: "容器组使用量" },
        { value: "containerQuota", label: "容器组配额" },
      ],

      clusterOptions: [
        { value: "all", label: "全部" },
        { value: "global", label: "global (global)" },
        { value: "region", label: "region (region)" },
      ],

      projectOptions: [
        { value: "baas", label: "baas" },
        { value: "cpass-system", label: "cpass-system" },
        { value: "chaos", label: "chaos" },
        { value: "federateai", label: "federateai" },
        { value: "ebaims", label: "ebaims" },
        { value: "region-devops", label: "region-devops" },
      ],

      namespaceOptions: [{ value: "all", label: "全部" }],

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      tableData,
      tableColumnList,
    };
  },

  created() {
    this.handleChangeTitle("all");
    this.getOriginTime();
    this.tabForm.project = this.$route.query.name;
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
    handleSearch() {},
    handleReset() {
      this.tabForm = {
        stats: "containerUsage",
        time: "",
        project: "baas",
        cluster: "all",
        namespace: "all",
      };
      this.getOriginTime();
    },

    handleChangeTitle(val) {
      switch (val) {
        case "all":
          this.clusterTitle = "全部集群";
          break;
        case "region":
          this.clusterTitle = "region";
          break;
        case "global":
          this.clusterTitle = "global";
          break;
      }
    },

    getOriginTime() {
      this.divData = [];
      let month = new Date().getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      let year = new Date().getFullYear();
      let day = new Date().getDate();
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }

      this.tabForm.time = [year + month + "01", year + month + day];

      for (var k = 1; k <= new Date().getDate(); k++) {
        if (k >= 1 && k <= 9) {
          k = "0" + k;
        }
        this.divData.push({ id: year + month + k, label: year + month + k });
      }
    },
  },

  watch: {
    "tabForm.time": {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        if (oldVal != "") {
          this.divData = [];

          let a = newVal[0]
            .slice(newVal[0].length - 2, newVal[0].length)
            .replace("0", "");

          let b = newVal[1]
            .slice(newVal[1].length - 2, newVal[1].length)
            .replace("0", "");

          let c = newVal[1].substring(0, 6);

          console.log(c);

          for (var k = a; k <= b; k++) {
            if (k >= 1 && k <= 9) {
              k = "0" + k;
            }
            this.divData.push({ id: c + k, label: c + k });
          }
        }
      },
      deep: true,
    },

    "tabForm.stats": {
      handler(newVal, oldVal) {
        this.statsTitle = this.statsOption.filter((item) => {
          return item.value == newVal;
        })[0].label;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.name-cell {
  display: flex;
  justify-content: left;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: $font-size-20;
    padding: 1px;
    border: 1px solid $border-color-one;
    border-radius: $border-radius-l;
    background: $color-primary-rgba1;
    color: $color-primary;
  }
  span {
    display: block;
    margin: 0;
    font-size: $font-size-18;
  }
  span:last-child {
    color: $font-color-text;
    font-size: $font-size-14;
    margin-top: 6px;
  }
}
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-content {
    margin: 15px 20px 0px 0px;
    .filter-row {
      display: flex;
      .filter-item {
        flex: 1;
        margin-bottom: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
// ::v-deep .el-table td.el-table__cell {
//   border-bottom: 0px solid #dfe6ec;
// }
::v-deep .el-table--border .el-table__cell {
  border-right: 0px solid #dfe6ec;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px solid #dfe6ec;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #fff !important;
}
.el-tag {
  border-radius: 6px;
  border: transparent;
}
.event-container {
  .event-list-wrapper {
    margin-top: 30px;
    background: rgba(247, 249, 252);
    padding: 10px;
    // padding-top: 30px;
    .event-card {
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border: 1px solid $border-color-one;
      background: #fff;
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
.titleStyle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titleWrapperStyle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
}
</style>
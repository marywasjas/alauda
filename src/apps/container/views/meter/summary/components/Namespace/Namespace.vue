<template>
  <div class="create-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header style="margin-bottom: 16px">
            <div class="titleStyle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-cpu"
                viewBox="0 0 16 16"
                color="#5200f5"
              >
                <path
                  d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
                />
              </svg>
              <div style="font-size: 14px; line-height: 40px; width: 70%">
                <span>CPU 使用总量： </span>
                <span style="color: #5200f5"> {{ "5121.48" }}</span>
                <span> 核 * 小时</span>
              </div>

              <div class="titleStyle">
                <el-radio-group v-model="statistics" @input="handleStatistics">
                  <el-radio-button label="1">按目录统计</el-radio-button>
                  <el-radio-button label="2">按命名空间统计</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </header>

          <el-table
            :key="toggleIndex"
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            v-if="statistics == '1'"
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
              <template slot-scope="scope">
                <div v-if="col.id === 'projectName'">
                  <div v-if="scope.row.projectName == '其他项目'">
                    {{ scope.row[col.id] }}
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @click="handleToReport(scope.row, statistics)"
                  >
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'usage'">
                  <div style="padding-left: 80px">
                    <el-progress
                      :percentage="showPercentage(scope.row.usage) * 100"
                      :format="format(scope.row, scope.row.usage)"
                      color="#5200f5"
                      class="barStyle"
                    />
                  </div>
                </div>

                <div v-else>
                  <el-progress
                    :width="50"
                    type="circle"
                    :percentage="scope.row.total * 1"
                    color="#5200f5"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-table
            :key="toggleIndex"
            :data="tableData2.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            v-if="statistics == '2'"
          >
            <el-table-column
              v-for="col in tableColumnList2"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'spaceName'">
                  <div v-if="scope.row.spaceName == '其他命名空间'">
                    {{ scope.row[col.id] }}
                  </div>
                  <div v-else-if="scope.row.project == ''">
                    {{ scope.row[col.id] }}
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @click="handleToReport(scope.row, statistics)"
                  >
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'usage'">
                  <div style="padding-left: 55px">
                    <el-progress
                      :percentage="showPercentage2(scope.row.usage) * 100"
                      :format="format(scope.row, scope.row.usage)"
                      color="#5200f5"
                      class="barStyle2"
                    />
                  </div>
                </div>

                <div v-else-if="col.id === 'total'">
                  <el-progress
                    :width="50"
                    type="circle"
                    :percentage="scope.row.total * 1"
                    color="#5200f5"
                  />
                </div>

                <div v-else>
                  {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header style="margin-bottom: 16px">
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
              <div style="font-size: 14px; line-height: 40px; width: 70%">
                <span>CPU 使用总量： </span>
                <span style="color: #00b2d6"> {{ "63472.50" }}</span>
                <span> GB * 小时</span>
              </div>

              <div class="titleStyle">
                <el-radio-group
                  v-model="statistics2"
                  @input="handleStatistics2"
                >
                  <el-radio-button label="1">按目录统计</el-radio-button>
                  <el-radio-button label="2">按命名空间统计</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </header>

          <el-table
            :key="toggleIndex2"
            :data="tableData3.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            v-if="statistics2 == '1'"
          >
            <el-table-column
              v-for="col in tableColumnList3"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'projectName'">
                  <div v-if="scope.row.projectName == '其他项目'">
                    {{ scope.row[col.id] }}
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @click="handleToReport(scope.row, statistics2)"
                  >
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'usage'">
                  <div style="padding-left: 80px">
                    <el-progress
                      :percentage="showPercentage3(scope.row.usage) * 100"
                      :format="format(scope.row, scope.row.usage)"
                      color="#00b2d6"
                      class="barStyle"
                    />
                  </div>
                </div>

                <div v-else>
                  <el-progress
                    :width="50"
                    type="circle"
                    :percentage="scope.row.total * 1"
                    color="#00b2d6"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-table
            :key="toggleIndex2"
            :data="tableData4.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            v-if="statistics2 == '2'"
          >
            <el-table-column
              v-for="col in tableColumnList4"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'spaceName'">
                  <div v-if="scope.row.spaceName == '其他命名空间'">
                    {{ scope.row[col.id] }}
                  </div>
                  <div v-else-if="scope.row.project == ''">
                    {{ scope.row[col.id] }}
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @click="handleToReport(scope.row, statistics2)"
                  >
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'usage'">
                  <div style="padding-left: 55px">
                    <el-progress
                      :percentage="showPercentage4(scope.row.usage) * 100"
                      :format="format(scope.row, scope.row.usage)"
                      color="#00b2d6"
                      class="barStyle2"
                    />
                  </div>
                </div>

                <div v-else-if="col.id === 'total'">
                  <el-progress
                    :width="50"
                    type="circle"
                    :percentage="scope.row.total * 1"
                    color="#00b2d6"
                  />
                </div>

                <div v-else>
                  {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import {
  tableData,
  tableColumnList,
  tableData2,
  tableColumnList2,
  tableData3,
  tableColumnList3,
  tableData4,
  tableColumnList4,
} from "./constant/index";

export default {
  name: "BaseInfo",
  components: { DeleteRemoveDialog },
  props: {},
  data() {
    return {
      statistics: "1",
      statistics2: "1",

      tableData,
      tableColumnList,

      tableData2,
      tableColumnList2,

      tableData3,
      tableColumnList3,

      tableData4,
      tableColumnList4,

      toggleIndex: 0,
      toggleIndex2: 0,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
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

    handleToReport(obj, stats) {
      if (stats == "1") {
        stats = "project";
      } else {
        stats = "namespace";
      }
      this.$router.push({
        path: "/meter/report/list",
        query: {
          type: "namespace",
          name: obj.projectName || obj.project,
          granularity: stats,
        },
      });
    },

    handleStatistics(e) {
      if (e == 1) {
        this.toggleIndex = 0;
      } else if (e == 2) {
        this.toggleIndex = 1;
      }
    },

    handleStatistics2(e) {
      if (e == 1) {
        this.toggleIndex2 = 0;
      } else if (e == 2) {
        this.toggleIndex2 = 1;
      }
    },

    showPercentage(num) {
      // 获取最大值
      let maxNum = Math.max.apply(
        Math,
        this.tableData.data.map((item) => {
          return item.usage;
        })
      );
      // console.log(num / maxNum);
      return num / maxNum;
    },

    showPercentage2(num) {
      // 获取最大值
      let maxNum = Math.max.apply(
        Math,
        this.tableData2.data.map((item) => {
          return item.usage;
        })
      );
      // console.log(num / maxNum);
      return num / maxNum;
    },

    showPercentage3(num) {
      // 获取最大值
      let maxNum = Math.max.apply(
        Math,
        this.tableData3.data.map((item) => {
          return item.usage;
        })
      );
      // console.log(num / maxNum);
      return num / maxNum;
    },

    showPercentage4(num) {
      // 获取最大值
      let maxNum = Math.max.apply(
        Math,
        this.tableData4.data.map((item) => {
          return item.usage;
        })
      );
      // console.log(num / maxNum);
      return num / maxNum;
    },

    format(percentage, num) {
      return () => {
        return num;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.create-container {
  padding: 15px 0;
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
  .el-row {
    // margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .row-bg {
    padding: 20px 20px;
    background-color: #f9fafc;
    margin-top: 20px;

    display: grid;
    grid-template-columns: repeat(3, calc(33.33% - 13px));
    grid-gap: 20px;
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
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}

.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.titleStyle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-progress--circle .el-progress__text,
.el-progress--dashboard .el-progress__text {
  position: absolute;
  top: 50%;
  left: 60px;
  width: 100%;
  font-size: 14px !important;
}
::v-deep .barStyle {
  .el-progress__text {
    margin-left: -360px;
  }
}
::v-deep .barStyle2 {
  .el-progress__text {
    margin-left: -130px;
  }
}
</style>
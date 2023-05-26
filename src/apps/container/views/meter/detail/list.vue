<template>
  <div class="oam-container">
    <LineAlert
      content="平台可保留近 540 天的报表数据，一次最多查询 6
    个月以内数据。"
    />
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <el-form :model="tabForm" label-width="75px">
        <el-row>
          <!-- 统计项 -->
          <el-col :span="12">
            <el-form-item label="统计项">
              <el-select
                v-model="tabForm.stats"
                @focus="setMinWidthEmpty"
                style="width: 70%"
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

          <!-- 统计粒度 -->
          <el-col :span="12">
            <el-form-item label="统计粒度">
              <el-select
                v-model="tabForm.granularity"
                @change="handleType"
                @focus="setMinWidthEmpty"
                style="width: 70%"
              >
                <el-option
                  v-for="con in granularityOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 时间范围 -->
          <el-col :span="24">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="tabForm.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 项目 -->
          <el-col :span="14">
            <el-form-item label="项目">
              <el-radio-group v-model="tabForm.project">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="" v-if="tabForm.project == '2'">
              <el-select
                multiple
                clearable
                placeholder="可输可选，按回车确定，可添加多个"
                v-model="tabForm.projectSelected"
                @focus="setMinWidthEmpty"
                style="width: 60%"
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

          <!-- <el-col :span="9" > </el-col> -->

          <el-col :span="10">
            <!-- <div class="flex-center"> -->
            <el-form-item
              style="margin-bottom: 10px; margin-left: 10px"
              label-width="0px"
            >
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button disabled type="primary">导出结果</el-button>
            </el-form-item>
            <!-- </div> -->
          </el-col>
        </el-row>
      </el-form>

      <!-- 2 表格 和 分页器-->
      <div class="text item event-container" style="background: pink">
        <div class="event-list-wrapper">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 10px;
            "
          >
            <div>命名空间配额 - 按命名空间统计</div>

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

            <div style="font-size: 14px; line-height: 40px; width: 30%">
              <span>CPU 使用总量： </span>
              <span style="color: #00b2d6"> {{ "63472.50" }}</span>
              <span> GB * 小时</span>
            </div>

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

            <div style="font-size: 14px; line-height: 40px; width: 30%">
              <span>CPU 使用总量： </span>
              <span style="color: #00b2d6"> {{ "63472.50" }}</span>
              <span> GB * 小时</span>
            </div>
          </div>

          <div v-for="item in divData" :key="item.id" class="event-card">
            <div class="card-header">
              <div class="resource">
                <el-row>
                  <el-col>
                    <foldable-block btn-tex="202305">
                      <el-table
                        :data="tableData2.data"
                        style="width: 100%"
                        header-row-class-name="headerStyle"
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
                            <div v-if="col.id === 'details'">
                              <el-button type="text">明细</el-button>
                            </div>
                            <div v-else>
                              {{ scope.row[col.id] }}
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </foldable-block>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <el-table
          :show-header="false"
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          empty-text="无通知发送人"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="tableData2.data"
                style="width: 100%"
                header-row-class-name="headerStyle"
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
                    <div v-if="col.id === 'details'">
                      <el-button type="text">明细</el-button>
                    </div>
                    <div v-else>
                      {{ scope.row[col.id] }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

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
              <div v-if="col.id === 'level'">
                <el-tag type="warning">
                  {{ scope.row[col.id] }}
                </el-tag>
              </div>
              <div v-else-if="col.id === 'rule'">
                <span> {{ scope.row[col.id] }}</span>
                <i
                  class="el-icon-document cursor-pointer"
                  @click="handleDetail"
                />
              </div>
              <div v-else-if="col.id === 'status'">
                <i
                  :class="
                    scope.row.status === '正常'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                <span> {{ scope.row[col.id] }}</span>
              </div>
              <div v-else-if="col.id === 'disable'">
                <el-switch v-model="scope.row[col.id]" />
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table> -->
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
      divData: [
        { id: 1, label: "Basic Configuration", children: [] },
        { id: 2, label: "Cluster", children: [] },
        { id: 3, label: "Master Nodes", children: [] },
        { id: 4, label: "Data Nodes", children: [] },
        { id: 5, label: "Kibana Nodes", children: [] },
      ],

      tabForm: {
        stats: "containerUsage",
        granularity: "project",
        time: "",
        project: "1",
        projectSelected: [],
      },

      statsOption: [
        { value: "containerUsage", label: "容器组使用量" },
        { value: "containerQuota", label: "容器组配额" },
        { value: "cart-manager", label: "命名空间配额" },
        { value: "chaos", label: "项目配额" },
      ],

      namespaceOptions: [
        { value: "all", label: "全部" },
        { value: "baas", label: "baas" },
        { value: "cart-manager", label: "cart-manager" },
        { value: "chaos", label: "chaos" },
        { value: "cpass-dev", label: "cpass-dev" },
        { value: "cpass-system", label: "cpass-system" },
      ],

      timeOptions: [
        { label: "近30分钟", value: "近30分钟" },
        { label: "近1小时", value: "近1小时" },
        { label: "近6小时", value: "近6小时" },
        { label: "近1天", value: "近1天" },
        { label: "近3天", value: "近3天" },
        { label: "近7天", value: "近7天" },
        { label: "自定义时间", value: "自定义时间" },
      ],

      resourceOptions: [
        { value: "cluster", label: "集群" },
        { value: "node", label: "节点" },
        { value: "deploy", label: "部署" },
        { value: "daemon", label: "守护进程集" },
        { value: "stateReplica", label: "有状态副本集" },
      ],

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      page: {
        count: 1,
        current: 1,
        size: 20,
      },

      tableData: {
        data: [
          {
            date: "202305",
            cpu: "4450.68",
            memory: "55094.10",
          },
        ],
      },
      tableColumnList: [
        { label: "date", id: "date" },
        { label: "cpu", id: "cpu" },
        { label: "memory", id: "memory" },
      ],

      tableData2: {
        data: [
          { projectName: "cpass-system", cpu: "4160.90", memory: "46062.25" },
          { projectName: "baas", cpu: "138.80", memory: "3204.94" },
          { projectName: "chaos", cpu: "40.29", memory: "804.82" },
          { projectName: "federateai", cpu: "37.63", memory: "1308.22" },
          { projectName: "ebaims", cpu: "37.12", memory: "472.48" },
          { projectName: "region-devops", cpu: "4160.90", memory: "46062.25" },
        ],
      },
      tableColumnList2: [
        { label: "项目名称", id: "projectName" },
        { label: "CPU 使用总量(核 * 小时)", id: "cpu", sortable: true },
        { label: "内存使用总量(GB * 小时)", id: "memory", sortable: true },
        { label: "", id: "details", width: "60px" },
      ],
    };
  },

  created() {
    this.handleType();
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
    handleReset() {},

    handleSizeChange(val) {
      this.page.size = val;
      // this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      // this.getList();
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
</style>
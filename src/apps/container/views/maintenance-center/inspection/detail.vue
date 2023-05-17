<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="headerStyle">
          <span style="font-size: 20px; flex: 1"> {{ name }} </span>
        </div>
        <div class="text item event-container">
          <div class="titleStyle">最后一次巡检</div>
          <el-row :gutter="24" style="margin: 15px 0 0 25px; font-size: 14px">
            <el-col>
              <div style="margin-bottom: 10px">
                巡检时间: {{ "2023-05-05 08:40:50~2023-05-05 08:41:00" }}
              </div>
              <div>
                巡检资源总数: {{ 2 }}&nbsp;&nbsp;
                <span style="margin-left: 20px">风险:</span>

                <i
                  class="el-icon-warning"
                  style="color: red; margin-left: 5px"
                />
                故障{{ `(${0})` }}
                <i
                  class="el-icon-warning"
                  style="color: orange; margin-left: 5px"
                />
                预警{{ `(${1})` }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header
            class="card-title right-header"
            style="justify-content: flex-end"
          >
            <el-select v-model="selectValue" @change="handleSelect">
              <el-option label="全部" value="all"> </el-option>
              <el-option label="故障" value="fault"> </el-option>
              <el-option label="预警" value="warning"> </el-option>
            </el-select>
          </header>
          <section class="component-div">
            <el-table
              :data="table.data"
              style="width: 100%"
              header-row-class-name="headerStyle"
              class="margin-top"
              empty-text="无数据"
            >
              <el-table-column
                v-for="col in table.cols"
                :key="col.id"
                :label="col.label"
                :show-overflow-tooltip="true"
                :sortable="col.sortable"
                :width="col.width"
                :fixed="col.fixed"
              >
                <template slot-scope="scope">
                  <div
                    v-if="col.id === 'name'"
                    class="cursor-pointer"
                    @click="handleToCluster"
                  >
                    {{ scope.row[col.id] }}
                  </div>
                  <div v-else-if="col.id === 'status'">
                    <i
                      class="el-icon-warning"
                      :style="
                        scope.row.status === '预警'
                          ? 'color:orange'
                          : 'color:red'
                      "
                    />
                    <span> {{ scope.row[col.id] }} </span>
                  </div>
                  <div v-else>
                    {{ scope.row[col.id] }}
                  </div>
                </template>
              </el-table-column>

              <el-table-column type="expand">
                <template>
                  <!-- <el-descriptions direction="vertical" :column="2">
                    <el-descriptions-item label="判断条件">
                      1.节点磁盘使用率大于60%
                    </el-descriptions-item>
                    <el-descriptions-item label="预警原因">
                      节点目录/的磁盘使用率达到了77.20%
                    </el-descriptions-item>
                  </el-descriptions> -->
                  <el-table
                    :data="[
                      {
                        condition: '1.节点磁盘使用率大于60%',
                        reason: '节点目录/的磁盘使用率达到了77.20%',
                      },
                    ]"
                  >
                    <el-table-column
                      v-for="col in [
                        { label: '判断条件', id: 'condition' },
                        { label: '预警原因', id: 'reason' },
                      ]"
                      :key="col.id"
                      :label="col.label"
                      :show-overflow-tooltip="true"
                      :sortable="col.sortable"
                      :width="col.width"
                      :fixed="col.fixed"
                    >
                      <template slot-scope="scope">
                        <div>
                          {{ scope.row[col.id] }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import {
  tableColsCluster,
  tableDataCluster,
  tableColsNode,
  tableDataNode,
  tableColsContainer,
  tableDataContainer,
  tableColsCerf,
  tableDataCerf,
} from "./constant";

export default {
  name: "ClusterCreate",
  components: {},
  computed: {},
  created() {
    this.name = this.$route.query.name;
    if (this.name) {
      this.changeTable(this.name);
    }
  },
  data() {
    return {
      name: "",
      selectValue: "all",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableColsCluster,
      tableDataCluster,
      tableColsNode,
      tableDataNode,
      tableColsContainer,
      tableDataContainer,
      tableColsCerf,
      tableDataCerf,

      table: {
        data: [],
        cols: [],
      },
    };
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

    handleSelect() {},

    changeTable(type) {
      switch (type) {
        case "集群风险详情":
          this.table.cols = tableColsCluster;
          this.table.data = tableDataCluster.data;
          break;
        case "节点风险详情":
          this.table.cols = tableColsNode;
          this.table.data = tableDataNode.data;
          break;
        case "容器组风险详情":
          this.table.cols = tableColsContainer;
          this.table.data = tableDataContainer.data;
          break;
        default:
          this.table.cols = tableColsCerf;
          this.table.data = tableDataCerf.data;
      }
    },

    handleToCluster() {
      this.$router.push({
        path: "/cluster-management/cluster/detail",
        query: { name: "region" },
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
    // padding-bottom: 106px;
    padding-bottom: 20px;
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
</style>
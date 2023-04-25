<template>
  <div class="oam-container">
    <line-alert
      content="负载均衡器 (Load Balancer) 将访问流量按照转发策略分发到对应的服务的多个实例上，充当了客户端的单一接入点，从而提高应用程序的可用性。LB可灵活配置多种转发策略，满足复杂场景的转发控制功能。同时支持 HTTP/HTTPS/TCP 三种协议，增强了应用服务的防护能力。"
    />

    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate"
            >创建负载均衡器</el-button
          >
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
            @keyup.enter.native="handleSearch"
            v-model="searchValue"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="handleRefresh"
          />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无证书"
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
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handleDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="系统资源，不允许进行项目分配"
                      placement="left-start"
                    >
                      <div>
                        <el-dropdown-item :disabled="true">
                          更新项目
                        </el-dropdown-item>
                      </div>
                    </el-tooltip>

                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="系统资源，不允许更新规格"
                      placement="left-start"
                    >
                      <div>
                        <el-dropdown-item :disabled="true">
                          更新规格
                        </el-dropdown-item>
                      </div>
                    </el-tooltip>

                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="系统资源，不允许删除"
                      placement="left-start"
                    >
                      <div>
                        <el-dropdown-item :disabled="true">
                          删除负载均衡器
                        </el-dropdown-item>
                      </div>
                    </el-tooltip>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "ClusterList",
  components: { LineAlert },
  data() {
    return {
      searchValue: "",
      rowCenter: {
        searchValue: "",
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableData,
      tableColumnList,
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
    // 搜索
    handleSearch() {},
    handleRefresh() {},

    handelCreate() {
      this.$router.push({
        path: "/network-management/load-balancer/create",
      });
    },

    handleDetail(row) {
      this.$router.push({
        path: "/network-management/load-balancer/detail",
        query: { name: row.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 65px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
</style>
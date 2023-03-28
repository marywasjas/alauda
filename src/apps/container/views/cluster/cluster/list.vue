<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">创建集群</el-button>
          <el-button @click="handleAccessCluster">接入集群</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
          <el-button icon="el-icon-s-tools" size="small" />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <!-- <el-table-column fixed prop="date" label="名称" >
          </el-table-column> -->
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
                <span @click="handelDetails(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'total'">
                <p class="margin0">
                  <i class="el-icon-cpu primary2-text" />
                  {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                </p>
                <p class="margin0">
                  <i class="el-icon-bank-card primary-text" />
                  {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                </p>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      command="update"
                      @click.native="handleCapacityExpansion(scope.row)"
                      >Kubectl 工具</el-dropdown-item
                    >
                    <el-dropdown-item
                      command="delete"
                      @click.native="handleDelete(scope.row)"
                      >删除</el-dropdown-item
                    >
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
// import axios from "axios";
import { getClusterList } from "@/../mock/cluster/axiosApi";
import { tableData, tableColumnList } from "./constant";

export default {
  name: "ClusterList",
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        tag: "",
        name: "",
      },
      tagOptions: [
        {
          value: "标签1",
          label: "标签1",
        },
        {
          value: "标签2",
          label: "标签2",
        },
      ],
    };
  },

  created() {
    // 获取列表数据
    // this.getList();
  },

  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline);
    },

    handelCreate() {
      // this.$router.push({ name: "ClusterCreate" });
      this.$router.push({ path: "/cluster-management/cluster/create" });
    },

    handleAccessCluster() {
      this.$router.push({ path: "/cluster-management/cluster/accessCluster" });

    },

    handelDetails(row) {
      this.$router.push({
        name: "ClusterDetail",
        query: { name: row.name },
      });
    },

    handleCapacityExpansion() {},

    handleDelete(row) {},
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
</style>

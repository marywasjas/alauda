<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreateProject">
            创建项目
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 330px; margin-left: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
            <el-select
              slot="prepend"
              v-model="searchValue"
              style="width: 110px"
              @change="handleSearchChange"
            >
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          @selection-change="cacheSelected"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
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
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span
                    @click="handleProjectDetail(scope.row)"
                    class="cursor-pointer"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                  <span>{{ scope.row.desc }}</span>
                </div>
              </div>
              <div v-else-if="col.id === 'status'">
                <i
                  :class="
                    scope.row.status === '正常'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                <span> {{ scope.row[col.id] }} </span>
              </div>
              <div v-else-if="col.id === 'cluster'">
                <p class="margin10">
                  {{ scope.row[col.id] }} :&nbsp;&nbsp;
                  <i class="el-icon-cpu primary2-text" />
                  {{ scope.row.cpu }}&nbsp;&nbsp;
                  <i class="el-icon-bank-card primary-text" />
                  {{ scope.row.memory }}&nbsp;&nbsp;
                  <i class="el-icon-coin primary-text" />
                  {{ scope.row.storage }}&nbsp;&nbsp;
                </p>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 15px; margin-left: 60%">
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
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "UserList",
  components: {
    LineAlert,
    FoldableBlock,
  },
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },

      tableData,
      tableColumnList,
      searchOptions: [
        { label: "名称", value: "name" },
        { label: "显示名称", value: "showName" },
      ],
      searchValue: "name",
      typeValue: "",
    };
  },

  created() {},
  methods: {
    getList() {},

    handleStatusChange() {},

    // 创建用户
    handleCreateProject() {
      this.$router.push({ name: "ProjectCreate" });
      // this.$router.push({ path: "/project-management/project/create" });
    },

    handleProjectDetail(obj) {
      console.log(obj.name);
      this.$router.push({
        path: "/project-list/overview/index",
        query: { name: obj.name },
      });
    },

    handleSearchChange(e) {},

    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
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
.oam-container[data-v-bb49faf2] {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100%;
}
</style>
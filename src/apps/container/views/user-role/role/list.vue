<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreateRole">
            创建角色
          </el-button>
        </span>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
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
                <i class="el-icon-menu" />
                <div>
                  <span
                    @click="handleRoleDetail(scope.row)"
                    class="cursor-pointer"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                  <span>{{ scope.row.detail }}</span>
                </div>
              </div>       
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>

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
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";

export default {
  name: "RoleList",
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tableData,
      tableColumnList,
      statusOptions: [
        { value: "all", label: "全部" },
        { value: "normal", label: "正常" },
        { value: "lock", label: "锁定" },
        { value: "void", label: "无效" },
        { value: "disable", label: "禁用" },
      ],
      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},
    cacheSelected() {},
    // 创建用户
    handleCreateRole() {
      // this.$router.push({ name: "UserCreate" });
      this.$router.push({ path: "/user-role-management/role/create" });
    },
    handleRoleDetail(obj) {
      this.$router.push({
        path: "/user-role-management/role/detail",
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
</style>
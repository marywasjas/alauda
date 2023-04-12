<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="importMember"> 导入成员 </el-button>
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
              <div v-if="col.id === 'userName'" class="name-cell">
                <i class="el-icon-menu" />
                <div>
                  <span
                    @click="handleUserDetail(scope.row)"
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

      <el-dialog
        @close="importMemVisible = false"
        :visible.sync="importMemVisible"
        width="60%"
      >
        <div slot="title" class="header-title">
          <span style="font-size: 20px; line-height: 24px">
            导入成员
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 450px">
                  当前登陆账号、系统账号、已导入的成员不在当前列表展示
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </span>
        </div>

        <div style="display: flex">
          <el-select
            v-model="statusValue"
            @change="handleStatusChange"
            size="small"
            style="width: 200px; margin-left: 40%"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-input
            style="width: 200px; margin-left: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按用户名搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
            size="small"
          >
          </el-input>
        </div>

        <el-table
          :data="tableData2.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          @selection-change="cacheSelected"
          height="400"
        >
          <el-table-column width="50" type="selection" />
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
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span
                    @click="handleRoleDetail(scope.row)"
                    style="font-size: 16px"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                  <span>{{ scope.row.desc }}</span>
                </div>
              </div>
              <div v-else>
                <span> {{ scope.row[col.id] }} </span>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div style="display: flex; margin-top: 30px">
          设置角色
          <el-select
            v-model="statusValue"
            @change="handleStatusChange"
            size="small"
            style="width: 35%; margin-right: 20px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          命名空间
          <el-select
            v-model="statusValue"
            @change="handleStatusChange"
            size="small"
            style="width: 35%; margin-right: 20px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAllMember">
            导入全部
          </el-button>
          <el-button
            type="primary"
            @click="handleSelectedMember"
            :disabled="batchVisible"
          >
            {{ `导入(${selectedDevice.length})` }}
          </el-button>
          <el-button @click="importMemVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  tableData,
  tableColumnList,
  tableColumnList2,
  tableData2,
} from "./constant";
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
      batchVisible: false,
      selectedDevice: [],
      tableData,
      tableColumnList,
      tableColumnList2,
      tableData2,
      statusOptions: [
        { value: "all", label: "全部" },
        { value: "normal", label: "未分组" },
      ],
      statusValue: "all",
      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
      searchValue: "showName",
      typeValue: "",

      importMemVisible: false,
      removeDisable: false,
      allMemberVisible: false,
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},
    // 创建用户
    handleCreateUser() {
      // this.$router.push({ name: "UserCreate" });
      this.$router.push({ path: "/user-role-management/user/create" });
    },
    handleUserDetail(obj) {
      console.log(obj.userName);
      this.$router.push({
        path: "/user-role-management/user/detail",
        query: { name: obj.userName },
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

    importMember() {
      this.importMemVisible = true;
    },

    handleRemove(obj) {
      this.removeDisable = true;
      this.roleName = obj.name;
    },

    handle_remove() {},

    cacheSelected(selected) {
      console.log("多选框被选中对象组成的数组", selected);
      this.selectedDevice = selected;
      this.batchVisible = true;
      if (this.selectedDevice.length > 0) this.batchVisible = false;
    },

    handleSet() {},
    handleAllMember() {
      this.allMemberVisible = true;
    },
    handleImport() {},
    handleSelectedMember() {},
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
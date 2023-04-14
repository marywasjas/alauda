<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="integration">集成</el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 250px; margin-left: 20px"
            prefix-icon="el-icon-search"
            clearable
            placeholder="按名称过滤"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
          </el-input>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1">
            <el-row style="height: 400px" class="row-bg">
              <el-col :span="6" style="margin-left: 20px">
                <!-- <div class="grid-content bg-purple">bass-etrust</div> -->
                <el-button class="buttonClass">bass-etrust</el-button>
              </el-col>
              <el-col :span="6" style="margin-left: 20px">
                <!-- <div class="grid-content bg-purple">gitlab</div> -->
                <el-button class="buttonClass">gitlab</el-button>
              </el-col>
              <el-col :span="6" style="margin-left: 20px">
                <!-- <div class="grid-content bg-purple">harbor</div> -->
                <el-button class="buttonClass">harbor</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="制品管理" name="2">
            <el-row style="height: 400px" class="row-bg"> </el-row
          ></el-tab-pane>
          <el-tab-pane label="代码质量分析" name="3">
            <el-row style="height: 400px" class="row-bg"> </el-row
          ></el-tab-pane>
          <el-tab-pane label="代码管理" name="4">
            <el-row style="height: 400px" class="row-bg"> </el-row
          ></el-tab-pane>
          <el-tab-pane label="持续集成" name="5">
            <el-row style="height: 400px" class="row-bg"> </el-row
          ></el-tab-pane>
          <el-tab-pane label="测试管理" name="6">
            <el-row style="height: 400px" class="row-bg"> </el-row
          ></el-tab-pane>
        </el-tabs>
      </div>

      <el-dialog
        @close="importMemVisible = false"
        :visible.sync="importMemVisible"
        width="60%"
      >
        <div slot="title" class="header-title">
          <span style="font-size: 20px; line-height: 20px">
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
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-position="left"
            inline
          >
            <el-form-item label="设置角色">
              <el-select
                v-model="ruleForm.setRole"
                @change="handleStatusChange"
                size="small"
                style="width: 100%; margin-right: 20px"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="命名空间">
              <el-select
                v-model="ruleForm.space"
                @change="handleStatusChange"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
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

      <el-dialog
        @close="removeDisable = false"
        :visible.sync="removeDisable"
        width="40%"
      >
        <div class="el-dialog-div">
          <span
            style="
              text-align: center;
              display: block;
              font-size: 22px;
              line-height: 24px;
              font-weight: bold;
            "
          >
            <i class="el-icon-warning" style="color: orange" />
            {{ `确定移除 项目 成员"${removeRoleName}"吗？` }}
          </span>
          <br />
          <span style="text-align: center; display: block">
            移除后，将失去该 项目 对应的权限。
          </span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_remove">移除</el-button>
          <el-button @click="removeDisable = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  tableData,
  tableColumnList,
  tableData2,
  tableColumnList2,
  tableData3,
  tableColumnList3,
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
      activeName: "1",
      batchVisible: false,
      selectedDevice: [],
      tableData,
      tableColumnList,
      tableData2,
      tableColumnList2,
      tableData3,
      tableColumnList3,
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
      searchValue: "userName",
      typeValue: "",

      importMemVisible: false,
      removeDisable: false,
      allMemberVisible: false,

      removeVisible: false,
      removeRoleName: "",

      ruleForm: {
        setRole: "",
        space: "",
      },
      rules: {},
    };
  },

  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
      this.removeRoleName = obj.name;
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

    integration(){
      this.$router.push({
        path:"/project-list/toolchain/integrate"
      })
    }
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple {
  background: #fff;
}

.buttonClass {
  width: 200px;
  height: 200px;
  padding: 0;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  margin-right: 12px;
  border: 1px solid #2794f8;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 #f4f4f4;
  color: #2794f8;
  background: white;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  color: #2794f8;
}
/*鼠标按下，没有抬起*/
.buttonClass:active {
  background: #2794f8;
  color: white;
}
</style>
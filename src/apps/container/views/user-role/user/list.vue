<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreateUser">
            创建用户
          </el-button>
        </span>

        <div class="flex-center">
          状态：
          <el-select v-model="statusValue" @change="handleStatusChange">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

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
          <el-table-column width="50" type="selection" />
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
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      command="update"
                      @click.native="handlePassword(scope.row, '重置密码')"
                    >
                      重置密码
                    </el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="
                        handleUpdatePeriod(scope.row, '更新有效期')
                      "
                    >
                      更新有效期
                    </el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="handleActive(scope.row)"
                    >
                      激活
                    </el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="handleDisable(scope.row)"
                    >
                      禁用
                    </el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="handleDelete(scope.row)"
                    >
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 15px; margin-left: 700px">
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
        :title="title"
        @close="cancelPasswordDialog"
        :visible.sync="dialogPasswordVisible"
        width="60%"
      >
        <el-form
          ref="passwordForm"
          :model="passwordForm"
          :rules="passwordRules"
          label-width="135px"
        >
          <el-form-item label="用户名">
            {{ passwordUser }}
          </el-form-item>

          <el-form-item label="密码类型">
            <el-radio-group v-model="passwordForm.radio">
              <el-radio-button label="随机"></el-radio-button>
              <el-radio-button label="自定义"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="新密码" v-if="passwordForm.radio == '随机'">
            <el-input
              v-model="passwordForm.input"
              show-password
              style="width: 70%"
            />
          </el-form-item>

          <el-form-item label="新密码" v-else>
            <el-input
              v-model="passwordForm.input2"
              show-password
              placeholder="必须包含英文字母、数字、特殊字符~!@#$%^&*()-_=+?..."
              style="width: 70%"
            />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSet"> 重置 </el-button>
          <el-button @click="dialogPasswordVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :title="title"
        @close="cancelPeriodDialog"
        :visible.sync="dialogPeriodVisible"
        width="60%"
      >
        <el-form
          ref="periodForm"
          :model="periodForm"
          :rules="periodRules"
          label-width="135px"
        >
          <el-form-item label="用户名">
            {{ passwordUser }}
          </el-form-item>

          <el-form-item label="有效期">
            <el-radio-group v-model="periodForm.radio">
              <el-radio-button label="永久"></el-radio-button>
              <el-radio-button label="自定义"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="时间范围"
            v-if="periodForm.radio == '自定义'"
            prop="date"
          >
            <el-date-picker
              v-model="periodForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleUpdate"> 更新 </el-button>
          <el-button @click="dialogPeriodVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        @close="dialogDisableVisible = false"
        :visible.sync="dialogDisableVisible"
        width="40%"
      >
        <div class="el-dialog-div">
          <span
            style="
              margin-left: 50px;
              font-size: 22px;
              line-height: 24px;
              font-weight: bold;
            "
          >
            <i class="el-icon-warning" style="color: orange" />
            {{
              "确定" + " 禁用 " + "用户 " + '"' + this.passwordUser + '"吗？'
            }}
          </span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_disable"> 禁用 </el-button>
          <el-button @click="dialogDisableVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        @close="dialogDeleteVisible = false"
        :visible.sync="dialogDeleteVisible"
        width="40%"
      >
        <div class="el-dialog-div">
          <span
            style="
              margin-left: 50px;
              font-size: 22px;
              line-height: 24px;
              font-weight: bold;
            "
          >
            <i class="el-icon-warning" style="color: orange" />
            {{
              "确定" + " 删除 " + "用户 " + '"' + this.passwordUser + '"吗？'
            }}
          </span>
          <br />
          <span style="margin-left: 75px; margin-top: 100px">
            删除后，将无法创建相同用户名的用户
          </span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_delete"> 删除 </el-button>
          <el-button @click="dialogDeleteVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";

export default {
  name: "UserList",
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
      statusValue: "all",
      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
      searchValue: "showName",
      typeValue: "",
      title: "",
      passwordUser: "",

      dialogPasswordVisible: false,
      passwordForm: {
        radio: "随机",
        input: "password",
        input2: "",
      },
      passwordRules: {},

      dialogPeriodVisible: false,
      periodForm: {
        radio: "永久",
        date: "password",
      },
      periodRules: {
        date: [
          { required: true, message: "时间范围是必填项", trigger: "change" },
        ],
      },

      dialogDisableVisible: false,
      dialogDeleteVisible: false,
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},
    cacheSelected() {},
    // 创建用户
    handleCreateUser() {
      // this.$router.push({ name: "UserCreate" });
      this.$router.push({ path: "/user-role-management/user/create" });
    },
    handleUserDetail(obj) {
      this.$router.push({ path: "/user-role-management/user/detail" });
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

    cancelPasswordDialog() {
      this.dialogPasswordVisible = false;
    },

    handlePassword(obj, title) {
      console.log(title);
      // console.log(obj);
      this.title = title;
      this.dialogPasswordVisible = true;
      this.passwordUser = obj.userName + " (" + obj.desc + ")";
    },
    handleSet() {
      this.dialogPasswordVisible = false;
    },

    cancelPeriodDialog() {
      this.dialogPeriodVisible = false;
    },

    handleUpdatePeriod(obj, title) {
      this.title = title;
      this.dialogPeriodVisible = true;
      this.passwordUser = obj.userName + " (" + obj.desc + ")";
    },
    handleUpdate() {
      this.dialogPeriodVisible = false;
    },

    handleDisable(obj) {
      this.dialogDisableVisible = true;
      this.passwordUser = obj.userName + " (" + obj.desc + ")";
    },
    handle_disable() {},

    handleDelete(obj) {
      this.dialogDeleteVisible = true;
      this.passwordUser = obj.userName + " (" + obj.desc + ")";
    },

    handle_delete() {},
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
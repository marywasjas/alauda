<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleBackupPolicy">
            创建备份策略
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 280px; margin-left: 20px"
            prefix-icon="el-icon-search"
            clearable
            placeholder="按名称或简介过滤"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
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
                    scope.row.status === '已就绪'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                <span> {{ scope.row[col.id] }} </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
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
        title="创建备份策略"
        @close="dialogPasswordVisible = false"
        :visible.sync="dialogPasswordVisible"
        width="60%"
      >
        <!-- <div class="text item event-container"> -->
        <div style="padding: 12px; background-color: rgba(247, 249, 252)">
          <div style="font-size: 10px; display: flex; flex-direction: column">
            <el-row style="height: 135px">
              <el-col :span="12">
                <el-button
                  class="buttonClass"
                  @click="handleDetail('DcokerRegistry')"
                >
                  <div style="position: relative; padding: 32px; display: flex">
                    <div style="width: 72px; height: 72px; margin-right: 40px">
                      <img
                        :src="errGif"
                        width="72"
                        height="72"
                        alt="Girl has dropped her ice cream."
                      />
                    </div>

                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                      "
                    >
                      <div style="font-size: 18px; color: rgba(50, 52, 55)">
                        创建 ETCD 备份
                      </div>
                      <div
                        style="margin: 10px 0 12px; color: rgba(150, 152, 155)"
                      >
                        备份集群 ETCD
                        下全部数据，支持本地存储和对象存储，接入集群暂时不支持该功能
                      </div>
                    </div>
                  </div>
                </el-button>
              </el-col>
            </el-row>

            <el-row style="height: 135px">
              <el-col :span="24">
                <el-button
                  class="buttonClass"
                  @click="handleDetail2('DcokerRegistry')"
                  :disabled="true"
                >
                  <div style="position: relative; padding: 32px; display: flex">
                    <div style="width: 72px; height: 72px; margin-right: 40px">
                      <img
                        :src="errGif"
                        width="72"
                        height="72"
                        alt="Girl has dropped her ice cream."
                      />
                    </div>

                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                      "
                    >
                      <div style="font-size: 18px; color: rgba(50, 52, 55)">
                        创建应用备份
                      </div>
                      <div
                        style="margin: 10px 0 10px; color: rgba(150, 152, 155)"
                      >
                        备份集群下应用资源数据，支持备份至对象存储
                      </div>
                      <div style="color: rgba(150, 152, 155)">
                        当前集群未部署备份恢复组件，无法创建应用备份策略，
                        <el-link type="primary" href="/#/cluster-management/cluster/detail">去部署</el-link>
                      </div>
                    </div>
                  </div>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- </div> -->
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
        width="45%"
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
        width="45%"
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
            {{
              "确定" + " 删除 " + "用户 " + '"' + this.passwordUser + '"吗？'
            }}
          </span>
          <br />
          <span style="text-align: center; display: block">
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
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "UserList",
  components: {
    LineAlert,
    FoldableBlock,
  },
  data() {
    return {
      errGif: errGif + "?" + +new Date(),

      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tableData,
      tableColumnList,
      searchValue: "showName",
      typeValue: "",
      title: "",
      passwordUser: "",

      dialogPasswordVisible: false,

      dialogPeriodVisible: false,
      periodForm: {
        radio: "永久",
        date: "",
      },
      periodRules: {
        date: [
          { required: true, message: "时间范围是必填项", trigger: "change" },
        ],
      },

      dialogDisableVisible: false,
      dialogDeleteVisible: false,

      batchDeleteVisible: false,
      batchActiveVisible: false,
      batchDisableVisible: false,
      batchPeriodVisible: false,
      periodBatchForm: {
        radio: "永久",
        date: "",
      },
      periodBatchRules: {},
      password: "",
    };
  },

  created() {},
  methods: {
    getList() {},
    // 创建用户
    handleBackupPolicy() {
      // this.$router.push({ path: "/user-role-management/user/create" });
      this.dialogPasswordVisible = true;
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

    cacheSelected(selected) {
      console.log("多选框被选中对象组成的数组", selected);
      this.selectedDevice = selected;
      this.batchVisible = false;
      if (this.selectedDevice.length > 0) this.batchVisible = true;
    },
    handleBatchPeriod() {
      this.batchPeriodVisible = true;
    },
    handle_batchPeriod() {},

    handleBatchActive() {
      this.batchActiveVisible = true;
    },
    handle_batchActive() {},

    handleBatchDisable() {
      this.batchDisableVisible = true;
    },
    handle_batchDisable() {},

    handleBatchDelete() {
      this.batchDeleteVisible = true;
    },
    handle_batchDelete() {},
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
.buttonClass {
  width: 704px;
  height: 125px;
  padding: 0;
  white-space: inherit;
  text-align: left;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  // margin-right: 12px;
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

<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreate">
            创建备份策略
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 280px; margin-left: 20px"
            prefix-icon="el-icon-search"
            clearable
            placeholder="按名称或简介过滤"
            v-model="searchValue"
            @keyup.enter.native="handleSearch"
          >
          </el-input>
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
                      @click.native="handleAction(scope.row, '立即执行')"
                    >
                      执行备份
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleUpdate(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handleDelete(scope.row, '删除')"
                    >
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div v-else-if="col.id === 'time'">
                {{ `${scope.row[col.id]} (UTC)` }}
              </div>

              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="创建备份策略"
        @close="dialogCreateVisible = false"
        :visible.sync="dialogCreateVisible"
        width="60%"
      >
        <div style="padding: 12px; background-color: rgba(247, 249, 252)">
          <div style="font-size: 10px; display: flex; flex-direction: column">
            <el-row style="height: 135px">
              <el-col :span="12">
                <el-button class="buttonClass" @click="handleETCD">
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
                <el-button class="buttonClass" :disabled="true">
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
                        <el-link
                          type="primary"
                          href="/#/cluster-management/cluster/detail"
                          >去部署</el-link
                        >
                      </div>
                    </div>
                  </div>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>

      <DeleteRemoveDialog
        :formVisible="formVisible"
        :deleteOrRemove="buttonText"
        :width="width"
        :titleContext="titleContext"
        v-on:closeFormDialog="closeFormDialog"
        v-on:submitForm="submitForm"
      />
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import errGif from "@/assets/401_images/401.gif";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "UserList",
  components: { DeleteRemoveDialog },
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
      tableData,
      tableColumnList,
      searchValue: "",
      buttonText: "",
      titleContext: "",
      formVisible: false,
      width: "",
      dialogCreateVisible: false,
    };
  },

  created() {},
  methods: {
    handleSearch() {},

    handleCreate() {
      this.dialogCreateVisible = true;
    },

    handleDetail(obj) {
      this.$router.push({
        path: "/cluster-management/backup-manage/detail",
        query: { name: obj.name },
      });
    },

    handleETCD() {
      this.$router.push({
        path: "/cluster-management/backup-manage/etcd",
        query: { type: "add" },
      });
    },

    handleAction(obj, title) {
      this.buttonText = title;
      this.titleContext = `确定立即执行备份任务吗？`;
      this.formVisible = true;
      this.width = "35%";
    },

    handleDelete(obj, title) {
      this.buttonText = title;
      this.titleContext = `确认删除备份策略 "${obj.name}" 吗？`;
      this.formVisible = true;
      this.width = "45%";
    },

    handleUpdate(obj) {
      this.$router.push({
        path: "/cluster-management/backup-manage/etcd",
        query: { type: "update", name: obj.name },
      });
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
  // background: #2794f8;
  color: white;
}
</style>

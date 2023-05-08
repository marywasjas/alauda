<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">
            创建通知模板
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
          empty-text="无通知模板"
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
                <div @click="handelDetail(scope.row)" style="font-size: 16px">
                  {{ scope.row[col.id] }}
                </div>
                <div style="font-size: 12px; color: gray">
                  {{ scope.row.showName }}
                </div>
              </div>

              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      :width="width"
      :titleContext="titleContext"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "ClusterList",
  components: { DeleteRemoveDialog },

  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableData,
      tableColumnList,
      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],

      titleContext: "",
      buttonText: "",
      formVisible: false,
      width: "",
      nodeText: "",
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
    handelDetail(obj) {
      this.$router.push({
        path: "/maintenance-center/notification/detail-notification-Template",
        query: { name: obj.name },
      });
    },

    handelCreate() {
      this.$router.push({
        path: "/maintenance-center/notification/create-notification-Template",
      });
    },

    handleUpdate() {
      this.$router.push({
        path: "/maintenance-center/notification/create-notification-Template",
      });
    },

    handleDelete(obj) {
      this.buttonText = "确定";
      this.titleContext = `确定删除通知模板 "${obj.name}" 吗？`;
      this.formVisible = true;
      this.width = "45%";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
<template>
  <div class="oam-container">
    <LineAlert
      content="1. 未设置项目策略的项目，日志保留时间按照日志存储组件时配置的应用日志保留时间执行。2. 已设置项目策略的项目，日志保留时间按照项目策略执行。"
    />

    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>项目策略</span>

        <div class="flex-center">
          <el-button
            style="margin-right: 20px"
            @click="handleCreate('添加项目策略')"
          >
            添加项目策略
          </el-button>
          <el-input
            style="width: 220px; margin-right: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按项目名称搜索"
            v-model="typeValue"
            @keyup.enter.native="handleSearch"
          >
          </el-input>
          <el-button icon="el-icon-refresh-right" />
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
              <div v-if="col.id === 'name'">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'status'">
                <i
                  :class="
                    scope.row.status === '已启用'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleUpdate(scope.row, '更新项目策略')"
                    >
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleStop(scope.row)">
                      停用
                    </el-dropdown-item>

                    <el-tooltip
                      effect="dark"
                      class="item"
                      placement="left"
                      content="已启用状态不可删除"
                    >
                      <div>
                        <el-dropdown-item
                          @click.native="handleDelete"
                          :disabled="true"
                        >
                          删除
                        </el-dropdown-item>
                      </div>
                    </el-tooltip>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] == "" ? "-" : scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      deleteOrRemove="停用"
      :titleContext="`确定停用项目 &quot;${name}&quot; 的项目策略吗？`"
      nodeText="停用后，该项目下所有应用日志按全局策略执行"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />

    <el-dialog
      :title="title"
      @close="monitorItemVisible = false"
      :visible.sync="monitorItemVisible"
      width="60%"
    >
      <LineAlert
        v-if="title == '添加项目策略'"
        content='添加成功后，该项目下所有 "应用日志" 将按照项目策略执行。原有日志系那个无法查询。'
      />

      <el-form
        ref="monitorForm"
        :model="monitorForm"
        :rules="monitorRules"
        label-width="135px"
      >
        <el-form-item label="项目" prop="project">
          <span v-if="title == '更新项目策略'">{{ monitorForm.project }}</span>
          <el-select
            v-else
            v-model="monitorForm.project"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="日志保留时间" prop="remainDay">
          <el-input-number v-model="monitorForm.remainDay" :max="30" :min="1" />
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 日志数据最多保留 30 天 </el-descriptions-item>
        </el-descriptions>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          {{ this.title == "添加项目策略" ? "添加" : "更新" }}
        </el-button>
        <el-button @click="monitorItemVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";

import LineAlert from "@/apps/container/views/components/LineAlert";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "UserList",
  components: { LineAlert, DeleteRemoveDialog },
  data() {
    return {
      formVisible: false,
      name: "",
      tableData,
      tableColumnList,
      typeValue: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      monitorItemVisible: false,
      title: "",

      monitorForm: {
        project: "",
        remainDay: "7",
      },

      monitorRules: {
        remainDay: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        project: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      methodOptions: [
        { value: "baas", label: "baas(云信)" },
        { value: "chaos", label: "chaos" },
        { value: "cpaas-system", label: "cpaas-system" },
      ],
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
    handleSearch() {},

    handleStop(obj) {
      this.name = obj.name;
      this.formVisible = true;
    },
    closeFormDialog() {
      this.formVisible = false;
    },
    submitForm() {},

    handleCreate(title) {
      this.monitorForm = this.$options.data().monitorForm;
      this.title = title;
      this.monitorItemVisible = true;
      this.name = this.monitorForm.name;
    },

    handleUpdate(obj, title) {
      // this.monitorForm = {
      //   name: "blackbox",
      //   showName: "",
      //   detectionMethod: "ICMP",
      //   detectionInterval: "120s",
      //   targetAddress: "10.20.30.40",
      // };
      this.monitorForm = {
        ...obj,
        project: "cpaas-dev",
      };
      this.title = title;
      this.monitorItemVisible = true;
    },

    handleSubmit() {},

    handleDelete() {},
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
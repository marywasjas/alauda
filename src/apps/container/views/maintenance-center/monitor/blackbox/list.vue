<template>
  <div class="oam-container">
    <LineAlert
      content="平台基于 Blackbox Exporter，支持客户配置针对域名 / IP 的黑盒监控，从最终用户的角度检测服务是否正常。"
    />

    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreate('创建黑盒监控项')">
            创建黑盒监控项
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 350px; margin-right: 20px"
            clearable
            placeholder="搜索"
            v-model="typeValue"
            @keyup.enter.native="handleSearch"
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
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
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
              <div v-else-if="col.id === 'connectivity'">
                <i
                  :class="
                    scope.row.connectivity === '是'
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
                      @click.native="handleUpdate(scope.row, '更新黑盒监控项')"
                    >
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">
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
      </div>
    </div>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      deleteOrRemove="删除"
      :titleContext="`确定删除黑盒监控 &quot;${name}&quot; 吗？`"
      nodeText="删除后将无法恢复，且导致相关联的告警策略无法监控数据。"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />

    <el-dialog
      :title="title"
      @close="monitorItemVisible = false"
      :visible.sync="monitorItemVisible"
      width="60%"
    >
      <el-form
        ref="monitorForm"
        :model="monitorForm"
        :rules="monitorRules"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          <span v-if="title == '更新黑盒监控项'">{{ monitorForm.name }} </span>
          <el-input
            v-else
            v-model="monitorForm.name"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-，最多 32 个字符"
            style="width: 80%"
          />
        </el-form-item>

        <el-form-item label="显示名称">
          <el-input
            v-model="monitorForm.showName"
            placeholder="最多 64 个字符"
            style="width: 80%"
          />
        </el-form-item>

        <el-form-item label="探测方式" prop="detectionMethod">
          <el-select
            v-model="monitorForm.detectionMethod"
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
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 400px">
                HTTP 探测方式默认仅支持 GET 请求方式，如需使用 POST
                请求方式可参考
                <!-- <el-link>帮助文档</el-link> -->
                <el-link>
                  <i
                    class="el-icon-link el-icon-left question-icon"
                    style="color:#409EFF; margin-left10; margin-top:-15px;font-size:10px"
                  >
                    帮助文档
                  </i>
                </el-link>
                自定义监控模块。
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="探测间隔" prop="detectionInterval">
          <el-select
            v-model="monitorForm.detectionInterval"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in intervalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="目标地址" prop="targetAddress">
          <el-input
            v-model="monitorForm.targetAddress"
            placeholder="IP 地址 / 域名，最多 128 个字符"
            style="width: 80%"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          {{ this.title == "创建黑盒监控项" ? "创建" : "更新" }}
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
      searchOptions: [
        { label: "名称", value: "name" },
        { label: "显示名称", value: "showName" },
        { label: "目标地址", value: "targetAddress" },
      ],
      searchValue: "name",
      typeValue: "",

      monitorItemVisible: false,
      title: "",

      monitorForm: {
        name: "",
        showName: "",
        detectionMethod: "ICMP",
        detectionInterval: "",
        targetAddress: "",
      },

      monitorRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        detectionMethod: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        detectionInterval: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        targetAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      methodOptions: [
        { value: "ICMP", label: "ICMP" },
        { value: "TCP", label: "TCP" },
        { value: "HTTP", label: "HTTP" },
      ],
      intervalOptions: [
        { value: "10s", label: "10s" },
        { value: "30s", label: "30s" },
        { value: "60s", label: "60s" },
        { value: "120s", label: "120s" },
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
    handleSearchChange(e) {},

    handleDelete(obj) {
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
    },

    handleUpdate(obj, title) {
      // this.monitorForm = {
      //   name: "blackbox",
      //   showName: "",
      //   detectionMethod: "ICMP",
      //   detectionInterval: "120s",
      //   targetAddress: "10.20.30.40",
      // };
      this.monitorForm = obj;
      this.title = title;
      this.monitorItemVisible = true;
    },

    handleSubmit() {},
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
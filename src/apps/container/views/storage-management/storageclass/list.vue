<template>
  <div class="oam-container">
    <line-alert
      content='StorageClass 为管理员提供了一个描述其存储的方法。管理员可以根据想要提供的服务质量级别，备份
    、安全或其他策略制定存储类，应用于不同业务场景。存储类的概念在其他存储系统中有时被称为 "配置文件"。
    '
    />
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-dropdown
            split-button
            type="primary"
            trigger="click"
            @command="handleClick"
            @click="openDialog"
          >
            {{ $t("创建存储卷") }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item split-button>YAML 创建</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <div class="flex-center">
          <el-select v-model="typeSearch">
            <span slot="prefix">类型：</span>
            <el-option
              v-for="item in [{ id: '块存储', name: '块存储' }]"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>

          <el-input
            style="width: 230px; margin: 0 15px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按名称搜索"
            v-model="nameSearch"
            @keyup.enter.native="handleSearch"
          >
          </el-input>
          <el-button icon="el-icon-refresh-right" @click="handleRefresh" />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无存储类"
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
                    @click="handleDetail(scope.row)"
                    class="cursor-pointer"
                    style="font-size: 14px"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                  <span></span>
                </div>
              </div>

              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content='仅 "所有项目" 支持设为默认'
                      placement="left-start"
                    >
                      <div>
                        <el-dropdown-item :disabled="true">
                          设为默认
                        </el-dropdown-item>
                      </div>
                    </el-tooltip>
                    <el-dropdown-item @click.native="handleProject(scope.row)">
                      更新项目
                    </el-dropdown-item>
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
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 更新项目 -->
    <el-dialog
      title="更新项目"
      @close="projectVisible = false"
      :visible.sync="projectVisible"
      width="60%"
    >
      <el-form
        ref="projectForm"
        :model="projectForm"
        :rules="projectRules"
        label-width="135px"
      >
        <el-form-item label="名称">
          <span>{{ projectForm.name }} </span>
        </el-form-item>

        <el-form-item label="分配项目">
          <el-radio-group v-model="projectForm.project">
            <el-radio-button label="所有项目"></el-radio-button>
            <el-radio-button label="指定项目"></el-radio-button>
            <el-radio-button label="不分配"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="指定项目"
          prop="specProject"
          v-if="projectForm.project == '指定项目'"
        >
          <el-select
            v-model="projectForm.specProject"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_project"> 更新 </el-button>
        <el-button @click="projectVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      @close="deleteVisible = false"
      :visible.sync="deleteVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          {{ `确定删除存储类 "${deleteName}" 吗？` }}
        </span>
      </div>

      <div style="margin-bottom: 10px">
        删除后，用户将无法基于此存储类创建持久卷，而已创建的持久卷将不受影响。
      </div>
      <div style="margin-top: 10px">
        请输入 <span style="color: red">{{ deleteName }}</span> 确定删除。
      </div>
      <div class="inputInfo copy_icon">
        <el-input v-model="command" style="width: 95%"> </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="handle_delete"
          :disabled="command == '' ? true : false"
          >删除</el-button
        >
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "UserList",
  components: { LineAlert },
  data() {
    return {
      deleteName: "",
      command: "",
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

      typeSearch: "",
      nameSearch: "",

      projectVisible: false,
      projectForm: {
        name: "",
        project: "不分配",
        specProject: "",
      },
      projectRules: {
        specProject: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      deleteVisible: false,
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
    handleRefresh() {},

    handleDetail(obj) {
      this.$router.push({
        path: "/storage-management/storageclass/detail",
        query: { name: obj.name },
      });
    },

    handleClick() {
      this.$router.push({
        path: "/storage-management/storageclass/createYaml",
      });
    },
    openDialog() {
      this.$router.push({
        path: "/storage-management/storageclass/createStorageClass",
      });
    },

    handleProject(obj) {
      this.projectVisible = true;
      this.projectForm.name = obj.name;
    },
    handle_project() {},

    handleDelete(obj) {
      this.command = "";
      this.deleteVisible = true;
      this.deleteName = obj.name;
    },
    handle_delete() {},

    handleUpdate(obj) {
      this.$router.push({
        path: "/storage-management/storageclass/update",
        query: { name: obj.name },
      });
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
::v-deep .el-input__prefix {
  position: absolute;
  height: 100%;
  left: 5px;
  top: 11px;
  text-align: center;
  color: #c0c4cc;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  // margin-right: 15px;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 45px;
}
</style>
<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">
            添加模板仓库
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
            class="margin-right10"
            v-model="searchValue"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
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
          empty-text="无证书"
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
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 更新 -->
    <el-dialog
      :title="title"
      @close="createVisible = false"
      :visible.sync="createVisible"
      width="60%"
    >
      <el-form
        ref="createForm"
        :model="createForm"
        :rules="createRules"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="createForm.name"
            style="width: 80%"
            v-if="title == '添加仓库模板'"
          />
          <span v-else>{{ createForm.name }}</span>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="4"
            v-model="createForm.desc"
            style="width: 80%"
          />
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group
            v-model="createForm.type"
            v-if="title == '添加仓库模板'"
          >
            <el-radio-button label="Chart"></el-radio-button>
            <el-radio-button label="Git"></el-radio-button>
            <el-radio-button label="SVN"></el-radio-button>
            <el-radio-button label="Local"></el-radio-button>
          </el-radio-group>

          <span v-else>{{ createForm.type }}</span>

          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                Chart、Git、SVN：存放在远端仓库上的 Chart 模板。<br />
                Local：本地集群上的 Chart
                模板仓库，用于存放客户本地上传的模板、同时支持在本地删除模板。
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item
          label="仓库地址"
          prop="storeAddress"
          v-if="createForm.type == 'Chart'"
        >
          <el-input v-model="createForm.storeAddress" style="width: 80%" />
        </el-form-item>

        <el-form-item
          label="代码仓库地址"
          prop="codeAddress"
          v-if="createForm.type != 'Chart' && createForm.type != 'Local'"
        >
          <el-input v-model="createForm.codeAddress" style="width: 80%" />
        </el-form-item>

        <el-form-item
          label="目录"
          prop="catalog"
          v-if="createForm.type != 'Chart' && createForm.type != 'Local'"
        >
          <el-input v-model="createForm.catalog" style="width: 80%" />
        </el-form-item>

        <el-form-item label="用户名" v-if="createForm.type != 'Local'">
          <el-input v-model="createForm.userName" style="width: 80%" />
        </el-form-item>

        <el-form-item label="密码" v-if="createForm.type != 'Local'">
          <el-input v-model="createForm.password" style="width: 80%" />
        </el-form-item>

        <el-form-item label="分配项目">
          <el-radio-group v-model="createForm.project">
            <el-radio-button label="allProject">所有项目</el-radio-button>
            <el-radio-button label="specProject">指定项目</el-radio-button>
            <el-radio-button label="notassign">不分配</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="指定项目"
          v-if="createForm.project == 'specProject'"
          prop="specify"
        >
          <el-select
            v-model="createForm.specify"
            @focus="setMinWidthEmpty"
            multiple
            style="width: 80%"
          >
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handle_create"
          v-if="title == '添加仓库模板'"
          >添加
        </el-button>
        <el-button type="primary" @click="handle_update" v-else>更新</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      @close="deleteVisible = false"
      :visible.sync="deleteVisible"
      width="65%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除模板仓库
        </span>
      </div>
      <div class="el-dialog-div">
        <div style="margin-bottom20">
          {{
            `确定删除模板仓库 ${deleteTitle} 吗？ 删除后，通过该仓库模板导入的所有的应用模板将同时被删除，已创建的应用不受影响`
          }}
        </div>
        <div style="margin-top: 20px">
          请输入 <span style="color: red">{{ deleteTitle }}</span> 确认删除
        </div>
        <el-input v-model="command" @input="handleCommand"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="handle_delete"
          :disabled="deleteDisable"
        >
          删除
        </el-button>
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "ClusterList",
  components: {},
  data() {
    return {
      searchValue: "",
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

      createVisible: false,
      deleteVisible: false,
      deleteTitle: "",
      command: "",
      deleteDisable: true,

      createForm: {
        name: "",
        desc: "",
        type: "Chart",
        storeAddress: "",
        userName: "",
        password: "",
        project: "notassign",
        codeAddress: "",
        catalog: "",
        specify: "",
      },

      createRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        storeAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        codeAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        catalog: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        specify: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      projectOptions: [
        { label: "bass(云信)", value: "bass" },
        { label: "chaos", value: "chaos" },
        { label: "cpaas-dev", value: "cpaas-dev" },
        { label: "cpaas-system", value: "cpaas-system" },
        { label: "ebaims(集团审计信息管理系统)", value: "ebaims" },
        { label: "ebump(统一监控)", value: "ebump" },
        { label: "faq(智能问答)", value: "faq" },
      ],

      title: "",
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

    handleDetail(row) {
      this.$router.push({
        path: "/catalog-management/chartrepo/detail",
        query: { name: row.name },
      });
    },

    handelCreate() {
      this.title = "添加仓库模板";
      this.createForm = this.$options.data().createForm;
      this.$nextTick(() => {
        this.$refs["createForm"].resetFields();
      });
      this.createVisible = true;
    },
    handle_create() {},

    handleUpdate(obj) {
      this.createForm = {
        name: "public-charts",
        desc: "",
        type: "Local",
        storeAddress: "",
        userName: "",
        password: "",
        project: "allProject",
        codeAddress: "",
        catalog: "",
        specify: "",
      };
      this.title = `更新 ${obj.name}`;
      this.createVisible = true;
    },
    handle_update() {},

    handleDelete(obj) {
      this.deleteTitle = obj.name;
      this.deleteVisible = true;
    },
    handle_delete() {},

    handleCommand(val) {
      if (this.command == this.deleteTitle) {
        this.deleteDisable = false;
      } else {
        this.deleteDisable = true;
      }
    },
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
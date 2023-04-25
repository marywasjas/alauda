<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleDomain('创建域名')"
            >创建域名</el-button
          >
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按域名搜索"
            size="small"
            class="margin-right10"
            @keyup.enter.native="handleSearch"
            v-model="searchValue"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="handleRefresh"
          />
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
                <span @click="handelDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleDomain('更新域名')">
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

    <el-dialog
      :title="title"
      @close="domainVisible = false"
      :visible.sync="domainVisible"
      width="60%"
    >
      <el-form
        ref="domainForm"
        :model="domainForm"
        :rules="domainRules"
        label-width="135px"
      >
        <el-form-item label="域名">
          <span v-if="title == '更新域名'">{{ domainForm.domainName }} </span>
          <el-input v-else v-model="domainForm.domainName" style="width: 80%" />
        </el-form-item>

        <el-form-item label="分配集群">
          <el-select
            v-model="domainForm.cluster"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in clusterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分配项目" prop="project">
          <el-select
            v-model="domainForm.project"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in [
                { value: 'all', label: '所有项目' },
                { value: 'baas', label: 'baas(云信)' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="证书">
          <el-switch v-model="domainForm.cert"></el-switch>
        </el-form-item>

        <el-form-item label="公钥" prop="public" v-if="domainForm.cert == true">
          <el-input
            v-model="domainForm.public"
            type="textarea"
            :rows="4"
          ></el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" style="color: #409eff">导入</i>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="私钥"
          prop="private"
          v-if="domainForm.cert == true"
        >
          <el-input
            v-model="domainForm.private"
            type="textarea"
            :rows="4"
          ></el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" style="color: #409eff">导入</i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          {{ this.title == "创建域名" ? "创建" : "更新" }}
        </el-button>
        <el-button @click="domainVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <delete-remove-dialog
      :formVisible="formVisible"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
      width="35%"
      :titleContext="`确定删除域名 &quot;${name}&quot; 吗？`"
      deleteOrRemove="删除"
    />
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "ClusterList",
  components: { DeleteRemoveDialog },
  data() {
    return {
      name: "",
      searchValue: "",

      tableData,
      tableColumnList,
      
      title: "",

      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],

      domainVisible: false,

      domainForm: {
        domainName: "",
        cluster: "",
        project: "",
        cert: false,
        private: "",
        public: "",
      },

      domainRules: {
        project: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        private: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        public: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      formVisible: false,
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
    // 搜索
    handleSearch() {},
    handleRefresh() {},

    handelDetail(row) {
      this.$router.push({
        path: "/network-management/domain/detail",
        query: { name: row.name },
      });
    },

    handleDomain(title) {
      this.title = title;
      this.domainVisible = true;
      if (this.title == "更新域名") {
        this.domainForm = {
          ...this.domainForm,
          domainName: "*.d.ebchina.com",
          cluster: "region(region)",
          project: "all",
          cert: false,
        };
      } else {
        this.domainForm = this.$options.data().domainForm;
      }
    },

    handleSubmit() {},

    handleDelete(obj) {
      this.formVisible = true;
      this.name = obj.name;
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
</style>

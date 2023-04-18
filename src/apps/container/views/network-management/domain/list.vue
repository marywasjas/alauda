<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">创建域名</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按域名搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
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
                <span @click="handelDetails(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
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

    <el-dialog
      title="创建域名"
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
        <el-form-item label="类型">
          <el-radio-group v-model="createForm.type">
            <el-radio-button label="全域名"></el-radio-button>
            <el-radio-button label="泛域名"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="域名" v-if="createForm.type == '全域名'">
          <el-input
            v-model="createForm.domainName"
            style="width: 80%"
          ></el-input>
        </el-form-item>

        <el-form-item label="域名" v-if="createForm.type == '泛域名'">
          <el-input v-model="createForm.domainName" style="width: 80%"
            ><template slot="prepend">*.</template>
          </el-input>
        </el-form-item>

        <el-form-item label="分配集群">
          <el-select
            v-model="createForm.cluster"
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

        <el-form-item label="证书">
          <el-switch v-model="createForm.cert"></el-switch>
        </el-form-item>

        <el-form-item label="公钥" v-if="createForm.cert == true">
          <el-input
            v-model="createForm.public"
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

        <el-form-item label="私钥" v-if="createForm.cert == true">
          <el-input
            v-model="createForm.private"
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
        <el-button type="primary" @click="handle_create">创建</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="更新域名"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
      width="60%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        :rules="updateRules"
        label-width="135px"
      >
        <el-form-item label="域名"> {{ updateForm.domainName }} </el-form-item>

        <el-form-item label="分配集群">
          <el-select
            v-model="updateForm.cluster"
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

        <el-form-item label="分配项目">
          <el-select
            v-model="updateForm.project"
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

        <el-form-item label="证书">
          <el-switch v-model="updateForm.cert"></el-switch>
        </el-form-item>

        <el-form-item label="公钥" v-if="updateForm.cert == true">
          <el-input
            v-model="updateForm.public"
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

        <el-form-item label="私钥" v-if="updateForm.cert == true">
          <el-input
            v-model="updateForm.private"
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
        <el-button type="primary" @click="handle_update"> 更新 </el-button>
        <el-button @click="updateVisible = false">取消</el-button>
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
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定删除域名"${name}"吗` }}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 删除 </el-button>
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";

export default {
  name: "ClusterList",
  data() {
    return {
      name: "",
      tableData,
      tableColumnList,
      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],
      updateVisible: false,
      updateForm: {
        domainName: "",
        cluster: "",
        project: "",
        cert: false,
      },
      updateRules: {},

      dialogDeleteVisible: false,
      createVisible: false,
      createForm: {
        type: "全域名",
        domainName: "",
        cluster: "",
        project: "",
        cert: false,
      },
      createRules: {},
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
    onSearch() {
      console.log(this.formInline);
    },

    handelDetails(row) {
      this.$router.push({
        path: "/network-management/domain/detail",
        query: { name: row.name },
      });
    },

    handelCreate() {
      this.createVisible = true;
    },
    handle_create() {},

    handleUpdate(obj) {
      this.updateVisible = true;
      this.updateForm.domainName = obj.name;
      this.updateForm.cluster = obj.cluster;
      this.updateForm.project = obj.project;
    },

    handle_update() {},

    handleDelete(obj) {
      this.dialogDeleteVisible = true;
      this.name = obj.name;
    },

    handle_delete() {},
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

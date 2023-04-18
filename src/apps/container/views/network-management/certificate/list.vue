<template>
  <div class="oam-container">
    <line-alert
      content='管理员可以在这里对证书进行统一管理，并把证书分配给项目使用。拥有相应项目权限的用户可以在"入站规则"或"负载均衡"中使用这些证书。'
    />

    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">创建集群</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
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
                <span @click="handelDetails(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'total'">
                <!-- <p class="margin0"> -->
                <i class="el-icon-cpu primary2-text" />
                {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                <!-- </p>
                <p class="margin0"> -->
                <i class="el-icon-bank-card primary-text" />
                {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                <!-- </p> -->
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleCapacityExpansion(scope.row)"
                      >Kubectl 工具</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="handleDelete(scope.row)"
                      >删除</el-dropdown-item
                    >
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
        <el-form-item label="名称">
          <el-input v-model="createForm.name" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="显示名称">
          <el-input v-model="createForm.showName" style="width: 80%">
          </el-input>
        </el-form-item>

        <el-form-item label="分配项目">
          <el-radio-group v-model="createForm.project">
            <el-radio-button label="所有项目"></el-radio-button>
            <el-radio-button label="指定项目"></el-radio-button>
            <el-radio-button label="不分配"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="指定项目" v-if="createForm.project == '指定项目'">
          <el-select
            v-model="createForm.specifiedProject"
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

        <el-form-item label="公钥">
          <el-input v-model="createForm.public" type="textarea" :rows="4">
          </el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" style="color: #409eff">导入</i>
          </el-upload>
        </el-form-item>

        <el-form-item label="私钥">
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
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import { tableData, tableColumnList } from "./constant";

export default {
  name: "ClusterList",
  components: { LineAlert },
  data() {
    return {
      tableData,
      tableColumnList,
      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],
      createVisible: false,
      createForm: {
        name: "",
        showName: "",
        project: "所有项目",
        specifiedProject: "",
        public: "",
        private: "",
      },
      createRules: {},
    };
  },

  created() {
    // 获取列表数据
    // this.getList();
  },

  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline);
    },

    handelCreate() {
      this.createVisible = true;
    },
    handle_create() {},
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
</style>
<template>
  <div class="oam-container">
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
            {{ $t("创建命名空间") }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item split-button>导入命名空间</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 230px; margin: 0 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按名称搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
          </el-input>
          <el-button icon="el-icon-refresh-right" />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div style="margin-top: 25px">
        <span style="margin-right: 15px">集群:</span>

        <el-tag
          effect="plain"
          color="	#F0F8FF"
          size="small"
          style="cursor: pointer; border-radius: 10px; border: transparent"
          >region (region)</el-tag
        >
      </div>

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
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span
                    @click="handleUserDetail(scope.row)"
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
                    <el-dropdown-item @click.native="handleResource(scope.row)">
                      更新资源配置
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleLimit(scope.row)">
                      更新容器限额
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
        title="更新资源配额"
        @close="resourceVisible = false"
        :visible.sync="resourceVisible"
        width="60%"
      >
        <el-form
          ref="resourceForm"
          :model="resourceForm"
          :rules="resourceRules"
          label-width="135px"
        >
          <el-form-item label="命名空间名称">
            <el-col :span="18">
              <span>{{ resource }}</span>
            </el-col>
          </el-form-item>

          <el-form-item label="CPU">
            <el-col :span="18">
              <el-input v-model="resourceForm.cpu">
                <template slot="append">核</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="内存">
            <el-col :span="18">
              <el-input v-model="resourceForm.memory">
                <template slot="append">Gi</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="存储">
            <el-col :span="18">
              <el-input v-model="resourceForm.storage">
                <template slot="append">Gi</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="Pods 数">
            <el-col :span="18">
              <el-input v-model="resourceForm.pods"> </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 最大值 1000 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="PVC 数">
            <el-col :span="18">
              <el-input v-model="resourceForm.pvc"> </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleUpdate">更新</el-button>
          <el-button @click="resourceVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="更新容器限额"
        @close="limitVisible = false"
        :visible.sync="limitVisible"
        width="60%"
      >
        <el-form
          ref="limitForm"
          :model="limitForm"
          :rules="limitRules"
          label-width="135px"
        >
          <!-- <el-form-item label="CPU" prop="cpu">
            <el-col :span="10">
              <el-input v-model="limitForm.cpu">
                <template slot="append">m</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-col>
            <el-col :span="10" style="margin-left: 10px">
              <el-input v-model="limitForm.cpu">
                <template slot="append">m</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-col>
          </el-form-item> -->

          <!-- <el-form-item label="内存" prop="memory">
            <el-col :span="10">
              <el-input v-model="limitForm.memory">
                <template slot="append">Mi</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-col>
            <el-col :span="10" style="margin-left: 10px">
              <el-input v-model="limitForm.memory">
                <template slot="append">Mi</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-col>
          </el-form-item> -->

          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="CPU" prop="cpu">
                <el-input v-model="limitForm.cpuMax">
                  <template slot="append">m</template>
                  <template slot="prepend">最大值</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="13" style="margin-left: -145px">
              <el-form-item prop="clusterPort">
                <el-input v-model="limitForm.cpuDefault">
                  <template slot="append">m</template>
                  <template slot="prepend">默认值</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="内存" prop="memory">
                <el-input v-model="limitForm.memoryMax">
                  <template slot="append">m</template>
                  <template slot="prepend">最大值</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="13" style="margin-left: -145px">
              <el-form-item prop="clusterPort">
                <el-input v-model="limitForm.memoryDefault">
                  <template slot="append">m</template>
                  <template slot="prepend">默认值</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleUpdate">更新</el-button>
          <el-button @click="limitVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "UserList",
  components: {
    LineAlert,
    FoldableBlock,
  },
  data() {
    return {
      resource: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      typeValue: "",

      tableData,
      tableColumnList,

      resourceVisible: false,
      resourceForm: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },
      resourceRules: {},

      limitForm: {
        cpuMax: "",
        memoryMax: "",
        cpuDefault: "",
        memoryDefault: "",
      },
      limitRules: {
        cpu: [{ required: true, message: "cpu is required", trigger: "blur" }],
        memory: [
          { required: true, message: "memory is required", trigger: "blur" },
        ],
      },

      limitVisible: false,
    };
  },

  created() {},
  methods: {
    handleClick() {
      this.$router.push({
        path: "/project-list/namespace/import",
      });
    },
    openDialog() {
      this.$router.push({
        path: "/project-list/namespace/create",
      });
    },
    getList() {},
    handleStatusChange() {},
 
    handleUserDetail(obj) {
      console.log(obj.name);
      this.$router.push({
        path: "/project-list/namespace/detail",
        query: { name: obj.name },
      });
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    handleResource(obj) {
      this.resourceVisible = true;
      this.resource = obj.name;
    },
    handleUpdate() {},

    handleLimit(obj) {
      this.limitVisible = true;
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
</style>
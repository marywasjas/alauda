<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <el-dropdown
          split-button
          type="primary"
          trigger="click"
          @command="handleClick"
          @click="openDialog"
        >
          {{ $t("创建告警策略") }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item split-button>模板创建告警策略</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-form :model="tabForm" label-width="75px" style="margin-top: 20px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="命名空间">
              <el-select v-model="tabForm.namespace">
                <el-option
                  v-for="con in namespaceOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="告警状态">
              <el-select v-model="tabForm.alarmStatus">
                <el-option
                  v-for="con in alarmStatusOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="静默状态">
              <el-select v-model="tabForm.silentStatus">
                <el-option
                  v-for="con in silentStatusOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-select v-model="tabForm.creator">
                <el-option
                  v-for="con in creatorOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="资源类型">
              <el-select v-model="tabForm.resourceType">
                <el-option
                  v-for="con in resourceOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="名称" style="width: 85%">
              <el-input
                v-model="tabForm.name"
                placeholder="按名称模糊搜索"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="float: right; margin-bottom: 20px">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
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
              <div v-if="col.id === 'name'" class="name-cell">
                <div>
                  <span
                    @click="handleUserDetail(scope.row)"
                    class="cursor-pointer"
                    style="font-size: 14px"
                  >
                    {{
                      scope.row[col.id].length > 12
                        ? scope.row[col.id].substring(0, 12) + "..."
                        : scope.row[col.id]
                    }}
                  </span>
                  <span style="font-size: 12px">
                    {{
                      scope.row.desc.length > 8
                        ? scope.row.desc.substring(0, 8) + "..."
                        : scope.row.desc
                    }}
                  </span>
                </div>
              </div>

              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleResource(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleLimit(scope.row)">
                      设置静默
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleLimit(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div v-else-if="col.id === 'notifyPolicy'">
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    <el-tag size="mini">
                      {{ scope.row[col.id] }}
                    </el-tag>
                  </div>
                  <el-tag size="mini" style="cursor: pointer">
                    {{ "..." }}
                  </el-tag>
                </el-tooltip>
              </div>

              <div v-else>
                {{ scope.row[col.id] == "" ? "-" : scope.row[col.id] }}
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

export default {
  name: "UserList",
  components: {
    LineAlert,
  },
  data() {
    return {
      tabForm: {
        namespace: "all",
        alarmStatus: "all",
        silentStatus: "all",
        creator: "all",
        resourceType: "all",
        name: "",
      },

      namespaceOptions: [
        { value: "all", label: "全部" },
        { value: "noUnder", label: "-(不在命名空间下)" },
        { value: "baas", label: "baas" },
        { value: "cart-manager", label: "cart-manager" },
        { value: "chaos", label: "chaos" },
        { value: "cpass-dev", label: "cpass-dev" },
        { value: "cpass-system", label: "cpass-system" },
      ],

      alarmStatusOptions: [
        { value: "all", label: "全部" },
        { value: "alarm", label: "告警" },
        { value: "processing", label: "处理中" },
        { value: "normal", label: "正常" },
      ],

      silentStatusOptions: [
        { value: "all", label: "全部" },
        { value: "silenting", label: "静默中" },
        { value: "pending", label: "等待中" },
      ],

      creatorOptions: [{ value: "all", label: "全部" }],

      resourceOptions: [
        { value: "all", label: "全部" },
        { value: "cluster", label: "集群" },
        { value: "node", label: "节点" },
        { value: "deploy", label: "部署" },
        { value: "daemon", label: "守护进程集" },
        { value: "stateReplica", label: "有状态副本集" },
        { value: "microservices", label: "微服务" },
      ],

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
        path: "/maintenance-center/alarm/alarmStrategy-create",
      });
    },
    openDialog() {
      this.$router.push({
        path: "/maintenance-center/alarm/alarmStrategy-create",
      });
    },
    handleSearch() {},
    handleReset() {},

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
.el-tag {
  border-radius: 6px;
  border: transparent;
}
</style>
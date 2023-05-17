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
                    @click="handleDetail(scope.row)"
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
                    <el-dropdown-item @click.native="handleUpdate(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleSilence(scope.row)">
                      设置静默
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div v-else-if="col.id === 'notifyPolicy'">
                <el-tooltip placement="left-start" effect="light">
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

              <div v-else-if="col.id === 'connectResource'">
                <el-tooltip placement="top" effect="dark">
                  <div slot="content">
                    {{ scope.row[col.id] }}
                  </div>
                  <span>
                    {{ scope.row[col.id] }}
                  </span>
                </el-tooltip>
              </div>

              <div v-else-if="col.id === 'alarmStatus'">
                {{
                  scope.row[col.id] == ""
                    ? "-"
                    : `${scope.row[col.id]} / ${scope.row[col.id]}`
                }}
                <el-tooltip placement="top" effect="light">
                  <div slot="content">
                    <el-table
                      :data="
                        Array(+scope.row.alarmStatus).fill(
                          scope.row.statusData[0]
                        )
                      "
                      style="width: 100%"
                    >
                      <el-table-column prop="rule" label="规则" width="500" />
                      <el-table-column prop="type" label="告警类型" />
                      <el-table-column prop="level" label="等级" />
                      <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                          <i
                            :class="
                              scope.row.state === '正常'
                                ? 'el-icon-success running'
                                : 'el-icon-warning stop'
                            "
                          />
                          <span>{{ scope.row.state }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-progress
                    :percentage="100"
                    status="success"
                    :show-text="false"
                  />
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

      <!-- 设置静默 -->
      <el-dialog
        title="设置静默"
        @close="silenceVisible = false"
        :visible.sync="silenceVisible"
        width="60%"
      >
        <el-form
          ref="silenceForm"
          :model="silenceForm"
          :rules="silenceRules"
          label-width="135px"
        >
          <el-form-item label="告警策略">
            <el-col :span="18">
              <span>{{ silenceForm.name }}</span>
            </el-col>
          </el-form-item>

          <el-form-item label="告警静默">
            <el-switch v-model="silenceForm.silence" />
          </el-form-item>

          <el-form-item label="静默时间" v-if="silenceForm.silence == true">
            <el-radio-group v-model="silenceForm.time">
              <el-radio label="last">永久</el-radio>
              <el-radio label="custom">自定义</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="silenceForm.time == 'custom'" prop="customTime">
            <el-date-picker
              v-model="silenceForm.customTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_set">设置</el-button>
          <el-button @click="silenceVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <!-- 删除 -->
      <delete-remove-dialog
        :formVisible="formVisible"
        deleteOrRemove="删除"
        width="45%"
        :titleContext="`确定删除告警策略 &quot;${instanceName}&quot; 吗？`"
        nodeText="删除后不可恢复。"
        v-on:closeFormDialog="closeFormDialog"
        v-on:submitForm="submitForm"
      />

      <!-- 模板创建 告警策略 -->
      <el-dialog
        title="模板创建告警策略"
        @close="tempCreateVisble = false"
        :visible.sync="tempCreateVisble"
        width="70%"
      >
        <el-form
          ref="tempCreateForm"
          :model="tempCreateForm"
          :rules="tempCreateRules"
          label-width="135px"
        >
          <el-form-item label="名称" prop="name">
            <el-col :span="20">
              <el-input
                v-model="tempCreateForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
              >
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称" prop="showname">
            <el-col :span="20">
              <el-input
                v-model="tempCreateForm.showname"
                placeholder="最多 64 个字符"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="模板名称" prop="tempname">
            <el-col :span="20">
              <el-select
                v-model="tempCreateForm.tempname"
                @focus="setMinWidthEmpty"
                multiple
                style="width: 100%"
              >
                <el-option
                  v-for="item in tempnameOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_tempCreate">创建</el-button>
          <el-button @click="tempCreateVisble = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import LineAlert from "@/apps/container/views/components/LineAlert";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "UserList",
  components: {
    LineAlert,
    DeleteRemoveDialog,
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

      tableData,
      tableColumnList,

      silenceVisible: false,
      silenceForm: {
        name: "",
        silence: false,
        time: "last",
        customTime: "",
      },
      silenceRules: {
        customTime: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
      },

      formVisible: false,
      instanceName: "",

      tempCreateVisble: false,
      tempCreateForm: {
        name: "",
        showname: "",
        tempname: "",
      },
      tempCreateRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        showname: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        tempname: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
      },

      tempnameOptions: [{ label: "alarm", value: "alarm" }],
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
    handleClick() {
      this.tempCreateForm = this.$options.data().tempCreateForm;
      this.$nextTick(() => {
        this.$refs["tempCreateForm"].resetFields();
      });
      this.tempCreateVisble = true;
    },

    handle_tempCreate() {},

    openDialog() {
      this.$router.push({
        path: "/maintenance-center/alarm/alarmStrategy-create",
      });
    },

    handleUpdate(obj) {
      this.$router.push({
        path: "/maintenance-center/alarm/alarmStrategy-create",
        query: { name: obj.name },
      });
    },

    handleSearch() {},
    handleReset() {},
    getList() {},

    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    handleSilence(obj) {
      this.silenceForm = this.$options.data().silenceForm;
      this.silenceForm.name = obj.name;
      this.silenceVisible = true;
    },
    handle_set() {},

    handleDelete(obj) {
      this.formVisible = true;
      this.instanceName = obj.name;
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleDetail(obj) {
      this.$router.push({
        path: "/maintenance-center/alarm/alarmStrategy-detail",
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
.el-tag {
  border-radius: 6px;
  border: transparent;
}
</style>
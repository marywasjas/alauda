<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <el-form :model="tabForm" label-width="75px">
        <el-row>
          <!-- 时间范围 -->
          <el-col :span="24">
            <el-form-item label="时间范围">
              <el-select
                v-model="tabForm.time"
                @focus="setMinWidthEmpty"
                style="width: 32%"
              >
                <el-option
                  v-for="con in timeOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源类型">
              <el-select
                v-model="tabForm.resourceType"
                @change="handleType"
                @focus="setMinWidthEmpty"
                style="width: 70%"
              >
                <el-option
                  v-for="con in resourceOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="集群" v-if="tabForm.resourceType != 'cluster'">
              <el-select
                v-model="tabForm.cluster"
                @focus="setMinWidthEmpty"
                style="width: 70%"
              >
                <el-option
                  v-for="con in clusterOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="命名空间"
              v-if="
                tabForm.resourceType != 'cluster' &&
                tabForm.resourceType != 'node'
              "
            >
              <el-select
                v-model="tabForm.namespace"
                @focus="setMinWidthEmpty"
                style="width: 70%"
              >
                <el-option
                  v-for="con in namespaceOptions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="告警策略">
              <el-select
                v-model="tabForm.alarmPolicy"
                @focus="setMinWidthEmpty"
                style="width: 70%"
              >
                <el-option
                  v-for="con in alarmPolicyOptions"
                  :key="con.label"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="flex-center">
          <el-form-item label="关联资源" style="margin-bottom: 10px; flex: 1">
            <el-input
              v-model="tabForm.resName"
              :placeholder="resNameHolder"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 10px; margin-left: 10px"
            label-width="0px"
          >
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无告警历史"
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
    </div>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import Mock from "mockjs";

export default {
  name: "UserList",
  components: {},
  data() {
    return {
      resourceHolder: "",

      tabForm: {
        time: "近1小时",
        resourceType: "cluster",
        cluster: "global",
        alarmPolicy: "all",
        resName: "",
      },

      namespaceOptions: [
        { value: "all", label: "全部" },
        { value: "baas", label: "baas" },
        { value: "cart-manager", label: "cart-manager" },
        { value: "chaos", label: "chaos" },
        { value: "cpass-dev", label: "cpass-dev" },
        { value: "cpass-system", label: "cpass-system" },
      ],

      timeOptions: [
        { label: "近30分钟", value: "近30分钟" },
        { label: "近1小时", value: "近1小时" },
        { label: "近6小时", value: "近6小时" },
        { label: "近1天", value: "近1天" },
        { label: "近3天", value: "近3天" },
        { label: "近7天", value: "近7天" },
        { label: "自定义时间", value: "自定义时间" },
      ],

      alarmPolicyOptions: [
        { value: "all", label: "全部" },
        {
          value: "cpass-cert-manager-rules",
          label: "cpass-cert-manager-rules",
        },
        { value: "cpass-kube-proxy-rules", label: "cpass-kube-proxy-rules" },
        {
          value: "cpass-prometheus-1-rules",
          label: "cpass-prometheus-1-rules",
        },
      ],

      clusterOptions: [
        { value: "all", label: "全部" },
        { value: "global", label: "global" },
        { value: "region", label: "region" },
      ],

      resourceOptions: [
        { value: "cluster", label: "集群" },
        { value: "node", label: "节点" },
        { value: "deploy", label: "部署" },
        { value: "daemon", label: "守护进程集" },
        { value: "stateReplica", label: "有状态副本集" },
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

      resNameHolder: "",
    };
  },

  created() {
    this.handleType();
  },
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
    handleReset() {},

    handleSizeChange(val) {
      this.page.size = val;
      // this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      // this.getList();
    },

    handleType() {
      let result = this.resourceOptions.filter((item) => {
        return item.value == this.tabForm.resourceType;
      });
      this.resNameHolder = `请输入 ${result[0].label} 名称`;
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
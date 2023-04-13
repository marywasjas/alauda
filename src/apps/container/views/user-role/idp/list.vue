<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleLDAP"> 添加 LDAP </el-button>
          <el-button type="primary" @click="handleOIDC"> 添加 OIDC </el-button>
        </span>
        <span>
          <el-button @click="handleStrategy" type="text">
            <i class="el-icon-s-tools" />
            LDAP 自动同步策略
          </el-button>
        </span>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无配置"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="true"
            :sortable="col.sortable"
            :width="col.width"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="name-cell">
                <i class="el-icon-menu" />
                <div>
                  <span
                    @click="handleRoleDetail(scope.row)"
                    class="cursor-pointer"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                  <span>{{ scope.row.detail }}</span>
                </div>
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
    </div>

    <el-dialog
      @close="synPolicyVisible = false"
      :visible.sync="synPolicyVisible"
      width="40%"
    >
      <el-form
        ref="updateLogForm"
        :model="updateLogForm"
        :rules="updateLogRules"
      >
        <el-form-item label="自动同步用户">
          <el-switch v-model="updateLogForm.logPolicy"></el-switch>
        </el-form-item>

        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            开启后，将自动同步所有 LDAP 用户到平台
          </el-descriptions-item>
        </el-descriptions>
        <el-form-item
          label="同步时间间隔"
          prop="logRemain"
          v-if="updateLogForm.logPolicy == true"
        >
          <el-select v-model="updateLogForm.logRemain">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleupdateLog">确定</el-button>
        <el-button @click="synPolicyVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { tableData, tableColumnList } from "./constant";
import { tableColumnList } from "./constant";

export default {
  name: "RoleList",
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "85px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tableData: {
        data: [],
      },
      tableColumnList,

      synPolicyVisible: false,
      updateLogForm: {
        logPolicy: false,
        logRemain: "1小时",
      },
      updateLogRules: {},
      timeOptions: [
        { label: "15分钟", value: "15分钟" },
        { label: "30分钟", value: "30分钟" },
        { label: "1小时", value: "1小时" },
        { label: "2小时", value: "2小时" },
        { label: "6小时", value: "6小时" },
        { label: "12小时", value: "12小时" },
        { label: "1天", value: "1天" },
        { label: "2天", value: "2天" },
        { label: "3天", value: "3天" },
        { label: "7天", value: "7天" },
      ],
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},
    cacheSelected() {},

    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    handleLDAP() {
      this.$router.push({
        name: "createLDAP",
      });
    },

    handleOIDC() {
      this.$router.push({
        name: "createOIDC",
      });
    },

    handleStrategy() {
      this.synPolicyVisible = true;
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
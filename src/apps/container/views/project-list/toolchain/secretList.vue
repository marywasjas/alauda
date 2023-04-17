<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="createSecret">创建凭证</el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 250px; margin-left: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按名称搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
          </el-input>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData3.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList3"
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
                  <span @click="handleDetail(scope.row)" class="cursor-pointer">
                    {{ scope.row[col.id] }}
                  </span>
                  <span>{{ scope.row.showName }}</span>
                </div>
              </div>

              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleUpdateName(scope.row)"
                    >
                      更新显示名称
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handleUpdateInfo(scope.row)"
                    >
                      更新数据信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleRemove(scope.row)">
                      <span style="color: red">删除</span>
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
        @close="removeDisable = false"
        :visible.sync="removeDisable"
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
            <i class="el-icon-warning" style="color: red" />
            {{ `确定删除 凭据"${removeRoleName}"吗？` }}
          </span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="handle_remove">删除</el-button>
          <el-button @click="removeDisable = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="更新显示名称"
        @close="updateName = false"
        :visible.sync="updateName"
        width="60%"
      >
        <div class="el-dialog-div">
          <el-form :model="nameForm" ref="nameForm" label-width="135px">
            <!-- <el-col :span="18"> -->
            <el-form-item label="显示名称" style="width: 80%">
              <el-input v-model="nameForm.showName"></el-input>
            </el-form-item>
            <!-- </el-col> -->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_update">更新</el-button>
          <el-button @click="updateName = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="更新显示名称"
        @close="updateInfo = false"
        :visible.sync="updateInfo"
        width="60%"
      >
        <line-alert
          content="更新数据信息会影响工具的访问权限以及已分配平台项目的使用，请谨慎更新。"
        />

        <div class="el-dialog-div">
          <el-form
            :model="infoForm"
            ref="infoForm"
            :rules="infoRules"
            label-width="135px"
          >
            <el-form-item label="显示名称" style="width: 80%">
              <!-- <el-input v-model="nameForm.showName"></el-input> -->
              <span>{{ infoForm.name }}</span>
            </el-form-item>

            <el-form-item label="工具类型" style="width: 80%">
              <!-- <el-input v-model="nameForm.showName"></el-input> -->
              <span>{{ infoForm.toolType }}</span>
            </el-form-item>

            <el-form-item label="类型" style="width: 80%">
              <!-- <el-input v-model="nameForm.showName"></el-input> -->
              <span>{{ infoForm.type }}</span>
            </el-form-item>

            <el-form-item label="用户名" style="width: 80%" prop="userName">
              <el-input v-model="infoForm.userName"></el-input>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item
                >请输入登录 GitLab 时使用的用户名</el-descriptions-item
              >
            </el-descriptions>

            <el-form-item label="令牌" style="width: 80%" prop="token">
              <el-input v-model="infoForm.token" show-password></el-input>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item
                >前往 GitLab 设置页面生成令牌</el-descriptions-item
              >
            </el-descriptions>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_update">更新</el-button>
          <el-button @click="updateInfo = false">取消</el-button>
        </div>
      </el-dialog>

      <el-drawer :visible.sync="drawer" direction="rtl" size="45%">
        <template slot="title">
          <span>{{ title }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdateName(detailObj)">
                  更新显示名称
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleUpdateInfo(detailObj)">
                  更新数据信息
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleRemove(detailObj)">
                  <span style="color: red">删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>

        <el-row :gutter="24" style="margin-left: 20px">
          <el-col :span="15">
            <el-descriptions title="用户信息" :column="1">
              <el-descriptions-item label="显示名称">
                {{ detailObj.showName }}
              </el-descriptions-item>
              <el-descriptions-item label="工具类型">
                {{ "GitLab" }}
              </el-descriptions-item>
              <el-descriptions-item label="显示名称">
                {{ detailObj.time }}
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="数据" :column="1" style="margin-top: 20px">
              <el-descriptions-item label="类型">
                {{ detailObj.type }}
              </el-descriptions-item>
              <el-descriptions-item label="数据">
                {{ "用户名、令牌" }}
                <i
                  class="el-icon-edit"
                  style="cursor: pointer; color: #409eff"
                  @click="handleUpdateInfo(detailObj)"
                />
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { tableColumnList3 } from "./constant";
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
      detailObj: "",
      title: "",
      drawer: false,
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
      batchVisible: false,
      selectedDevice: [],
      tableData3: {
        data: [
          {
            name: "18000664",
            type: "用户名/令牌",
            time: "2022-11-14",
            showName: "renaihua@ebchinatech.com",
          },
          {
            name: "baas-harbor",
            type: "用户名/密码",
            time: "2022-11-31",
            showName: "",
          },
        ],
      },
      tableColumnList3,
      statusOptions: [
        { value: "all", label: "全部" },
        { value: "normal", label: "未分组" },
      ],

      searchValue: "userName",
      typeValue: "",

      removeRoleName: "",
      removeDisable: false,

      updateName: false,
      nameForm: {
        showName: "",
      },

      updateInfo: false,
      infoForm: {
        name: "",
        toolType: "",
        type: "",
        userName: "",
        token: "",
      },
      infoRules: {
        userName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        token: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},

    createSecret() {
      this.$router.push({ path: "/project-list/toolchain/createSecret" });
    },

    handleSearchChange(e) {},
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    handleRemove(obj) {
      this.removeDisable = true;
      this.removeRoleName = obj.name;
    },
    handle_remove() {},

    handleUpdateName(obj) {
      this.updateName = true;
      this.nameForm.showName = obj.showName;
    },
    handle_update() {},

    handleUpdateInfo(obj) {
      this.updateInfo = true;
      this.infoForm.name = obj.name;
      this.infoForm.toolType = "GitLab";
      this.infoForm.type = obj.type;
    },
    handle_updateInfo() {},

    handleDetail(obj) {
      this.drawer = true;
      this.title = obj.name;
      this.detailObj = obj;
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
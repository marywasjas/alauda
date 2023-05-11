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
            style="width: 250px"
            placeholder="按名称搜索"
            v-model="typeValue"
            @keyup.enter.native="handleSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
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
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <div style="display: flex; flex: 1 1; align-items: center">
                  <div style="margin-right: 10px">
                    <i class="el-icon-picture" />
                  </div>
                  <div>
                    <div @click="handleDetail(scope.row)">
                      {{ scope.row[col.id] }}
                    </div>
                    <div style="font-size: 12px; color: gray">
                      {{ scope.row.showName }}
                    </div>
                  </div>
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
              text-align: start;
              display: block;
              font-size: 22px;
              line-height: 24px;
              font-weight: bold;
            "
          >
            <i class="el-icon-warning" style="color: red" />
            {{ `确定删除 凭据 "${removeRoleName}" 吗？` }}
          </span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="handle_remove">删除</el-button>
          <el-button @click="removeDisable = false">取消</el-button>
        </div>
      </el-dialog>

      <!--更新显示名称  -->
      <el-dialog
        title="更新显示名称"
        @close="updateNameVisible = false"
        :visible.sync="updateNameVisible"
        width="60%"
      >
        <div class="el-dialog-div">
          <el-form :model="nameForm" ref="nameForm" label-width="135px">
            <el-form-item label="显示名称" style="width: 80%">
              <el-input v-model="nameForm.showName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_update">更新</el-button>
          <el-button @click="updateNameVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <!-- 更新数据信息 -->
      <el-dialog
        title="更新数据信息"
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
              <span>{{ infoForm.name }}</span>
            </el-form-item>

            <el-form-item label="工具类型" style="width: 80%">
              <i class="el-icon-picture" />
              <span>{{ infoForm.toolType }}</span>
            </el-form-item>

            <el-form-item label="类型" style="width: 80%">
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
              <el-descriptions-item>
                请输入登录 {{ infoForm.toolType }} 时使用的用户名
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="令牌" style="width: 80%" prop="token">
              <el-input v-model="infoForm.token" show-password></el-input>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                前往 {{ infoForm.toolType }} 设置页面生成令牌
              </el-descriptions-item>
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
          <span style="font-size: 22px; color: rgba(50, 52, 55)">
            <i class="el-icon-picture" />
            {{ title }}
          </span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10" size="small">
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
          <section class="component-div">
            <span style="font-size: 17px"> 服务器配置 </span>
            <el-row :gutter="24" style="margin: 14px 0; margin-left: 20px">
              <el-col
                v-for="item in detailData"
                :key="item.label"
                :span="24"
                style="font-size: 14px; margin-bottom: 15px"
              >
                <span> {{ item.label }} </span>: &nbsp;&nbsp;
                <span>
                  {{ item.value ? item.value : "-" }}
                </span>
              </el-col>
            </el-row>
            <span style="font-size: 17px"> 数据 </span>
            <el-row :gutter="24" style="margin: 14px 0; margin-left: 20px">
              <el-col
                v-for="item in detailResData"
                :key="item.label"
                :span="24"
                style="font-size: 14px; margin-bottom: 15px"
              >
                <span> {{ item.label }} </span>: &nbsp;&nbsp;
                <span>
                  {{ item.value ? item.value : "-" }}
                  <i
                    :class="item.afterIcon"
                    style="cursor: pointer; color: #409eff"
                    @click="handleUpdateInfo(detailObj)"
                  />
                </span>
              </el-col>
            </el-row>
          </section>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "UserList",
  components: { LineAlert, FoldableBlock },
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
      tableColumnList3: [
        {
          id: "name",
          label: "凭据名称",
          sortable: true,
        },
        {
          id: "type",
          label: "类型",
        },
        {
          id: "time",
          label: "创建时间",
          sortable: true,
        },
        {
          id: "operation",
          label: "",
          width: "60px",
          fixed: "right",
        },
      ],

      detailData: [
        {
          label: "显示名称",
          value: "msg-server001",
        },
        {
          label: "工具类型",
          value: "GitLab",
        },
        {
          label: "创建时间",
          value: "2023-05-04 16:35:41",
        },
      ],

      detailResData: [
        {
          label: "类型",
          value: "用户名/令牌",
        },
        {
          label: "数据信息",
          value: "用户名、令牌",
          afterIcon: "el-icon-edit",
        },
      ],

      typeValue: "",

      removeRoleName: "",
      removeDisable: false,

      updateNameVisible: false,
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
    handleSearch() {},

    createSecret() {
      this.$router.push({ path: "/project-list/toolchain/createSecret" });
    },

    handleSizeChange(val) {
      this.page.size = val;
      this.handleSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.handleSearch();
    },

    // 删除
    handleRemove(obj) {
      this.removeDisable = true;
      this.removeRoleName = obj.name;
    },
    // 确定删除
    handle_remove() {},

    // 更新显示名称
    handleUpdateName(obj) {
      this.updateNameVisible = true;
      this.nameForm.showName = obj.showName;
    },
    // 确定更新
    handle_update() {},

    handleUpdateInfo(obj) {
      this.infoForm = this.$options.data().infoForm;
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
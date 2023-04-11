<template>
  <div class="create-container">
    <BaseCard style="margin-top: 20px">
      <header>
        <div class="card-title">
          <span>{{ roleName }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="copyNewRole">
                  复制为新角色
                </el-dropdown-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="不允许管理系统角色"
                  placement="left-start"
                >
                  <div>
                    <el-dropdown-item :disabled="true">
                      更新基本信息
                    </el-dropdown-item>
                  </div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="不允许管理系统角色"
                  placement="left-start"
                >
                  <div>
                    <el-dropdown-item :disabled="true">
                      删除角色
                    </el-dropdown-item>
                  </div>
                </el-tooltip>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span> {{ item.value }} </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <div class="container margin-top event-container">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        "
      >
        <div style="font-size: 22px; line-height: 24px; font-weight: bold">
          权限
        </div>
        <div>
          <el-tooltip
            class="item"
            effect="dark"
            content="不允许管理系统角色"
            placement="left-start"
          >
            <div>
              <el-button :disabled="true">管理权限</el-button>
            </div>
          </el-tooltip>
        </div>
      </div>

      <div>
        <div class="event-list-wrapper">
          <div v-for="item in divData" :key="item.id" class="event-card">
            <div class="card-header">
              <div class="resource">
                <el-row>
                  <el-col>
                    <foldable-block :btn-tex="item.label">
                      <BaseCard>
                        <section class="component-div">
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
                              :show-overflow-tooltip="true"
                              :sortable="col.sortable"
                              :width="col.width"
                              :fixed="col.fixed"
                            >
                              <template slot-scope="scope">
                                <div>
                                  {{ scope.row[col.id] }}
                                </div>
                              </template>
                            </el-table-column>
                          </el-table>
                        </section>
                      </BaseCard>
                    </foldable-block>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  tableColumnList,
  tableData,
  tableColumnList2,
  tableData2,
  tableColumnList3,
} from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";
import Mock from "mockjs";

export default {
  name: "Node",
  components: { FoldableBlock },
  props: {},
  data() {
    return {
      divData: [
        { id: 1, label: "视图", children: [] },
        { id: 2, label: "平台管理", children: [] },
        { id: 3, label: "项目管理", children: [] },
        { id: 4, label: "Container Platform", children: [] },
        { id: 5, label: "DevOps", children: [] },
        { id: 6, label: "Service Mesh", children: [] },
        { id: 7, label: "数据服务", children: [] },
      ],

      baseInfoData: [
        {
          label: "显示名称",
          value: "平台管理员",
        },
        {
          label: "类型",
          value: "平台角色",
        },
        {
          label: "属性",
          value: "系统",
        },
        {
          label: "创建人",
          value: "system",
        },
        {
          label: "描述",
          value: "具备平台所有业务及资源的全部权限",
        },
        {
          label: "创建时间",
          value: "2023-02-15 15:41:56",
        },
      ],

      roleName: "",

      page: {
        count: 1,
        current: 1,
        size: 20,
      },

      batchVisible: true,
      selectedDevice: [],

      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
      searchValue: "userName",
      typeValue: "",

      statusOptions: [
        { value: "all", label: "全部" },
        { value: "devGroup", label: "未分组" },
      ],
      statusValue: "all",

      tableData,
      tableColumnList,
      tableColumnList2,
      tableData2,
      tableColumnList3,
      tableData3: {
        data: [
          {
            func: "平台管理视图",
            view: "√",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "项目管理视图",
            view: "√",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "Container Platform 视图",
            view: "√",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "DevOps 视图",
            view: "√",
            create: "",
            update: "",
            delete: "",
          },
          {
            func: "Service Mesh 视图",
            view: "√",
            create: "",
            update: "",
            delete: "",
          },
          { func: "功能开关", view: "√", create: "", update: "", delete: "" },
          { func: "Portal", view: "√", create: "", update: "", delete: "" },
        ],
      },

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      importMemVisible: false,
      removeDisable: false,
      allMemberVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.roleName = this.$route.query.name;
  },
  mounted() {},
  methods: {
    //这里回调 设置每行的样式
    rowClass() {
      // return 'background:#E6F1FF;color:#368CFF;font-size:13px'
      return " border-top: 1px solid #C0C4CC;border-bottom: 1px solid #C0C4CC; background: white; padding:0 10px";
    },
    headClass() {
      return " color: #C0C4CC ;border-top: 1px solid #C0C4CC;border-bottom: 1px solid #C0C4CC; background: #C0C4CC;";
    },
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    getList() {},
    handleStatusChange() {},
    handleSearchChange(e) {},

    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    copyNewRole() {
      this.$router.push({
        // path: "/user-role-management/role/create/createCopy",
        name: "RoleCreateCopy",
        query: { copy_name: this.roleName },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container {
  // padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .fixed-div {
    width: calc(100% - 250px);
    // width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
  .el-row {
    margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .row-bg {
    padding: 0;
    background-color: #f9fafc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .bg-purple {
    background: #fff;
    padding: 10px;
    margin: 10px;
  }
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
// ::v-deep .el-table__body {
//   border-collapse: separate;
//   border-spacing: 0 20px;
// }

// ::v-deep table tr {
//   height: 55px;
// }

// ::v-deep .el-table,
// .el-table__expanded-cell {
//   background-color: blue;
//   background-color: transparent; //这是设置透明背景色
// }

.event-container {
  .event-list-wrapper {
    margin-top: 10px;
    .event-card {
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border: 1px solid $border-color-one;
      .card-header {
        box-sizing: border-box;
      }
      .text {
        color: $font-color-title;
        font-weight: bold;
      }
      .number,
      .time {
        color: $font-color-text;
        font-size: $font-size-14;
      }
      .circle {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $color-primary;
        margin-right: 8px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>


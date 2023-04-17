<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ name }}</span>
        </div>
        <div style="float: right; margin-top: -35px">
          <el-dropdown trigger="click">
            <el-button class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdateInfo">
                更新集成信息
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleDeleteProject">
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
            <span v-if="item.label === '状态'">
              <i
                :class="
                  item.value === '正常'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
                style="color: #67c23a"
              />
              <span> {{ item.value }} </span>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="update(item)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>项目列表</span>
              <div style="float: right">
                <el-input
                  v-model="searchName"
                  suffix-icon="el-icon-search"
                  placeholder="按工具项目名称搜索"
                >
                </el-input>
              </div>
            </div>
          </header>
          <section class="component-div">
            <el-table
              :data="table.tableData"
              style="width: 100%"
              header-row-class-name="headerStyle"
              class="margin-top"
            >
              <el-table-column
                v-for="col in table.cols"
                :key="col.id"
                :label="col.label"
                :show-overflow-tooltip="true"
                :sortable="col.sortable"
                :width="col.width"
                :fixed="col.fixed"
              >
                <template slot-scope="scope">
                  <div v-if="col.id === 'operation'" class="operation-cell">
                    <el-dropdown>
                      <i class="el-icon-more" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>关联 / 取消项目</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div v-else>
                    {{ scope.row[col.id] }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </BaseCard>
      </el-col>
    </el-row>

    <!-- 删除项目 -->
    <el-dialog
      @close="deleteProjectVisible = false"
      :visible.sync="deleteProjectVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除工具
        </span>
      </div>

      <div style="margin-bottom: 10px">
        确定删除工具 "{{ name }}"
        吗？删除后项目下所有使用该工具的资源将无法使用。
      </div>
      <!-- <div class="inputInfo copy_icon">
        <el-input v-model="command" style="width: 95%"> </el-input>
        <i
          style="margin-left: 10px; cursor: pointer"
          class="el-icon-document-copy"
        ></i>
      </div> -->

      <div style="margin-top: 10px">
        请输入 <span style="color: red">{{ name }}</span> 确定删除
      </div>

      <el-input v-model="command"> </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_removeCluster">删除</el-button>
        <el-button @click="deleteProjectVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 更新基本信息 -->
    <el-dialog
      title="更新集成信息"
      @close="updateInfoVisible = false"
      :visible.sync="updateInfoVisible"
      width="60%"
    >
      <el-form
        ref="updateInfoForm"
        :model="updateInfoForm"
        :rules="updateInfoRules"
        label-width="135px"
      >
        <el-form-item label="集成名称" prop="name">
          {{ name }}
        </el-form-item>

        <el-form-item label="访问地址">
          <el-input v-model="updateInfoForm.address" />
        </el-form-item>

        <el-form-item label="API 地址" prop="apiAddress">
          <el-input v-model="updateInfoForm.apiAddress" />
        </el-form-item>

        <el-form-item label="凭据" prop="secret" style="width: 50%">
          <!-- <el-input v-model="inteForm.secret" /> -->
          <el-select
            v-model="updateInfoForm.secret"
            @change="handleSecretChange"
            style="width: 75%"
            size="small"
            placeholder="请选择凭证"
          >
            <!-- 其他工具类型凭据 -->
            <el-option
              v-for="item in secretOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            size="small"
            style="margin-left: 15px"
            @click="handleAddSecret"
          >
            添加凭证
          </el-button>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handle_updateInfo">更新</el-button>
        <el-button @click="updateInfoVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  props: {},
  data() {
    return {
      command: "",
      searchName: "",
      secretOptions: [
        { value: "18000664", label: "18000664" },
        { value: "baas-harbor", label: "baas-harbor" },
      ],
      rowCenter_project: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "-10px",
        "margin-top": "2px",
        color: "#A9A9A9",
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
      title: "",
      updateInfoVisible: false,
      updateInfoForm: {
        address: "http://regdev.ebchina.com/",
        APIaddress: "http://regdev.ebchina.com/",
        secret: "baas-harbor",
      },
      updateInfoRules: {},
      deleteProjectVisible: false,

      baseInfoData: [
        {
          label: "类型",
          value: "持续集成 / Jenkins",
        },
        {
          label: "集成时间",
          value: "2022-11-14 17:02:11",
        },
        {
          label: "访问地址",
          value: "",
        },
        {
          label: "API 地址",
          value: "http://25.2.20.108:32001",
        },
      ],
      table: {
        tableData: [
          // {
          //   roleName: "CPU",
          //   quota: "不限制",
          //   usage: "- (0.32 核 / 不限制)",
          //   disrate: "- (- / 不限制)",
          // },
        ],
        cols: [
          { label: "工具项目名称", id: "toolName" },
          { label: "访问级别", id: "viewLevel" },
          { label: "是否已关联", id: "relation" },
          {
            id: "operation",
            label: "",
            width: "60px",
            fixed: "right",
          },
        ],
      },

      addSecretVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.name = this.$route.query.name;
  },
  mounted() {},
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

    handle_removeCluster() {},
    handleDeleteProject() {
      this.deleteProjectVisible = true;
    },
    handleUpdateInfo() {
      this.updateInfoVisible = true;
    },
    handle_updateInfo() {},

    handleAddSecret() {
      this.addSecretVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
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
// .container-top-left {
//   width: 32%;
//   height: 250px;
//   border-right: 1px solid $border-color-one;
//   padding-right: 20px;
//   display: flex;
//   align-items: center;
//   .chart {
//     height: 200px !important;
//   }
// }
// .container-top-right {
//   flex: 1;
//   height: 250px;
//   .el-select {
//     margin-bottom: 20px;
//   }
//   .chart {
//     height: 200px !important;
//   }
//   .el-divider--vertical {
//     display: inline-block;
//     width: 1px;
//     height: 100%; //更改竖向分割线长度
//     margin: 0 8px;
//     vertical-align: middle;
//     position: relative;
//   }
// }
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
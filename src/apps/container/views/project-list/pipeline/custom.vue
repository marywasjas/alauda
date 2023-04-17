<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ "自定义模板配置" }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="true">
                  同步模板仓库
                </el-dropdown-item>
                <el-dropdown-item @click.native="configStore">
                  配置模板仓库
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section>
        <div style="text-align: 'center'">
          <span>
            您可以
            <el-button type="text" @click="configStore">配置模板仓库</el-button>
            ，导入您项目的专属流水线模板
          </span>
        </div>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <el-tabs v-model="activeName">
            <el-tab-pane label="项目自定义模板" name="1">
              <div class="card__header">
                <div style="text-align: right">
                  <el-input
                    style="width: 200px"
                    suffix-icon="el-icon-search"
                    clearable
                    placeholder="请输入模板名称"
                    v-model="typeValue"
                    @keyup.enter.native="getList"
                  >
                  </el-input>
                </div>
              </div>

              <section class="component-div">
                <el-table
                  :data="table.tableData"
                  style="width: 100%"
                  header-row-class-name="headerStyle"
                  class="margin-top"
                  empty-text="无项目自定义模板"
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
                      <div>
                        {{ scope.row[col.id] }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </el-tab-pane>

            <el-tab-pane label="项目自定义任务" name="2">
              <div class="card__header">
                <div style="text-align: right">
                  <el-input
                    style="width: 200px"
                    suffix-icon="el-icon-search"
                    clearable
                    placeholder="请输入任务名称"
                    v-model="typeValue2"
                    @keyup.enter.native="getList"
                  >
                  </el-input>
                </div>
              </div>

              <section class="component-div">
                <el-table
                  :data="table2.tableData"
                  style="width: 100%"
                  header-row-class-name="headerStyle"
                  class="margin-top"
                  empty-text="无项目自定义任务"
                >
                  <el-table-column
                    v-for="col in table2.cols"
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
            </el-tab-pane>
          </el-tabs>
        </BaseCard>
      </el-col>
    </el-row>

    <el-dialog
      title="配置模板仓库"
      @close="configStoreVisible = false"
      :visible.sync="configStoreVisible"
      width="60%"
    >
      <div>
        <el-form
          :model="configForm"
          ref="configForm"
          :rules="configRules"
          label-width="135px"
        >
          <el-form-item label="方式" style="width: 80%">
            <el-radio-group v-model="configForm.method">
              <el-radio-button label="选择"></el-radio-button>
              <el-radio-button label="输入"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="集成项目名称"
            style="width: 80%"
            v-if="configForm.method == '选择'"
            prop="name"
          >
            <el-input v-model="configForm.name"></el-input>
          </el-form-item>

          <el-form-item
            label="代码仓库"
            v-if="configForm.method == '选择'"
            prop="codeStore"
          >
            <el-select
              v-model="configForm.codeStore"
              @focus="setMinWidthEmpty"
              style="width: 75%"
            >
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="代码分支"
            v-if="configForm.method == '选择'"
            prop="codeBranch"
          >
            <el-select
              v-model="configForm.codeBranch"
              @focus="setMinWidthEmpty"
              style="width: 75%"
            >
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="代码仓库地址"
            style="width: 80%"
            v-if="configForm.method == '输入'"
            prop="codeAddress"
          >
            <el-input
              v-model="configForm.codeAddress"
              placeholder="支持 HTTP/HTTPS 地址形式"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="代码分支"
            style="width: 80%"
            v-if="configForm.method == '输入'"
            prop="codeBranch"
          >
            <el-input v-model="configForm.codeBranch"></el-input>
          </el-form-item>

          <el-form-item
            label="凭据"
            v-if="configForm.method == '输入'"
            prop="secret"
          >
            <el-input
              v-model="configForm.secret"
              @focus="setMinWidthEmpty"
              style="width: 55%"
            ></el-input>
            <el-button style="margin-left: 30px">添加凭据</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfig">确定</el-button>
        <el-button @click="configStoreVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";
// import ProgressCard from "./components/ProgressCard.vue";

export default {
  name: "BaseInfo",
  // components: { LineAlert, ProgressCard },
  props: {},
  data() {
    return {
      activeName: "1",
      typeValue: "",
      typeValue2: "",
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

      table: {
        tableData: [],
        cols: [
          { label: "显示名称", id: "showName" },
          { label: "版本", id: "version" },
          { label: "标签", id: "label" },
          { label: "阶段图", id: "img" },
        ],
      },

      table2: {
        tableData: [],
        cols: [
          { label: "显示名称", id: "showName" },
          { label: "版本", id: "version" },
          { label: "类型", id: "type" },
          { label: "描述", id: "desc" },
        ],
      },

      configStoreVisible: false,

      configForm: {
        method: "选择",
        name: "",
        codeStore: "",
        codeBranch: "",
        codeAddress: "",
        secret: "",
      },

      configRules: {
        name: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        codeStore: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        codeBranch: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        codeAddress: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        secret: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
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

    handleChange() {},

    configStore() {
      this.configStoreVisible = true;
    },
    handleConfig() {},
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
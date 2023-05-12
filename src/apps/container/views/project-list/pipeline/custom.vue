<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ "自定义模板配置" }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button type="primary">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :disabled="syncDisable"
                  @click.native="syncStore"
                >
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

      <section v-if="!syncDisable">
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label == '模板仓库地址'">
              <span class="cursor-pointer">{{ item.value }}</span>
            </span>
            <span v-else-if="item.label == '同步结果'">
              <span>
                <i
                  :class="syncRes"
                  :style="{
                    color: syncRes == 'el-icon-error' ? '#F56C6C' : '#409EFF',
                  }"
                />
                <span v-if="syncRes == 'el-icon-loading'">
                  {{ (item.value = "模板仓库同步中...") }}
                </span>

                <span v-if="syncRes == 'el-icon-error'">
                  {{ (item.value = "失败") }}
                </span>
              </span>
            </span>
            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>

      <section v-else>
        <div class="contentStyle">
          <span style="font-size: 14px">
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
                    style="width: 250px"
                    clearable
                    placeholder="请输入模板名称"
                    v-model="typeValue"
                    @keyup.enter.native="getList"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getList"
                    />
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
                    style="width: 250px"
                    clearable
                    placeholder="请输入任务名称"
                    v-model="typeValue2"
                    @keyup.enter.native="getList"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getList"
                    />
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
          ref="configForm"
          :model="configForm"
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
            v-if="configForm.method == '选择'"
            label="集成项目名称"
            prop="name"
          >
            <el-select
              clearable
              v-model="configForm.name"
              @focus="setMinWidthEmpty"
              style="width: 75%"
            >
              <el-option
                v-for="item in nameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="configForm.method == '选择'"
            label="代码仓库"
            prop="codeStore"
          >
            <el-select
              clearable
              v-model="configForm.codeStore"
              @focus="setMinWidthEmpty"
              style="width: 75%"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="configForm.method == '选择'"
            label="代码分支"
            prop="codeBranch"
          >
            <el-select
              clearable
              v-model="configForm.codeBranch"
              @focus="setMinWidthEmpty"
              style="width: 75%"
            >
              <el-option
                v-for="item in branchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="configForm.method == '输入'"
            label="代码仓库地址"
            style="width: 80%"
            prop="codeAddress"
          >
            <el-input
              v-model="configForm.codeAddress"
              placeholder="支持 HTTP/HTTPS 地址形式"
            />
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
            v-if="configForm.method == '输入'"
            label="凭据"
            prop="secret"
          >
            <el-select
              clearable
              v-model="configForm.codeBranch"
              @focus="setMinWidthEmpty"
              style="width: 55%"
            >
              <el-option
                v-for="item in secretOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              style="margin-left: 26px"
              @click="addSecretVisible = true"
            >
              添加凭据
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfig">确定</el-button>
        <el-button @click="configStoreVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="创建凭证"
      @close="handleCancelSecret"
      :visible.sync="addSecretVisible"
      width="60%"
    >
      <div class="recomend-list">
        <h2>{{ "基本信息" }}</h2>
      </div>
      <el-form
        ref="infoForm"
        :model="infoForm"
        :rules="infoRules"
        label-width="135px"
      >
        <el-form-item label="凭据名称" style="width: 80%" prop="secretName">
          <el-input
            v-model="infoForm.secretName"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="显示名称" style="width: 80%">
          <el-input v-model="infoForm.showName"> </el-input>
        </el-form-item>

        <el-form-item label="工具类型">
          <el-select
            clearable
            v-model="configForm.codeBranch"
            @focus="setMinWidthEmpty"
            style="width: 75%"
            @change="checkedTargetChange"
          >
            <el-option-group
              v-for="group in targetList"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="(item, index) in group.option"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="recomend-list">
        <h2>{{ "数据" }}</h2>
      </div>

      <line-alert
        v-if="!toolChange"
        :content="
          `1. DevOps 工具对应支持的凭据类型，请参照 帮助文档` +
          `  2. 找不到你想要的类型？可以选择对应的工具类型试试`
        "
      />

      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRules"
        label-width="135px"
      >
        <el-form-item label="类型">
          <el-col :span="16">
            <el-radio-group
              v-model="dataForm.type"
              v-if="toolChange == 'SonarQube' || toolChange == 'Testlink'"
            >
              <el-radio-button label="令牌"></el-radio-button>
            </el-radio-group>

            <el-radio-group
              v-model="dataForm.type"
              v-if="
                toolChange == 'Docker Registry' ||
                toolChange == 'Harbor Registry' ||
                toolChange == 'JFrog Artifactory' ||
                toolChange == 'Nexus'
              "
            >
              <el-radio-button label="用户名/密码"></el-radio-button>
            </el-radio-group>

            <el-radio-group
              v-model="dataForm.type"
              v-if="toolChange == 'Gitea' || toolChange == 'GitLab'"
            >
              <el-radio-button label="用户名/令牌"></el-radio-button>
              <el-radio-button label="OAuth2"></el-radio-button>
            </el-radio-group>

            <el-radio-group v-model="dataForm.type" v-if="!toolChange">
              <el-radio-button label="用户名/密码"></el-radio-button>
              <!-- <el-radio-button label="OAuth2"></el-radio-button>
              <el-radio-button label="SSH"></el-radio-button>
              <el-radio-button label="镜像服务"></el-radio-button>
              <el-radio-button label="动态密钥"></el-radio-button> -->
            </el-radio-group>
          </el-col>
        </el-form-item>

        <el-form-item label="用户名" style="width: 80%" prop="name">
          <el-input
            v-model="dataForm.name"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
          />
        </el-form-item>

        <el-form-item label="密码" style="width: 80%" prop="password">
          <el-input v-model="dataForm.password" show-password />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate">创建</el-button>
        <el-button @click="addSecretVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "BaseInfo",
  components: { LineAlert },
  props: {},
  data() {
    return {
      syncRes: "el-icon-remove",
      syncDisable: true,
      name: "",
      activeName: "1",
      typeValue: "",
      typeValue2: "",

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

      nameOptions: [
        { value: "etrust(gitlab)", label: "etrust(gitlab)" },
        { value: "bass(gitlab)", label: "baas(gitlab)" },
        { value: "etrust(gitlab-qcoqwq)", label: "etrust(gitlab-qcoqwq)" },
      ],
      storeOptions: [
        { value: "ip-sec-frontend", label: "etrust(gitlab)" },
        { value: "ip-sec", label: "ip-sec" },
        { value: "e-trust", label: "e-trust" },
        { value: "e-trust_frontend", label: "e-trust_frontend" },
      ],
      branchOptions: [
        { value: "dev", label: "dev" },
        { value: "development", label: "development" },
        { value: "main", label: "main" },
        { value: "nft", label: "nft" },
        { value: "nft-development", label: "nft-development" },
      ],
      secretOptions: [
        { value: "18000664", label: "18000664" },
        { value: "bass-harbor", label: "bass-harbor" },
      ],

      addSecretVisible: false,

      dataForm: {
        type: "用户名/密码",
        name: "",
        password: "",
      },
      dataRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
      infoForm: {
        secretName: "",
        showName: "",
        toolType: "",
      },
      infoRules: {
        secretName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      base_data: [
        {
          label: "制品管理",
          children: [
            { label: "Docker Registry", value: "Docker Registry" },
            { label: "Harbor Registry", value: "Harbor Registry" },
            { label: "JFrog Artifactory", value: "JFrog Artifactory" },
            { label: "Nexus", value: "Nexus" },
          ],
        },
        {
          label: "代码质量分析",
          children: [{ label: "SonarQube", value: "SonarQube" }],
        },
        {
          label: "代码管理",
          children: [
            { label: "Gitea", value: "Gitea" },
            { label: "GitLab", value: "GitLab" },
          ],
        },
        {
          label: "测试管理",
          children: [{ label: "Testlink", value: "Testlink" }],
        },
      ],
      // checkedTargetList: [], // 被选中的备选项
      targetList: [], // select组件渲染所需的数据
      toolChange: "",

      baseInfoData: [
        {
          label: "模板仓库地址",
          value: "http://gitlab.ebcpaas.com/baas/gateway",
        },
        {
          label: "同步开始时间",
          value: "2023-05-12 14:07:43",
        },
        {
          label: "代码分支",
          value: "m-dynamic-test",
        },
        {
          label: "耗时",
          value: "3 秒",
        },
        {
          label: "同步结果",
          value: "",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    // base_data 重组成 select 组件所需的格式
    for (var index in this.base_data) {
      this.targetList.push({
        label: this.base_data[index]["label"],
        option: [], //重点
      });
      this.base_data[index]["children"].forEach((item) => {
        this.targetList[index].option.push(item.label);
      });
    }
  },
  mounted() {},
  methods: {
    getList() {},

    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    configStore() {
      this.configStoreVisible = true;
      this.$nextTick(() => {
        this.$refs["configForm"].resetFields();
      });
      this.configForm = this.$options.data().configForm;
    },
    handleConfig() {
      this.syncDisable = false;
      this.configStoreVisible = false;
    },

    handleAddSecret() {
      this.addSecretVisible = true;
      this.$nextTick(() => {
        this.$refs["infoForm"].resetFields();
      });
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
      this.dataForm = this.$options.data().dataForm;
      this.infoForm = this.$options.data().infoForm;
    },

    handleCreate() {},

    checkedTargetChange(val) {
      console.log(val);
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
      this.toolChange = val;
      if (!this.toolChange) {
        this.dataForm.type = "用户名/密码";
      }
      if (
        val == "Docker Registry" ||
        val == "Harbor Registry" ||
        val == "JFrog Artifactory" ||
        val == "Nexus"
      ) {
        this.dataForm.type = "用户名/密码";
      }

      if (val == "SonarQube" || val == "Testlink") {
        this.dataForm.type = "令牌";
      }

      if (val == "Gitea" || val == "GitLab") {
        this.dataForm.type = "用户名/令牌";
      }
    },

    handleCancelSecret() {
      this.addSecretVisible = false;

      this.$nextTick(() => {
        this.$refs["infoForm"].resetFields();
        this.$refs["dataForm"].resetFields();
      });

      this.dataForm = this.$options.data().dataForm;
      this.infoForm = this.$options.data().infoForm;
    },

    syncStore() {
      this.syncRes = "el-icon-loading";
      setTimeout(() => {
        this.syncRes = "el-icon-error";
      }, 3000);
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
.contentStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: rgba(150, 152, 155);
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 11px;
  height: 40px;
  line-height: 42px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>
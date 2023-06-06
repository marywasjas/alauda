<template>
  <div class="base-info">
    <el-card class="box-card" style="margin-top: 15px">
      <div
        slot="header"
        class="clearfix"
        style="display: flex; justify-content: flex-end"
      >
        <el-dropdown trigger="click">
          <el-button type="primary">
            操作
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleEdit">
              更新网关
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-row :gutter="24" style="">
        <span class="titleStyle"> 基本信息 </span>
        <el-row :gutter="24" style="margin: 14px 0 14px 20px">
          <el-col
            v-for="item in detailResData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label == '状态'">
              <i
                :class="
                  item.value === '运行中'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              {{ item.value + " (1/1)" }}
            </span>
            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>

        <span class="titleStyle"> 部署配置 </span>
        <el-row :gutter="24" style="margin: 14px 0 14px 20px">
          <el-col
            v-for="item in detailResData2"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;

            <span v-if="item.label == '命名空间'">
              <span class="cursor-pointer">
                {{ item.value }}
              </span>
            </span>

            <span v-else-if="item.label == '项目'">
              <span class="cursor-pointer">
                {{ item.value }}
              </span>
            </span>

            <span v-else-if="item.label == '部署节点'">
              <el-tag size="mini">
                {{ item.value }}
              </el-tag>
            </span>

            <span v-else-if="item.label == '资源配额'">
              <span>
                <i class="el-icon-cpu primary2-text" />
                {{ `${item.value.cpu} 核` }}
              </span>
              <span>
                <i class="el-icon-bank-card primary-text" />
                {{ `${item.value.memory} Mi` }}
              </span>
            </span>

            <span v-else> {{ item.value ? item.value : "-" }} </span>
          </el-col>
        </el-row>

        <span class="titleStyle"> 端口规划 </span>
        <el-row :gutter="24" style="margin: 35px; margin-top: 14px">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
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
                <div v-if="col.id === 'cluster'">
                  <div class="cursor-pointer">{{ scope.row[col.id] }}</div>
                  <div style="color: rgba(150, 152, 155)">
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'status'">
                  <i
                    :class="
                      scope.row.status === '运行中'
                        ? 'el-icon-success running'
                        : 'el-icon-warning stop'
                    "
                  />
                  {{ scope.row[col.id] }}
                  <i
                    class="el-icon-document cursor-pointer"
                    @click="handleTablet"
                  />
                </div>
                <div v-else>
                  {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <span class="titleStyle"> 外部服务 </span>
        <el-row :gutter="24" style="margin: 35px; margin-top: 14px">
          <el-table
            :data="tableData2.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
          >
            <el-table-column
              v-for="col in tableColumnList2"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'cluster'">
                  <div class="cursor-pointer">{{ scope.row[col.id] }}</div>
                  <div style="color: rgba(150, 152, 155)">
                    {{ scope.row[col.id] }}
                  </div>
                </div>

                <div v-else-if="col.id === 'status'">
                  <i
                    :class="
                      scope.row.status === '运行中'
                        ? 'el-icon-success running'
                        : 'el-icon-warning stop'
                    "
                  />
                  {{ scope.row[col.id] }}
                  <i
                    class="el-icon-document cursor-pointer"
                    @click="handleTablet"
                  />
                </div>
                <div v-else>
                  {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>
    </el-card>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      :title="title"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />

    <el-dialog
      title="更新网关"
      @close="updateGatewayVisible = false"
      :visible.sync="updateGatewayVisible"
      width="60%"
    >
      <el-form
        ref="updateGateway"
        :model="updateGateway"
        label-width="135px"
        :rules="updateGatewayRules"
      >
        <el-form-item label="节点反亲和">
          <el-radio-group v-model="updateGateway.node">
            <el-radio-button label="1">强制</el-radio-button>
            <el-radio-button label="2">期望</el-radio-button>
          </el-radio-group>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                节点反亲和类型为"强制"，则实例数等于部署节点数，不能修改<br />
                节点反亲和类型为"期望"，实例数可手动修改，可控制自动扩缩容状态
                <br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="部署节点" prop="deploy">
          <el-select
            clearable
            multiple
            v-model="updateGateway.deploy"
            @focus="setMinWidthEmpty"
            style="width: 80%"
            placeholder="请选择部署节点"
          >
            <el-option
              v-for="item in deployNodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="实例数" v-if="updateGateway.node == '1'">
          <span>
            {{ this.updateGateway.instanceNum }}
          </span>
        </el-form-item>

        <div v-else>
          <el-col :span="6">
            <!-- 1 -->
            <el-form-item label="自动扩缩容">
              <el-switch v-model="updateGateway.auto" size="small" />
            </el-form-item>
          </el-col>

          <el-col :span="18" v-if="updateGateway.auto == false">
            <el-form-item label="实例数" prop="instance_collector">
              <el-input
                v-model="updateGateway.instanceNum"
                size="small"
                style="width: 370px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="18" v-else>
            <div style="display: flex">
              <el-form-item label="实例数" prop="instance_collector_min">
                <el-input
                  v-model="updateGateway.instanceNum_max"
                  size="small"
                  style="width: 180px"
                >
                  <template slot="prepend">最小值</template>
                </el-input>
              </el-form-item>

              <el-form-item
                prop="instance_collector_max"
                style="margin-left: -100px"
              >
                <el-input
                  v-model="updateGateway.instanceNum_min"
                  size="small"
                  style="width: 180px"
                >
                  <template slot="prepend">最大值</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </div>

        <el-col :span="18" style="display: flex">
          <el-form-item label="资源配额" prop="cpu_collector">
            <el-input
              v-model="updateGateway.cpu_collector"
              size="small"
              style="width: 220px"
            >
              <template slot="prepend">CPU</template>
              <template slot="append">核</template>
            </el-input>
          </el-form-item>

          <el-form-item prop="memory_collector" style="margin-left: -100px">
            <el-input
              v-model="updateGateway.memory_collector"
              size="small"
              style="width: 220px"
            >
              <template slot="prepend">内存</template>
              <template slot="append">Mi</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer" style="margin-top: 100px">
        <el-button type="primary" @click="handleUpdateName"> 更新 </el-button>
        <el-button @click="updateGatewayVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";

import {
  tableData,
  tableColumnList,
  tableData2,
  tableColumnList2,
} from "./constant/index";

export default {
  name: "BaseInfo",
  components: { LineAlert, FoldableBlock, MonacoEditorDialog },
  props: {},
  data() {
    return {
      activeName: "1",

      detailResData: [
        { label: "显示名称", value: "" },
        { label: "创建人", value: "" },
        { label: "网关类型", value: "出口网关" },
        { label: "更新时间", value: "" },
        { label: "状态", value: "运行中" },
      ],

      detailResData2: [
        { label: "命名空间", value: "istio-system" },
        { label: "实例数", value: "1" },
        { label: "项目", value: "cpass-system" },
        { label: "部署节点", value: "25.2.20.44" },
        { label: "节点反亲和", value: "期望" },
        { label: "固定 IP", value: "" },
        { label: "资源配额", value: { cpu: "0.5", memory: "500" } },
      ],

      detailResData3: [
        { label: "来源", value: "平台提供" },
        { label: "监控系统类型", value: "Prometheus" },
        { label: "URL", value: "http://25.2.2.2:80/cluster/global/prometheus" },
      ],

      detailResData4: [
        { label: "来源", value: "平台提供" },
        { label: "URL", value: "http://25.2.2.2:80/es_proxy" },
      ],

      detailData: [
        {
          label: "ClusterServiceVersion 名称",
          value: "devops-tool-operator.v3.8.22",
        },
        {
          label: "标签",
          // value: "operatorframework.io/arch.amd64:supported",
          value: [
            "operatorframework.io/arch.amd64:supported",
            "operatorframework.io/arch.arm64:supported",
            "operatorframework.io/devops-tool-operator.operat....",
          ],
        },
        {
          label: "集群",
          value: "global",
        },

        {
          label: "命名空间",
          value: "所有命名空间",
        },
        {
          label: "状态",
          value: "部署成功",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
      ],

      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      title: "",
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      spec: {
        apiVersion: "operator.devops.alauda.io/v1alpha",
        kind: "Gitlab",
        metadata: {
          name: "gitlab-sample",
        },
        spec: {
          account: null,
          integratedIntoPlatform: false,
          persistence: {
            type: "LcalPath",
          },
          service: {
            nodePort: {
              httpPort: 30000,
              httpsPort: 30001,
              sshPort: 30002,
            },
            type: "NodePort",
          },
        },
      },

      tableData,
      tableColumnList,
      tableData2,
      tableColumnList2,

      appTempData: [
        {
          label: "Gitea",
          desc: "Gitea 是一个轻量级代码托管解决方案，它可以运行在任何 Go 能够编译的平台。",
        },
        {
          label: "GitlabOfficial",
          desc: "Gitlab 是一个分布式代码管理工具，它可以管理项目原代码并控制代码版本。",
        },

        {
          label: "Gitlab",
          desc: `该工具为 Gitlab 的非官方正式版本，存在一些暂时无法修复的严重漏洞，强烈建议用户使用官方正式版本GitlabOfficial。该工具 Gitlab 会在下一个版本 v3.7 中下线。已经在使用该 Gitlab 用户，请参考运维手册中基础运维部分，根据 DevOps 模块中的《Gitlab 数据迁移至 GitlabOfficial 方案》档案，尽快完成向 GitlabOfficial 工具迁移的工作。`,
        },

        {
          label: "Harbor",
          desc: "Harbor 是一个 Docker 镜像管理工具，它可以提升 Registry 构建和传输镜像的效率。",
        },
        {
          label: "Jenkins",
          desc: "Jenkins 是一个持续集成工具，它可以使开发人员更可靠地构建、测试和部署软件。",
        },
        {
          label: "Nexus",
          desc: "Nexus 是一个强大的仓库管理工具，能够极大地简化内部仓库的维护和外部仓库的访问。",
        },
        {
          label: "Sonarqube",
          desc: "Sonarqube 是一个代码质量管理工具，它可以快速定位代码中潜在或明显的错误。",
        },
        {
          label: "Testlink",
          desc: "Testlink 是一个基于web的测试用例管理工具，主要功能是测试用例的创建、管理和执行。",
        },
      ],

      updateGatewayVisible: false,

      updateGateway: {
        node: "1",
        deploy: [],
        instanceNum: "1",
        instanceNum2: "1",
        instanceNum_min: "1",
        instanceNum_max: "1",
        auto: false,
      },

      updateGatewayRules: {},

      deployNodeOptions: [
        {
          value: "25.2.20.108",
          label: "25.2.20.108",
        },
        {
          value: "25.2.20.10822",
          label: "25.2.20.10822",
        },
        {
          value: "25.2.20.10833",
          label: "25.2.20.10833",
        },
        {
          value: "25.2.20.10844",
          label: "25.2.20.10844",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.detailName = this.$route.query.name;
    // this.detailData.filter((item) => {
    //   return item.label == "显示名称";
    // })[0].value = this.$route.query.name;
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

    handleView(obj) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.title = obj.label;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    handleCreate(obj) {
      this.$router.push({
        path: "/catalog-management/operator/createInstance",
        query: { name: obj.label },
      });
    },

    handleEdit() {
      this.updateGatewayVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
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
    // color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%; //更改竖向分割线长度
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
}
.component-div-computed {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 290px;
  height: 180px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  font-size: 14px;
  height: 65px;
  line-height: 21px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.titleStyle {
  font-size: 18px;
  font-weight: 500;
  margin: 14px 0;
  margin-left: 15px;
}
</style>

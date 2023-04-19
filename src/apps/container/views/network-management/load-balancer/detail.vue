<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header
        :name="name"
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
        <template v-slot:headerRight>
          <el-dropdown trigger="click">
            <el-button type="primary" class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-tooltip
                class="item"
                effect="dark"
                content="系统资源，不允许进行项目分配"
                placement="left-start"
              >
                <div>
                  <el-dropdown-item :disabled="true">
                    更新项目
                  </el-dropdown-item>
                </div>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="系统资源，不允许更新规格"
                placement="left-start"
              >
                <div>
                  <el-dropdown-item :disabled="true">
                    更新规格
                  </el-dropdown-item>
                </div>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="系统资源，不允许删除"
                placement="left-start"
              >
                <div>
                  <el-dropdown-item :disabled="true">
                    删除负载均衡器
                  </el-dropdown-item>
                </div>
              </el-tooltip>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Node from "./components/Node/Node.vue";
import clusterNet from "./components/clusterNet/clusterNet.vue";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "ClusterDetail",
  components: { TabHeader, BaseInfo, Node, LineAlert, clusterNet},
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "详情信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "监控",
          name: "clusterNet",
          com: "clusterNet",
        },
        {
          label: "日志",
          name: "node",
          com: "Node",
        },
      ],
      activeName: "",

      gatewayVisible: false,
      gatewayForm: {
        gatewayType: "分布式",
        nat: true,
        netSegmentNode: "",
      },
      gatewayRules: {},

      namespaceVisible: false,
      namespaceForm: {
        namespace: "",
      },
      namespaceRules: {},

      whitelistVisible: false,
      whitelistForm: {
        subnetIsolation: false,
        whitelist: "",
      },
      whitelistRules: {},

      expandsubnetVisible: false,
      expandsubnetForm: {
        netSegment: "",
      },
      expandsubnetRules: {},
    };
  },
  computed: {
    comName: function () {
      if (!this.activeName) return "";
      const item = this.tabList.filter((el) => el.name === this.activeName);
      return item[0].com;
    },
  },
  created() {
    this.name = this.$route.query.name;
    this.desc = this.$route.query.desc;
    this.activeName = this.tabList[0].name;
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
    changeActive(value) {
      this.activeName = value;
    },

    handleGateway() {
      this.gatewayVisible = true;
    },
    handle_gateway() {},

    handleNamespace() {
      this.namespaceVisible = true;
    },
    handle_namespace() {},

    handleWhitelist() {
      this.whitelistVisible = true;
    },
    handle_whitelist() {},

    handleExpandsubnet() {
      this.expandsubnetVisible = true;
    },

    handle_expandsubnet() {},
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>
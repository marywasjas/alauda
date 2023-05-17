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
        <!-- <template v-slot:headerLeft>
          <div style="flex: 1 1 0%">
            <div style="font-size: 20px; line-height: 28px">
              {{ name }}
            </div>
            <div
              style="
                font-size: 14px;
                line-height: 20px;
                color: rgba(100, 102, 105);
              "
            >
              {{
                "clickhouse 是一个开源的面向专栏的数据库管理系统，能够实时生成分析数据报告。"
              }}
            </div>
          </div>
        </template> -->
        <template v-slot:headerRight>
          <el-dropdown trigger="click">
            <el-button type="primary" class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Kubectl 工具</el-dropdown-item>
              <el-dropdown-item @click.native="handelDelete">
                删除集群
              </el-dropdown-item>
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
import Event from "./components/Event/Event.vue";
import Monitor from "./components/Monitor/Monitor.vue";
import Func from "./components/Func/Func.vue";
import Plugins from "./components/Plugins/Plugins.vue";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Node,
    Event,
    Func,
    Plugins,
    Monitor,
  },
  data() {
    return {
      fromPath: "",
      plugins: "",
      name: "",
      desc: "",
      tabList: [
        {
          label: "概览",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "节点",
          name: "node",
          com: "Node",
        },
        {
          label: "关联项目",
          name: "event",
          com: "Event",
        },
        {
          label: "功能组件",
          name: "func",
          com: "Func",
        },
        {
          label: "监控",
          name: "monitor",
          com: "Monitor",
        },
        {
          label: "插件",
          name: "plugins",
          com: "Plugins",
        },
      ],
      activeName: "",
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
    // if (this.fromPath.name == "VolumeSnapshotList") {
    //   this.activeName = this.tabList[5].name;
    //   console.log(this.activeName )
    // } else {
    //   this.activeName = this.tabList[0].name;
    // }
  },
  methods: {
    changeActive(value) {
      this.activeName = value;
    },

    handelDelete() {
      const returnMsgList = [
        `确定删除集群"${this.name}"吗？该集群被以下 10个 项目使用。删除之后，仍会保留 Kubernetes 集群及项目下资源。如需要清理 Kubernetes 集群及项目下资源，请复制以下资源清理命令，并在该集群下进行清理。`,

        `请输入${this.name}确定删除`,
      ];
      const newData = [];
      const h = this.$createElement;
      for (const i in returnMsgList) {
        newData.push(h("p", null, returnMsgList[i]));
      }
      this.$prompt(h("div", null, newData), "删除集群", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "error",
        inputValidator: (val) => {
          if (val === this.name) {
            return true;
          }
          return false;
        },
        inputErrorMessage: "输入不正确",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    // next();
    next((vm) => {
      vm.fromPath = from;
      console.log(vm.fromPath);
    });
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
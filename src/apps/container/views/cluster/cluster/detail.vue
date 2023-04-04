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
    Plugins
  },
  data() {
    return {
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
          name: "event2",
          com: "Event",
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
    this.activeName = this.tabList[0].name;
  },
  methods: {
    changeActive(value) {
      this.activeName = value;
    },

    handelDelete() {
      const returnMsgList = [
        `确定删除${this.name}持久卷声明吗？删除后持久卷中的数据将被清除。`,
        `请输入${this.name}确定删除`,
      ];
      const newData = [];
      const h = this.$createElement;
      for (const i in returnMsgList) {
        newData.push(h("p", null, returnMsgList[i]));
      }
      this.$prompt(h("div", null, newData), "删除持久卷声明", {
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
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>
<template>
  <div class="Yaml-container">
    <line-alert :content="content" />

    <div class="Yaml-header tab-header__header-wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="tab in tabList"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        />
      </el-tabs>
    </div>
    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import Node from "./components/Node/Node.vue";
import Event from "./components/Event/Event.vue";
import LineAlert from "@/apps/container/views/components/LineAlert";

import { nanoid } from "nanoid";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    Node,
    Event,
    LineAlert,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "Kubernetes 证书",
          name: "node",
          com: "Node",
        },
        {
          label: "平台组件证书",
          name: "event",
          com: "Event",
        },
      ],
      activeName: "",
      content:
        "平台证书管理提供平台依赖的证书列表查看功能，Kubernetes 证书过期后将影响 Kubernetes 集群 kubectl 指令及 ApiServer 对外暴露能力，平台组件证书过期后将导致组件对应功能不可用。",
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.Yaml-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
  .Yaml-header {
    background-color: #fff;
    padding: 10px 0 0 10px;
  }
}
</style>

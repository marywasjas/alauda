<template>
  <div class="Yaml-container">
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

    <line-alert
      v-if="activeName == 'node'"
      :content="content"
      style="margin-top: 20px"
    />

    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import LineAlert from "@/apps/container/views/components/LineAlert";
import OperatorHub from "./components/OperatorHub/OperatorHub.vue";
import Operators from "./components/Operators/Operators.vue";

import { nanoid } from "nanoid";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    OperatorHub,
    Operators,
    LineAlert,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "OperatorHub",
          name: "node",
          com: "OperatorHub",
        },
        {
          label: "已部署 Operators",
          name: "event",
          com: "Operators",
        },
      ],
      activeName: "",
      content:
        "Operator 是一种打包、安装和管理 Kubernetes 应用程序的方法，用于管理资源的整个生命周期。可使用平台自研或平台认证的内置 Operator，也可使用开源社区 Operator。",
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
      // console.log(tab, event);
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

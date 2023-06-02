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

    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
// import Node from "./components/Node/Node.vue";
// import Event from "./components/Event/Event.vue";

import User from "./components/User/User.vue";
import System from "./components/System/System.vue";

import { nanoid } from "nanoid";

export default {
  name: "AuditMain",
  components: {
    TabHeader,
    User,
    System,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "用户操作",
          name: "user",
          com: "User",
        },
        {
          label: "系统操作",
          name: "system",
          com: "System",
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
  padding-top: 0;
  background-color: $background-color;
  .Yaml-header {
    background-color: #fff;
    padding: 10px 0 0 10px;
  }
}
</style>
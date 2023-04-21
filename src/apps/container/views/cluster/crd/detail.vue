<template>
  <div class="Yaml-container">
    <!-- <div class="detail-header">
      <tab-header
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
      </tab-header>
    </div> -->

    <div class="Yaml-header tab-header__header-wrapper">
      <el-tabs v-model="activeName" @tab-click="changeActive">
        <el-tab-pane
          v-for="tab in tabList"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        />
      </el-tabs>
    </div>
    <component :is="comName" :name="name" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Yaml from "./components/Yaml.vue";

export default {
  name: "ClusterCrdDetail",
  components: { TabHeader, BaseInfo, Yaml },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "详细信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "YAML",
          name: "yaml",
          com: "Yaml",
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
    this.activeName = this.tabList[0].name;
  },
  methods: {
    changeActive(value) {
      // this.activeName = value;
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
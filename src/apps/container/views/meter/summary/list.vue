<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
        运营概览

        <template v-slot:headerRight>
          <el-radio-group v-model="timeSelected" @input="handleTime">
            <el-radio-button label="1">本月</el-radio-button>
            <el-radio-button label="2">上个月</el-radio-button>
            <el-radio-button label="3">近 3 个月</el-radio-button>
          </el-radio-group>
        </template>
      </tab-header>
    </div>

    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";

import ContainerUsage from "./components/ContainerUsage/ContainerUsage";
import ContainerQuota from "./components/ContainerQuota/ContainerQuota";
import Namespace from "./components/Namespace/Namespace";
import Project from "./components/Project/Project";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,

    ContainerUsage,
    ContainerQuota,
    Namespace,
    Project,
  },
  data() {
    return {
      timeSelected: "1",

      name: "",
      desc: "",
      tabList: [
        {
          label: "容器组使用量",
          name: "containerUsage",
          com: "ContainerUsage",
        },
        {
          label: "容器组配额",
          name: "containerQuota",
          com: "ContainerQuota",
        },
        {
          label: "命名空间配额",
          name: "namespace",
          com: "Namespace",
        },
        {
          label: "项目配额",
          name: "project",
          com: "Project",
        },
      ],
      activeName: "containerUsage",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
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
    // this.desc = this.$route.query.desc;
  },
  methods: {
    handleTime() {},

    changeActive(value) {
      console.log(this.activeName, value);
      this.activeName = value;
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
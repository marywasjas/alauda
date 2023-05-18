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

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Node,
    Event,
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
          label: "介绍",
          name: "node",
          com: "Node",
        },
        {
          label: "部署 / 运行状态",
          name: "event",
          com: "Event",
        },
      ],
      activeName: "baseInfo",
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
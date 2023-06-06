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

    <LineAlert
      style="margin-top: 20px"
      v-if="activeName == 'backList'"
      content="作用于当前服务网络的单个集群,对 Istio-ingressgateway 接收的请求进行访问控制。对于七层负载均衡器转发的请求,需要将服务源 IP 加到 x-forwarded-for 中,以便Istio-ingressgateway 能够获取。其他类型负载均衡器请参考 如何将服务源 IP 通过负载均衡器转发至 Istio-ingressgateway"
    />

    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import LineAlert from "@/apps/container/views/components/LineAlert";

import ServiceNet from "./components/ServiceNet/ServiceNet.vue";
import ComList from "./components/ComList/ComList.vue";
import GatewayList from "./components/GatewayList/GatewayList.vue";
import BackList from "./components/BackList/BackList.vue";
import Monitor from "./components/Monitor/Monitor.vue";

import { nanoid } from "nanoid";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    LineAlert,
    ServiceNet,
    ComList,
    GatewayList,
    BackList,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "服务网格",
          name: "serviceNet",
          com: "ServiceNet",
        },
        {
          label: "组件列表",
          name: "comList",
          com: "ComList",
        },
        {
          label: "网关列表",
          name: "gatewayList",
          com: "GatewayList",
        },
        {
          label: "黑白列表",
          name: "backList",
          com: "BackList",
        },
        {
          label: "监控",
          name: "monitor",
          com: "Monitor",
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

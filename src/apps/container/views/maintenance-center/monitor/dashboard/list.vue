<template>
  <div>
    <iframe :src="iframeUrl" width="450" height="200" frfameborder="0">
    </iframe>
<iframe src="https://fb595403419.grafana.net/d-solo/j7MCpqZ7k/rabbitmq-stream?orgId=1&refresh=15s&from=1684891242969&to=1684894842969&panelId=2" width="450" height="200" frameborder="0"></iframe>

    <!-- <VueIframe :src="iframeUrl"></VueIframe> -->
  </div>
</template>

<script>
// import VueIframe from "vue-iframe";

export default {
  name: "MonitorMain",
  // components: { VueIframe },
  data() {
    return {
      iframeUrl:
        "https://fb595403419.grafana.net/d/j7MCpqZ7k/rabbitmq-stream?orgId=1&refresh=15s",
    };
  },
};
</script>

<style lang="scss" scoped>
.application-main {
  width: 100%;
  height: 100%;
}
</style>
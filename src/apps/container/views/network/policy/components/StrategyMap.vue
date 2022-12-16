<template>
  <div class="strategyMap-main">
    <div
      v-loading.fullscreen.lock="loading"
      class="load"
      element-loading-text="拼命加载中"
    />
    <iframe
      ref="iframeDom"
      :src="`./strategyMap/index.html`"
      width="100%"
      height="500px"
      style="border: none;"
    />
  </div>
</template>

<script>

export default {
  name: 'StrategyMap',
  components: {
  },
  props: {},
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.strategyMap-main{
  margin-top: 20px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 0px $box-shadow;
  border-radius: $border-radius-l;
  margin-bottom: 16px;
  height: 100%;
  width: 100%;
}
</style>

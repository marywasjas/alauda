<template>
  <div class="overview-banner--wrapper">
    <div class="overview-banner">
      <div class="overview-banner__icon">
        <i class="el-icon-s-help" />
      </div>
      <div class="overview-banner__content">
        <div class="overview-banner__title">Container Platform</div>
        <div class="overview-banner__description">
          支持您创建并运维自己的应用程序。应用程序可以是分散的 Kubernetes 资源，也可以是原生应用、联邦应用等 Kubernetes 资源集合。此外，在 OAM 应用管理模块，应用程序还可以作为更高抽象层次的应用组件、运维特征方式存在。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewBanner',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.overview-banner--wrapper {
    border-radius: 4px;
    margin-bottom: 16px;
    background-color: rgb(0,122,245);
    background-image: url(../../../../assets/images/overview-banner.svg);
    background-size: cover;
    background-position: center;
    .overview-banner {
      display: flex;
      align-items: center;
      padding: 24px;
    }
    .overview-banner__icon {
      margin-right: 20px;
      i {
        display: flex;
        font-size: 56px;
        width: 1em;
        height: 1em;
        color: #fff;
      }
    }
    .overview-banner__content {
      color: white;
      .overview-banner__title {
        font-size: 24px;
        line-height: 36px;
        font-weight: 500;
      }
      .overview-banner__description {
        margin-top: 4px;
        font-size: 14;
      }
    }
}
</style>

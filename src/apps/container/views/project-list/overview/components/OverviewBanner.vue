<template>
  <div class="overview-banner--wrapper">
    <div class="overview-banner">
      <div class="overview-banner__icon">
        <i class="el-icon-folder-opened" />
      </div>
      <div class="overview-banner__content">
        <div class="overview-banner__title">项目管理</div>
        <div class="overview-banner__description">
          通过项目概览，您可实时了解项目下计算资源的运行情况，以及项目配额 (CPU、内存等) 的分配和使用情况
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

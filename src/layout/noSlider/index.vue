<template>
  <div class="app-wrapper-noSlider">
    <main-header class="main-header" :is-show-namespace="false" :product-select-title="productSelectTitle" />
    <app-main-no-slider />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import AppMainNoSlider from './AppMainNoSlider.vue'
import ResizeMixin from '../mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'NoSliderLayout',
  components: {
    AppMainNoSlider,
    MainHeader
  },
  mixins: [ResizeMixin],
  data() {
    return {
      productSelectTitle: ''
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    $route() {
      const { meta } = this.$route
      this.productSelectTitle = meta.title
    }
  },
  created() {
    const { meta } = this.$route
    this.productSelectTitle = meta.title
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper-noSlider {
    height: 100%;
    width: 100%;
    overflow:hidden;
  }
</style>

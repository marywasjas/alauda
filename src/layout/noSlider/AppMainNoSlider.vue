<template>
  <section class="app-main-no-slider">
    <div class="scroll-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>

export default {
  name: 'AppMainNoSlider',
  components: { },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main-no-slider {
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  margin-top: 60px;
}
.scroll-main{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

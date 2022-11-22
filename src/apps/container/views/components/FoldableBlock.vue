
<template>
  <div class="foldable-block">
    <el-button
      v-if="buttonVisible"
      round
      size="mini"
      style="color: #1890ff"
      @click="handelOpen"
    >{{ btnTex }}<i
      class="el-icon-d-arrow-right"
    /></el-button>
    <div v-if="!buttonVisible" class="buttonBox">
      <slot />
      <el-button
        class="close-button"
        round
        type="primary"
        size="mini"
        @click="handelClose"
      >收起
        <i
          class="el-icon-d-arrow-right"
          style="transform: rotate(-90deg)"
        /></el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FoldableBlock',
  components: {},
  props: {
    btnTex: {
      type: String,
      default: '更多'
    }
  },
  data() {
    return {
      buttonVisible: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelOpen() {
      this.buttonVisible = false
    },
    handelClose() {
      this.buttonVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.foldable-block {
  .buttonBox {
    position: relative;
    padding: 20px;
    border: 1px solid $color-primary;
    border-radius: $border-radius-l;
    margin-bottom: 40px;
  }
  .close-button {
    position: absolute;
    bottom: -15px;
    left: 20px;
  }
}
</style>

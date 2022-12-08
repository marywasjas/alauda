<template>
  <div class="line-alert">
    <i class="el-icon-info" />
    <div class="line-alert__body">
      <div class="line-alert__content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineAlert',
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.line-alert {
  background-color: $background-color2;
  border: 1px solid $color-primary;
  display: flex;
  margin-bottom: 16px;
  padding: 11px 15px;
  border-radius: $border-radius-m;
  box-sizing: border-box;
  i {
    color: $color-primary;
    margin-right: 8px;
  }
  .line-alert__body {
    flex: 1;
    width: 100%;
    overflow: hidden;
    .line-alert__content {
      font-size: $font-size-14;
      line-height: $line-height-20;
      color: $color-main-text;
    }
  }
}
</style>

<template>
  <div class="card-content">
    <div class="slot">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseCard',
  props: {

  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.card-content {
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-bottom: 16px;
}
.card-title{
  font-size: $font-size-18;
  line-height:$line-height-24;
  i{
    color: $icon-color;
    font-size: $font-size-18;
    margin-left:10px;
  }
}
.right-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  i{
    color: $color-primary;
    cursor: pointer;
  }
}
</style>

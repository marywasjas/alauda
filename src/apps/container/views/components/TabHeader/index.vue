<template>
  <div class="tab-header">
    <div class="tab-header__title">
      <div class="template-app__postcard">
        <div>
          <div class="name">{{ name }}</div>
          <div class="display-name">{{ desc }}</div>
        </div>
      </div>
      <div>
        <slot name="headerRight" />
      </div>
    </div>
    <div class="tab-header__header-wrapper">
      <el-tabs v-model="subActiveName" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabHeader',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      subActiveName: ''
    }
  },
  computed: {},
  watch: {
    activeName: function(newVal, oldVal) {
      this.subActiveName = newVal
    }
  },
  created() {
    this.subActiveName = this.activeName
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.$emit('changeActive', this.subActiveName)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-header {
  border-radius: $border-radius-l;
  overflow: hidden;
  box-shadow: 0 0 4px $box-shadow;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  padding: 20px 20px 0 20px;
  .tab-header__title{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $font-color-title;
    font-size: $font-size-20;
    padding-bottom: 20px;
    font-weight: 500;
    border-bottom: 1px solid $border-color-one;
    line-height: $line-height-32;
    .display-name{
      font-size: $font-size-14;
      color: $font-color-text;
      line-height: $line-height-20;
    }
  }
}
</style>

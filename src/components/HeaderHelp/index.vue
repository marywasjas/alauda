<template>
  <div class="header-help">
    <!-- <i class="el-icon-warning-outline icon" /> -->
    <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      trigger="click"
    >
      <i class="el-icon-warning-outline icon" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div class="flex-start">
            <i class="el-icon-question" />
            <span>帮助文档</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div class="flex-start">
            <i class="el-icon-info" />
            <span>关于平台</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click.native="healthStatus">
          <div class="flex-start">
            <i class="el-icon-s-marketing" />
            <span>平台健康状态</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'HeaderHelp',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    healthStatus() {
      this.$router.push({
        name: 'PlatformHealthStatus'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-help {
  margin-left: 8px;
  .icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>

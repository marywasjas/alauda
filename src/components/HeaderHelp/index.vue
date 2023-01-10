<template>
  <div class="header-help">
    <!-- <i class="el-icon-warning-outline icon" /> -->
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <i class="el-icon-warning-outline icon" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div class="flex-start">
            <i class="el-icon-question" />
            <span>{{ $t('language.help_doc') }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click.native="aboutPlatforms">
          <div class="flex-start">
            <i class="el-icon-info" />
            <span>{{ $t('language.about_platform') }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click.native="healthStatus">
          <div class="flex-start">
            <i class="el-icon-s-marketing" />
            <span>{{ $t('language.platform_health_check') }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <about-platforms-dialog :visible="visible" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import AboutPlatformsDialog from './AboutPlatformsDialog.vue'
export default {
  name: 'HeaderHelp',
  components: { AboutPlatformsDialog },
  data() {
    return {
      visible: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 关于平台
    aboutPlatforms() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
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

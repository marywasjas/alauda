<template>
  <div class="navbar">
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <notice />
        <help />
        <!-- <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>
      <div class="page-header__separator" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="logoSrc" class="user-avatar">
          <span>k01027</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link> -->
          <!-- <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link> -->
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item @click.native="userInfo">
            <div class="flex-start">
              <i class="el-icon-user" />
              <span>个人信息</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="flex-start">
              <i class="el-icon-monitor" />
              <span>外观</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="flex-start">
              <i class="el-icon-refresh" />
              <span>English</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <div class="flex-start">
              <i class="el-icon-circle-close" />
              <span>退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'
import Notice from '@/components/HeaderNotice'
import Help from '@/components/HeaderHelp'
import logoSrc from '@/assets/logo/logo.png'

export default {
  name: 'RightMenu',
  components: {
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search,
    Notice,
    Help
  },
  data() {
    return {
      logoSrc
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    userInfo() {
      this.$router.push({
        name: 'PersonalInformation'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items:center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      // margin-right: 30px;

      .avatar-wrapper {
        display:flex;
        align-items:center;
        justify-content:space-between;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 0 5px 0 0;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
  .page-header__separator {
    height: 32px;
    width: 1px;
    background-color: #646669;
    margin: 0 16px 0 8px;
    opacity: 0.1;
  }
}
</style>

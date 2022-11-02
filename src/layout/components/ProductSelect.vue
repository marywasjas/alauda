<template>
  <div class="product-select">
    <el-popover
      ref="product-select-popper"
      trigger="click"
      placement="right"
    >
      <div class="product-select-tooltip">
        <div class="menu">
          <div v-for="menu in menuList" :key="menu.info" :class="{'menu__item':true,'menu__item--actived':menu.key===currentProduct}" @click="changeProduct(menu)">
            <i :class="menu.icon" />
            <p class="menu__item-info">{{ menu.info }}</p>
          </div>
        </div>
        <div class="portal">
          <div class="portal__item">
            <i class="el-icon-s-home" />
            <span>Portal</span>
          </div>
        </div>
      </div>
      <div slot="reference" class="click-product-select">
        <span>{{ currentProductTitle }}</span>
        <i class="el-icon-s-grid" />
      </div>
    </el-popover>
  </div>
</template>

<script>
import { containerAsyncRoutes } from '@/apps/container/router/index'
import { devOpsAsyncRoutes } from '@/apps/devOps/router/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductSelect',
  components: {},
  props: {},
  data() {
    return {
      devOpsAsyncRoutes,
      menuList: [
        {
          icon: 'el-icon-s-help',
          info: 'Container Platform',
          key: 'Container',
          path: '/dashboard',
          slider: containerAsyncRoutes
        },
        {
          icon: 'el-icon-news',
          info: 'DevOps',
          key: 'DevOps',
          path: '/dashboard',
          slider: devOpsAsyncRoutes
        },
        {
          icon: 'el-icon-s-shop',
          info: '应用商店',
          key: 'Shop',
          path: '/dashboard',
          slider: devOpsAsyncRoutes
        },
        {
          icon: 'el-icon-s-cooperation',
          info: '平台管理',
          key: 'Platform',
          path: '/dashboard',
          slider: devOpsAsyncRoutes
        },
        {
          icon: 'el-icon-s-finance',
          info: '项目管理',
          key: 'Project',
          path: '/dashboard',
          slider: devOpsAsyncRoutes
        },
        {
          icon: 'el-icon-s-goods',
          info: 'api',
          key: 'Api',
          path: '/dashboard',
          slider: devOpsAsyncRoutes
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentProduct',
      'currentProductTitle',
      'currentProductPath'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    changeProduct(menu) {
      this.$store.dispatch('app/setCurrentProduct', menu.key)
      this.$store.dispatch('app/setCurrentProductTitle', menu.info)
      this.$store.dispatch('app/setCurrentProductPath', menu.path)
      this.$refs['product-select-popper'].doClose()
      this.$store.dispatch('permission/setRoutes', menu.slider)
      this.$router.push({
        path: menu.path
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.click-product-select{
  min-height: 32px;
  border-radius: 2px;
  border: none;
  background: none;
  padding: 4px 8px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  >span{
    margin-right: 8px;
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #323437;
    white-space: nowrap;
    word-break: keep-all;
  }
  >i{
    font-size: 16px;
    color:rgba(150,152,155);
  }
}
.product-select-tooltip{
  // margin-top: 18px;
  background-color: #fff;
  padding: 20px 20px 12px 20px;
  border-radius: 4px;
  // max-width: 840px;
  .menu{
    display: flex;
    flex-wrap: wrap;
    .menu__item{
      width: 120px;
      height: 148px;
      display: flex;
      position: relative;
      flex-direction: column;
      border-radius: 4px;
      border: 1px solid rgba(50,52,55,0.3);
      padding: 20px 8px 12px 8px;
      margin-left: 16px;
      margin-bottom: 12px;
      align-items: center;
      cursor: pointer;
      background-color: rgb(247,249,252);
      >i{
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(0,122,245);
        margin-bottom: 12px;
      }
      .menu__item-info{
        min-width: 0;
        height: 44px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(50,52,55);
        display: flex;
        align-items: flex-start;
        text-align: center;
        overflow: hidden;
        overflow-wrap: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .menu__item:hover{
      border: 1px solid rgb(0,122,245);
      box-shadow: 0 0 8px 0 rgba(0,122,245,0.5);
    }
    .menu__item--actived{
      border: 1px solid rgb(0,122,245);
      background-color: rgb(0,122,245);
      border-color:rgb(0,122,245);
      color: white;
      cursor: default;
      position: relative;
      >i{
        color: #fff;
      }
      .menu__item-info{
        color: #fff;
      }
    }
  }
  .portal{
    display: flex;
    justify-content: flex-end;
    .portal__item{
      display: flex;
      align-items: center;
      height: 26px;
      padding: 0 8px;
      font-size: 16px;
      font-weight: 500;
      color: #007af5;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>

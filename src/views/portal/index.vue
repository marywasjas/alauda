<template>
  <div class="portal-main">
    <div class="banner">
      <div class="content">
        <div class="banner_title">CPaaS 全栈云原生开放平台</div>
        <div class="banner_desc">直面业务挑战，助力数字化转型，为企业提供一站式云原生平台</div>
      </div>
      <img :src="health_check_banner" alt="">
    </div>
    <div class="context_header">
      <div class="title">云产品</div>
      <div class="desc">已部署产品 & 集成产品</div>
    </div>
    <div class="card-list">
      <el-card v-for="item in gridData" :key="item.label" class="box-card card-item" shadow="hover">
        <i :class="item.icon" />
        <div class="product_name">{{ item.label }}</div>
        <div class="product_version">{{ item.version }}</div>
        <div class="product_desc">{{ item.desc }}</div>
        <div class="product_type">
          <el-tag type="info">{{ item.type }}</el-tag>
        </div>
      </el-card>
    </div>
    <div class="banner_footer">
      <div class="content">
        <div class="banner_title">产品介绍</div>
        <div class="banner_body">
          <div v-for="item in infoData" :key="item.label" class="box-card card-item">
            <div class="product_name">{{ item.label }}</div>
            <div class="product_list">
              <i :class="item.icon" />
              <div class="product_info">
                <div class="product_link">{{ item.version }}</div>
                <div class="product_desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img :src="health_check_banner_footer" alt="">
    </div>
  </div>
</template>

<script>
import health_check_banner from '@/assets/portal/banner-top.png'
import health_check_banner_footer from '@/assets/portal/banner-bottom.png'
import Mock from 'mockjs'
export default {
  name: 'Portal',
  props: {},
  data() {
    const gridData = Mock.mock([
      {
        label: 'Container Platform',
        icon: 'el-icon-s-help',
        version: 'v3.8.0',
        desc: '@cword(10,30)',
        type: '容器服务'
      },
      {
        label: 'DevOps',
        icon: 'el-icon-s-finance',
        version: 'v3.8.0',
        desc: '@cword(10,30)',
        type: '开发流程'

      },
      {
        label: '应用商店',
        icon: 'el-icon-s-shop',
        version: 'v3.8.0',
        desc: '@cword(10,30)',
        type: '应用商店'
      }
    ])
    const infoData = Mock.mock([
      {
        label: '计算服务',
        icon: 'el-icon-s-help',
        version: 'Container Platform',
        desc: '@cword(10,30)'
      },
      {
        label: '应用服务',
        icon: 'el-icon-s-finance',
        version: 'Service Mesh',
        desc: '@cword(10,30)'

      },
      {
        label: '开发流程',
        icon: 'el-icon-s-shop',
        version: 'DevOps',
        desc: '@cword(10,30)'
      }
    ])
    return {
      health_check_banner,
      health_check_banner_footer,
      gridData,
      infoData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.portal-main {
  width: 100%;
  min-height: 100%;
  background: $background-color;
  .banner {
    position: relative;
    color: #fff;
    height: 180px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .banner_title {
        font-size: $font-size-36;
        line-height: $line-height-38;
        font-weight: bold;
      }
      .banner_desc {
        font-size: $font-size-18;
        padding-top: 8px;
      }
    }
    > img {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      opacity: 0.6;
    }
  }
  .context_header{
    margin: 30px 0 20px 0;
    text-align: center;
    .title{
      font-size: $font-size-24;
      font-weight: 500;
    }
    .desc{
      padding-top: 8px;
      font-size: $font-size-14;
    }
  }
  .card-list{
    max-width: 1770px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    .card-item{
      margin: 8px;
      width: 338px;
      cursor: pointer;
      text-align: center;
      i{
        color: $color-primary;
        margin-bottom: 12px;
        font-size: $font-size-46;
      }
      .product_name{
        line-height: $line-height-24;
        font-size:$font-size-18;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .product_version{
        line-height: $line-height-20;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .product_desc{
        line-height: $line-height-32;
        font-size:$font-size-12;
        margin-bottom: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .banner_footer{
    position: relative;
    color: #fff;
    height: 242px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .banner_title {
        font-size: $font-size-24;
        font-weight: bold;
        margin: 40px 0 30px;
      }
      .banner_body{
        display: flex;
        justify-content: center;
        .card-item{
          width: 200px;
          margin: 0 10px;
          .product_name{
            padding-left: 32px;
            font-size: $font-size-18;
          }
          .product_list{
            margin-top: 16px;
            display: flex;
            i{
              font-size: $font-size-32;
              margin-right: 8px;
              color: $color-primary;
            }
            .product_info{
              .product_link{
                color:$color-primary;
                margin-bottom: 2px;
                cursor: pointer;
              }
              .product_desc{
                font-size: $font-size-12;
              }
            }
          }
        }
      }
    }
    > img {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      opacity: 0.6;
    }
  }
}
</style>

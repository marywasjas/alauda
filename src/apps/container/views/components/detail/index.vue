<template>
  <div class="detail-container">
    <div class="detail-header">
      <div class="detail-header-top">
        <span>{{ link_name }}</span>
        <div class="detail-header-top-t">
          <el-button type="primary" icon="el-icon-caret-right">启动</el-button>
          <el-button disabled type="info" plain style="margin-right: 10px">停止</el-button>
          <el-dropdown>
            <el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>更新</el-dropdown-item>
              <el-dropdown-item>管理资源</el-dropdown-item>
              <el-dropdown-item>分发</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <hr>
      </div>
      <div class="detail-header-bottom">
        <el-menu
          text-color="#666666"
          active-text-color="#1890ff"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">详情信息</el-menu-item>
          <el-menu-item index="2">YAML</el-menu-item>
          <el-menu-item index="3">容器组</el-menu-item>
          <el-menu-item index="4">配置</el-menu-item>
          <el-menu-item index="5">日志</el-menu-item>
          <el-menu-item index="6">事件</el-menu-item>
          <el-menu-item index="7">监控</el-menu-item>
          <el-menu-item index="8">告警</el-menu-item>
        </el-menu>
      </div>
    </div>
    <DetailInformation />
  </div>
</template>

<script>
import DetailInformation from './content/detailInformation.vue'

export default {
  name: 'Detail',
  components: {
    DetailInformation
  },
  data() {
    return {
      link_name: ''
    }
  },
  created() {
    console.log(this.$route.query.link_name)
    this.link_name = this.$route.query.link_name
  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  width: 100%;
  padding: 20px 20px;
  background-color: rgb(240, 242, 245);
  border: 1px solid #eee;
  .detail-header {
    background-color: #fff;
    border: 1px solid #eee;
    margin-bottom: 10px;
    .detail-header-top {
      padding: 0 17px;

      .detail-header-top-t {
        float: right;
        padding-top: 15px;
      }
      span {
        height: 60px;
        line-height: 60px;
        display: inline-block;
        font-size: 20px;
        font-weight: 700;
        color: rgb(50, 52, 55);
      }
      hr {
        border: none;
        height: 1px;
        background-color: #e4e7ed;
      }
    }
  }
}
.el-menu-item {
  font-size: 18px !important;
  font-weight: 700 !important;
}
</style>

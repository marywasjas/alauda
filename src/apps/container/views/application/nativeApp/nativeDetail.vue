<template>
  <div class="native-detail">
    <el-card class="box-card">
      <div slot="header" class="flex-center">
        <div class="title">
          <p>{{ name }}</p>
          <p>{{ desc }}</p>
        </div>
        <div>
          <el-button type="primary">启动</el-button>
          <el-button type="info">停止</el-button>
          <el-dropdown class="margin-left10">
            <el-button>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in dropList" :key="item.id">{{
                item.txt
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-menu
          text-color="#666666"
          active-text-color="#1890ff"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1" @click="comName = 'DetailInformation'">详情信息</el-menu-item>
          <el-menu-item index="2" @click="comName = 'YamlInfor'">YAML</el-menu-item>
          <el-menu-item index="3" @click="comName = 'ContainerGroup'">容器组</el-menu-item>
          <el-menu-item index="4">配置</el-menu-item>
          <el-menu-item index="5">日志</el-menu-item>
          <el-menu-item index="6">事件</el-menu-item>
          <el-menu-item index="7">监控</el-menu-item>
          <el-menu-item index="8">告警</el-menu-item>
        </el-menu>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NativeDetail',
  components: {},
  props: {},
  data() {
    return {
      name: this.$route.query.name,
      desc: this.$route.query.desc,
      dropList: [
        { id: 0, txt: '更新' },
        { id: 1, txt: '管理资源' },
        { id: 2, txt: '分发' },
        { id: 3, txt: '删除' }
      ]
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
.native-detail {
  padding: 0 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  position: relative;
  .title{
    p{
      margin: 0;
      font-size:$font-size-20;
      color: $font-color-title;
      line-height:$line-height-22;
    }
    p:last-child {
      font-size: $font-size-14;
      color: $font-color-subtext;
    }
  }
}
</style>

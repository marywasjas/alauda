<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header :name="name" :desc="desc" :tab-list="tabList" :active-name="activeName" @changeActive="changeActive">
        <template v-slot:headerRight>
          <el-dropdown>
            <el-button
              type="primary"
              class="margin-left10"
            >操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>更新</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from '@/apps/container/views/components/TabHeader'

// import BaseInfo from '@/apps/views/configure/components/BaseInfo/BaseInfo.vue'
// import Yaml from '@/apps/views/configure/components/Yaml.vue'
// import CalculationComponent from '@/apps/views/configure/components/CalculationComponent/CalculationComponent.vue'

export default {
  name: 'Detail',
  components: {
    TabHeader,
    BaseInfo,
    Yaml,
    CalculationComponent
  },
  data() {
    return {
      name: '',
      desc: '',
      tabList: [
        {
          label: '详细信息',
          name: 'baseInfo',
          com: 'BaseInfo'
        },
        {
          label: 'YAML',
          name: 'yaml',
          com: 'Yaml'
        },
        {
          label: '计算组件',
          name: 'calculationComponent',
          com: 'CalculationComponent'
        }
      ],
      activeName: ''
    }
  },
  computed: {
    comName: function() {
      if (!this.activeName) return ''
      const item = this.tabList.filter(el => el.name === this.activeName)
      return item[0].com
    }
  },
  created() {
    this.name = this.$route.query.name
    this.desc = this.$route.query.desc
    this.activeName = this.tabList[0].name
  },
  methods: {
    changeActive(value) {
      this.activeName = value
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>

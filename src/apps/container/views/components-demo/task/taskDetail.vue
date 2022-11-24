<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header :name="name" :tab-list="tabList" :active-name="activeName" @changeActive="changeActive">
        <template v-slot:headerRight>
          <el-dropdown>
            <el-button class="margin-left10">操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>更新</el-dropdown-item>
              <el-dropdown-item>管理资源</el-dropdown-item>
              <el-dropdown-item>分发</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" :name="name" />
  </div>
</template>

<script>
import TabHeader from '@/apps/container/views/components/TabHeader'
import ContainerGroup from './components/ContainerGroup.vue'
import BaseInfo from './components/BaseInfo.vue'
import Yaml from './components/Yaml.vue'
import Journal from './components/Journal.vue'
import Event from './components/Event.vue'
import Configuration from './components/Configuration.vue'

export default {
  name: 'Detail',
  components: {
    TabHeader,
    BaseInfo,
    Yaml,
    ContainerGroup,
    Configuration,
    Journal,
    Event
  },
  data() {
    return {
      name: '',
      tabList: [
        {
          label: '详细信息',
          name: 'baseInfo',
          com: 'BaseInfo'
        },
        {
          label: '容器组',
          name: 'containerGroup',
          com: 'ContainerGroup'
        },
        {
          label: 'YAML',
          name: 'yaml',
          com: 'Yaml'
        },
        {
          label: '配置',
          name: 'configuration',
          com: 'Configuration'
        },

        {
          label: '日志',
          name: 'journal',
          com: 'Journal'
        },
        {
          label: '事件',
          name: 'event',
          com: 'Event'
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

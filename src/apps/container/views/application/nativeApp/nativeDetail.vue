<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header :name="name" :desc="desc" :tab-list="tabList" :active-name="activeName" @changeActive="changeActive">
        <template v-slot:headerRight>
          <el-button type="primary">启动</el-button>
          <el-button type="info">停止</el-button>
          <el-dropdown>
            <el-button
              type="primary"
              class="margin-left10"
            >操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
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
    <component :is="comName" log-back-name="NativeDetail" />
  </div>
</template>

<script>
import TabHeader from '@/apps/container/views/components/TabHeader'
import ContainerGroupTable from '@/apps/container/views/components/ContainerGroupTable/ContainerGroup.vue'
import BaseInfo from './components/BaseInfo/BaseInfo.vue'
import Topology from './components/Topology.vue'
import Yaml from '@/apps/container/views/components/Details/Yaml'
import VersionSnapshot from './components/VersionSnapshot/VersionSnapshot.vue'
import Journal from '@/apps/container/views/components/Details/Journal'
import Event from '@/apps/container/views/components/Details/Event'
import Monitor from '@/apps/container/views/components/Details/Monitor'
import GiveAlarm from './components/GiveAlarm/GiveAlarm.vue'

export default {
  name: 'Detail',
  components: {
    TabHeader,
    BaseInfo,
    Topology,
    Yaml,
    ContainerGroupTable,
    VersionSnapshot,
    Journal,
    Event,
    Monitor,
    GiveAlarm
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
          label: '拓扑',
          name: 'topology',
          com: 'Topology'
        },
        {
          label: 'YAML',
          name: 'yaml',
          com: 'Yaml'
        },
        {
          label: '容器组',
          name: 'containerGroup',
          com: 'ContainerGroupTable'
        },
        {
          label: '版本快照',
          name: 'versionSnapshot',
          com: 'VersionSnapshot'
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
        },
        {
          label: '监控',
          name: 'monitor',
          com: 'Monitor'
        }
        // {
        //   label: '告警',
        //   name: 'giveAlarm',
        //   com: 'GiveAlarm'
        // }
      ],
      activeName: '',
      comName: ''
    }
  },
  computed: {
  },
  watch: {
    activeName: function(newVal, oldVal) {
      const item = this.tabList.filter(el => el.name === newVal)
      this.comName = item[0].com
    }
  },
  created() {
    this.name = this.$route.query.name
    this.desc = this.$route.query.desc
    if (this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName
      this.comName = this.tabList.filter(el => el.name === this.$route.query.activeName)[0].com
    } else {
      this.activeName = this.tabList[0].name
      this.comName = this.tabList[0].com
    }
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

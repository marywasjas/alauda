<template>
  <div class="Yaml-container">
    <div class="Yaml-header tab-header__header-wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
      </el-tabs>
    </div>
    <component :is="comName" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'
import YamlList from './components/YamlList.vue'
export default {
  name: 'YamlConversion',
  components: { TaskList, YamlList },
  data() {
    return {
      tabList: [
        {
          label: 'Yaml列表',
          name: 'YamlList',
          com: 'YamlList'
        },
        {
          label: '任务列表',
          name: 'TaskList',
          com: 'TaskList'
        }
      ],
      activeName: '',
      comName: ''
    }
  },
  computed: {},
  watch: {
    activeName: function(newVal, oldVal) {
      const item = this.tabList.filter(el => el.name === newVal)
      this.comName = item[0].com
    }
  },
  created() {
    this.activeName = this.tabList[0].name
    this.comName = this.tabList[0].com
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.Yaml-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
  .Yaml-header {
    background-color: #fff;
    padding: 10px 0 0 10px;
  }
}
</style>

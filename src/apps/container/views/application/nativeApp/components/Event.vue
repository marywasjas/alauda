<template>
  <div class="event-container margin-top">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span />
        </div>
      </header>
      <section class="component-div">
        <el-form :model="searchForm" label-width="90px" label-suffix=":">
          <div class="flex-start">
            <el-form-item label="资源类型" style="margin-bottom: 10px;width:40%;">
              <el-select
                v-model="searchForm.containerGroup"
                placeholder="默认为全部"
                style="width: 100%"
              >
                <el-option
                  v-for="con in containerGroupList"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="事件原因" style="margin-bottom: 10px;width:40%;">
              <el-select
                v-model="searchForm.container"
                placeholder="默认为全部"
                style="width: 100%"
              >
                <el-option
                  v-for="con in containerList"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex-center">
            <el-form-item label="资源名称" style="margin-bottom: 10px;flex:1;">
              <el-select
                v-model="searchForm.logType"
                placeholder="可输可选，按回车确定，支持添加多个资源名称"
                multiple
                collapse-tags
                style="width: 100%"
              >
                <el-option label="当前容器日志" value="currentLog" />
                <el-option label="历史容器日志" value="historyLog" />
              </el-select>
            </el-form-item>
            <el-form-item label="" style="margin-bottom: 10px;margin-left:10px;" label-width="0px">
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </div>
          <div />
        </el-form>
      </section>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: 'Event',
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        containerGroup: '',
        container: '',
        logType: ''
      },
      currentCode: '2022-11-18 无日志',
      language: 'javascript',
      containerGroupList: [
        {
          label: 'nginx-nginx-75b4568c7c-fphvc',
          value: 'nginx-nginx-75b4568c7c-fphvc'
        }
      ],
      containerList: [{ label: 'nginx', value: 'nginx' }]
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
.event-container {
}
</style>

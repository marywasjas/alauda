<template>
  <div class="journal-container margin-top">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span />
        </div>
      </header>
      <section class="component-div">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="容器组" style="margin-bottom:0">
            <el-select v-model="searchForm.containerGroup" placeholder="容器组">
              <el-option v-for="con in containerGroupList" :key="con.value" :label="con.label" :value="con.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="容器" style="margin-bottom:0">
            <el-select v-model="searchForm.container" placeholder="容器">
              <el-option v-for="con in containerList" :key="con.value" :label="con.label" :value="con.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="日志类型" style="margin-bottom:0">
            <el-select v-model="searchForm.logType" placeholder="日志类型">
              <el-option label="当前容器日志" value="currentLog" />
              <el-option label="历史容器日志" value="historyLog" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="yaml-div">
          <monaco-editor
            ref="monacoEditor"
            :show-title="false"
            :auto-update="true"
            :code="currentCode"
            :read-only="true"
            :language="language"
          />
        </div>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'

export default {
  name: 'Journal',
  components: { MonacoEditor },
  props: {},
  data() {
    return {
      searchForm: {
        containerGroup: '',
        container: '',
        logType: ''
      },
      currentCode: '2022-11-21 无日志',
      language: 'javascript',
      containerGroupList: [
        { label: 'nginx-nginx-75b4568c7c-fphvc', value: 'nginx-nginx-75b4568c7c-fphvc' }
      ],
      containerList: [
        { label: 'nginx', value: 'nginx' }
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
</style>

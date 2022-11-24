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
          <div>
            <div class="text-right">
              <el-select
                v-model="containerTime"
                filterable
                placeholder="请选择"
                size="mini"
              >
                <i slot="prefix" class="el-input__icon el-icon-search" />
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <line-chart :chart-data="containerLineData" :show-total="true" class="margin-top10" style="height:400px;" />
          </div>
        </el-form>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import Mock from 'mockjs'
import LineChart from '@/apps/container/views/components/LineChart'
export default {
  name: 'Event',
  components: { LineChart },
  props: {},
  data() {
    const containerLineData = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '异常',
          flied: 'yc'
        }
      ],
      'data|10': [{
        name: '@date',
        yxz: '@integer(0 ,10)',
        yc: '@integer(0 ,10)'
      }]
    })
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
      containerList: [{ label: 'nginx', value: 'nginx' }],
      containerTime: '近 1 小时',
      timeOptions: [
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
        },
        {
          value: '近 12 小时',
          label: '近 12 小时'
        },
        {
          value: '近 1 天',
          label: '近 1 天'
        },
        {
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        }
      ],
      containerLineData
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

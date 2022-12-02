<template>
  <div class="tab-main">
    <el-form :model="searchForm" label-width="90px" label-suffix=":">
      <div class="flex-start">
        <el-form-item label="应用" style="margin-bottom: 10px; width: 40%">
          <el-select v-model="tabForm.containerGroup" placeholder="默认为全部" style="width: 100%">
            <el-option v-for="con in containerGroupList" :key="con.value" :label="con.label" :value="con.value" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-center">
        <el-form-item label="查询条件" style="margin-bottom: 10px; flex: 1">
          <el-select
            v-model="tabForm.logType"
            placeholder="支持nodename/podname/containerid/containername/path，支持关键字查询，支持添加多个条件，按回车确定"
            multiple
            collapse-tags
            style="width: 100%"
          >
            <el-option label="11111" value="currentLog" />
            <el-option label="22222" value="historyLog" />
          </el-select>
        </el-form-item>
        <el-form-item label="" style="margin-bottom: 10px; margin-left: 10px" label-width="0px">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
        <el-form-item label="" label-width="0" class="margin-left10" style="margin-bottom: 5px">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" />
            <i class="el-icon-question question-icon" />
          </el-tooltip>
        </el-form-item>
      </div>
    </el-form>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>共{{ total }}条日志</span>
          <el-select v-model="containerTime" filterable placeholder="请选择" size="mini" style="float: right">
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </header>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  components: {},
  data() {
    return {
      tabForm: {
        containerGroup: '',
        container: '',
        logType: ''
      },
      containerGroupList: [
        {
          label: 'nginx-nginx-75b4568c7c-fphvc',
          value: 'nginx-nginx-75b4568c7c-fphvc'
        }
      ],
      total: 10,
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
      ]
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.tab-main {
  padding: 20px 20px 20px 0px;
  .card-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

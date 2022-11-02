<template>
  <div class="dashboard-editor-container">
    <overview-banner />
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="16">
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>资源配额</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="“不限制”指未设置命名空间的配额，此时上限默认取此项目在集群"
                placement="top"
              >
                <i class="el-icon-question" />
              </el-tooltip>
            </div>
          </header>
          <section class="component-div">
            <box-card />
          </section>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>事件</span>
              <i class="el-icon-s-unfold" />
            </div>
          </header>
          <section class="component-div">
            <div class="event-container">
              <div class="total">
                <span class="number">97</span>
                <span class="text">总数</span>
                <span>（近1天）</span>
              </div>
              <div class="chart-wrap">
                <bar-chart-signle />
              </div>
            </div>
          </section>
        </BaseCard>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="8">
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>应用</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="OAM 应用和原生应用的状态统计"
                placement="top"
              >
                <i class="el-icon-question" />
              </el-tooltip>
            </div>
          </header>
          <section>
            <pie-chart />
          </section>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>计算组件</span>
            </div>
          </header>
          <section>
            <pie-chart />
          </section>
        </BaseCard>
      </el-col>
    </el-row>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>容器组</span>
        </div>
      </header>
      <section>
        <bar-chart />
      </section>
    </BaseCard>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>资源使用率</span>
              <el-select v-model="time" filterable placeholder="请选择" size="mini">
                <i slot="prefix" class="el-input__icon el-icon-search" />
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </header>
          <section>
            <raddar-chart />
          </section>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>资源使用量 Top5</span>
              <div>
                <el-button type="primary" round size="mini">内存</el-button>
                <el-button round size="mini">CPU</el-button>
              </div>
            </div>
          </header>
          <section>
            <line-chart :chart-data="lineChartData.newVisitis" />
          </section>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OverviewBanner from './components/OverviewBanner'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import BoxCard from './components/BoxCard'
import BarChartSignle from './components/BarChartSingle.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    OverviewBanner,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    BoxCard,
    BarChartSignle
  },
  data() {
    return {
      lineChartData: lineChartData,
      time: '近 1 小时',
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
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.component-div{
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: center;
  >div{
    flex: 1;
    height: 100%;
  }
}
.event-container{
  margin-top: 20px;
  .total{
    margin-bottom: 16px;
    .number{
      color:$font-color-title;
      font-size: 40px;
      line-height: 1;
      margin-right: 8px;
    }
    .text{
      margin-right:20px;
    }
  }
}
.chart-wrap{
  width: 100%;
  height: calc(100% - 56px);
}
</style>

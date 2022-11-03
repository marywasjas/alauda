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
            <progress-card :chart-data="resourceData" />
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
                <span class="number">{{ total }}</span>
                <span class="text">总数</span>
                <span>（近1天）</span>
              </div>
              <div class="chart-wrap">
                <bar-chart-signle :chart-data="eventData" />
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
          <section class="component-div">
            <radius-pie-chart :chart-data="applicationData" />
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
          <section class="component-div">
            <transverse-bar :chart-data="computeData" />
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
        <div class="container-top flexbox">
          <div class="container-top-left">
            <radius-pie-chart :chart-data="containerData" />
          </div>
          <div class="container-top-right">
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
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </div>
        </div>
        <div class="container-bottom">
          <span>异常容器组</span>
          <el-table
            :data="containerList.data"
            style="width: 100%"
            height="300px"
            header-row-class-name="headerStyle"
          >
            <el-table-column
              v-for="col in containerColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'name'" class="cursor-pointer">
                  {{ scope.row[col.id] }}
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>资源使用率</span>
              <el-select
                v-model="resourceTime"
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
          </header>
          <section class="component-div component-div2">
            <line-chart :chart-data="resourceLineData" class="margin-top" />
          </section>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>资源使用量 Top5</span>
              <div>
                <el-button
                  :type="activeKey === 'nc' ? 'primary' : null"
                  round
                  size="mini"
                  @click="activeKey = 'nc'"
                >内存</el-button>
                <el-button
                  :type="activeKey === 'cpu' ? 'primary' : null"
                  round
                  size="mini"
                  @click="activeKey = 'cpu'"
                >CPU</el-button>
              </div>
            </div>
          </header>
          <section class="component-div component-div2">
            <el-table
              class="margin-top"
              :data="topList.data"
              style="width: 100%"
              height="100%"
              header-row-class-name="headerStyle"
            >
              <el-table-column
                v-for="col in topColumnList"
                :key="col.id"
                :label="col.label"
              >
                <template slot-scope="scope">
                  <div v-if="col.id === 'name'" class="cursor-pointer">
                    {{ scope.row[col.id] }}
                  </div>
                  <div v-else>
                    {{ scope.row[col.id] }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OverviewBanner from './components/OverviewBanner'
// 资源配额
import ProgressCard from './components/ProgressCard'
// 事件  单个柱状图组件
import BarChartSignle from './components/BarChartSingle.vue'
// 应用 圆角饼图组件
import RadiusPieChart from './components/RadiusPieChart.vue'
// 计算组件
import TransverseBar from './components/TransverseBar.vue'
//
import LineChart from './components/LineChart'
import {
  resourceData,
  eventData,
  applicationData,
  computeData,
  containerData,
  containerLineData,
  containerColumnList,
  containerList,
  resourceLineData,
  topColumnListnc,
  topColumnListcpu,
  topList
} from './constant'
export default {
  name: 'DashboardAdmin',
  components: {
    OverviewBanner,
    ProgressCard,
    BarChartSignle,
    RadiusPieChart,
    TransverseBar,
    LineChart
  },
  data() {
    return {
      // 资源配额
      resourceData,
      // 事件 数据
      total: 97,
      eventData,
      // 应用
      applicationData,
      // 计算组件
      computeData,
      // 容器组
      containerData,
      containerTime: '近 1 小时',
      containerLineData,
      containerColumnList,
      containerList,
      // 资源使用率
      resourceTime: '近 1 小时',
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
      resourceLineData,
      // 资源使用量 Top5
      activeKey: 'nc',
      topColumnListnc,
      topColumnListcpu,
      topList
    }
  },
  computed: {
    topColumnList: function() {
      return this.activeKey === 'nc' ? topColumnListnc : topColumnListcpu
    }
  },
  created() {
    this.total = this.eventData.reduce((pre, cur) => {
      return pre + cur.value
    }, 0)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.component-div {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.component-div2 {
  height: 400px;
}
.event-container {
  margin-top: 20px;
  .total {
    margin-bottom: 16px;
    .number {
      color: $font-color-title;
      font-size: 40px;
      line-height: 1;
      margin-right: 8px;
    }
    .text {
      margin-right: 20px;
    }
  }
}
.chart-wrap {
  width: 100%;
  height: calc(100% - 56px);
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display:flex;
  align-items:center;
  .chart{
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select{
    margin-bottom: 20px;
  }
  .chart{
    height: 200px !important;
  }
}
.container-bottom {
  margin-top: 20px;
  > span {
    font-weight: 500;
  }
}
</style>

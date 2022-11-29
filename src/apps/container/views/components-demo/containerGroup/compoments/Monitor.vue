<template>
  <div class="monitor-container margin-top">
    <div class="monitor-header">
      <div>容器组</div>
      <div id="chart" />
    </div>
    <BaseCard>
      <section>
        <div class="margin-top">
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                趋势统计
                <el-tooltip class="item" effect="dark" content="使用率 = 使用值/限制值" placement="top">
                  <i class="el-icon-question question-icon margin-left10" />
                </el-tooltip>
              </span>
              <div>
                <div class="text-right">
                  <el-select v-model="containerTime" filterable placeholder="请选择" size="mini">
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                    <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>CPU{{ cpuType }}{{ cpuType === '使用率' ? '（%）' : '（m）' }}</span>
                    <el-radio-group v-model="cpuType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="使用率" />
                      <el-radio-button label="使用量" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>内存{{ memoryType }}{{ memoryType === '使用率' ? '（%）' : '（m）' }}</span>
                    <el-radio-group v-model="memoryType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="使用率" />
                      <el-radio-button label="使用量" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>网络流量{{ networkFlowType }}速率(Kbps)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="网络流量速率 = 计算组件中每个容器组的网络流量速率总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group v-model="networkFlowType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="流入" />
                      <el-radio-button label="流出" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>网络报文量{{ NetworkMessageVolumeType }}速率(个/秒)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="网络报文量速率 = 计算组件中每个容器组的网络报文量速率总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group
                      v-model="NetworkMessageVolumeType"
                      size="small"
                      style="float: right; padding: 3px 0"
                    >
                      <el-radio-button label="接收" />
                      <el-radio-button label="发送" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import Mock from 'mockjs'
import * as echarts from 'echarts'
import LineChart from '@/apps/container/views/components/LineChart'

export default {
  name: 'Monitor',
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
      'data|10': [
        {
          name: '@date',
          yxz: '@integer(0 ,10)',
          yc: '@integer(0 ,10)'
        }
      ]
    })
    const computeData1 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '部署',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    const computeData2 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '有状态副本集',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    const computeData3 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '守护进程集',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    return {
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
      containerLineData,
      computeData1,
      computeData2,
      computeData3,
      cpuType: '使用率',
      memoryType: '使用率',
      networkFlowType: '流入',
      NetworkMessageVolumeType: '接收',
      diskType: '读',
      diskIOPSType: '读'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('chart')
      const myChart = echarts.init(chartDom)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          icon: 'circle',
          top: '20%',
          left: '10%',
          formatter: function(name) {
            const data = option.series[0].data // 第1组数据
            const data2 = option.series[1].data // 第2组数据
            const name1 = option.series[0].name // 第1组数据的name

            let tarValue // 定义一个最终结果变量
            let total1 = 0 // 定义一个变量，接收第1组数据的和
            let total2 = 0 // 定义一个变量，接收第2组数据的和

            for (let i = 0; i < data.length; i++) {
              total1 += data[i]
              total2 += data2[i]

              if (name === name1) {
                // 如果模版变量name=name1，就把第1组数据的和total1赋给tarValue
                tarValue = total1
              } else {
                // 如果模版变量name=name2，就把第1组数据的和total2赋给tarValue
                tarValue = total2
              }
            }
            return name + ': ' + tarValue
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['']
        },
        series: [
          {
            name: `运行中 `,
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              // 自定义颜色
              normal: {
                color: '#339900'
              }
            },
            data: [1]
          },
          {
            name: '处理中',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              // 自定义颜色
              normal: {
                color: '#1890ff'
              }
            },
            data: [2]
          },
          {
            name: '完成',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              // 自定义颜色
              normal: {
                color: '#99ff00'
              }
            },
            data: [1]
          },
          {
            name: '错误',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              // 自定义颜色
              normal: {
                color: 'red'
              }
            },
            data: [2]
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-container {
  .monitor-header {
    padding: 20px;
    margin-bottom: 10px;
    background-color: #fff;
  }
}
#chart {
  width: 600px;
  height: 100px;
}
</style>

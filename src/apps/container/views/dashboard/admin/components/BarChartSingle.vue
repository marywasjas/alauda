<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000

export default {
  name: 'BarChartSingle',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: 0,
          bottom: 0,
          right: 0,
          top: 0
        },
        legend: {
          data: ['警告', '正常'],
          top: 0,
          left: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['事件'],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '正常',
            type: 'bar',
            tooltip: {
              valueFormatter: function(value) {
                return value
              }
            },
            data: [20],
            barWidth: 12,
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [30, 30, 0, 0]
              }
            }
          },
          {
            name: '警告',
            type: 'bar',
            tooltip: {
              valueFormatter: function(value) {
                return value
              }
            },
            data: [48],
            barWidth: 12,
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [30, 30, 0, 0]
              }
            }
          }
        ]
      })
    }
  }
}
</script>

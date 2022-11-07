<template>
  <!-- 单一柱状图显示 组件 -->
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
    },
    chartData: {
      type: Array,
      default: () => {
        return [
          {
            label: '警告',
            value: 0
          },
          {
            label: '正常',
            value: 0
          }
        ]
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true
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
      console.log(this.chartData)
      const seriesData = this.chartData.map(item => {
        return {
          name: item.label,
          type: 'bar',
          tooltip: {
            valueFormatter: function(value) {
              return value
            }
          },
          data: [item.value],
          barWidth: 12,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        }
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '3%',
          bottom: '8%'
        },
        legend: {
          top: 0,
          left: 0,
          icon: 'circle',
          itemWidth: 8, // 设置宽度
          itemHeight: 8
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
              show: false
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
        series: seriesData
      })
    }
  }
}
</script>

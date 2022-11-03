<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
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
      type: Object,
      required: true
    },
    showTotal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart()
      }
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
      const xAxisData = this.chartData.data.map(i => i.name)
      let seriesData = []
      seriesData = this.chartData.fields.map(i => {
        return {
          name: i.name,
          smooth: true,
          type: 'line',
          data: this.chartData.data.map(n => n[i.flied]),
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          itemStyle: {
            normal: {
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          }
        }
      })
      if (this.showTotal) {
        const totalData = []
        this.chartData.data.map(i => {
          const total = this.chartData.fields.reduce((pre, cur) => {
            return pre + i[cur.flied]
          }, 0)
          totalData.push(total)
        })
        const totalSeries = {
          name: '总',
          smooth: true,
          type: 'line',
          data: totalData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          itemStyle: {
            normal: {
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          }
        }
        seriesData.push(totalSeries)
      }
      this.chart.setOption({
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: 0,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          right: 0,
          top: 0
        },
        series: seriesData
      })
    }
  }
}
</script>

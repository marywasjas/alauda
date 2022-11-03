<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  name: 'RadiusPieChart',
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
      const total = this.chartData.reduce((pre, cur) => {
        return pre + cur.value
      }, 0)
      const chartDeal = this.chartData.map((i) => {
        return {
          ...i,
          name: i.label
        }
      })

      this.chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        title: {
          show: true,
          text: `${total}个`,
          subtext: '总数',
          left: '25%',
          top: 'center',
          textVerticalAlign: 'middle'
        },
        legend: {
          top: 'center',
          right: '1%',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 8, // 设置宽度
          itemHeight: 8
        },
        series: [
          {
            name: '应用',
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['30%', '50%'],
            // avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              text: '总数'
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: chartDeal
          }
        ]
      })
    }
  }
}
</script>

<template>
  <div class="monitor-container">
    <div class="chart-header">
      <div class="chart-header-title">容器组</div>
      <div id="chart_1" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Monitor',

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      const chartDom = document.getElementById('chart_1')
      const myChart = echarts.init(chartDom)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            // type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          icon: 'circle'
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
            name: '总数',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              focus: 'series'
            },
            data: [2]
          },
          {
            name: '运行中',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              focus: 'series'
            },
            data: [0]
          },

          {
            name: '处理中',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              focus: 'series'
            },
            data: [1]
          },
          {
            name: '完成',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              focus: 'series'
            },
            data: [1]
          },
          {
            name: '错误',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              focus: 'series'
            },
            data: [0]
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.monitor-container {
  background-color: #fff;
  padding: 20px 10px;
  .chart-header-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
#chart_1 {
  width: 600px;
  height: 50px;
}
</style>

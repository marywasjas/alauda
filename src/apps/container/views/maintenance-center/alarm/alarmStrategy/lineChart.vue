<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/apps/container/views/dashboard/admin/components/mixins/resize";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const endHour = addZero(new Date().getHours());
const startHour = addZero(new Date().getHours() - 1);
const minute = addZero(new Date().getMinutes());
const endTime = `${endHour}:${minute}`;
const startTime = `${startHour}:${minute}`;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },

    width: {
      type: String,
      default: "100%",
    },

    height: {
      type: String,
      default: "100%",
    },

    chartData: {
      type: Object,
      required: true,
    },

    showTotal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      handler(val) {
        this.initChart();
      },
      deep: true,
    },
  },

  mounted() {
    // 初始化
    this.$nextTick(() => {
      this.initChart();
    });
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getRecent15Minutes() {},

    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      const xAxisData = this.chartData.data.map((i) => i.name);

      let seriesData = [];
      seriesData = this.chartData.fields.map((i) => {
        return {
          type: "line",
          name: i.name,
          data: this.chartData.data.map((n) => n[i.flied]),
          // data: data,
          //折线拐点标志的样式
          itemStyle: {
            normal: {
              areaStyle: {
                color: "#f3f8ff",
              },
            },
          },
          lineStyle: {
            color: "#409EFF",
          },
          // 平滑曲线显示
          smooth: true,
          // 平滑曲线去掉拐点标志
          symbol: "none",
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        };
      });

      // 不显示
      // if (this.showTotal) {
      //   const totalData = [];

      //   this.chartData.data.map((i) => {
      //     const total = this.chartData.fields.reduce((pre, cur) => {
      //       return pre + i[cur.flied];
      //     }, 0);
      //     totalData.push(total);
      //   });

      //   const totalSeries = {
      //     name: "总",
      //     smooth: true,
      //     type: "line",
      //     data: totalData,
      //     animationDuration: 2800,
      //     animationEasing: "cubicInOut",
      //     itemStyle: {
      //       normal: {
      //         areaStyle: {
      //           color: "#f3f8ff",
      //         },
      //       },
      //     },
      //   };

      //   seriesData.push(totalSeries);
      // }

      this.chart.setOption({
        xAxis: {
          // type:"time",
          data: [startTime, endTime],
          // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
          boundaryGap: false,
          // 1. 类目轴中 boundaryGap 可以配置为 true 和 false。
          //         默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
          // 2. 非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。
          axisTick: {
            // 是否显示坐标轴刻度
            show: true,
          },
        },
        yAxis: {
          max: 1,
          min: 0,
          splitNumber: 2,
          axisTick: {
            // 是否显示坐标轴刻度
            show: true,
          },
        },

        grid: {
          left: "5%",
          right: "5%",
          bottom: 0,
          top: 30,
          containLabel: true,
        },

        // 提示框组件
        tooltip: {
          trigger: "axis",
        },

        // 图例组件
        legend: {
          right: 0,
          top: 0,
        },

        series: seriesData,
      });
    },
  },
};
</script>

<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "@/apps/container/views/dashboard/admin/components/mixins/resize";
require("echarts/theme/macarons"); // echarts theme

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
        this.xTime();
      },
      deep: true,
    },
  },

  mounted() {
    // 初始化
    this.$nextTick(() => {
      this.initChart();
      this.xTime();
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
    xTime() {
      function addZero(i) {
        if (i < 10) i = "0" + i;
        return i;
      }

      var endHour = addZero(new Date().getHours());
      var startHour = addZero(new Date().getHours() - 1);
      var minute = addZero(new Date().getMinutes());
      var endTime = `${endHour}:${minute}`;
      var startTime = `${startHour}:${minute}`;

      if (new Date().getMinutes() > 0 && new Date().getMinutes() < 15)
        return [
          startTime,
          `${startHour}:15`,
          `${startHour}:30`,
          `${startHour}:45`,
          `${endHour}:00`,
          endTime,
        ];
      else if (new Date().getMinutes() > 15 && new Date().getMinutes() < 30)
        return [
          startTime,
          `${startHour}:30`,
          `${startHour}:45`,
          `${endHour}:00`,
          `${endHour}:15`,
          endTime,
        ];
      else if (new Date().getMinutes() > 30 && new Date().getMinutes() < 45)
        return [
          startTime,
          `${startHour}:45`,
          `${endHour}:00`,
          `${endHour}:15`,
          `${endHour}:30`,
          endTime,
        ];
      else if (new Date().getMinutes() > 45 && new Date().getMinutes() < 60)
        return [
          startTime,
          `${endHour}:00`,
          `${endHour}:15`,
          `${endHour}:30`,
          `${endHour}:45`,
          endTime,
        ];
      else if (new Date().getMinutes() == 0)
        return [
          startTime,
          `${startHour}:15`,
          `${startHour}:30`,
          `${startHour}:45`,
          endTime,
        ];
      else if (new Date().getMinutes() == 15)
        return [
          startTime,
          `${startHour}:30`,
          `${startHour}:45`,
          `${endHour}:00`,
          endTime,
        ];
      else if (new Date().getMinutes() == 30)
        return [
          startTime,
          `${startHour}:45`,
          `${endHour}:00`,
          `${endHour}:15`,
          endTime,
        ];
      else if (new Date().getMinutes() == 45)
        return [
          startTime,
          `${endHour}:00`,
          `${endHour}:15`,
          `${endHour}:30`,
          endTime,
        ];
    },

    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      // const xAxisData = this.chartData.data.map((i) => i.name);

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
                // color: "#4",
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

      this.chart.setOption({
        xAxis: {
          // // type:"time",
          // data: this.xTime(),
          // // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
          // boundaryGap: false,
          // // 1. 类目轴中 boundaryGap 可以配置为 true 和 false。
          // //         默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
          // // 2. 非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。
          // axisTick: {
          //   // 是否显示坐标轴刻度
          //   show: true,
          // },

          type: "time",
          axisLabel: {
            formatter: function (value) {
              // 自定义横坐标显示格式
              console.log(value);
              return echarts.format.formatTime("13:34", value); // 根据时间值返回小时:分钟格式的字符串
            },
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
          left: "0%", // 图表占据左侧 75% 的宽度
          right: "40%",
          bottom: "0%",
          containLabel: true,
        },

        legend: {
          orient: "vertical", // 图例竖直排列
          right: "230", // 图例在右侧
          top: "20%", // 图例垂直居中
          align: "left", // 图例文本左对齐

          textStyle: {
            fontSize: 12,
          },

          formatter: function (name) {
            console.log(name);
            return "Legend " + name;
          },
        },

        // 提示框组件
        tooltip: {
          trigger: "axis",
          formatter: function (a) {
            console.log(a);
            return `${new Date().toLocaleDateString()}  ${a[0].axisValue}:00
            ${a[0].marker}
            `;
          },

          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },

        // 图例组件
        // legend: {
        //   right: 0,
        //   top: 0,
        // },

        series: seriesData,
      });
    },
  },
};
</script>

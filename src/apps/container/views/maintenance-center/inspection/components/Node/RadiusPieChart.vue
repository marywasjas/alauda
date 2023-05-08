<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  name: "RadiusPieChart",
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
      type: Array,
      default: () => {
        return [
          { label: "故障", value: 0 },
          { label: "预警", value: 0 },
          { label: "正常", value: 0 },
        ];
      },
    },

    title: {
      type: String,
      default: "总数",
    },
  },

  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      handler(newVal, oldVal) {
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
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      const total = this.chartData.reduce((pre, cur) => {
        return pre + cur.value;
      }, 0);

      const chartDeal = this.chartData.map((i) => {
        return { ...i, name: i.label };
      });

      this.chart.setOption({
        // 提示框组件
        // tooltip: {
        //   // 触发类型 ==> 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
        //   trigger: "item",
        // },

        // 标题组件，包含主标题和副标题。
        title: {
          show: true, // 是否显示
          text: `${total}`, // 主标题文本
          textStyle: {
            fontSize: 30,
            color: "black",
          },
          subtext: this.title, // 副标题文本
          subtextStyle: {
            fontSize: 16,
            color: "black",
          },
          itemGap: 1,
          left: "100", // title 组件离容器左侧的距离
          top: "center", // title 组件离容器上侧的距离
          textVerticalAlign: "middle", // 整体（包括 text 和 subtext）的垂直对齐
          textAlign: "center",
        },

        // 图例组件。
        legend: {
          top: "center", // 图例组件离容器上侧的距离
          left: "65%", // 图例组件离容器右侧的距离
          orient: "vertical", // 图例列表的布局朝向
          icon: "circle", // 图例项的 icon
          itemWidth: 8, // 图例标记的图形宽度
          itemHeight: 8, // 图例标记的图形高度
          textStyle: {
            fontSize: 15,
          },
          formatter: function (name) {
            let res = chartDeal.filter((item) => {
              return item.name == name;
            });
            return `${name}  ${res[0].value}`;
          },
        },

        series: [
          {
            type: "pie",
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            // name: "应用",
            // 饼图的半径
            radius: ["65%", "80%"],
            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            center: ["35%", "50%"],
            // 图形样式
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2, // 表示内圆角半径和外圆角半径都是 10px
            },
            // 饼图图形上的文本标签
            label: {
              show: false,
              text: "总数",
            },

            emphasis: {
              label: {
                show: false,
              },
            },

            labelLine: {
              show: false,
            },

            data: chartDeal,
          },
        ],
      });
    },
  },
};
</script>

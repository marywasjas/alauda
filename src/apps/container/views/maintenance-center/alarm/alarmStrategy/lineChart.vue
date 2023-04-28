<template>
  <div class="bar-container">
    <!-- <div v-if="emptyFlag" class="noData">
      <span>暂无数据</span>
    </div> -->
    <div ref="lineData" class="bar-chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/apps/container/views/dashboard/admin/components/mixins/resize";

export default {
  name: "Linechart",
  mixins: [resize],

  components: {},
  // props: ["lineData"], // 接收父组件属性
  created() {},
  computed: {},
  mounted() {
    // 初始加载 调用函数
    this.loadLineData();
  },
  data() {
    return {
      lineData: null,
      emptyFlag: false,
    };
  },
  watch: {
    lineData: {
      // 深度监视
      deep: true,
      // 一旦监视对象发生变化，调用 loadLineData函数
      handler(newVal, oldVal) {
        this.loadLineData();
      },
    },
  },
  methods: {
    loadLineData() {
      // const { list } = this.lineData;

      // if (list.length < 1) {
      //   this.emptyFlag = true;
      //   return;
      // }

      const echartsData = echarts.init(this.$refs["lineData"]);

      // let xAxisData = list.map((i) => i.date);

      // let seriesData = list.map((i) => i.value);

      let data = [
        ["15:15", "0.06"],
        ["15:30", "0.06"],
        ["15:45", "0.06"],
        ["16:00", "0.06"],
      ];

      let option = {
        title: {
          text: "Beijing AQI",
          left: "1%",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "10%",
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          }),
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2014-06-01",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#93CE07",
            },
            {
              gt: 50,
              lte: 100,
              color: "#FBDB0F",
            },
            {
              gt: 100,
              lte: 150,
              color: "#FC7D02",
            },
            {
              gt: 150,
              lte: 200,
              color: "#FD0100",
            },
            {
              gt: 200,
              lte: 300,
              color: "#AA069F",
            },
            {
              gt: 300,
              color: "#AC3B2A",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        series: {
          name: "cert-manager",
          type: "line",
          data: data.map(function (item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
            data: [
              {
                yAxis: 50,
              },
              {
                yAxis: 100,
              },
              {
                yAxis: 150,
              },
              {
                yAxis: 200,
              },
              {
                yAxis: 300,
              },
            ],
          },
        },
      };
      // this.lineData.setOption(option)
      echartsData.setOption(option, true);
    },
  },
};
</script>
<style scoped>
.bar-container {
  width: 100%;
  height: 100%;
}
.bar-chart {
  width: 100%;
  height: 100%;
}
.noData {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noData span {
  font-size: 12px;
  color: #909399;
}
</style>

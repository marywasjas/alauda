<template>
  <div id="leftEchartPie" ref="leftEchartPie"></div>
</template>

<script>
export default {
  props: {
    leftPieData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      myChart: null,
      option: null,
      optionData: [],
    };
  },
  watch: {
    leftPieData: {
      // immediate: true,
      deep: true,
      handler(leftPieData) {
        if (leftPieData) {
          this.initChart(leftPieData);
        }
      },
    },
  },
  mounted() {
    const option = {
      title: {
        zlevel: 0,
        text: null,
        rich: {
          value: {
            color: "#3F495A",
            fontSize: 14,
            lineHeight: 16,
          },
          name: {
            color: "#3F495A",
            fontSize: 14,
            lineHeight: 16,
          },
        },
        top: "center",
        left: "30%",
        textAlign: "center",
        textStyle: {
          rich: {
            value: {
              color: "#3F495A",
              fontSize: 14,
              lineHeight: 16,
            },
            name: {
              color: "#3F495A",
              lineHeight: 16,
            },
          },
        },
      },
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {},
      
      series: [
        {
          name: "Security Status",
          type: "pie",
          center: ["30%", "50%"],
          radius: ["80%", "45%"],
          itemStyle: {
            borderWidth: 6,
            borderColor: "#fff",
          },
          hoverAnimation: false,
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    };
    this.option = option;
    var dom = document.getElementById("leftEchartPie");
    var myChart = this.echarts.init(dom);
    this.myChart = myChart;
    let that = this;
    // 监听resize
    window.addEventListener("resize", function () {
      that.mychart.resize();
    });
  },
  methods: {
    initChart(leftPieData) {
      this.option.text = [
        "{name|Total}",
        "{value|" + leftPieData.totalNum + "}",
      ].join("\n");

      this.option.legend.data = [
        `Very High Risk`,
        `High Risk`,
        `Medium Risk`,
        `Low Risk`,
        `Very Low Risk`,
      ];

      this.option.series[0].data = [
        {
          value: this.leftPieData.veryHighRiskNum,
          name: `Very High Risk`,
          itemStyle: {
            color: "#FF4D4F",
          },
        },
        {
          value: this.leftPieData.highRiskNum,
          name: `High Risk`,
          itemStyle: {
            color: "#FA9314",
          },
        },
        {
          value: this.leftPieData.mediumRiskNum,
          name: `Medium Risk`,
          itemStyle: {
            color: "#FACB14",
          },
        },
        {
          value: this.leftPieData.lowRiskNum,
          name: `Low Risk`,
          itemStyle: {
            color: "#4ED6CC",
          },
        },
        {
          value: this.leftPieData.veryLowNum,
          name: `Very Low Risk`,
          itemStyle: {
            color: "#2BD374",
          },
        },
      ];

      this.optionData = this.option.series[0].data;

      const optionData = this.optionData;

      this.option.legend = {
        orient: "vertical",
        left: "60%",
        top: "middle",
        icon: "circle",
        itemHeight: 7, //改变圆圈大小
        // data: [],
        formatter(params) {
          if (optionData.length) {
            switch (params) {
              case "Very High Risk":
                return params + "     " + optionData[0].value;
                break;
              case "High Risk":
                return params + "             " + optionData[1].value;
                break;
              case "Medium Risk":
                return params + "       " + optionData[2].value;
                break;
              case "Low Risk":
                return params + "              " + optionData[3].value;
                break;
              case "Very Low Risk":
                return params + "      " + optionData[4].value;
                break;
              default:
                return "";
            }
          }
        },
      };
      // 绘制图表
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style>
#leftEchartPie {
  width: 100%;
  height: calc(100% - 60px);
}
</style>

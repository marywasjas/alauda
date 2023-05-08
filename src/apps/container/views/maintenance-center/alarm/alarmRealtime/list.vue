<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <div class="container-box">
            <div class="box" v-for="item in baseInfoData" :key="item.title">
              <i style="font-style: normal" v-if="item.title == '节点告警数'">
                N
              </i>
              <i :class="item.icon" v-else />
              <span style="margin-left: 5px">{{ item.title }}</span>
              <div class="numStyle">{{ item.num }}</div>
            </div>
          </div>
        </BaseCard>
      </el-col>
    </el-row>

    <div class="oam-main" style="height: calc(100vh - 150px)">
      <div style="display: flex; flex-direction: column; align-items: center">
        <img
          :src="errGif"
          width="200"
          height="200"
          alt="Girl has dropped her ice cream."
        />
        <h3>无告警</h3>

        <p
          style="
            color: rgba(150, 152, 155);
            font-size: 14px;
            width: 560px;
            height: 60px;
            text-align: center;
          "
        >
          恭喜您，平台非常健康！
        </p>
      </div>
    </div>
  </div>
</template>



<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "BaseInfo",
  components: { LineAlert },
  props: {},
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
      title: "",

      baseInfoData: [
        { title: "集群告警数", icon: "el-icon-document", num: 0 },
        { title: "节点告警数", icon: "", num: 0 },
        { title: "部署告警数", icon: "el-icon-s-data", num: 0 },
        { title: "有状态副本集告警数", icon: "el-icon-coin", num: 0 },
        { title: "守护进程集告警数", icon: "el-icon-coin", num: 0 },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 20px;
  background-color: $background-color;
  position: relative;
}
.oam-main {
  background: #fff;
  padding: 20px;
}
.component-div {
  height: 220px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.component-div2 {
  height: 280px;
}
.event-container {
  margin-top: 20px;
  .total {
    margin-bottom: 16px;
    .number {
      color: $font-color-title;
      font-size: 40px;
      line-height: 1;
      margin-right: 8px;
    }
    .text {
      margin-right: 20px;
    }
  }
}
.chart-wrap {
  width: 100%;
  height: calc(100% - 56px);
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }
}
.container-bottom {
  margin-top: 20px;
  > span {
    font-weight: 500;
  }
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.numStyle {
  font-size: 40px;
  margin-top: 30px;
  color: #67c23a;
}

.container-box {
  display: grid;
  grid-template-columns: repeat(
    5,
    1fr
  ); /* 将容器分成 5 列，并设置每列的宽度为 1fr */
  grid-gap: 5px; /* 设置元素之间的距离为 10px */
}
.box {
  height: 100px;
  // background-color: #ccc;
  position: relative; /* 让伪元素相对于父元素定位 */
}
.box::after {
  content: "";
  border-left: 2px solid #ccc;
  position: absolute; /* 将伪元素设置为绝对定位 */
  top: 0;
  bottom: 0;
  right: 12px; /* 调整伪元素的位置 */
}
.box:last-child::after {
  display: none; /* 去掉第一个 div 元素前面的分割线 */
}
</style>

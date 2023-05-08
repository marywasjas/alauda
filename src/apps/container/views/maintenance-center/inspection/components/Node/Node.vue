<template>
  <div class="container margin-top">
    <div id="container">
      <div class="box" v-for="item in data" :key="item.title">
        <BaseCard>
          <header>
            <div class="card-title flexBox">
              <div>{{ item.title }}</div>
              <el-button type="text" size="small" @click="handleDetail(item)">
                风险详情
              </el-button>
            </div>
          </header>
          <section class="flexbox">
            <radius-pie-chart
              :chart-data="item.chartData"
              :width="'200%'"
              :height="'200%'"
            />
          </section>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import {
  tableColumnList,
  tableData,
  containerData_cluster,
  containerData_node,
  containerData_container,
  containerData_cerf,
} from "./constant/index";
import RadiusPieChart from "./RadiusPieChart";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { RadiusPieChart },
  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableColumnList,
      tableData,
      containerData_cluster,
      containerData_node,
      containerData_container,
      containerData_cerf,

      data: [
        { title: "集群", chartData: containerData_cluster },
        { title: "节点", chartData: containerData_node },
        { title: "容器", chartData: containerData_container },
        { title: "证书", chartData: containerData_cerf },
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

    handleDetail(obj) {
      this.$router.push({
        path: "/maintenance-center/inspection/detail",
        query: { name: `${obj.title}风险详情` },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .container {
//   background-color: #fff;
//   padding: 10px;
// }
// .all {
//   display: flex;
//   // justify-content: space-between; /* 将子元素分别对齐到两侧 */
//   flex-wrap: wrap; /* 让子元素换行显示 */
//   height: 500px;
// }

// .left {
//   flex: 1;
//   margin-right: auto; /* 设置右外边距为 auto，使其贴着容器左侧 */
// }

// .right {
//   flex: 1;
//   margin-left: auto; /* 设置左外边距为 auto，使其贴着容器右侧 */
// }

// .center {
//   flex: 1; /* 将中间元素平分剩余空间 */
//   margin: 0 10px; /* 在左右两侧添加 10 像素的间距 */
// }
#container {
  display: flex;
  flex-wrap: wrap; /* 让子元素自动换行 */
  justify-content: space-between; /* 将子元素平均分布到容器的两端 */
}
.box {
  width: calc(
    33.33% - 10px
  ); /* 让每个子元素占据 1/3 宽度（减去 margin 的值） */
  margin-bottom: 5px; /* 设置子元素的 margin-bottom */
}
.flexBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
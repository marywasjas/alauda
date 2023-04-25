<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title right-header" style="justify-content: right">
          节点：
          <el-select
            v-model="node"
            filterable
            placeholder="请选择"
            style="margin-right: 10px"
          >
            <!-- <span slot="prefix" class="selectedStyle">节点： </span> -->
            <el-option
              v-for="item in nodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="resourceTime" filterable placeholder="请选择">
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            icon="el-icon-refresh-right"
            class="margin-left10"
            @click="handleRefresh"
          />
        </div>
      </header>
      <section class="component-div">
        <div style="margin-bottom: -50px; margin-top: 40px">
          <span style="margin-left: 30px"> 使用率 (%) </span>
          <span style="margin-left: 460px"> 吞吐量(Kbps) </span>
        </div>
        <el-row>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import {
  tableColumnList,
  tableData,
  containerLineData,
} from "./constant/index";
import LineChart from "./LineChart";

export default {
  name: "Node",
  components: { LineChart },

  props: {},
  data() {
    return {
      resourceTime: "近 1 小时",
      timeOptions: [
        {
          value: "近 1 小时",
          label: "近 1 小时",
        },
        {
          value: "近 3 小时",
          label: "近 3 小时",
        },
        {
          value: "近 12 小时",
          label: "近 12 小时",
        },
        {
          value: "近 1 天",
          label: "近 1 天",
        },
        {
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
      ],
      node: "25.2.20.108",
      nodeOptions: [
        {
          value: "25.2.20.108",
          label: "25.2.20.108",
        },
        {
          value: "25.2.20.10822",
          label: "25.2.20.10822",
        },
        {
          value: "25.2.20.10833",
          label: "25.2.20.10833",
        },
        {
          value: "25.2.20.10844",
          label: "25.2.20.10844",
        },
      ],

      tableData,
      tableColumnList,
      containerLineData,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
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

    handleRefresh() {},
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
.row-bg {
  padding: 0;
  background-color: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
// .selectedStyle {
//   position: absolute;
//   height: 100%;
//   left: 4px;
//   top: 11px;
// }
// .right-header[data-v-8638ebe6] {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-align: center;
//   -ms-flex-align: center;
//   align-items: right;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: right;
// }
</style>
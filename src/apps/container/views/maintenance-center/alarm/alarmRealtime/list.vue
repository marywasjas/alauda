<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <!-- <header>
            <div class="card-title left-header">
              <span>资源总量统计</span>
            </div>
          </header> -->
          <section style="display: flex">
            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-document" />
              <span>集群告警数</span>
              <div class="numStyle">0</div>
            </div>
            <div class="divider" />

            <div class="card-title left-header" style="width: 18%">
              <i style="font-style: normal">N</i>
              <span>节点告警数</span>
              <div class="numStyle">0</div>
            </div>
            <div class="divider" />

            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-s-data" />
              <span>部署告警数</span>
              <div class="numStyle">0</div>
            </div>

            <div class="divider" />

            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-coin" />
              <span></span>
              <div class="numStyle">0</div>
            </div>

            <div class="divider" />

            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-coin" />
              <span></span>
              <div class="numStyle">0</div>
            </div>
          </section>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>



<script>
export default {
    name: "BaseInfo",
  components: { LineAlert, ProgressCard },
  props: {},
  data() {
    return {
      content:
        "默认项目日志策略按照全局策略执行，项目下设置或开启日志策略后，将按照项目日志策略执行，原有日志将无法查询。",
      content_addCluster:
        "支持添加独立集群或联邦集群，不支持已加入到该项目下的集群成员对应的联邦集群，多选集群时默认设置同样配额。",
      rowCenter_project: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "-10px",
        "margin-top": "2px",
        color: "#A9A9A9",
      },
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      title: "",

      baseInfoData: [
        {
          label: "显示名称",
          value: "",
        },
        {
          label: "创建人",
          value: "admin@cpass.io",
        },
        {
          label: "状态",
          value: "正常",
        },
        {
          label: "创建于",
          value: "2023-02-15 15:41:56",
        },
        {
          label: "项目管理员",
          value: "",
        },
        {
          label: "更新时间",
          value: "2023-02-15",
        },

        {
          label: "日志策略",
          value: "全局策略",
          afterIcon: "el-icon-edit",
        },

        {
          label: "描述",
          value: "",
        },
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
.divider {
  width: 0.5px;
  border: 1px solid gray;
  float: left;
  height: 100px;
  margin-left: 30px;
}
.numStyle {
  font-size: 30px;
  margin-left: 10px;
  margin-top: 30px;
  color: #67c23a;
}
</style>

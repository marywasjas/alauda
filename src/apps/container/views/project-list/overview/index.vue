<template>
  <div class="dashboard-editor-container">
    <overview-banner />
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <section style="display: flex">
            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-document" />
              <span> 项目状态</span>
              <div style="font-size: 20px; margin-left: 10px; margin-top: 30px">
                <i class="el-icon-success" style="color: #67c23a" />
                正常
              </div>
            </div>
            <div
              style="
                width: 0.5px;
                border: 1px solid gray;
                float: left;
                height: 100px;
                margin-left: 30px;
              "
            />

            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-user-solid" />
              <span> 项目成员数</span>
              <div
                style="
                  font-size: 30px;
                  margin-left: 10px;
                  margin-top: 30px;
                  color: #409eff;
                "
              >
                0
              </div>
            </div>
            <div
              style="
                width: 0.5px;
                border: 1px solid gray;
                float: left;
                height: 100px;
                margin-left: 30px;
              "
            />
            <div class="card-title left-header" style="width: 18%">
              <i style="font-style: normal">N</i>
              <span> 命名空间数</span>
              <div
                style="
                  font-size: 30px;
                  margin-left: 10px;
                  margin-top: 30px;
                  color: #409eff;
                "
              >
                1
              </div>
            </div>
            <div
              style="
                width: 0.5px;
                border: 1px solid gray;
                float: left;
                height: 100px;
                margin-left: 30px;
              "
            />
            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-s-data" />
              <span> 容器组数</span>
              <div style="font-size: 30px; margin-left: 10px; margin-top: 30px">
                18
              </div>
            </div>
            <div
              style="
                width: 0.5px;
                border: 1px solid gray;
                float: left;
                height: 100px;
                margin-left: 30px;
              "
            />
            <div class="card-title left-header" style="width: 18%">
              <i class="el-icon-coin" />
              <span> PVC 数字</span>
              <div style="font-size: 30px; margin-left: 10px; margin-top: 30px">
                0
              </div>
            </div>
          </section>
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="8">
        <BaseCard style="height: 244px">
          <header>
            <div class="card-title left-header">
              <span>应用</span>
            </div>
          </header>
          <section class="component-div">
            <radius-pie-chart :chart-data="applicationData" />
          </section>
        </BaseCard>
        <BaseCard style="height: 130px">
          <header>
            <div class="card-title left-header">
              <span>容器组</span>
            </div>
          </header>
          <section>
            <div style="margin-top: 20px">
              <span> 总数{{ 18 }} </span>
              &nbsp;&nbsp;
              <i class="status-point" style="background-color: #67c23a"></i>
              <span> 运行中{{ 18 }} </span>
              <i class="status-point" style="background-color: #909399"></i>
              <span> 其他{{ 0 }} </span>
            </div>
            <progress-card :chartData="progressData" />
          </section>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <BaseCard style="height: 390px">
          <header>
            <div class="card-title right-header">
              <span>计算组件</span>
            </div>
          </header>
          <section class="component-div">
            <transverse-bar :chart-data="computeData" />
          </section>
        </BaseCard>
      </el-col>
    </el-row>

    <BaseCard>
      <header style="display: flex">
        <div class="card-title right-header">
          <span>资源总量统计</span>
        </div>
        <div style="margin-top: 3px">
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                • 使用率 = 已使用资源 / 项目配额; <br />
                • 分配率 = 命名空间已分配资源 / 项目配额; <br />
                • 当项目资源在其中一个集群的配额为不限制时，使用率、分配率显示为
                "不限制"; 项目配额、命名空间已分配总和显示为 "不限制"<br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </div>
      </header>

      <section>
        <div class="container-top flexbox">
          <div class="container-top-left">
            <radius-pie-chart :chart-data="containerData" title="总数" />
          </div>
          <div class="container-top-right">
            <div class="text-right">
              <el-select
                v-model="containerTime"
                filterable
                placeholder="请选择"
                size="mini"
              >
                <i slot="prefix" class="el-input__icon el-icon-search" />
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </div>
        </div>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <span>集群资源 Top 5</span>
            </div>
          </header>

          <section>
            <el-row style="margin-top: 20px">
              <el-col
                :span="11"
                style="background-color: #f8f8ff; margin-left: 30px"
              >
                <div
                  style="font-size: 20px; margin-left: 20px; margin-top: 20px"
                >
                  CPU
                </div>
                <el-row
                  style="
                    background-color: #f8f8ff;
                    margin-top: 30px;
                    margin-left: 20px;
                  "
                >
                  <el-col :span="2" style="margin-top: 18px; font-size: 10px">
                    <div>region</div>
                  </el-col>

                  <el-col :span="18">
                    <progress-card :chartData="progressData" />
                  </el-col>

                  <el-col :span="3" style="margin-top: 18px; font-size: 10px">
                    <span>不限制</span>
                  </el-col>
                </el-row>
              </el-col>

              <el-col
                :span="11"
                style="background-color: #f8f8ff; margin-left: 30px"
              >
                <div
                  style="font-size: 20px; margin-left: 20px; margin-top: 20px"
                >
                  内存
                </div>

                <el-row
                  style="
                    background-color: #f8f8ff;
                    margin-top: 30px;
                    margin-left: 20px;
                  "
                >
                  <el-col :span="2" style="margin-top: 18px; font-size: 10px">
                    <div>region</div>
                  </el-col>

                  <el-col :span="18">
                    <progress-card :chartData="progressData" />
                  </el-col>

                  <el-col :span="3" style="margin-top: 18px; font-size: 10px">
                    <span>不限制</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
              <el-col
                :span="11"
                style="background-color: #f8f8ff; margin-left: 30px"
              >
                <div
                  style="font-size: 20px; margin-left: 20px; margin-top: 20px"
                >
                  容器组
                </div>

                <el-row
                  style="
                    background-color: #f8f8ff;
                    margin-top: 30px;
                    margin-left: 20px;
                  "
                >
                  <el-col :span="2" style="margin-top: 18px; font-size: 10px">
                    <div>region</div>
                  </el-col>

                  <el-col :span="18">
                    <progress-card :chartData="progressData" />
                  </el-col>

                  <el-col :span="3" style="margin-top: 18px; font-size: 10px">
                    <span>不限制</span>
                  </el-col>
                </el-row>
              </el-col>

              <el-col
                :span="11"
                style="background-color: #f8f8ff; margin-left: 30px"
              >
                <div
                  style="font-size: 20px; margin-left: 20px; margin-top: 20px"
                >
                  持久卷声明
                </div>

                <el-row
                  style="
                    background-color: #f8f8ff;
                    margin-top: 30px;
                    margin-left: 20px;
                  "
                >
                  <el-col :span="2" style="margin-top: 18px; font-size: 10px">
                    <div>region</div>
                  </el-col>

                  <el-col :span="18">
                    <progress-card :chartData="progressData" />
                  </el-col>

                  <el-col :span="3" style="margin-top: 18px; font-size: 10px">
                    <span>不限制</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </section>
        </BaseCard>
      </el-col>
    </el-row>
    <!-- 事件弹窗 -->
    <!-- <event-dialog
      :visible="eventDialogVisible"
      @closeDialog="closeDialog"
      @openDialog="openDialog"
    /> -->
  </div>
</template>

<script>
import OverviewBanner from "./components/OverviewBanner";
// 资源配额
import ProgressCard from "./components/ProgressCard";
// 事件
// 单个柱状图组件
import BarChartSignle from "./components/BarChartSingle.vue";
import EventDialog from "./components/EventDialog/index.vue";
// 应用 圆角饼图组件
import RadiusPieChart from "@/apps/container/views/components/RadiusPieChart";
// 计算组件
import TransverseBar from "@/apps/container/views/components/TransverseBar";
// 容器组+资源使用率
import LineChart from "@/apps/container/views/components/LineChart";
import { getResourceData, getEventData } from "../../../api/dashboard/index";
import {
  // resourceData,
  // eventData,
  applicationData,
  computeData,
  containerData,
  containerLineData,
  containerColumnList,
  containerList,
  resourceLineData,
  topColumnListnc,
  topColumnListcpu,
  topList,
} from "./constant";
export default {
  name: "DashboardAdmin",
  components: {
    OverviewBanner,
    ProgressCard,
    BarChartSignle,
    EventDialog,
    RadiusPieChart,
    TransverseBar,
    LineChart,
  },
  data() {
    return {
      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],
      resourceData: [],
      // 事件 数据
      eventDialogVisible: false,
      total: 0,
      eventData: [],
      // 应用
      applicationData,
      // 计算组件
      computeData,
      // 容器组
      containerData,
      containerTime: "近 1 小时",
      containerLineData,
      containerColumnList,
      containerList,
      // 资源使用率
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
      resourceLineData,
      // 资源使用量 Top5
      activeKey: "nc",
      topColumnListnc,
      topColumnListcpu,
      topList,
    };
  },
  computed: {
    topColumnList: function () {
      return this.activeKey === "nc" ? topColumnListnc : topColumnListcpu;
    },
  },
  created() {
    // 资源配额
    this.getResourceData();
    // 事件
    this.getEventData();
  },
  methods: {
    // 获取资源配额
    getResourceData() {
      getResourceData()
        .then((res) => {
          if (res.code === 20000) {
            this.resourceData = res.data || [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取事件
    getEventData() {
      getEventData()
        .then((res) => {
          if (res.code === 20000) {
            this.eventData = res.data || [];
            this.total = this.eventData.reduce((pre, cur) => {
              return pre + cur.value;
            }, 0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 打开事件弹窗
    openEvent() {
      this.eventDialogVisible = true;
    },
    closeDialog() {
      this.eventDialogVisible = false;
    },
    openDialog() {
      this.eventDialogVisible = true;
    },
    handelDetails(row) {
      this.$router.push({
        name: "ContainerGroupDetail",
        query: {
          name: row.name,
        },
      });
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
</style>

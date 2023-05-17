<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__body">
        <el-form :model="tabForm" label-suffix=":" label-width="75px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="日志类型">
                <el-select v-model="tabForm.logType">
                  <el-option
                    v-for="con in containerGroupList"
                    :key="con.value"
                    :label="con.label"
                    :value="con.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="项目">
                <el-select v-model="tabForm.project">
                  <el-option
                    v-for="con in projectList"
                    :key="con.value"
                    :label="con.label"
                    :value="con.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="命名空间">
                <el-select v-model="tabForm.namespace">
                  <el-option
                    v-for="con in namespaceList"
                    :key="con.value"
                    :label="con.label"
                    :value="con.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="应用">
            <el-select
              v-model="tabForm.application"
              style="width: 22%"
              @focus="setMinWidthEmpty"
            >
              <el-option
                v-for="con in applicationList"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>

          <div class="flex-center">
            <el-form-item label="查询条件" style="margin-bottom: 10px; flex: 1">
              <el-select
                v-model="tabForm.logType"
                placeholder="支持nodename/podname/containerid/containername/path，支持关键字查询，按回车确定，支持添加多个条件"
                multiple
                style="width: 100%"
              >
                <el-option label="nodename:25.2.20.65" value="currentLog1" />
                <el-option label="nodename:25.2.20.54" value="currentLog2" />
                <el-option label="nodename:25.2.20.138" value="currentLog3" />
                <el-option label="nodename:25.2.20.111" value="currentLog4" />
              </el-select>
            </el-form-item>

            <el-form-item
              label=""
              style="margin-bottom: 10px; margin-left: 10px"
              label-width="0px"
            >
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>

            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 450px">
                  •
                  支持指定字段类型所搜，可下拉勾选，格式[searchType]:[typeName]<br />
                  •
                  支持关键词全文搜索，不区分大小写，直接输入关键字后回车，格式[search:keyword]<br />
                  • 同类型资源之间是 or 关系，不同类型资源是 and 关系
                  (例如：查询条件：podname:pod1、podname:pod2、nodename:n1，其中
                  pods1 和 pods2 就是or关系，pod1和n1就是and关系)<br />
                </div>
              </template>
              <i
                class="el-icon-question margin-left10 margin-top-10px question-icon"
              />
            </el-tooltip>
          </div>
        </el-form>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-top: 30px;
          "
        >
          <div style="font-weight: bold">共{{ total }}条日志</div>
          <div>
            <el-select
              v-model="containerTime"
              filterable
              placeholder="请选择"
              style="margin-right: 10px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button icon="el-icon-refresh-right" />
            <el-button icon="el-icon-download" />
          </div>
        </div>

        <div id="chart" />

        <el-table
          :data="tableData"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column width="200" label="采集时间" prop="date" />
          <el-table-column
            label="日志内容"
            prop="projectName,kubernetesNamespace,applicationName,node,podName,containerId,paths"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.projectName.show">
                {{ scope.row.projectName.txt }}</span
              >
              <span v-if="scope.row.kubernetesNamespace.show">
                {{ scope.row.kubernetesNamespace.txt }}</span
              >
              <span v-if="scope.row.applicationName.show">
                {{ scope.row.applicationName.txt }}</span
              >
              <span v-if="scope.row.node.show" style="color: #00bfff">
                {{ scope.row.node.txt }}</span
              >
              <span v-if="scope.row.podName.show" style="color: #1afa29">
                {{ scope.row.podName.txt }}</span
              >
              <span v-if="scope.row.containerId.show" style="color: #ff6347">
                {{ scope.row.containerId.txt }}</span
              >
              <span v-if="scope.row.paths.show" style="color: #9400d3">
                {{ scope.row.paths.txt }}</span
              >
              <span> {{ scope.row.content.txt }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot="header">
              <el-popover placement="bottom" width="280" trigger="click">
                <el-checkbox-group
                  v-model="checkedCities"
                  style="margin-top: 12px"
                  @change="changes"
                >
                  <el-checkbox
                    v-for="item in checkboxList"
                    :key="item.prop"
                    :label="item"
                    :checked="item.checked"
                    style="margin-bottom: 10px"
                    >{{ item.label }}</el-checkbox
                  >
                </el-checkbox-group>
                <el-button
                  slot="reference"
                  icon="el-icon-s-tools"
                  size="small"
                />
              </el-popover>
              <!-- <el-button icon="el-icon-s-tools" size="mini"></el-button> -->
            </template>
            <template>
              <i class="el-icon-search" @click="openDialog" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <DetailDialog :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import DetailDialog from "./components/DetailDialog.vue";

export default {
  name: "UserList",
  components: { DetailDialog },
  data() {
    return {
      dialogVisible: false,

      tabForm: {
        logType: "系统日志",
        project: "all",
        namespace: "all",
        application: "all",
      },
      containerGroupList: [
        { value: "系统日志", label: "系统日志" },
        { value: "Kubernetes 日志", label: "Kubernetes 日志" },
        { value: "产品日志", label: "产品日志" },
        { value: "应用日志", label: "应用日志" },
      ],

      projectList: [
        { value: "all", label: "全部" },
        { value: "baas", label: "baas" },
        { value: "federateai", label: "federateai" },
        { value: "region-devops", label: "region-devops" },
        { value: "chaos", label: "chaos" },
        { value: "ebump", label: "ebump" },
        { value: "faq", label: "faq" },
      ],

      namespaceList: [
        { value: "all", label: "全部" },
        { value: "baas-dev", label: "baas-dev" },
        { value: "adminetrustorg1", label: "adminetrustorg1" },
        { value: "adminetrustorg2", label: "adminetrustorg2" },
        { value: "adminetrustorg3", label: "adminetrustorg3" },
      ],

      applicationList: [
        { value: "all", label: "全部" },
        { value: "harbor", label: "harbor" },
        { value: "jenkins", label: "jenkins" },
        { value: "fabricengine.baas-dev", label: "fabricengine.baas-dev" },
      ],

      total: 10,
      containerTime: "近 1 小时",
      timeOptions: [
        { value: "近 5 分钟", label: "近 5 分钟" },
        { value: "近 15 分钟", label: "近 15 分钟" },
        { value: "近 30 分钟", label: "近 30 分钟" },
        { value: "近 1 小时", label: "近 1 小时" },
        { value: "近 3 小时", label: "近 3 小时" },
        { value: "近 6 小时", label: "近 6 小时" },
        { value: "近 12 小时", label: "近 12 小时" },
        { value: "近 1 天", label: "近 1 天" },
        { value: "近 2 天", label: "近 2 天" },
        { value: "近 3 天", label: "近 3 天" },
        { value: "近 7 天", label: "近 7 天" },
        { value: "自定义", label: "自定义" },
      ],

      tableData: [
        {
          date: "2020-11-11 13:23:23",
          projectName: { show: true, txt: "csaa" },
          kubernetesNamespace: { show: true, txt: "chaos-dev" },
          applicationName: { show: true, txt: "1111" },
          node: { show: true, txt: "25.2.20.174" },
          podName: { show: true, txt: "chaosblade-box-tttbs" },
          containerId: { show: true, txt: "d4936db6" },
          paths: { show: true, txt: "stdout" },
          content: { show: true, txt: "ksdksdjkjskdkdak" },
        },
        {
          date: "2020-11-11 13:23:23",
          projectName: { show: true, txt: "csaa" },
          kubernetesNamespace: { show: true, txt: "chaos-dev" },
          applicationName: { show: true, txt: "1111" },
          node: { show: true, txt: "25.2.20.174" },
          podName: { show: true, txt: "chaosblade-box-tttbs" },
          containerId: { show: true, txt: "d4936db6" },
          paths: { show: true, txt: "stdout" },
          content: { show: true, txt: "ksdksdjkjskdkdak" },
        },
        {
          date: "2020-11-11 13:23:23",
          projectName: { show: true, txt: "csaa" },
          kubernetesNamespace: { show: true, txt: "chaos-dev" },
          applicationName: { show: true, txt: "1111" },
          node: { show: true, txt: "25.2.20.174" },
          podName: { show: true, txt: "chaosblade-box-tttbs" },
          containerId: { show: true, txt: "d4936db6" },
          paths: { show: true, txt: "stdout" },
          content: { show: true, txt: "ksdksdjkjskdkdak" },
        },
        {
          date: "2020-11-11 13:23:23",
          projectName: { show: true, txt: "csaa" },
          kubernetesNamespace: { show: true, txt: "chaos-dev" },
          applicationName: { show: true, txt: "1111" },
          node: { show: true, txt: "25.2.20.174" },
          podName: { show: true, txt: "chaosblade-box-tttbs" },
          containerId: { show: true, txt: "d4936db6" },
          paths: { show: true, txt: "stdout" },
          content: { show: true, txt: "ksdksdjkjskdkdak" },
        },
        {
          date: "2020-11-11 13:23:23",
          projectName: { show: true, txt: "csaa" },
          kubernetesNamespace: { show: true, txt: "chaos-dev" },
          applicationName: { show: true, txt: "1111" },
          node: { show: true, txt: "25.2.20.174" },
          podName: { show: true, txt: "chaosblade-box-tttbs" },
          containerId: { show: true, txt: "d4936db6" },
          paths: { show: true, txt: "stdout" },
          content: { show: true, txt: "ksdksdjkjskdkdak" },
        },
      ],
      // 下拉框数据
      checkedCities: [
        // '项目名称（ProjectName）',
        // '命名空间（KubernetesNamespace）',
        // '应用名称（ApplicationName）',
        // '节点（Node）',
        // '容器组（PodName）',
        // '容器（ContainerID）',
        // '路径（Paths）'
      ],
      checkboxList: [
        {
          prop: "projectName",
          label: "项目名称（ProjectName）",
          checked: true, // 控制是否选中
        },
        {
          prop: "kubernetesNamespace",
          label: "命名空间（KubernetesNamespace）",
          checked: true,
        },
        {
          prop: "applicationName",
          label: "应用名称（ApplicationName）",
          checked: false,
        },
        {
          prop: "node",
          label: "节点（Node）",
          checked: true,
        },
        {
          prop: "podName",
          label: "容器组（PodName）",
          checked: true,
        },
        {
          prop: "containerId",
          label: "容器（ContainerID）",
          checked: true,
        },
        {
          prop: "paths",
          label: "路径（Paths）",
          checked: true,
        },
      ],
    };
  },

  created() {},
  mounted() {
    this.initChart();
  },
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

    initChart() {
      const chartDom = document.getElementById("chart");
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          axisTick: {
            length: 6,
            lineStyle: {
              type: "dashed",
              // ...
            },
          },
          type: "category",
          data: [
            "00:00",
            "01:15",
            "02:30",
            "03:45",
            "05:00",
            "06:15",
            "07:30",
            "08:45",
            "10:00",
          ],
        },
        yAxis: {
          type: "value",
          max: 100,
          min: 0,
          splitNumber: 1,
        },
        series: [
          {
            data: [80, 10, 20, 30, 40, 50, 60, 120],
            type: "bar",
            barWidth: 10, // 柱图宽度
            itemStyle: {
              normal: {
                color: "#1890ff",
                // 这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                barBorderRadius: [50, 50, 50, 50],
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    changes(e, index) {
      console.log(e);
      const unChecked = [];
      for (let i = 0; i < this.checkboxList.length; i++) {
        if (
          JSON.stringify(e).indexOf(JSON.stringify(this.checkboxList[i])) === -1
        ) {
          unChecked.push(this.checkboxList[i]);
        }
      }
      console.log(unChecked);
      this.tableData = this.tableData.map((item) => {
        for (let i = 0; i < e.length; i++) {
          item[e[i].prop].show = true;
        }
        for (let i = 0; i < unChecked.length; i++) {
          item[unChecked[i].prop].show = false;
        }
        return item;
      });
    },
    openDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.name-cell {
  display: flex;
  justify-content: left;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: $font-size-20;
    padding: 1px;
    border: 1px solid $border-color-one;
    border-radius: $border-radius-l;
    background: $color-primary-rgba1;
    color: $color-primary;
  }
  span {
    display: block;
    margin: 0;
    font-size: $font-size-18;
  }
  span:last-child {
    color: $font-color-text;
    font-size: $font-size-14;
    margin-top: 6px;
  }
}
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-content {
    margin: 15px 20px 0px 0px;
    .filter-row {
      display: flex;
      .filter-item {
        flex: 1;
        margin-bottom: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
// ::v-deep .el-table td.el-table__cell {
//   border-bottom: 0px solid #dfe6ec;
// }
::v-deep .el-table--border .el-table__cell {
  border-right: 0px solid #dfe6ec;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px solid #dfe6ec;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #fff !important;
}
// .tab-main {
// padding: 20px 20px 20px 0px;
#chart {
  margin-top: 10px;
  height: 200px;
}
// }
</style>
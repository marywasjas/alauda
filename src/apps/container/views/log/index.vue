<template>
  <div class="tab-main">
    <el-form :model="tabForm" label-width="90px" label-suffix=":">
      <div class="flex-start">
        <el-form-item label="应用" style="margin-bottom: 10px; width: 40%">
          <el-select v-model="tabForm.containerGroup" placeholder="默认为全部" style="width: 100%">
            <el-option v-for="con in containerGroupList" :key="con.value" :label="con.label" :value="con.value" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-center">
        <el-form-item label="查询条件" style="margin-bottom: 10px; flex: 1">
          <el-select
            v-model="tabForm.logType"
            placeholder="支持nodename/podname/containerid/containername/path，支持关键字查询，支持添加多个条件，按回车确定"
            multiple
            collapse-tags
            style="width: 100%"
          >
            <el-option label="11111" value="currentLog" />
            <el-option label="22222" value="historyLog" />
          </el-select>
        </el-form-item>
        <el-form-item label="" style="margin-bottom: 10px; margin-left: 10px" label-width="0px">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
        <el-form-item label="" label-width="0" class="margin-left10" style="margin-bottom: 5px">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              · 支持指定字段类型搜索，可下拉勾选，格式[searchType:typeName]<br>·
              支持关键字全文搜索，不区分大小写，直接输入关键字后回车，<br>格式[search:keyword]<br>·
              同类型资源之间是or关系，不同类型资源是and关系（例如：查询条件：<br>podname：pod1、podname：pod2、nodename：n1，其中pod1和pod2<br>就是or关系，pod1和n1就是and关系）
            </div>
            <i class="el-icon-question question-icon" />
          </el-tooltip>
        </el-form-item>
      </div>
    </el-form>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>共{{ total }}条日志</span>
          <div style="float: right">
            <el-select v-model="containerTime" filterable placeholder="请选择" size="mini" style="margin-right: 10px">
              <i slot="prefix" class="el-input__icon el-icon-search" />
              <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button icon="el-icon-refresh-right" size="mini" />
            <el-button icon="el-icon-download" size="mini" />
          </div>
        </div>
      </header>
      <div id="chart" />
      <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
        <el-table-column width="200" label="采集时间" prop="date" />
        <el-table-column
          label="日志内容"
          prop="projectName,kubernetesNamespace,applicationName,node,podName,containerId,paths"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.projectName.show"> {{ scope.row.projectName.txt }}</span>
            <span v-if="scope.row.kubernetesNamespace.show"> {{ scope.row.kubernetesNamespace.txt }}</span>
            <span v-if="scope.row.applicationName.show"> {{ scope.row.applicationName.txt }}</span>
            <span v-if="scope.row.node.show" style="color: #00bfff"> {{ scope.row.node.txt }}</span>
            <span v-if="scope.row.podName.show" style="color: #1afa29"> {{ scope.row.podName.txt }}</span>
            <span v-if="scope.row.containerId.show" style="color: #ff6347"> {{ scope.row.containerId.txt }}</span>
            <span v-if="scope.row.paths.show" style="color: #9400d3"> {{ scope.row.paths.txt }}</span>
            <span> {{ scope.row.content.txt }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="right">
          <template slot="header">
            <el-popover placement="bottom" width="280" trigger="click">
              <el-checkbox-group v-model="checkedCities" style="margin-top: 12px" @change="changes">
                <el-checkbox
                  v-for="item in checkboxList"
                  :key="item.prop"
                  :label="item"
                  :checked="item.checked"
                  style="margin-bottom: 10px"
                >{{ item.label }}</el-checkbox>
              </el-checkbox-group>
              <el-button slot="reference" icon="el-icon-s-tools" size="small" />
            </el-popover>
            <!-- <el-button icon="el-icon-s-tools" size="mini"></el-button> -->
          </template>
          <template>
            <i class="el-icon-search" @click="openDialog" />
          </template>
        </el-table-column>
      </el-table>
    </BaseCard>
    <DetailDialog :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import DetailDialog from './components/DetailDialog.vue'
export default {
  name: 'Tab',
  components: { DetailDialog },
  data() {
    return {
      tabForm: {
        containerGroup: '',
        container: '',
        logType: ''
      },
      containerGroupList: [
        {
          label: 'nginx-nginx-75b4568c7c-fphvc',
          value: 'nginx-nginx-75b4568c7c-fphvc'
        }
      ],
      total: 10,
      containerTime: '近 1 小时',
      timeOptions: [
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
        },
        {
          value: '近 12 小时',
          label: '近 12 小时'
        },
        {
          value: '近 1 天',
          label: '近 1 天'
        },
        {
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        }
      ],
      tableData: [
        {
          date: '2020-11-11 13:23:23',
          projectName: { show: true, txt: 'csaa' },
          kubernetesNamespace: { show: true, txt: 'chaos-dev' },
          applicationName: { show: true, txt: '1111' },
          node: { show: true, txt: '25.2.20.174' },
          podName: { show: true, txt: 'chaosblade-box-tttbs' },
          containerId: { show: true, txt: 'd4936db6' },
          paths: { show: true, txt: 'stdout' },
          content: { show: true, txt: 'ksdksdjkjskdkdak' }
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: { show: true, txt: 'csaa' },
          kubernetesNamespace: { show: true, txt: 'chaos-dev' },
          applicationName: { show: true, txt: '1111' },
          node: { show: true, txt: '25.2.20.174' },
          podName: { show: true, txt: 'chaosblade-box-tttbs' },
          containerId: { show: true, txt: 'd4936db6' },
          paths: { show: true, txt: 'stdout' },
          content: { show: true, txt: 'ksdksdjkjskdkdak' }
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: { show: true, txt: 'csaa' },
          kubernetesNamespace: { show: true, txt: 'chaos-dev' },
          applicationName: { show: true, txt: '1111' },
          node: { show: true, txt: '25.2.20.174' },
          podName: { show: true, txt: 'chaosblade-box-tttbs' },
          containerId: { show: true, txt: 'd4936db6' },
          paths: { show: true, txt: 'stdout' },
          content: { show: true, txt: 'ksdksdjkjskdkdak' }
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: { show: true, txt: 'csaa' },
          kubernetesNamespace: { show: true, txt: 'chaos-dev' },
          applicationName: { show: true, txt: '1111' },
          node: { show: true, txt: '25.2.20.174' },
          podName: { show: true, txt: 'chaosblade-box-tttbs' },
          containerId: { show: true, txt: 'd4936db6' },
          paths: { show: true, txt: 'stdout' },
          content: { show: true, txt: 'ksdksdjkjskdkdak' }
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: { show: true, txt: 'csaa' },
          kubernetesNamespace: { show: true, txt: 'chaos-dev' },
          applicationName: { show: true, txt: '1111' },
          node: { show: true, txt: '25.2.20.174' },
          podName: { show: true, txt: 'chaosblade-box-tttbs' },
          containerId: { show: true, txt: 'd4936db6' },
          paths: { show: true, txt: 'stdout' },
          content: { show: true, txt: 'ksdksdjkjskdkdak' }
        }
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
          prop: 'projectName',
          label: '项目名称（ProjectName）',
          // 控制是否选中
          checked: true
        },
        {
          prop: 'kubernetesNamespace',
          label: '命名空间（KubernetesNamespace）',
          checked: true
        },
        {
          prop: 'applicationName',
          label: '应用名称（ApplicationName）',
          checked: false
        },
        {
          prop: 'node',
          label: '节点（Node）',
          checked: true
        },
        {
          prop: 'podName',
          label: '容器组（PodName）',
          checked: true
        },
        {
          prop: 'containerId',
          label: '容器（ContainerID）',
          checked: true
        },
        {
          prop: 'paths',
          label: '路径（Paths）',
          checked: true
        }
      ],
      dialogVisible: false
    }
  },
  computed: {},
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('chart')
      const myChart = echarts.init(chartDom)
      const option = {
        xAxis: {
          axisTick: {
            length: 6,
            lineStyle: {
              type: 'dashed'
              // ...
            }
          },
          type: 'category',
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00']
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          splitNumber: 1
        },
        series: [
          {
            data: [80, 10, 20, 30, 40, 50, 60, 120],
            type: 'bar',
            barWidth: 10, // 柱图宽度
            itemStyle: {
              normal: {
                color: '#1890ff',
                // 这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                barBorderRadius: [50, 50, 50, 50]
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    changes(e, index) {
      console.log(e)
      const unChecked = []
      for (let i = 0; i < this.checkboxList.length; i++) {
        if (JSON.stringify(e).indexOf(JSON.stringify(this.checkboxList[i])) === -1) {
          unChecked.push(this.checkboxList[i])
        }
      }
      console.log(unChecked)
      this.tableData = this.tableData.map(item => {
        for (let i = 0; i < e.length; i++) {
          item[e[i].prop].show = true
        }
        for (let i = 0; i < unChecked.length; i++) {
          item[unChecked[i].prop].show = false
        }
        return item
      })
    },
    openDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-main {
  padding: 20px 20px 20px 0px;
  #chart {
    margin-top: 10px;
    height: 200px;
  }
}
</style>

<template>
  <el-dialog title="日志上下文" :visible="dialogVisible" width="80%" @close="closeDialog">
    <div class="detailTitle">
      <span>共{{ totle }}条日志</span>
      <div>
        <el-button type="text" icon="el-icon-s-tools">设置</el-button><el-button type="text" icon="el-icon-download">导出</el-button>
      </div>
    </div>
    <div class="detailMore">
      <el-button type="text">加载更多</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column width="200" label="" prop="date" />
      <el-table-column label="">
        <template slot-scope="scope">
          <span> {{ scope.row.projectName }}</span>
          <span> {{ scope.row.kubernetesNamespace }}</span>
          <span> {{ scope.row.applicationName }}</span>
          <span style="color: #00bfff"> {{ scope.row.node }}</span>
          <span style="color: #1afa29"> {{ scope.row.podName }}</span>
          <span style="color: #ff6347"> {{ scope.row.containerId }}</span>
          <span style="color: #9400d3"> {{ scope.row.paths }}</span>
          <span> {{ scope.row.content }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="detailMore">
      <el-button type="text">加载更多</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DetailDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      totle: 6,
      tableData: [
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        },
        {
          date: '2020-11-11 13:23:23',
          projectName: 'csaa',
          kubernetesNamespace: 'chaos-dev',
          applicationName: '1111',
          node: '25.2.20.174',
          podName: 'chaosblade-box-tttbs',
          containerId: 'd4936db6',
          paths: 'stdout',
          content: 'ksdksdjkjskdkdak'
        }
      ],
      containerGroup: '111',
      container: '222'
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.detailTitle {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(247, 249, 252);
}
.detailMore {
  width: 100%;
  text-align: center;
}
</style>

<template>
  <div class="detail">
    <div class="detail-header">
      <div style="font-weight: 700; font-size: 20px; margin-bottom: 10px; color: rgb(50, 52, 55)">基本信息</div>
      <div class="informations">
        <div>
          <span class="title">状态：</span>
          <i v-if="form.state === true" class="el-icon-success" style="color: #1890ff" />
          <i v-else class="el-icon-warning" />
          <span v-if="form.state === true">运行中</span>
          <span v-else>已停止</span>
        </div>
        <div>
          <span class="title">所属应用：</span><a style="color: #1890ff">{{ form.pod }}</a>
        </div>
        <div>
          <span class="title">标签：</span>
          <el-tag type="info" size="mini" style="margin-right: 10px">app：build</el-tag>
          <el-tag type="info" size="mini" style="margin-right: 10px">name：build</el-tag>
          <i class="el-icon-edit" style="color: #1890ff" @click="handleUpdateLabels" />
        </div>
        <div>
          <span class="title">主机选择器：</span> <span>{{ form.hostSelector }}</span>
        </div>
        <div>
          <span class="title">更新策略：</span> <span>{{ form.updateStrategy }}</span>
        </div>
        <div>
          <span class="title">关闭宽限期：</span> <span>{{ form.closeGracePeriod }}</span>
        </div>
        <div>
          <span class="title">启动耗时：</span><span>{{ form.startupTime }}</span>
        </div>
        <div>
          <span class="title">停止耗时：</span><span>{{ form.stopTime }}</span>
        </div>
      </div>
      <div class="chart-div">
        <workload-status :number="number" @changeNumber="changeNumber" />
      </div>
      <el-button
        v-if="storageVolumeInfoVisible"
        round
        size="mini"
        style="color: #1890ff; margin-bottom: 10px"
        @click="openStorageVolumeInfo"
      >存储卷<i
        class="el-icon-d-arrow-right"
      /></el-button>
      <div v-if="infoStorageVolumeVisible" class="detail-center-table">
        <el-table :data="storageVolumeInfoData" style="width: 100%" header-row-class-name="headerStyle">
          <el-table-column prop="storageVolumeName" label="名称" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="configuration" label="相关配置" />
        </el-table>
        <el-button
          class="table-button"
          round
          type="primary"
          size="mini"
          @click="closeStorageVolumeInfo"
        >存储卷 <i
          class="el-icon-d-arrow-right"
          style="transform: rotate(-90deg)"
        /></el-button>
      </div>
    </div>
    <div class="detail-center">
      <div style="font-weight: 700; font-size: 20px; margin-bottom: 20px; color: rgb(50, 52, 55)">容器</div>
      <div style="height: 50px; background-color: #eee; margin-bottom: 30px">
        <div class="detail-center-container">kibana</div>
      </div>
      <div style="padding: 10px; display: flex; justify-content: space-between">
        <el-descriptions :column="2" style="width: 1000px; background-color: #1890ff">
          <el-descriptions-item
            label="镜像"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >kooriookami <i
            class="el-icon-edit"
            style="color: #1890ff"
            @click="openDialog('更新镜像版本')"
          /></el-descriptions-item>
          <el-descriptions-item
            label="资源限制"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >- <i
            class="el-icon-edit"
            style="color: #1890ff"
            @click="openDialog('更新资源限制')"
          /></el-descriptions-item>
          <el-descriptions-item
            label="启动命令"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >-</el-descriptions-item>
          <el-descriptions-item
            label="参数"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          />
          <el-descriptions-item
            label="停止前执行"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >-</el-descriptions-item>
        </el-descriptions>

        <div style="display: flex; justify-content: space-between; width: 120px">
          <el-popover placement="right" trigger="click">
            <div class="container-popover">
              <div class="title">全部容器组</div>
              <div>
                <p class="groupTitle">容器组</p>
                <p v-for="con in containerList" :key="con.value">
                  {{ con.label }}
                </p>
              </div>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-receiving">EXEC</el-button>
          </el-popover>
          <el-popover placement="right" trigger="click">
            <div class="container-popover">
              <p class="groupTitle">容器组</p>
              <p v-for="con in containerList" :key="con.value">
                {{ con.label }}
              </p>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-timer">日志</el-button>
          </el-popover>
        </div>
      </div>

      <el-button
        v-if="storageVolumeButtonVisible"
        round
        size="mini"
        style="color: #1890ff; margin-bottom: 10px"
        @click="openStorageVolume"
      >已挂载存储卷<i
        class="el-icon-d-arrow-right"
      /></el-button>
      <div v-if="storageVolumeVisible" class="detail-center-table">
        <el-table :data="storageVolumeData" style="width: 100%" header-row-class-name="headerStyle">
          <el-table-column prop="storageVolumeName" label="存储卷名称" />
          <el-table-column prop="subpath" label="子路径" />
          <el-table-column prop="mountpath" label="挂载路径" />
          <el-table-column prop="readOnly" label="只读" />
        </el-table>
        <el-button
          class="table-button"
          round
          type="primary"
          size="mini"
          @click="closeStorageVolume"
        >已挂载存储卷 <i
          class="el-icon-d-arrow-right"
          style="transform: rotate(-90deg)"
        /></el-button>
      </div>
      <br>

      <el-button
        v-if="buttonVisible"
        round
        size="mini"
        style="color: #1890ff"
        @click="openTable"
      >端口 <i
        class="el-icon-d-arrow-right"
      /></el-button>
      <div v-if="visible" class="detail-center-table">
        <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle">
          <el-table-column prop="agreement" label="协议" />
          <el-table-column prop="port" label="端口" />
          <el-table-column prop="portName" label="端口名称" />
        </el-table>
        <el-button
          class="table-button"
          round
          type="primary"
          size="mini"
          @click="closeTable"
        >端口 <i
          class="el-icon-d-arrow-right"
          style="transform: rotate(-90deg)"
        /></el-button>
      </div>
    </div>
    <div class="detail-footer">
      <div class="detail-footer-title">
        <div style="font-weight: 700; font-size: 20px; margin-bottom: 20px; color: rgb(50, 52, 55)">自动伸缩</div>
        <el-button type="primary" plain @click="updateAutostretchDialog">更新</el-button>
      </div>
    </div>
    <!-- 自动伸缩更新 对话框 -->
    <UpdateAutostretchDialog :update-autostretch-visible.sync="updateAutostretchVisible" />
    <!-- 更新标签 -->
    <UpdateLabelsDialog :update-labels-visible.sync="updateLabelsVisible" />
    <!-- 更新资源限制 弹窗 -->
    <resources-image
      :dialog-title="dialogTitle"
      :resource-visible="resourceVisible"
      @closeResourceDialog="closeResourceDialog"
      @submitResourceDialog="submitResourceDialog"
    />
  </div>
</template>

<script>
import WorkloadStatus from '@/apps/container/views/components/WorkloadStatus'
import UpdateLabelsDialog from '@/apps/container/views/components/UpdateLabelsDialog.vue'
import UpdateAutostretchDialog from '@/apps/container/views/components/UpdateAutostretchDialog.vue'
import ResourcesImage from '@/apps/container/views/components/ResourcesImage'

export default {
  name: 'DetailInformation',
  components: { WorkloadStatus, UpdateLabelsDialog, ResourcesImage, UpdateAutostretchDialog },
  props: {},
  data() {
    return {
      form: {
        state: true,
        pod: 'airm-c-anomaly-detecti',
        label1: '',
        hostSelector: '',
        updateStrategy: '滚动更新策略 ( 最大可超出数: 1, 最多不可用数: 1 )',
        closeGracePeriod: '30秒',
        startupTime: '',
        stopTime: ''
      },
      tableData: [
        {
          agreement: 'TCP',
          port: '80',
          portName: '-'
        }
      ],
      storageVolumeData: [
        {
          storageVolumeName: 'hosts',
          subpath: '-',
          mountpath: '/var/run/docker',
          readOnly: '否'
        },
        {
          storageVolumeName: 'docker',
          subpath: '-',
          mountpath: '/etc/hosts',
          readOnly: '否'
        }
      ],
      storageVolumeInfoData: [
        {
          storageVolumeName: 'hosts',
          type: '主机路径',
          configuration: '/var/run/docker'
        },
        {
          storageVolumeName: 'hosts',
          type: '主机路径',
          configuration: '/var/run/docker'
        }
      ],
      visible: false,
      storageVolumeVisible: false,
      storageVolumeButtonVisible: true,
      infoStorageVolumeVisible: false,
      storageVolumeInfoVisible: true,
      buttonVisible: true,
      number: 5,
      containerList: [
        {
          label: '123',
          value: '123'
        },
        {
          label: '234',
          value: '234'
        }
      ],
      updateLabelsVisible: false,
      updateAutostretchVisible: false,
      // 更新资源限制
      dialogTitle: '',
      resourceVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openTable() {
      this.visible = true
      this.buttonVisible = false
    },
    closeTable() {
      this.visible = false
      this.buttonVisible = true
    },
    openStorageVolume() {
      this.storageVolumeButtonVisible = false
      this.storageVolumeVisible = true
    },
    closeStorageVolume() {
      this.storageVolumeButtonVisible = true
      this.storageVolumeVisible = false
    },
    openStorageVolumeInfo() {
      this.infoStorageVolumeVisible = true
      this.storageVolumeInfoVisible = false
    },
    closeStorageVolumeInfo() {
      this.infoStorageVolumeVisible = false
      this.storageVolumeInfoVisible = true
    },
    changeNumber(val) {
      this.number = Number(val)
    },
    handleUpdateLabels() {
      this.updateLabelsVisible = true
    },
    openDialog(item) {
      // console.log(item)
      if (item === '更新资源限制') {
        this.dialogTitle = `更新资源限制`
        this.resourceVisible = true
        this.resourceForm = {
          name: 'nginx',
          cpu: 1,
          cpuCompony: '核',
          memory: 512,
          memoryCompony: 'Mi'
        }
      } else {
        this.dialogTitle = `更新镜像版本`
        this.resourceVisible = true
        this.resourceForm = {
          name: 'nginx',
          cpu: null,
          cpuCompony: '',
          memory: null,
          memoryCompony: '',
          monitor: 'nginx',
          version: 'latest'
        }
      }
    },
    closeResourceDialog() {
      this.resourceVisible = false
    },
    submitResourceDialog(val) {
      console.log(this.resourceForm)
      this.resourceVisible = false
    },
    // 自动伸缩更新 弹框
    updateAutostretchDialog() {
      this.updateAutostretchVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  background-color: rgb(240, 242, 245);
  border: 1px solid #eee;
  .detail-header {
    position: relative;
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    detail-center-table {
      position: relative;
      padding: 30px 30px 30px 30px;
      border: 1px solid #1890ff;
    }
    .title {
      color: rgb(50, 52, 55);
      font-size: 15px;
      font-weight: 700;
    }
    .informations {
      color: rgb(50, 52, 55);
      padding: 0 20px;
      line-height: 30px;
    }
    .chart-div {
      width: 250px;
      position: absolute;
      top: 150px;
      right: 0;
    }
  }
  .detail-center {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    .detail-center-container {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-top: 3px solid #1890ff;
      text-align: center;
      line-height: 50px;
      margin-bottom: 30px;
    }
  }
  .detail-footer {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    .detail-footer-title {
      display: flex;
      justify-content: space-between;
      height: 45px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e4e7ed;
    }
  }
}
.my-label {
  background: #1890ff;
}

.my-content {
  background: #fde2e2;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-d-arrow-right {
  transform: rotate(90deg);
}
.container-popover {
  .title {
    border-bottom: 1px solid $border-color-one;
    padding-bottom: 5px;
  }
  p {
    margin: 2px 0;
    line-height: $line-height-22;
    cursor: pointer;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
.detail-center-table {
  position: relative;
  padding: 30px 30px 30px 30px;
  border: 1px solid #1890ff;
  .table-button {
    position: absolute;
    bottom: -15px;
    left: 20px;
  }
}
</style>

<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col v-for="item in baseInfoData" :key="item.label" :span="24" class="label-value">
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              <i style="color: #1890ff" :class="item.frontIcon" />
              {{ item.value ? item.value : '-' }}
              <i style="color: #1890ff" :class="item.afterIcon" class="cursor-pointer" @click="handleUpdateLabels" />
            </span>
          </el-col>
        </el-row>
      </section>
      <div class="chart-div">
        <workload-status :number="number" @changeNumber="changeNumber" />
      </div>
    </BaseCard>
    <div class="containerGroup">
      <div class="card-title left-header">
        <span>容器</span>
      </div>
      <div class="container-header">
        <span>{{ name }}</span>
      </div>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col v-for="item in deployInfoData" :key="item.label" :span="12" class="label-value">
            <span style="font-size: 14px">{{ item.label }}</span>: &nbsp;&nbsp;

            <div v-if="item.type === 'mulList'" style="display: inline-block">
              <span v-for="n in item.value" :key="n.index" style="font-size: 14px">
                <i
                  :class="{
                    [n.frontIcon]: true,
                    'primary-text': true,
                    'primary2-text': n.label === 'CPU'
                  }"
                />
                {{ n.label ? n.label : '-' }}
                {{ n.company ? n.company : '' }}
              </span>
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" @click="openDialog('更新资源限制')" />
            </div>
            <span v-else style="font-size: 14px">
              {{ item.value ? item.value : '-' }}
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" @click="openDialog('更新镜像版本')" />
            </span>
          </el-col>
        </el-row>
        <div class="button-log">
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
      </section>
    </div>
    <!-- 更新标签 -->
    <UpdateLabelsDialog :update-labels-visible.sync="updateLabelsVisible" />
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
import ResourcesImage from '@/apps/container/views/components/ResourcesImage'

export default {
  name: 'BaseInfo',
  components: { WorkloadStatus, UpdateLabelsDialog, ResourcesImage },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseInfoData: [
        {
          label: '状态',
          frontIcon: 'el-icon-refresh',
          value: '处理中(4/8)'
        },
        {
          label: '标签',
          value: '',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '主机选择器',
          value: ''
        },
        {
          label: '更新策略',
          value: '滚动更新策略（最多不可用数：1）'
        },
        {
          label: '关闭宽限期',
          value: '30秒'
        }
      ],

      deployInfoData: [
        {
          label: '镜像',
          value: 'nginx:latest',
          afterIcon: 'el-icon-edit'
        },

        {
          label: '资源限制',
          type: 'mulList',
          afterIcon: 'el-icon-edit',
          value: [
            {
              label: '不限制',
              frontIcon: 'el-icon-cpu'
            },
            {
              label: '不限制',
              frontIcon: 'el-icon-bank-card'
            }
          ]
        },
        {
          label: '启动命令',
          value: ''
        },
        {
          label: '参数',
          value: ''
        },
        {
          label: '停止前执行',
          value: ''
        }
      ],
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
      number: 5,
      updateLabelsVisible: false,
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
    changeNumber(val) {
      this.number = Number(val)
    },
    handleUpdateLabels() {
      this.updateLabelsVisible = true
    },
    closeResourceDialog() {
      this.resourceVisible = false
    },
    submitResourceDialog(val) {
      console.log(this.resourceForm)
      this.resourceVisible = false
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
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  position: relative;
  margin-top: 20px;
  .chart-div {
    width: 250px;
    position: absolute;
    top: 80px;
    right: 0;
  }
}
.component-div {
  position: relative;
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  font-size: $font-size-14;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
}
.containerGroup {
  background-color: #fff;
  padding: 20px 20px;

  span {
    font-size: 20px;
    font-weight: 500;
  }
  .container-header {
    margin-top: 20px;
    background-color: #eee;
    span {
      display: inline-block;
      width: 200px;
      background-color: #fff;
      padding: 10px 10px;
      border-top: 3px solid #1890ff;
      text-align: center;
    }
  }
  .button-log {
    position: absolute;
    top: 0;
    right: 0;
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
}
</style>

<template>
  <div class="monitor-container margin-top">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span />
        </div>
      </header>
      <section>
        <div class="monitor-header flex-center">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>部署</span>
              </div>
              <div class="text item">
                <transverse-bar :chart-data="computeData1" />
              </div>
            </el-card>
          </div>
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>守护进程集</span>
              </div>
              <div class="text item">
                <transverse-bar :chart-data="computeData2" />
              </div>
            </el-card>
          </div>
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>有状态副本集</span>
              </div>
              <div class="text item">
                <transverse-bar :chart-data="computeData3" />
              </div>
            </el-card>
          </div>
        </div>
        <div class="margin-top">
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                系统面板
                <el-tooltip class="item" effect="dark" content="使用率 = 使用值/限制值" placement="top">
                  <i class="el-icon-question question-icon margin-left10" />
                </el-tooltip>
              </span>
              <div>
                <div class="text-right">
                  <el-select v-model="containerTime" filterable placeholder="请选择" size="mini">
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                    <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>CPU{{ cpuType }}{{ cpuType === '使用率' ? '（%）' : '（m）' }}</span>
                    <el-radio-group v-model="cpuType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="使用率" />
                      <el-radio-button label="使用量" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>内存{{ memoryType }}{{ memoryType === '使用率' ? '（%）' : '（m）' }}</span>
                    <el-radio-group v-model="memoryType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="使用率" />
                      <el-radio-button label="使用量" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>网络流量{{ networkFlowType }}速率(Bps)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="网络流量速率 = 计算组件中每个容器组的网络流量速率总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group v-model="networkFlowType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="流入" />
                      <el-radio-button label="流出" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>网络报文量{{ NetworkMessageVolumeType }}速率(个/秒)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="网络报文量速率 = 计算组件中每个容器组的网络报文量速率总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group
                      v-model="NetworkMessageVolumeType"
                      size="small"
                      style="float: right; padding: 3px 0"
                    >
                      <el-radio-button label="接收" />
                      <el-radio-button label="发送" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>磁盘{{ diskType }}速率(B/s)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="磁盘读写速率 = 计算组件中每个容器组挂载的分区的读写速率总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group v-model="diskType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="读" />
                      <el-radio-button label="写" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
                <el-card class="box-card margin-top">
                  <div slot="header" class="flex-center">
                    <span>磁盘{{ diskIOPSType }}IOPS(次/秒)
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="磁盘 IOPS = 计算组件中每个容器组挂载的分区的 IOPS 总和"
                        placement="top"
                      >
                        <i class="el-icon-question question-icon margin-left10" />
                      </el-tooltip>
                    </span>
                    <el-radio-group v-model="diskIOPSType" size="small" style="float: right; padding: 3px 0">
                      <el-radio-button label="读" />
                      <el-radio-button label="写" />
                    </el-radio-group>
                  </div>
                  <div class="text item">
                    <line-chart :chart-data="containerLineData" :show-total="false" style="height: 200px" />
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="自定义面板">自定义面板</el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import Mock from 'mockjs'
import LineChart from '@/apps/container/views/components/LineChart'
import TransverseBar from '@/apps/container/views/components/TransverseBar'
export default {
  name: 'Monitor',
  components: { LineChart, TransverseBar },
  props: {},
  data() {
    const containerLineData = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '异常',
          flied: 'yc'
        }
      ],
      'data|10': [
        {
          name: '@date',
          yxz: '@integer(0 ,10)',
          yc: '@integer(0 ,10)'
        }
      ]
    })
    const computeData1 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '部署',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    const computeData2 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '有状态副本集',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    const computeData3 = Mock.mock({
      fields: [
        {
          name: '运行中',
          flied: 'yxz'
        },
        {
          name: '处理中',
          flied: 'clz'
        },
        {
          name: '已停止',
          flied: 'ytz'
        }
      ],
      data: [
        {
          label: '守护进程集',
          yxz: '@integer(0 ,10)',
          clz: '@integer(0 ,10)',
          ytz: '@integer(0 ,10)'
        }
      ]
    })
    return {
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
      containerLineData,
      computeData1,
      computeData2,
      computeData3,
      cpuType: '使用率',
      memoryType: '使用率',
      networkFlowType: '流入',
      NetworkMessageVolumeType: '接收',
      diskType: '读',
      diskIOPSType: '读'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.monitor-container {
  .monitor-header {
    width: 100%;
    > div {
      width: 33%;
    }
  }
}
</style>

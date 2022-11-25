<template>
  <el-dialog title="更新自动伸缩" :visible="updateAutostretchVisible" width="60%" @close="closeUpdateAutostretchDialog">
    <LineAlert :content="content" />
    <div>
      <el-radio v-model="radio" label="不设置" value="noSettingRadio" />
    </div>
    <div class="Autostretchcontainer">关闭自动伸缩</div>
    <div><el-radio v-model="radio" label="指标调节" value="timeRadio" /></div>
    <div class="Autostretchcontainer timeRadio">
      <el-form :model="timeForm" :rules="timeFormRules" label-width="130px" label-suffix=":">
        <el-form-item label="最小实例数" prop="minSize">
          <el-input v-model="timeForm.minSize" />
        </el-form-item>
        <el-form-item label="最大实例数" prop="maxSize">
          <el-input v-model="timeForm.maxSize" />
        </el-form-item>

        <el-form-item label="触发策略" prop="triggerStrategy">
          <table border="0" style="width: 100%">
            <thead>
              <tr class="headerStyle">
                <th>
                  <div class="cell">
                    <span class="requireFlag">*</span>
                    指标
                  </div>
                </th>
                <th>
                  <div class="cell">
                    <span class="requireFlag">*</span>
                    目标阀值
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="(domain, index) in timeForm.triggerStrategy" :key="domain.id">
                <td>
                  <el-form-item
                    label=""
                    :prop="'triggerStrategy.' + index + '.targetThreshold'"
                    :rules="{
                      required: true,
                      message: '目标阀值不能为空',
                      trigger: 'blur'
                    }"
                  >
                    <el-input v-model="triggerStrategy.targetThreshold" />
                  </el-form-item>
                </td>
                 <td>
                  <el-form-item
                    label=""
                    :prop="'triggerStrategy.' + index + '.servicePortName'"
                    :rules="{
                      required: false,
                      message: '端口名称不能为空',
                      trigger: 'blur'
                    }"
                  >
                    <el-input v-model="domain.servicePortName" />
                  </el-form-item>
                </td>
              </tr> -->
            </tbody>
          </table>
        </el-form-item>
      </el-form>
      <el-tooltip style="position: absolute; top: 0; right: -30px" class="item" effect="dark" placement="top">
        <div slot="content">
          最小副本数：容器组最小运行个数<br>最大副本数：容器组最多运行个数<br>步长：当触发伸缩策略时，每15秒按步长设置调整容器组副本数量，直到符合触发策略计算的副本数
        </div>
        <i class="el-icon-question question-icon" />
      </el-tooltip>
    </div>
    <div>
      <el-radio v-model="radio" label="定时调节" value="targetRadio" />
      <div class="Autostretchcontainer">
        <el-table style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column label="类型" />
          <el-table-column label="触发条件" />
          <el-table-column prop="application" label="目标实例数" />
        </el-table>
        <el-tooltip style="position: absolute; top: 5px; right: -20px" class="item" effect="dark" placement="top">
          <div slot="content">
            时间：提供时间周期的快速配置方式，支持每天或按星期的时间触发<br>自定义：crontab表达式
          </div>
          <i class="el-icon-question question-icon" />
        </el-tooltip>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeUpdateAutostretchDialog">更新</el-button>
      <el-button @click="closeUpdateAutostretchDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert/index.vue'
export default {
  name: 'UpdateAutostretchDialog',
  components: { LineAlert },
  props: {
    updateAutostretchVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      content:
        '自动伸缩（HPA）能够实现Pod水平伸缩，当所需资源足够的情况下扩容能带来较好效果，但在集群资源不足时，则扩容出的Pod状态仍会Pending，所以请确保集群有足够资源或合理配额，也可通过配置告警监测伸缩情况。',
      radio: {
        noSettingRadio: '',
        timeRadio: '',
        targetRadio: ''
      },
      timeForm: {
        minSize: '1',
        maxSize: '1',
        triggerStrategy: [
          {
            targetThreshold: ''
          }
        ]
      },
      timeFormRules: {
        minSize: [
          {
            required: true,
            message: '请输入最小实例数',
            trigger: 'blur'
          }
        ],
        maxSize: [
          {
            required: true,
            message: '请输入最大实例数',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    closeUpdateAutostretchDialog() {
      this.$emit('update:updateAutostretchVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.Autostretchcontainer {
  position: relative;
  margin: 10px 25px;
}
.timeRadio {
  padding: 10px;
  border: 10px solid rgb(247, 249, 252);
}
</style>

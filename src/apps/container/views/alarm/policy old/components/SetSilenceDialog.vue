<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="800px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span>设置静默</span>
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">
            为指定的告警策略设置静默后，在静默时间范围内触发告警，不发送通知。
          </div>
          <i class="el-icon-question question-icon" />
        </el-tooltip>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        label-suffix=":"
      >
        <el-form-item label="告警策略" prop="name">
          {{ ruleForm.name }}
        </el-form-item>
        <el-form-item label="告警静默" prop="isWarning">
          <el-switch
            v-model="ruleForm.isWarning"
          /></el-form-item>
        <el-form-item
          v-if="ruleForm.isWarning"
          label="静默时间"
          prop="validity"
        >
          <el-radio-group v-model="ruleForm.validity">
            <el-radio label="永久" value="永久" />
            <el-radio label="自定义" value="自定义" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.validity === '自定义'"
          label="到期时间"
          prop="date"
        >
          <div class="flex-start">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            />
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                告警从 “开始时间” 进入静默状态，到期后恢复告警，时间间隔不小于 5
                分钟。
              </div>
              <i class="el-icon-question question-icon margin-left10" />
            </el-tooltip>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">设置</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SetSilenceDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        isWarning: false,
        validity: '永久',
        date: ''
      }
    }
  },
  computed: {},
  watch: {
    currentObj: {
      handler: function(newVal, oldVal) {
        this.ruleForm = {
          ...newVal
        }
      },
      deep: true
    }
  },
  created() {
    this.ruleForm = {
      ...this.currentObj
    }
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('closeDialog')
    },
    submitForm() {
      this.$emit('submitForm', this.ruleForm)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

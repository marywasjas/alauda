<template>
  <el-dialog title="申请详情" :visible="approvalaDialogVisible" width="40%" @close="closed">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
      <el-form-item label="审核结果" prop="approvalResult">
        <el-select v-model="ruleForm.approvalResult" style="width: 400px" placeholder="请选择审核结果">
          <el-option label="同意" value="consent" />
          <el-option label="拒绝" value="refuse" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批意见" prop="approvalOpinion">
        <el-input
          v-model="ruleForm.approvalOpinion"
          type="textarea"
          style="width: 400px"
          placeholder="请输入审核原因"
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    ><center>
      <el-button type="primary" icon="el-icon-search" @click="submitForm">确定</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="resetForm('ruleForm')">重置</el-button>
    </center>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ApprovalDialog',
  props: {
    approvalaDialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      ruleForm: {
        approvalResult: '',
        approvalOpinion: ''
      },
      rules: {
        approvalResult: [{ required: true, message: '必填项', trigger: 'change' }]
      }
    }
  },
  methods: {
    closed() {
      this.$emit('update:approvalaDialogVisible', false)
    },
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.$emit('update:approvalaDialogVisible', false)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>

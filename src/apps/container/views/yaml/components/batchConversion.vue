<template>
  <el-dialog title="批量转换" :visible="conversionDialogVisible" width="40%" @close="closed">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
      <el-form-item label="目标集群:" prop="cluster">
        <el-input v-model="ruleForm.cluster" />
      </el-form-item>
      <el-form-item label="目标命名空间:" prop="namespace">
        <el-input v-model="ruleForm.namespace" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="closed">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BatchConversionDialog',
  props: {
    conversionDialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      ruleForm: {
        cluster: '',
        namespace: ''
      },
      rules: {
        cluster: [{ required: true, message: '必填项', trigger: 'blur' }],
        namespace: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    closed() {
      this.$emit('update:conversionDialogVisible', false)
    },
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.$emit('update:conversionDialogVisible', false)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

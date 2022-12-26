<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="formVisible"
      width="800px"
      :before-close="closeFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="margin-top"
        >
          <el-form-item label="执行命令" prop="command">
            <el-input v-model="ruleForm.command" placeholder="执行命令" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExecuteCommandDialog',
  components: {},
  props: {
    formVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '执行命令'
    }
  },
  data() {
    return {
      ruleForm: {
        command: '/bin/bash'
      },
      rules: {
        command: [
          { required: true, message: '请输入执行命令', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeFormDialog() {
      this.$emit('closeFormDialog')
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm', this.ruleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

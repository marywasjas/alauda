<template>
  <el-dialog title="申请详情" :visible="dialogVisible" width="40%" @close="closed">
    <el-row>
      <el-col :span="24">
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请账号">
                <el-input v-model="ruleForm.account" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批状态">
                <el-input v-model="ruleForm.approvalStatus" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="ruleForm.projectName" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请时间">
                <el-input v-model="ruleForm.applicationTime" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请时长">
                <el-input v-model="ruleForm.applicationDuration" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批者账号">
                <el-input v-model="ruleForm.ApproverNumber" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作者">
                <el-input v-model="ruleForm.handlers" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生效状态">
                <el-input v-model="ruleForm.effectStatus" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="生效时间">
                <el-input v-model="ruleForm.effectTime" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效时间">
                <el-input v-model="ruleForm.failureTime" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请原因">
                <el-input v-model="ruleForm.applicationReason" type="textarea" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批意见">
                <el-input v-model="ruleForm.approvalOpinion" type="textarea" style="width: 200px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
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
      ruleForm: {
        account: '7626',
        approvalStatus: '未审批',
        projectName: 'uvm',
        applicationTime: '2022-12-21',
        applicationDuration: '12',
        ApproverNumber: '',
        handlers: '7627',
        effectStatus: '未生效',
        effectTime: '',
        failureTime: '',
        applicationReason: '',
        approvalOpinion: ''
      }
    }
  },
  methods: {
    closed() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="main">
    <el-card>
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :inline="true">
        <el-form-item label="申请账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入..." />
        </el-form-item>
        <el-form-item label="审批状态" prop="approvalStatus">
          <el-select v-model="ruleForm.approvalStatus" placeholder="请选择...">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生效状态" prop="effectStatus">
          <el-select v-model="ruleForm.effectStatus" placeholder="请选择...">
            <el-option label="请选择..." value="select" disabled />
            <el-option label="未生效" value="invalid" />
            <el-option label="已生效" value="executed" />
            <el-option label="已失效" value="failed" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData.data"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        height="584"
        stripe
        style="width: 100%"
        header-row-class-name="headerStyle"
      >
        <el-table-column label="申请列表">
          <el-table-column v-for="col in tableColumnList" :key="col.id" :label="col.label" :prop="col.prop" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="openDetail">详情</el-button>
              <el-button
                size="mini"
                icon="el-icon-edit"
                :disabled="scope.row.isDisabled"
                @click="openApprovala(scope)"
              >审批</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <template slot="empty">无任务列表</template>
      </el-table>
      <el-pagination
        class="margin-top"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="prev,total, sizes,  pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        >
      </el-pagination>
    </el-card>
    <DetailDialog :dialog-visible.sync="dialogVisible" />
    <ApprovalDialog :approvala-dialog-visible.sync="approvalaDialogVisible" />
  </div>
</template>

<script>
import DetailDialog from './components/detail.vue'
import ApprovalDialog from './components/approval.vue'
import { tableData, tableColumnList } from './constant/index'
export default {
  name: 'RightsManagement',
  components: { DetailDialog, ApprovalDialog },
  data() {
    return {
      ruleForm: {
        account: '',
        approvalStatus: '',
        effectStatus: ''
      },
      options: [
        {
          value: 'select',
          label: '请选择...',
          disabled: true
        },
        {
          value: 'niezatwierdzony',
          label: '未审批'
        },
        {
          value: 'approved',
          label: '已审批'
        },
        {
          value: 'rejected',
          label: '已驳回'
        }
      ],
      tableData,
      tableColumnList,
      total: 200,
      pageSize: 10,
      pageNum: 1,
      dialogVisible: false,
      approvalaDialogVisible: false
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      // console.log(this.pageSize)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      // console.log(`当前页: ${val}`)
      // console.log(this.pageNum)
    },
    openDetail() {
      this.dialogVisible = true
    },
    openApprovala(scope) {
      this.approvalaDialogVisible = true
      console.log(scope)
    },
    submitForm() {
      // console.log(this.ruleForm)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: $background-color;
  padding: 0 20px;
  min-height: 100%;
}
</style>

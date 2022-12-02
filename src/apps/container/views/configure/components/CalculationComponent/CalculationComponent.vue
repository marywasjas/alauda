<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="flex-center inTable-desc">
                <p>容器：qweqwe</p>
                <el-button size="small" type="primary" @click="handelConfig(scope.row)">加载配置</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                {{ scope.row[col.id] }}
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <el-dialog
      title="加载配置"
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
import { tableColumnList, tableData } from './constant/index'
export default {
  name: 'CalculationComponent',
  components: { },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      formVisible: false,
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
    handelConfig(row) {
      console.log(row)
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.formVisible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}

</style>

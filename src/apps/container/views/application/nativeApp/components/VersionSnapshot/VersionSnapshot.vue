<template>
  <div class="container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <el-button type="primary" @click="openDialog">创建版本快照</el-button>
        </div>
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
              <div class="inTable-desc">
                <p>{{ scope.row.name }}创建了 Deployment：nginx-nginx</p>
                <p>创建了 Application：nginx</p>
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
              <div v-else-if="col.id === 'resource'">
                <p class="margin0">
                  <i class="el-icon-cpu primary2-text" />
                  {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                </p>
                <p class="margin0">
                  <i class="el-icon-bank-card primary-text" />
                  {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                </p>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i
                  v-if="scope.row.status === 'running'"
                  class="el-icon-video-play running"
                />
                <i
                  v-else-if="scope.row.status === 'stop'"
                  class="el-icon-video-pause stop"
                />
                <i
                  v-else-if="scope.row.status === 'pending'"
                  class="el-icon-loading pending"
                />
                <span>{{ scope.row.statusText }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="distribute">
                      分发
                    </el-dropdown-item>
                    <el-dropdown-item command="rollBack">
                      回滚至改版本
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
      title="创建版本快照"
      :visible.sync="formVisible"
      width="760px"
      :before-close="closeFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          label-suffix=":"
        >
          <el-form-item label="注释" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              placeholder="最多可输入30字"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">创建</el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
export default {
  name: 'VersionSnapshot',
  components: {},
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      formVisible: false,
      ruleForm: {
        remark: ''
      },
      rules: {
        remark: [
          { required: true, message: '最多可输入30字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openDialog() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container-group {
  margin-top: 20px;
}
</style>

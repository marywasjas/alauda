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
                    <!-- <el-dropdown-item command="distribute" @click.native="handelDistribute(scope.row)">
                      分发
                    </el-dropdown-item> -->
                    <el-dropdown-item command="rollBack" @click.native="handelBack(scope.row)">
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
    <!-- 创建版本快照 -->
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
    <!-- 分发 -->
    <el-dialog
      title="分发"
      :visible.sync="distributeFormVisible"
      width="760px"
      :before-close="closeFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-steps :active="activeStep" align-center>
          <el-step title="基本信息" description="" />
          <el-step title="编辑配置文件" description="" />
          <el-step title="分发配置" description="" />
        </el-steps>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          label-suffix=":"
          class="margin-top"
        >
          <div v-if="activeStep===1">
            <el-form-item label="名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item label="版本" prop="version">
              <el-input
                v-model="ruleForm.version"
                placeholder="版本"
              />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="ruleForm.remark"
                type="textarea"
                placeholder="最多可输入30字"
                maxlength="30"
                show-word-limit
              />
            </el-form-item>
          </div>
          <div v-if="activeStep===2">
            <el-tabs v-model="activeName">
              <el-tab-pane label="README" name="readme">
                <monaco-editor
                  ref="readmeMonacoEditor"
                  :code="currentCode"
                  :read-only="false"
                  :language="language"
                  @handleBlur="handleBlur"
                />
              </el-tab-pane>
              <el-tab-pane label="NOTES" name="notes">
                <monaco-editor
                  ref="notesMonacoEditor"
                  :code="currentCode"
                  :read-only="false"
                  :language="language"
                  @handleBlur="handleBlur"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-if="activeStep===3">
            <el-form-item label="分发方式" prop="method">
              <el-radio-group v-model="ruleForm.method">
                <el-radio label="模板同步" value="mb" />
                <el-radio label="打包下载" value="db" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="模板仓库" prop="warehouse">
              <el-select v-model="ruleForm.warehouse" placeholder="请选择模板仓库">
                <el-option label="仓库一" value="shanghai" />
                <el-option label="仓库二" value="beijing" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="activeStep===2 || activeStep===3" @click="prevStep">上一步</el-button>
        <el-button v-if="activeStep===1 || activeStep===2" type="primary" @click="nextStep">下一步</el-button>
        <el-button v-if="activeStep===3" type="primary" @click="submitDistributeForm">分发</el-button>
        <el-button @click="closeDistributeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
export default {
  name: 'VersionSnapshot',
  components: { MonacoEditor },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      formVisible: false,
      ruleForm: {
        name: '',
        version: '',
        icon: '',
        remark: '',
        method: 'mb',
        warehouse: ''
      },
      rules: {
        remark: [
          { required: true, message: '最多可输入30字', trigger: 'blur' }
        ]
      },
      distributeFormVisible: false,
      activeStep: 1,
      activeName: 'readme',
      currentCode: '',
      inputCode: {},
      language: 'yaml'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelBack(row) {
      const returnMsgList = [
        `确定回滚应用至${row.name}吗？`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '回滚',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已回滚'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
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
    },
    // 分发
    handelDistribute(row) {
      console.log(row)
      this.distributeFormVisible = true
    },
    closeDistributeFormDialog() {
      this.distributeFormVisible = false
    },
    prevStep() {
      this.activeStep -= 1
    },
    nextStep() {
      this.activeStep += 1
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    submitDistributeForm() {
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
.avatar-uploader{
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display:flex;
  justify-content:center;
  align-items: center;
}
.avatar-uploader:hover{
  border: 1px dashed $color-primary;
}
</style>

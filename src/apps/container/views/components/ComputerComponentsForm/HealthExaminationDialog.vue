<template>
  <div>
    <!-- 健康检查 弹窗 -->
    <el-dialog
      title="健康检查"
      :visible.sync="healthExaminationFormVisible"
      width="800px"
      :before-close="closeHealthExaminationFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="healthExaminationDialogForm"
          :model="healthExaminationDialogForm"
          :rules="healthExaminationRules"
          label-width="130px"
          label-suffix=":"
        >
          <el-form-item label="协议类型" prop="type">
            <el-radio-group v-model="healthExaminationDialogForm.type">
              <el-radio label="HTTP" value="HTTP" />
              <el-radio label="TCP" value="TCP" />
              <el-radio label="EXEC" value="EXEC" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启动时间" prop="startTime">
            <el-input v-model="healthExaminationDialogForm.startTime" placeholder="启动时间">
              <template slot="append">S</template>
            </el-input>
          </el-form-item>
          <el-form-item label="间隔" prop="interval">
            <el-input v-model="healthExaminationDialogForm.interval" placeholder="间隔">
              <template slot="append">S</template>
            </el-input>
          </el-form-item>
          <el-form-item label="超时时间" prop="timeout">
            <el-input v-model="healthExaminationDialogForm.timeout" placeholder="超时时间">
              <template slot="append">S</template>
            </el-input>
          </el-form-item>
          <el-form-item label="正常阈值" prop="normalThreshold">
            <el-input v-model="healthExaminationDialogForm.normalThreshold" placeholder="正常阈值">
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="不正常阈值" prop="noNormalThreshold">
            <el-input v-model="healthExaminationDialogForm.noNormalThreshold" placeholder="不正常阈值">
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="healthExaminationDialogForm.type==='HTTP'" label="协议" prop="agreement">
            <el-radio-group v-model="healthExaminationDialogForm.agreement">
              <el-radio label="HTTP" value="HTTP" />
              <el-radio label="HTTPS" value="HTTPS" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="healthExaminationDialogForm.port" placeholder="端口" />
          </el-form-item>
          <el-form-item v-if="healthExaminationDialogForm.type==='HTTP'" label="路径" prop="path">
            <el-input v-model="healthExaminationDialogForm.path" placeholder="路径" />
          </el-form-item>
          <el-form-item
            v-if="healthExaminationDialogForm.type==='HTTP'"
            label="请求头"
            prop="requestHeader"
            style="margin-bottom: 0"
          >
            <table border="0" style="width: 100%">
              <thead>
                <tr class="headerStyle">
                  <th>
                    <div class="cell">键</div>
                  </th>
                  <th>
                    <div class="cell">值</div>
                  </th>
                  <th>
                    <div class="cell">操作</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(domain, index) in healthExaminationDialogForm.requestHeader"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item
                      label=""
                      :prop="'requestHeader.' + index + '.key'"
                    >
                      <el-input v-model="domain.key" placeholder="键" />
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'requestHeader.' + index + '.value'"
                    >
                      <el-input v-model="domain.value" placeholder="值" />
                    </el-form-item>
                  </td>
                  <td class="text-center">
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="handleDelete('requestHeader',domain, index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAdd('requestHeader')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
          <el-form-item
            v-if="healthExaminationDialogForm.type==='EXEC'"
            label="启动命令"
            prop="startCommand"
            style="margin-bottom: 0"
          >
            <div v-for="(domain, index) in healthExaminationDialogForm.startCommand" :key="domain.id" class="flex-center">
              <el-form-item
                label=""
                label-width="0"
                :prop="'startCommand.' + index + '.value'"
                :rules="{
                  required: false, message: '启动命令不能为空', trigger: 'blur'
                }"
                style="margin-bottom:22px;flex:1;"
              >
                <el-input v-model="domain.value" />
              </el-form-item>
              <el-button
                icon="el-icon-remove-outline"
                class="cursor-pointer margin-left10"
                type="text"
                style="margin-bottom:22px;"
                @click="handleDelete('startCommand',domain,index)"
              />
            </div>
            <div
              class="cursor-pointer text-center hover-div"
              @click=" handleAdd('startCommand')"
            >
              <i class="el-icon-circle-plus-outline" />
              添加
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitHealthExaminationForm"
        >{{ healthExaminationFormType==='add'?'确定':'保存' }}</el-button>
        <el-button @click="closeHealthExaminationFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'HealthExaminationDialog',
  components: {},
  props: {
    healthExaminationFormVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    healthExaminationFormType: {
      type: String,
      default: ''
    },
    currentHealthExamination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentHealthExaminationFiled: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      healthExaminationDialogForm: {
        type: '',
        startTime: '',
        interval: '',
        timeout: '',
        normalThreshold: '',
        noNormalThreshold: '',
        agreement: '',
        port: '',
        path: '',
        requestHeader: [],
        startCommand: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ]
      },
      healthExaminationRules: {
        startTime: [{ required: true, message: '请输入启动时间', trigger: 'blur' }],
        interval: [{ required: true, message: '请输入间隔', trigger: 'blur' }],
        timeout: [{ required: true, message: '请输入超时时间', trigger: 'blur' }],
        normalThreshold: [{ required: true, message: '请输入正常阈值', trigger: 'blur' }],
        noNormalThreshold: [{ required: true, message: '请输入不正常阈值', trigger: 'blur' }],
        agreement: [{ required: true, message: '请选择协议', trigger: 'change' }],
        port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    currentHealthExamination: {
      handler(newVal, oldVal) {
        this.healthExaminationDialogForm = { ...this.healthExaminationDialogForm, ...this.currentHealthExamination }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    closeHealthExaminationFormDialog() {
      this.$emit('closeHealthExaminationFormDialog')
    },
    submitHealthExaminationForm() {
      this.$refs['healthExaminationDialogForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitHealthExaminationForm', this.currentHealthExaminationFiled, this.healthExaminationFormType, this.healthExaminationDialogForm)
        } else {
          return false
        }
      })
    },
    // 弹窗内删除
    handleDelete(filed, item, index) {
      this.healthExaminationDialogForm[filed].splice(index, 1)
    },
    // 弹窗内添加
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.healthExaminationDialogForm[filed].push(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

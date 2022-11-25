<template>
  <el-dialog title="健康检查" :visible="healthFormVisible" width="800px" @close="onClose">
    <el-form label-width="100px" :model="HealthDialogForm" :rules="HealthDialogFormRules">
      <el-form-item label="协议类型">
        <el-radio-group v-model="HealthDialogForm.type">
          <el-radio label="HTTP" value="HTTP" />
          <el-radio label="TCP" value="TCP" />
          <el-radio label="EXEC" value="EXEC" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="启动时间" prop="startTime">
        <el-input v-model="HealthDialogForm.startTime" placeholder="请输入内容">
          <template slot="append">s</template>
        </el-input>
      </el-form-item>
      <el-form-item label="间隔" prop="interval">
        <el-input v-model="HealthDialogForm.interval" placeholder="请输入内容">
          <template slot="append">s</template>
        </el-input>
      </el-form-item>
      <el-form-item label="超时时长" prop="timeoutDuration">
        <el-input v-model="HealthDialogForm.timeoutDuration" placeholder="请输入内容">
          <template slot="append">s</template>
        </el-input>
      </el-form-item>
      <el-form-item label="正常阀值" prop="normalThreshold">
        <el-input v-model="HealthDialogForm.normalThreshold" placeholder="请输入内容">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>
      <el-form-item label="不正常阀值" prop="abnormalThreshold">
        <el-input v-model="HealthDialogForm.abnormalThreshold" placeholder="请输入内容">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>
      <div v-if="HealthDialogForm.type === 'HTTP'">
        <el-form-item label="协议" prop="agreement">
          <el-radio-group v-model="HealthDialogForm.agreement">
            <el-radio label="HTTP" value="HTTP" />
            <el-radio label="HTTPS" value="HTTPS" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="HealthDialogForm.port" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="HealthDialogForm.path" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="请求头" prop="requestHeader" style="margin-bottom: 0">
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
              <tr v-for="(domain, index) in HealthDialogForm.requestHeader" :key="domain.id">
                <td>
                  <el-form-item label="" :prop="'requestHeader.' + index + '.key'">
                    <el-input v-model="domain.key" placeholder="键" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" :prop="'requestHeader.' + index + '.value'">
                    <el-input v-model="domain.value" placeholder="值" />
                  </el-form-item>
                </td>
                <td class="text-center">
                  <el-button
                    icon="el-icon-remove-outline"
                    class="cursor-pointer margin-left10 margin-right10"
                    type="text"
                    @click="handleRequestHeaderDelete(domain, index)"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div class="cursor-pointer text-center hover-div" @click="handleRequestHeaderAdd">
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form-item>
      </div>
      <div v-if="HealthDialogForm.type === 'TCP'">
        <el-form-item label="端口" prop="port">
          <el-input v-model="HealthDialogForm.port" placeholder="请输入内容" />
        </el-form-item>
      </div>
      <div v-if="HealthDialogForm.type === 'EXEC'">
        <el-form-item label="启动命令" prop="startCommand" style="margin-bottom: 0">
          <table border="0" style="width: 100%">
            <tbody>
              <tr v-for="(domain, index) in HealthDialogForm.startCommand" :key="domain.id">
                <td>
                  <el-form-item label="">
                    <el-input v-model="domain.value" />
                  </el-form-item>
                </td>
                <td class="text-center">
                  <el-button
                    icon="el-icon-remove-outline"
                    class="cursor-pointer margin-left10 margin-right10"
                    type="text"
                    @click="handleCommandDelete(domain, index)"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div class="cursor-pointer text-center hover-div" @click="handleCommandAdd">
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeHealthFormDialog">取 消</el-button>
      <el-button type="primary" @click="submitHealthForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'HealthFormDialog',
  components: {},
  props: {
    healthFormVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      HealthDialogForm: {
        type: 'HTTP',
        startTime: '300',
        interval: '60',
        timeoutDuration: '30',
        normalThreshold: '5',
        abnormalThreshold: 1,
        agreement: 'HTTP',
        port: '80',
        path: '/',
        requestHeader: [],
        startCommand: []
      },
      HealthDialogFormRules: {
        startTime: [
          {
            required: true,
            message: '请输入开始时间',
            trigger: 'blur'
          }
        ],
        interval: [
          {
            required: true,
            message: '请输入间隔时间',
            trigger: 'blur'
          }
        ],
        timeoutDuration: [
          {
            required: true,
            message: '请输入超时时长',
            trigger: 'blur'
          }
        ],
        normalThreshold: [
          {
            required: true,
            message: '请输入正常阀值',
            trigger: 'blur'
          }
        ],
        abnormalThreshold: [
          {
            required: true,
            message: '请输入不正常阀值',
            trigger: 'blur'
          }
        ],
        agreement: [
          {
            required: true,
            message: '请输入协议',
            trigger: 'blur'
          }
        ],
        port: [
          {
            required: true,
            message: '请输入端口号',
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: '请输入路径',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 健康检查 关闭弹窗
    closeHealthFormDialog() {
      this.$emit('update:healthFormVisible', false)
    },
    // 健康检查  弹窗确定按钮
    submitHealthForm() {
      this.$emit('update:healthFormVisible', false)
    },
    // 健康检查对话框点击X 关闭对话框
    onClose() {
      this.$emit('update:healthFormVisible', false)
    },
    // 请求头删除弹窗内 匹配标签
    handleRequestHeaderDelete(item, index) {
      this.HealthDialogForm.requestHeader.splice(this.HealthDialogForm.requestHeader.indexOf(item), 1)
    },
    // 请求头添加弹窗内 匹配标签
    handleRequestHeaderAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.HealthDialogForm.requestHeader.push(obj)
    },
    // 命令删除弹窗内 匹配标签
    handleCommandDelete(item, index) {
      this.HealthDialogForm.startCommand.splice(this.HealthDialogForm.startCommand.indexOf(item), 1)
    },
    // 命令添加弹窗内 匹配标签
    handleCommandAdd() {
      const commangObj = {
        id: nanoid(),
        value: ''
      }
      this.HealthDialogForm.startCommand.push(commangObj)
    }
    // submitAffinityForm() {
    //   this.$refs['affinityDialogForm'].validate(valid => {
    //     if (valid) {
    //       this.$emit('submitAffinityForm', this.affinityDialogForm)
    //     } else {
    //       return false
    //     }
    //   })
    // },
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div>
    <el-dialog
      title="添加入站规则"
      :visible.sync="formVisible"
      width="920px"
      :before-close="closeFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          label-suffix=":"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="显示名称" prop="name">
            <el-input v-model="ruleForm.showName" />
          </el-form-item>
          <el-form-item label="计算组件" prop="computedCom">
            <el-select
              v-model="ruleForm.computedCom"
              placeholder="请选择计算组件"
              style="width:100%;"
            >
              <el-option
                v-for="com in computedComList"
                :key="com.value"
                :label="com.label"
                :value="com.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <table border="0">
              <thead>
                <tr class="headerStyle">
                  <th>
                    <div class="cell">协议</div>
                  </th>
                  <th>
                    <div class="cell">
                      <span class="requireFlag">*</span>
                      服务端口
                    </div>
                  </th>
                  <th>
                    <div class="cell">
                      <span class="requireFlag">*</span>
                      容器端口
                    </div>
                  </th>
                  <th>
                    <div class="cell">服务端口名称</div>
                  </th>
                  <th>
                    <div class="cell">操作</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(domain, index) in ruleForm.domains"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item
                      label=""
                      :prop="'domains.' + index + '.agreement'"
                      :rules="{
                        required: false,
                        message: '协议不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-select
                        v-model="domain.agreement"
                        placeholder="请选择协议"
                        @change="changeTableItem(domain, index)"
                      >
                        <el-option
                          v-for="com in agreementList"
                          :key="com"
                          :label="com"
                          :value="com"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'domains.' + index + '.serverPort'"
                      :rules="{
                        required: true,
                        message: '服务端口不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input
                        v-model="domain.serverPort"
                        placeholder="服务端口"
                        @input="changeTableItem(domain, index)"
                      />
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'domains.' + index + '.containerPort'"
                      :rules="{
                        required: true,
                        message: '容器端口不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input
                        v-model="domain.containerPort"
                        placeholder="容器端口号或端口名称"
                        @input="changeTableItem(domain, index)"
                      />
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'domains.' + index + '.servicePortName'"
                      :rules="{
                        required: false,
                        message: '服务端口名称不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="domain.servicePortName" disabled />
                    </el-form-item>
                  </td>
                  <td>
                    <el-button
                      icon="el-icon-remove-outline"
                      :disabled="deleteFlag"
                      class="
                        cursor-pointer
                        margin-left10 margin-right10
                      "
                      type="text"
                      @click="handleDelete(domain, index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <div class="cursor-pointer text-center hover-div" @click="handleAdd">
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">添加</el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { portColumnList } from './constant/index'
export default {
  name: 'AddInboundRule',
  components: {},
  props: {
    formVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      portColumnList,
      computedComList: [
        {
          label: 'nginx-nginx',
          value: 'nginx-nginx'
        }
      ],
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      ruleForm: {
        name: '',
        showName: '',
        computedCom: '',
        port: '',
        serverPort: '',
        containerPort: '',
        domains: [
          {
            id: nanoid(),
            agreement: 'TCP',
            serverPort: '',
            containerPort: '',
            servicePortName: 'tcp'
          }
        ]
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        computedCom: [
          { required: true, message: '请选择计算组件', trigger: 'change' }
        ],
        serverPort: [
          { required: true, message: '请输入服务端口', trigger: 'blur' }
        ],
        containerPort: [
          { required: true, message: '请输入容器端口', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    deleteFlag: function() {
      if (this.ruleForm.domains.length === 1) {
        return true
      } else {
        return false
      }
    }
  },
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
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    },
    changeTableItem(item, index) {
      const oldItem = this.ruleForm.domains[index]
      let str = `${oldItem.agreement}`
      if (oldItem.serverPort) {
        str += `-${oldItem.serverPort}`
      }
      if (oldItem.containerPort) {
        str += `-${oldItem.containerPort}`
      }
      oldItem.servicePortName = str
      this.$set(this.ruleForm.domains, [index], oldItem)
    },
    handleDelete(item, index) {
      this.ruleForm.domains.splice(this.ruleForm.domains.indexOf(item), 1)
    },
    handleAdd() {
      const obj = {
        id: nanoid(),
        agreement: 'TCP',
        serverPort: '',
        containerPort: '',
        servicePortName: 'tcp'
      }
      this.ruleForm.domains.push(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.hover-div:hover{
  background:$color-primary-rgba1;
}
</style>

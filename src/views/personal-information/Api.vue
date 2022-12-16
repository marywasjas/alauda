<template>
  <div class="api-container">
    <div class="flex-start">
      <el-button type="primary" @click="addApi">添加API令牌</el-button>
      <el-tooltip
        class="item"
        effect="dark"
        content="API 令牌承载了您的身份、操作权限等信息。"
        placement="top"
      >
        <i class="el-icon-question question-icon margin-left10" />
      </el-tooltip>
    </div>
    <el-table
      :data="tableData.data"
      style="width: 100%"
      header-row-class-name="headerStyle"
      class="margin-top"
    >
      <el-table-column
        v-for="col in tableColumnList"
        :key="col.id"
        :label="col.label"
        :sortable="col.sortable"
        :width="col.width"
      >
        <template slot-scope="scope">
          <div v-if="col.id === 'status'" class="status-cell">
            <i
              v-if="scope.row.status === 'running'"
              class="el-icon-video-play running"
            />
            <i
              v-else-if="scope.row.status === 'stop'"
              class="el-icon-video-pause stop"
            />
            <span>{{ scope.row.statusText }}</span>
          </div>
          <div v-else-if="col.id === 'operation'" class="operation-cell">
            <el-dropdown>
              <i class="el-icon-more" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="delete"
                  @click.native="handelDelete(scope.row)"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            {{ scope.row[col.id] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加API令牌"
      :visible.sync="visible"
      width="800px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-suffix=":">
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="支持中英文，最大支持64位字符" />
        </el-form-item>
        <el-form-item label="有效期" prop="validity">
          <el-radio-group v-model="ruleForm.validity">
            <el-radio label="永久" value="永久" />
            <el-radio label="自定义" value="自定义" />
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.validity==='自定义'" label="到期时间" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width:100%;"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">更新</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="API令牌已创建"
      :visible.sync="visible2"
      width="800px"
      :before-close="closeDialog2"
      :close-on-click-modal="false"
    >
      <line-alert :content="content" />
      <p>{{ subContent }}</p>
      <el-input v-model="token" placeholder="请输入内容">
        <div slot="append" class="cursor-pointer" @click="handleCopy(token,$event)">
          <i class="el-icon-document-copy" />
          复制
        </div>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog2">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert'
import Mock from 'mockjs'
import clip from '@/utils/clipboard'
export default {
  name: 'Api',
  components: { LineAlert },
  props: {},
  data() {
    const tableColumnList = [{
      id: 'desc',
      label: '描述'
    }, {
      id: 'status',
      label: '状态'
    }, {
      id: 'resetDate',
      label: '过期时间'
    }, {
      id: 'date',
      label: '创建时间'
    },
    {
      id: 'operation',
      label: '',
      width: '60px'
    }]
    const tableData = Mock.mock({
      'data|4': [{
        desc: '@word(3, 7)',
        'status|1': ['running', 'stop'],
        'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
        date: '@date',
        resetDate: '@date'
      }]
    })
    const validateDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入描述'))
      } else {
        const reg = /^([\u4E00-\u9FA5A-Za-z0-9]){1,64}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('支持中英文，最大支持64位字符!'))
        }
      }
    }
    return {
      tableColumnList,
      tableData,
      visible: false,
      ruleForm: {
        desc: '',
        validity: '永久',
        date: ''
      },
      rules: {
        desc: [
          { required: true, validator: validateDesc, trigger: 'blur' }
        ],
        date: [
          { required: true, message: '到期时间是必填项', trigger: 'change' }
        ]
      },
      visible2: false,
      token: 'CIW2yQEIpLbJAQjEtskBCKmdygEI9dzKAQiUocsBCPyqzAEIysnMAQj0+cwBCIeBzQEItYLNAQ',
      content: '调用平台 API 时，建议您使用如下令牌进行身份认证。请保存如下令牌的信息！这些信息仅显示一次。如果忘记了令牌信息，您需要重新创建新的 API 令牌。',
      subContent: '发起 API 请求时，请在请求头部添加：Authorization: Bearer <your token>。示例：curl -k https://localhost:6443/apis/auth.alauda.io/v1/users/{name} -H"Authorization: Bearer <your token>"'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addApi() {
      this.visible = true
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.visible = false
          this.visible2 = true
        } else {
          return false
        }
      })
    },
    closeDialog() {
      this.$refs['ruleForm'].resetFields()
      this.visible = false
    },
    closeDialog2() {
      this.visible2 = false
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    handelDelete(row) {
      const returnMsgList = [
        `确定废弃API令牌${row.desc}吗？废弃后，改令牌将永久失效。`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.api-container {
}
</style>

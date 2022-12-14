<template>
  <div class="personal-information">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>K01027</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              <i :class="item.frontIcon" />
              {{ item.value ? item.value : "-" }}
              <i style="color: #1890ff" :class="item.afterIcon" class="cursor-pointer" @click="handleEdit(item)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="API令牌" name="api" />
              <el-tab-pane label="用户角色" name="user" />
            </el-tabs>
          </div>
        </div>
      </header>
      <section>
        <component :is="comName" />
      </section>
    </BaseCard>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="800px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-suffix=":">
        <div v-if="title==='更新显示名称' || title==='更新邮箱'">
          <el-form-item label="用户名" prop="name">
            {{ ruleForm.name }}
          </el-form-item>
          <el-form-item v-if="title==='更新显示名称'" label="显示名称" prop="showName">
            <el-input v-model="ruleForm.showName" />
          </el-form-item>
          <el-form-item v-if="title==='更新邮箱'" label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
        </div>
        <div v-if="title==='更新密码'">
          <el-form-item label="当前密码" prop="currentPass">
            <el-input v-model="ruleForm.currentPass" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="必须包含英文字母、数字、特殊字符!@#$%^&*，长度8-32位" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">更新</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from './Api.vue'
import User from './User.vue'
export default {
  name: 'PersonalInformation',
  components: { Api, User },
  props: {},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,32}$/
        if (reg.test(value)) {
          this.$refs.ruleForm.validateField('checkPass')
        } else {
          callback(new Error('必须包含英文字母、数字、特殊字符~!@#$%^&*，长度8-32位!'))
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式不正确!'))
        }
      }
    }
    return {
      baseInfoData: [
        {
          label: '显示名称',
          value: '孙小小',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '密码',
          value: '******',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '邮箱',
          value: '',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '有效期',
          value: '永久'
        },
        {
          label: '创建人',
          value: 'admin'
        },
        {
          label: '用户组',
          value: '未分组'
        },
        {
          label: '创建时间',
          value: '2022-11-10 18:48:23'
        }
      ],
      activeName: 'api',
      visible: false,
      title: '',
      ruleForm: {
        name: 'k01027',
        showName: '孙小小',
        currentPass: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      rules: {
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ],
        currentPass: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    comName: function() {
      if (this.activeName === 'api') {
        return 'Api'
      } else {
        return 'User'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleEdit(item) {
      this.title = `更新${item.label}`
      this.visible = true
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.visible = false
        } else {
          return false
        }
      })
    },
    closeDialog() {
      this.$refs['ruleForm'].resetFields()
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-information{
  width: 100%;
  padding: 16px 20px 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .component-div{
    margin-top: 16px;
    padding: 0 20px;
  }
  .label-value {
    margin-bottom: 12px;
    span {
      font-size: $font-size-14;
      font-weight: 500;
    }
    span:last-child {
      font-weight: 400;
    }
  }
}
</style>

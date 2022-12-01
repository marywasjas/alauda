<template>
  <div class="create-update-container">
    <div class="scroll-div">
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span v-if="type==='add'">创建保密字典</span>
            <span v-else>更新{{ ruleForm.name }}</span>
            <el-radio-group v-model="activeTab">
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="yaml">YAML</el-radio-button>
            </el-radio-group>
          </div>
        </header>
        <section v-if="activeTab==='form'">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="margin-top"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-if="type==='add'" v-model="ruleForm.name" />
              <span v-else>{{ ruleForm.name }}</span>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-if="type==='add'" v-model="ruleForm.type">
                <el-radio label="opaque">opaque</el-radio>
                <el-radio label="TLS">TLS</el-radio>
                <el-radio label="SSH密钥">SSH密钥</el-radio>
                <el-radio label="SSH认证">SSH认证</el-radio>
                <el-radio label="用户名/密码">用户名/密码</el-radio>
                <el-radio label="镜像服务">镜像服务</el-radio>
              </el-radio-group>
              <span v-else>{{ ruleForm.type }}</span>
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  Opaque：Base64 编码格式的 Secret，用来存储密码、密钥等<br>
                  TLS 证书：一个安全通信框架，上面可以承载HTTP协议或 SMTP/POP3 协议等<br>
                  SSH 密钥：通过非对称加密算法生成的一对密钥，公钥配置到服务端用于加密，私钥用于客户端解密<br>
                  SSH 认证：通过非对称加密算法验证的认证方式，私钥作为 SSH 身份认证中所需的凭据<br>
                  用户名/密码：通用的用户名/密码认证方式<br>
                  数据库连接：常用数据库连接的 URL 信息<br>
                  镜像服务：从镜像仓库拉取镜像所需的登录认证信息<br>
                </div>
                <i class="el-icon-question question-icon margin-left10" />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="配置项" prop="configurationItems">
              <div v-if="ruleForm.configurationItems.length>0">
                <div v-for="(domain, index) in ruleForm.configurationItems" :key="domain.id" class="flex-center margin-bottom10 item-div">
                  <div style="flex:1;">
                    <el-form-item
                      label="键"
                      :prop="'configurationItems.' + index + '.key'"
                      :rules="{
                        required: true, message: '键不能为空', trigger: 'blur'
                      }"
                      style="margin-bottom:22px;"
                      label-width="40px"
                    >
                      <el-input v-model="domain.key" />
                    </el-form-item>
                    <el-form-item
                      label="值"
                      :prop="'configurationItems.' + index + '.value'"
                      :rules="{
                        required: false, message: '值不能为空', trigger: 'blur'
                      }"
                      label-width="40px"
                    >
                      <el-input v-model="domain.value" type="textarea" />
                    </el-form-item>
                  </div>
                  <i class="el-icon-remove-outline cursor-pointer margin-left10" @click="handleDelete('configurationItems',domain,index)" />
                </div>
              </div>
              <div v-else class="empty-div">
                无配置项
              </div>
              <div class="flex-center">
                <div
                  class="cursor-pointer text-center hover-div"
                  style="flex:1;"
                  @click="handleAdd('configurationItems')"
                >
                  <i class="el-icon-circle-plus-outline" />
                  添加
                </div>
                <div
                  class="cursor-pointer text-center hover-div"
                  style="flex:1;"
                >
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                    :show-file-list="false"
                  >
                    <i class="el-icon-upload2" />
                    导入
                  </el-upload>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </section>
        <section v-if="activeTab === 'yaml'">
          <div class="yaml-div">
            <monaco-editor
              ref="monacoEditor"
              :code="currentCode"
              :read-only="false"
              :language="language"
              @handleBlur="handleBlur"
            />
          </div>
        </section>
      </BaseCard>
    </div>
    <div class="fixed-div">
      <el-button
        type="primary"
        class="margin-left10"
        @click="submitCreate"
      >{{ type==='add'?'创建':'更新' }}</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
import { nanoid } from 'nanoid'

export default {
  name: 'ConfigureDictionaryCreateUpdate',
  components: { MonacoEditor },
  props: {},
  data() {
    return {
      activeTab: 'form',
      type: '',
      ruleForm: {
        name: '',
        showName: '',
        type: 'opaque',
        configurationItems: []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 0,
            max: 40,
            message: '长度在 0 到 40 个字符',
            trigger: 'blur'
          }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      fileList: [],
      currentCode: '{}',
      inputCode: {},
      language: 'yaml'
    }
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.name = this.$route.query.name
    this.type = this.$route.query.type
  },
  mounted() {},
  methods: {
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    // 删除
    handleDelete(filed, item, index) {
      this.ruleForm[filed].splice(index, 1)
    },
    // 增加
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.ruleForm[filed].push(obj)
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$set(this.ruleForm, 'code', this.inputCode)
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
.create-update-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
  }
  section {
    border-top: 1px solid $border-color-two;
    margin-top: 10px;
  }
  .item-div{
    background:$background-color;
    border-radius: $border-radius-l;
    padding:10px;
  }
  .file-icon{
    font-size: 40px;
    color: $font-color-subtext;
  }
  .fixed-div {
    width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
}
</style>

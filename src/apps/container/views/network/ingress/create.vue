<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建入站规则</span>
          <el-radio-group v-model="fillType" style="float: right;">
            <el-radio-button label="form">表单</el-radio-button>
            <el-radio-button label="ymal">YMAL</el-radio-button>
          </el-radio-group>
        </div>

        <div v-if="fillType=='form'" class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            label-suffix=":"
          >
            <el-row><el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="以 a-z、0-9 开头结尾，支持使用 a-z、0-9、-" />
              </el-form-item>
            </el-col></el-row>
            <el-row><el-col :span="12">
              <el-form-item label="显示名称" prop="showName">
                <el-input v-model="ruleForm.showName" />
              </el-form-item>
            </el-col></el-row>
            <el-form-item label="规则" prop="rule">
              <div
                v-for="(item1, index1) in ruleForm.rulesList"
                :key="item1.id"
                class="flex-center rules-div"
              >
                <div style="margin-left: 50px; width: 92%;">
                  <el-form-item
                    label="域名"
                    :prop="'rulesList.' + index1 + '.domain'"
                    :rules="{
                      required: false,
                      message: '域名不能为空',
                      trigger: 'blur',
                    }"
                    style="margin-bottom: 22px"
                    label-width="60px"
                  >
                    <el-input v-model="item1.domain" style="width:50%" />
                  </el-form-item>
                  <el-form-item
                    label="协议"
                    :prop="'rulesList.' + index1 + '.agreement'"
                    :rules="{
                      required: false,
                      message: '协议不能为空',
                      trigger: 'change',
                    }"
                    style="margin-bottom: 22px"
                    label-width="60px"
                  >
                    <el-radio-group v-model="item1.agreement">
                      <el-radio label="HTTP" />
                      <el-radio label="HTTPS" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    label="规则"
                    :prop="'rulesList.' + index1 + '.subRuleList'"
                    :rules="{
                      required: true,
                      message: '规则不能为空',
                      trigger: 'change',
                    }"
                    label-width="60px"
                  >
                    <table border="0" width="100%">
                      <thead>
                        <tr class="headerStyle">
                          <th>
                            <div class="cell">
                              <span class="requireFlag">*</span>匹配方式
                            </div>
                          </th>
                          <th>
                            <div class="cell">路径</div>
                          </th>
                          <th>
                            <div class="cell">
                              <span class="requireFlag">*</span>内部路由
                            </div>
                          </th>
                          <th>
                            <div class="cell">
                              <span class="requireFlag">*</span>服务端口
                            </div>
                          </th>
                          <th>
                            <div class="cell">操作</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item2, index2) in item1.subRuleList"
                          :key="item2.id"
                        >
                          <td>
                            <el-form-item
                              label=""
                              :prop="`rulesList[${index1}].subRuleList[${index2}].matchingMethod`"
                              :rules="{
                                required: true,
                                message: '匹配方式不能为空',
                                trigger: 'change',
                              }"
                            >
                              <el-select
                                v-model="item2.matchingMethod"
                                placeholder="请选择匹配方式"
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
                              :prop="`rulesList[${index1}].subRuleList[${index2}].path`"
                              :rules="{
                                required: false,
                                message: '路径不能为空',
                                trigger: 'blur',
                              }"
                            >
                              <el-input
                                v-model="item2.path"
                                placeholder="必须以/开头"
                              />
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="`rulesList[${index1}].subRuleList[${index2}].interRoute`"
                              :rules="{
                                required: true,
                                message: '内部路由不能为空',
                                trigger: 'change',
                              }"
                            >
                              <el-select
                                v-model="item2.interRoute"
                                placeholder="请选择内部路由"
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
                              :prop="`rulesList[${index1}].subRuleList[${index2}].servicePort`"
                              :rules="{
                                required: true,
                                message: '服务端口名称不能为空',
                                trigger: 'change',
                              }"
                            >
                              <el-select
                                v-model="item2.servicePort"
                                placeholder="请选择服务端口"
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
                            <el-button
                              icon="el-icon-remove-outline"
                              class="cursor-pointer margin-left10 margin-right10"
                              type="text"
                              :disabled="ruleForm.rulesList[index1].subRuleList.length===1"
                              @click="handleDelete(index1, index2)"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5">
                            <div
                              class="cursor-pointer text-center hover-div"
                              @click="handleAdd(index1)"
                            >
                              <i class="el-icon-circle-plus-outline" />
                              添加
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </el-form-item>
                </div>
                <el-button
                  icon="el-icon-delete"
                  :disabled="ruleForm.rulesList.length === 1"
                  class="cursor-pointer"
                  type="text"
                  @click.prevent="handleDeleteRule(index1)"
                />
              </div>
              <div
                class="cursor-pointer text-center hover-div"
                @click="handleAddRule"
              >
                <i class="el-icon-circle-plus-outline" />
                添加规则
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="fillType=='ymal'" class="yaml-div">
          <monaco-editor
            ref="monacoEditor"
            :code="currentCode"
            :read-only="false"
            language="ymal"
            @handleBlur="handleBlur"
          />
          <!-- <div class="tips-div">
            YAML样例:
            <p @click="quickInput">
              <i class="el-icon-top" />
              <span>写入</span>
            </p>
            <p @click="viewYaml">
              <i class="el-icon-view" />
              <span>查看</span>
            </p>
          </div> -->
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
import { nanoid } from 'nanoid'

export default {
  name: 'IngressCreate',
  components: { MonacoEditor },
  data() {
    return {
      isEdit: false,
      fillType: 'form',
      agreementList: ['前缀', '精准', '控制器决定'],
      ruleForm: {
        name: '',
        showName: '',
        rulesList: [
          {
            id: nanoid(),
            domain: '',
            agreement: 'HTTP',
            subRuleList: [
              {
                id: nanoid(),
                matchingMethod: '前缀',
                path: '',
                interRoute: '',
                servicePort: ''
              }
            ]
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以 a-z、0-9 开头结尾，支持使用 a-z、0-9、-', trigger: 'blur' }
        ]
      },
      currentCode: '',
      inputCode: {}
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
  created() {
  },
  methods: {
    fetchData(id) {
    },
    closeFormDialog() {
      this.$emit('closeFormDialog')
    },
    submitCreate() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    },
    cancelCreate() {
      this.$router.go(-1)
    },
    handleDeleteRule(index) {
      this.ruleForm.rulesList.splice(index, 1)
    },
    handleAddRule() {
      const obj = {
        id: nanoid(),
        domain: '',
        agreement: 'HTTP',
        subRuleList: [
          {
            id: nanoid(),
            matchingMethod: '前缀',
            path: '',
            interRoute: '',
            servicePort: ''
          }
        ]
      }
      this.ruleForm.rulesList.push(obj)
    },
    handleDelete(outIndex, index) {
      this.ruleForm.rulesList[outIndex].subRuleList.splice(index, 1)
    },
    handleAdd(index) {
      const obj = {
        id: nanoid(),
        matchingMethod: '前缀',
        path: '',
        interRoute: '',
        servicePort: ''
      }
      this.ruleForm.rulesList[index].subRuleList.push(obj)
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    // 写入
    quickInput() {
      this.currentCode = this.defaultCodeStr
      this.$refs.monacoEditor.btnFlag = true
    },
    // 查看
    viewYaml() {
      this.detailVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
    .hover-div:hover{
      background:$color-primary-rgba1;
    }
    .rules-div {
      background: $background-color;
      border-radius: $border-radius-l;
      padding: 10px 0;
      margin-bottom: 10px;
      > div {
        border-right: 1px solid $border-color-one;
        padding-right: 20px;
      }
      > button {
        padding: 0 20px;
      }
      .el-select {
        width: 100%;
      }
    }
    .rules-div:last-child{
      margin-bottom: 0;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
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


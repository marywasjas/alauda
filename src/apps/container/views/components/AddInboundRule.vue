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
          <el-form-item label="规则" prop="rule">
            <div
              v-for="(item1, index1) in ruleForm.rulesList"
              :key="item1.id"
              class="flex-center rules-div"
            >
              <div>
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
                  <el-input v-model="item1.domain" />
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
                  <table border="0">
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">添加</el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { portColumnList } from '../application/nativeApp/nativeUpdate/constant/index'
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
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
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
    // 添加规则
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
    // 删除规则
    handleDeleteRule(index) {
      this.ruleForm.rulesList.splice(index, 1)
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
    }
  }
}
</script>
<style lang="scss" scoped>
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
}
.rules-div:last-child{
  margin-bottom: 0;
}
</style>

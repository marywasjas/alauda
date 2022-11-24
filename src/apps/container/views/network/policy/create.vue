<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建网络策略</span>
        </div>

        <div class="text item">
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
            <el-form-item label="关联方式" prop="linkType">
              <el-radio v-model="ruleForm.linkType" label="计算组件">计算组件</el-radio>
              <el-radio v-model="ruleForm.linkType" label="标签选择器">标签选择器</el-radio>
            </el-form-item>
            <el-form-item v-if="ruleForm.linkType=='计算组件'" label="目标计算组件" prop="calculationName">
              <el-select v-model="ruleForm.calculationName" placeholder="请选择">
                <el-option
                  v-for="item in calculationNameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="ruleForm.linkType=='标签选择器'" label="选择器" prop="selector">
              <table border="0" style="width:95%">
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
                <tbody v-if="ruleForm.tagSelector.length == 0">
                  <tr>
                    <td colspan="3" class="no-data">无配置项</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="cursor-pointer text-center hover-div" @click="handleTagAdd">
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="ruleForm.tagSelector.length > 0">
                  <tr
                    v-for="(tag, index) in ruleForm.tagSelector"
                    :key="tag.id"
                  >
                    <td>
                      <el-form-item
                        label=""
                        :prop="'tagSelector.' + index + '.key'"
                        :rules="{
                          required: true,
                          message: '键不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          v-model="tag.key"
                          placeholder="键"
                        />
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item
                        label=""
                        :prop="'tagSelector.' + index + '.value'"
                        :rules="{
                          required: true,
                          message: '值不能为空',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          v-model="tag.value"
                          placeholder="值"
                        />
                      </el-form-item>
                    </td>
                    <td>
                      <el-button
                        icon="el-icon-remove-outline"
                        class="
                        cursor-pointer
                        margin-left10 margin-right10
                      "
                        type="text"
                        @click="handleTagDelete(tag, index)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="cursor-pointer text-center hover-div" @click="handleTagAdd">
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
            <el-form-item label="白名单规则" prop="rule">
              <div
                v-for="(item1, index1) in ruleForm.rulesList"
                :key="item1.id"
                class="flex-center rules-div"
              >
                <div style="margin-left: 50px; width: 92%;">
                  <el-form-item
                    label="方向"
                    :prop="'rulesList.' + index1 + '.direction'"
                    style="margin-bottom: 22px"
                    label-width="90px"
                  >
                    <el-select v-model="item1.direction" placeholder="请选择">
                      <el-option label="入站" value="入站" />
                      <el-option label="出站" value="出站" />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="协议"
                    :prop="'rulesList.' + index1 + '.agreement'"
                    style="margin-bottom: 22px"
                    label-width="90px"
                  >
                    <el-select v-model="item1.agreement" placeholder="请选择协议">
                      <el-option
                        v-for="com in agreementList"
                        :key="com"
                        :label="com"
                        :value="com"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="访问端口"
                    :prop="'rulesList.' + index1 + '.port'"
                    style="margin-bottom: 22px"
                    label-width="90px"
                  >
                    <el-input v-model="item1.port" placeholder="1-65535" style="width:90%" />
                    <el-tooltip content="访问端口" effect="dark" class="item" placement="top">
                      <i class="el-icon-question margin-left10 question-icon" />
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item
                    label="远端类型"
                    :prop="'rulesList.' + index1 + '.remoteType'"
                    :rules="{
                      required: true,
                      message: '请选择远端类型',
                      trigger: 'blur',
                    }"
                    style="margin-bottom: 22px"
                    label-width="90px"
                  >
                    <el-select v-model="item1.remoteType" placeholder="请选择" style="width:95%">
                      <el-option label="计算组件(当前NS)" value="计算组件(当前NS)" />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="远端"
                    :prop="'rulesList.' + index1 + '.remote'"
                    :rules="{
                      required: true,
                      message: '请选择远端',
                      trigger: 'blur',
                    }"
                    style="margin-bottom: 22px"
                    label-width="90px"
                  >
                    <div style="display:flex; width:95%">
                      <el-select v-model="item1.remote">
                        <el-option label="部署" value="部署" />
                      </el-select>
                      <el-select v-model="item1.remoteNext" style="flex-grow: 1;">
                        <el-option label="" value="" />
                      </el-select>
                    </div>
                  </el-form-item>
                </div>
                <el-button
                  icon="el-icon-remove-outline"
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
                添加
              </div>
            </el-form-item>
          </el-form>
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
import { nanoid } from 'nanoid'

export default {
  name: 'PolicyCreate',
  data() {
    return {
      isEdit: false,
      fillType: 'form',
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      calculationNameOption: [
        {
          label: '全部',
          value: '全部'
        },
        {
          label: 'nginx-nginx',
          value: 'nginx-nginx'
        }
      ],
      ruleForm: {
        name: '',
        showName: '',
        linkType: '计算组件',
        calculationName: '全部',
        tagSelector: [],
        rulesList: [
          {
            id: nanoid(),
            direction: '入站',
            agreement: 'TCP',
            port: '',
            remoteType: '计算组件(当前NS)',
            remote: '部署',
            remoteNext: ''
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以 a-z、0-9 开头结尾，支持使用 a-z、0-9、-', trigger: 'blur' }
        ],
        calculationName: [
          { required: true, message: '请选择目标计算组件', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    fetchData(id) {
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
        direction: '入站',
        agreement: 'TCP',
        port: '',
        remoteType: '计算组件(当前NS)',
        remote: '部署',
        remoteNext: ''
      }
      this.ruleForm.rulesList.push(obj)
    },
    handleTagDelete(item, index) {
      this.ruleForm.tagSelector.splice(this.ruleForm.tagSelector.indexOf(item), 1)
    },
    handleTagAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.ruleForm.tagSelector.push(obj)
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
    .no-data {
      text-align: center;
      color: darkgray;
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
    }
    .rules-div:last-child{
      margin-bottom: 0;
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


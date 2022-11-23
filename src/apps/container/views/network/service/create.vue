<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建内部路由</span>
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
          >
            <el-row><el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                />
              </el-form-item>
            </el-col></el-row>
            <el-row><el-col :span="12">
              <el-form-item label="显示名称" prop="showName">
                <el-input v-model="ruleForm.showName" />
              </el-form-item>
            </el-col></el-row>
            <el-form-item label="虚拟IP" prop="virtualIP">
              <el-switch v-model="ruleForm.virtualIP" />
              <el-tooltip content="集群内部通过此 IP 来访问服务" effect="dark" class="item" placement="top">
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="外网访问" prop="internetAccess">
              <el-switch v-model="ruleForm.internetAccess" />
              <el-tooltip
                class="item"
                effect="dark"
                content="通过访问集群节点的对应端口来访问服务（NodePort）"
                placement="top"
              >
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="目标组件" prop="targetComponents">
              <el-radio v-model="ruleForm.targetComponents" label="计算组件">计算组件</el-radio>
              <el-radio v-model="ruleForm.targetComponents" label="标签选择器">标签选择器</el-radio>
            </el-form-item>
            <el-form-item v-if="ruleForm.targetComponents=='计算组件'" label="计算组件类型" prop="calculationType">
              <el-radio v-model="ruleForm.calculationType" label="部署">部署</el-radio>
              <el-radio v-model="ruleForm.calculationType" label="守护进程集">守护进程集</el-radio>
              <el-radio v-model="ruleForm.calculationType" label="有状态副本集">有状态副本集</el-radio>
            </el-form-item>
            <el-form-item v-if="ruleForm.targetComponents=='计算组件'" label="计算组件名称" prop="calculationName">
              <el-select v-model="ruleForm.calculationName" placeholder="请选择">
                <el-option
                  v-for="item in calculationNameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="ruleForm.targetComponents=='标签选择器'" label="选择器" prop="selector">
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
                    <td colspan="3" class="no-data">无数据</td>
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
            <el-form-item label="端口" prop="port">
              <table border="0" style="width:95%">
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
                      <div class="cell">
                        服务端口名称
                        <el-tooltip content="服务端口名称" effect="dark" class="item" placement="top">
                          <i class="el-icon-question margin-left10 question-icon" />
                        </el-tooltip>
                      </div>
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
                          style="width:100%"
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
            <el-form-item label="会话保持" prop="keepSession">
              <el-switch v-model="ruleForm.keepSession" />
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
  name: 'ServiceCreate',
  components: { MonacoEditor },
  data() {
    return {
      isEdit: false,
      fillType: 'form',
      ruleForm: {
        virtualIP: true,
        internetAccess: false,
        targetComponents: '计算组件',
        calculationType: '部署',
        keepSession: false,
        domains: [
          {
            id: nanoid(),
            agreement: 'TCP',
            serverPort: '',
            containerPort: '',
            servicePortName: 'tcp'
          }
        ],
        tagSelector: []
      },
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-', trigger: 'blur' }
        ],
        calculationName: [{ required: true, message: '请选择计算组件名称', trigger: 'blur' }]
      },
      calculationNameOption: [
        {
          label: 'nginx-nginx',
          value: 'nginx-nginx'
        }
      ],
      currentCode: '',
      inputCode: {},
      port: '',
      selector: ''
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
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover{
      background:$color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
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


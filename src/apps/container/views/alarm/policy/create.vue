<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div class="text item">
            <el-row><el-col :span="12">
              <el-form-item label="名称" prop="name">
                <span v-if="isEdit">{{ ruleForm.name }}</span>
                <el-input
                  v-if="!isEdit"
                  v-model="ruleForm.name"
                  placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                />
              </el-form-item>
            </el-col></el-row>
            <el-row><el-col :span="12">
              <el-form-item label="显示名称" prop="showName">
                <el-input v-model="ruleForm.showName" placeholder="最多64个字符" />
              </el-form-item>
            </el-col></el-row>
            <el-row><el-col :span="12">
              <el-form-item label="描述" prop="describe">
                <el-input v-model="ruleForm.describe" placeholder="" />
              </el-form-item>
            </el-col></el-row>
            <el-row><el-col :span="12">
              <el-form-item label="资源对象" prop="resource">
                <el-select v-model="ruleForm.resource" style="width: 100%">
                  <el-option
                    v-for="item in resourceOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col></el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>告警规则</span>
          </div>
          <div class="text item">
            <el-form-item label="" label-width="5px" prop="ruleList">
              <table border="0" style="width:99%">
                <thead>
                  <tr class="headerStyle">
                    <th>
                      <div class="cell">规则</div>
                    </th>
                    <th>
                      <div class="cell">告警类型</div>
                    </th>
                    <th>
                      <div class="cell">等级</div>
                    </th>
                    <th>
                      <div class="cell">禁用/启用</div>
                    </th>
                    <th>
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="ruleForm.ruleList.length == 0">
                  <tr>
                    <td colspan="5" class="no-data">无告警规则</td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="cursor-pointer text-center hover-div" @click="handleAdd">
                        <i class="el-icon-circle-plus-outline" />
                        添加告警规则
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="ruleForm.ruleList.length > 0">
                  <tr
                    v-for="(rule, index) in ruleForm.ruleList"
                    :key="rule.id"
                  >
                    <td>{{ rule.name }}</td>
                    <td>{{ rule.Type }}</td>
                    <td>{{ rule.level }}</td>
                    <td>{{ rule.enable }}</td>
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
                        添加告警规则
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>策略配置</span>
          </div>

          <div class="text item">
            <el-row><el-col :span="12">
              <el-form-item label="通知策略" prop="noticeMethod">
                <el-select v-model="ruleForm.noticeMethod" multiple style="width: 100%" placeholder="支持选择多个">
                  <el-option
                    v-for="item in resourceOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col></el-row>
            <el-form-item label="告警发送间隔" prop="sendInterval">
              <el-radio v-model="ruleForm.sendInterval" label="全局">全局</el-radio>
              <el-radio v-model="ruleForm.sendInterval" label="自定义">自定义</el-radio>
              <el-tooltip
                class="item"
                effect="dark"
                content="告警发送间隔"
                placement="top"
              >
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
              <span v-if="ruleForm.sendInterval=='全局'" class="overall-info">灾难告警5分钟，严重告警15分钟，警告告警30分钟，提示告警1小时</span>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
        <span v-if="!isEdit">创建</span>
        <span v-if="isEdit">更新</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'AlarmCreate',
  data() {
    return {
      isEdit: false,
      ruleForm: {
        name: '',
        showName: '',
        describe: '',
        resource: 'chaosblade-box',
        noticeMethod: [],
        sendInterval: '全局',
        ruleList: []
      },
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-', trigger: 'blur' }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' },
          { max: 64, message: '最多64个字符', trigger: 'blur' }
        ],
        resource: [{ required: true, message: '请选择资源对象', trigger: 'blur' }]
      },
      resourceOption: [
        {
          label: 'chaosblade-box',
          value: 'chaosblade-box'
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
      if (this.ruleForm.ruleList.length === 1) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.ruleForm.name = this.$route.query.name
    if (this.ruleForm.name) {
      this.isEdit = true
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.ruleForm = {
        name: '',
        showName: '',
        describe: '',
        resourec: 'chaosblade-box',
        sendInterval: '全局',
        ruleList: [
          {
            id: nanoid(),
            name: '',
            type: '',
            level: '',
            enable: true
          }
        ]
      }
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
    handleDelete(item, index) {
      this.ruleForm.domains.splice(this.ruleForm.domains.indexOf(item), 1)
    },
    handleAdd() {}
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
    .el-card {
      margin-bottom: 10px;
    }
    .hover-div:hover{
      background:$color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
    .overall-info {
      display: block;
      font-size:12px;
      color:darkgray;
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


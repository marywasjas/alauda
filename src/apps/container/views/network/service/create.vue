<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建内部路由</span>
          <el-radio-group v-model="fillType" style="float: right;" @input="handleFilltypeChange">
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
            <el-form-item label="外网访问" prop="outerAccess">
              <el-switch v-model="ruleForm.outerAccess" />
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
            <el-form-item label="计算组件类型" prop="calculationType">
              <el-radio v-model="ruleForm.calculationType" label="部署">部署</el-radio>
              <el-radio v-model="ruleForm.calculationType" label="守护进程集">守护进程集</el-radio>
              <el-radio v-model="ruleForm.calculationType" label="有状态副本集">有状态副本集</el-radio>
            </el-form-item>
            <el-form-item label="计算组件名称" prop="calculationName">
              <el-select v-model="ruleForm.calculationName" placeholder="请选择">
                <el-option
                  v-for="item in calculationNameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="端口" prop="ports">
              <el-table :data="ruleForm.ports" style="width: 100%;">
                <el-table-column prop="protocol" label="协议" min-width="6">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.protocol" placeholder="请选择" style="width:100%">
                      <el-option label="TCP" value="TCP" />
                      <el-option label="UDP" value="UDP" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="port" label="服务端口" min-width="6">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.port" autocomplete="off" size="small" placeholder="服务端口" />
                  </template>
                </el-table-column>
                <el-table-column prop="containerPort" label="容器端口" min-width="6">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.containerPort" autocomplete="off" size="small" placeholder="容器端口" />
                  </template>
                </el-table-column>
                <el-table-column prop="portName" min-width="6">
                  <template slot="header" slot-scope="scope">
                    <span>服务端口名称
                      <el-tooltip :a="scope" effect="dark" content="服务端口名称提示" placement="top">
                        <i class="el-icon-question margin-left10 question-icon" />
                      </el-tooltip>
                    </span>
                  </template>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.portName" autocomplete="off" size="small" placeholder="" />
                  </template>
                </el-table-column>
                <el-table-column label="" min-width="1" style="text-algin: center">
                  <template slot-scope="scope">
                    <span @click="delrow(scope.$index, scope.row)">
                      <i class="el-icon-remove-outline" />
                    </span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add-row" @click="addrow">
                <div class="add-row-inner">
                  <i class="el-icon-circle-plus-outline" />添加
                </div>
              </div>
            </el-form-item>
            <el-form-item label="会话保持" prop="virtualIP">
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

export default {
  name: 'ServiceCreate',
  components: { MonacoEditor },
  data() {
    return {
      isEdit: false,
      fillType: 'form',
      ruleForm: {
        virtualIP: true,
        outerAccess: false,
        targetComponents: '计算组件',
        calculationType: '部署',
        keepSession: false,
        ports: [
          { protocol: 'TCP', port: '', containerPort: '', portName: '' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/, message: '以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-', trigger: 'blur' }
        ],
        calculationName: [{ required: true, message: '请填写计算组件名称', trigger: 'blur' }],
        ports: [{ required: true, message: '端口为必填', trigger: 'blur' }]
      },
      tempRoute: {},
      calculationNameOption: [
        {
          label: 'nginx-nginx',
          value: 'nginx-nginx'
        }
      ],
      currentCode: '',
      inputCode: {}
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
    addrow() {
      this.ruleForm.ports.push(
        {
          protocol: 'TCP',
          port: '',
          containerPort: '',
          portName: ''
        })
    },
    delrow(index, row) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.ruleForm.ports.length > 1) {
          this.ruleForm.ports.splice(index, 1)
          // this.$message({ message: '删除成功', duration: 2000, type: 'success' });
        } else {
          return
        }
      }).catch(() => {
        return
      })
    },
    handleFilltypeChange(val) {
      console.log(val)
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
    .el-table {
      thead {
        background-color: $background-color;
      }
    }
    .add-row {
      color: $color-primary;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-color: $background-color;
    }
    i {
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
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


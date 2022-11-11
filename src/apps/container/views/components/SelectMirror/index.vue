<template>
  <div>
    <el-dialog
      title="选择镜像"
      :visible.sync="formVisible"
      width="800px"
      :before-close="closeFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="130px"
          label-suffix=":"
        >
          <el-form-item label="方式" prop="way">
            <el-radio-group v-model="ruleForm.way">
              <el-radio label="选择" value="选择" />
              <el-radio label="输入" value="输入" />
            </el-radio-group>
          </el-form-item>
          <div v-if="ruleForm.way === '选择'">
            <el-form-item label="集成项目名称" prop="projectName">
              <el-select
                v-model="ruleForm.projectName"
                placeholder="请选择集成项目名称"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in projectNameOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
            <div class="flex-center">
              <el-form-item label="镜像地址" prop="address">
                <el-select
                  v-model="ruleForm.address"
                  placeholder="请选择镜像仓库"
                  style="width: 100%"
                >
                  <el-option
                    v-for="pro in addressOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value"
                  />
                </el-select>
              </el-form-item>
              <span style="margin: 0 10px; margin-bottom: 22px">: </span>
              <el-form-item label="" prop="tag" label-width="0" style="flex: 1">
                <el-select
                  v-model="ruleForm.tag"
                  placeholder="请选择或输入tag"
                  style="width: 100%"
                >
                  <el-option
                    v-for="pro in tagOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div v-else>
            <el-form-item
              label="镜像地址"
              prop="addressInput"
              label-width="130px"
            >
              <el-input v-model="ruleForm.addressInput" type="text" />
              <div class="tips-div">
                <p>
                  请输入“仓库地址:镜像版本”，例如:
                  index.docker.io/library/ubuntu:latest
                  <i class="el-icon-top" @click="quickInput" />
                </p>
                <p>
                  请确保您输入的镜像支持当前集群的硬件架构！如没有输入镜像版本，则版本默认为
                  latest。
                </p>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SelectMirror',
  components: {},
  props: {
    formVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectNameOptions: [
        {
          label: 'library',
          value: 'library'
        },
        {
          label: 'alauda-demo',
          value: 'alauda-demo'
        }
      ],
      addressOptions: [
        {
          label: 'library',
          value: 'library'
        },
        {
          label: 'alauda-demo',
          value: 'alauda-demo'
        }
      ],
      tagOptions: [
        {
          label: 'library',
          value: 'library'
        },
        {
          label: 'alauda-demo',
          value: 'alauda-demo'
        }
      ],
      ruleForm: {
        way: '选择',
        projectName: '',
        address: '',
        tag: '',
        addressInput: ''
      },
      rules: {
        way: [
          { required: true, message: '请选择方式', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请选择集成项目名称', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择镜像仓库', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请选择或输入tag', trigger: 'change' }
        ],
        addressInput: [
          { required: true, message: '请输入镜像地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
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
    quickInput() {
      this.ruleForm.addressInput = 'index.docker.io/library/ubuntu:latest'
    }
  }
}
</script>
<style lang="scss" scoped>
.tips-div{
  p{
    margin: 0;
    font-size: $font-size-12;
    line-height: $line-height-18;
    margin-top: 6px;
    i{
      color:$color-primary;
      font-size: $font-size-18;
      font-weight: bold;
      cursor: pointer;
    }
  }
  p:last-child{
    margin-top: 0;
  }
}
</style>

<template>
  <div class="resources-image">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="resourceVisible"
      width="840px"
      :before-close="closeResourceDialog"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="resourceForm"
          :model="resourceForm"
          :rules="resourceRules"
          class="form-inline"
          label-suffix=":"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="容器名称" prop="name">
            {{ resourceForm.name }}
          </el-form-item>
          <div v-if="dialogTitle === `更新资源限制`" class="flex-center">
            <el-form-item label="资源限制" prop="cpu" style="margin-bottom: 0">
              <el-input v-model="resourceForm.cpu" placeholder="请输入CPU限制">
                <template slot="prepend">CPU</template>
                <el-select
                  slot="append"
                  v-model="resourceForm.cpuCompony"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="核" value="核" />
                  <el-option label="m" value="m" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item
              label=""
              prop="memory"
              style="margin-bottom: 0"
              label-width="10px"
            >
              <el-input
                v-model="resourceForm.memory"
                placeholder="请输入CPU限制"
              >
                <template slot="prepend">内存</template>
                <el-select
                  slot="append"
                  v-model="resourceForm.memoryCompony"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="Mi" value="Mi" />
                  <el-option label="Gi" value="Gi" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-tooltip
              class="item"
              effect="dark"
              content="容器的限制值，限制容器实例运行过程中， 最多可使用的节点计算资源值。"
              placement="top"
            >
              <i
                class="el-icon-question question-icon margin-left10"
              />
            </el-tooltip>
          </div>
          <el-form-item
            v-if="dialogTitle === `更新镜像版本`"
            label="镜像地址"
            prop="monitor"
          >
            {{ resourceForm.monitor }}
          </el-form-item>
          <el-form-item
            v-if="dialogTitle === `更新镜像版本`"
            label="镜像版本"
            prop="version"
            style="margin-bottom: 0"
          >
            <el-input
              v-model="resourceForm.version"
              placeholder="请输入镜像版本"
            /></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitResourceDialog">更新</el-button>
        <el-button @click="closeResourceDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ResourcesImage',
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: '更新资源限制'
    },
    resourceVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      resourceForm: {
        name: 'nginx',
        cpu: '',
        cpuCompony: '',
        memory: '',
        memoryCompony: '',
        monitor: '',
        version: ''
      },
      resourceRules: {
        cpu: [{ required: true, message: '请输入CPU限制', trigger: 'blur' }],
        cpuCompony: [
          { required: true, message: '请选择CPU单位', trigger: 'change' }
        ],
        memory: [
          { required: true, message: '请输入内存限制', trigger: 'blur' }
        ],
        memoryCompony: [
          { required: true, message: '请选择内存单位', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请输入镜像版本', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeResourceDialog() {
      this.$emit('closeResourceDialog')
    },
    submitResourceDialog() {
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitResourceDialog', this.resourceForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

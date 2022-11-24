<template>
  <div>
    <!-- 更新 添加存储卷 -->
    <el-dialog
      :title="storageVolumesFormType==='add'?'添加存储卷':'更新存储卷'"
      :visible.sync="storageVolumesFormVisible"
      width="800px"
      :before-close="closeStorageVolumesFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="storageVolumesDialogForm"
          :model="storageVolumesDialogForm"
          :rules="storageVolumesRules"
          label-width="130px"
          label-suffix=":"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="storageVolumesDialogForm.name"
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="storageVolumesDialogForm.type" @change="changeType">
              <el-radio label="持久卷声明" value="持久卷声明" />
              <el-radio label="配置字典" value="配置字典" />
              <el-radio label="保密字典" value="保密字典" />
              <el-radio label="主机路径" value="主机路径" />
              <el-radio label="空目录" value="空目录" />
            </el-radio-group>
          </el-form-item>
          <div v-if="storageVolumesDialogForm.type === '持久卷声明'">
            <el-form-item label="持久卷声明" prop="persistentVolume">
              <el-select
                v-model="storageVolumesDialogForm.persistentVolume"
                placeholder="请选择持久卷声明"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in persistentVolumeOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '配置字典'">
            <el-form-item label="配置字典" prop="persistentVolume">
              <el-select
                v-model="storageVolumesDialogForm.configureDictionary"
                placeholder="请选择配置字典"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in configureDictionaryOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '保密字典'">
            <el-form-item label="保密字典" prop="confidentialDictionary">
              <el-select
                v-model="storageVolumesDialogForm.confidentialDictionary"
                placeholder="请选择保密字典"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in confidentialDictionaryOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '主机路径'">
            <el-form-item label="主机路径" prop="hostPath">
              <el-input
                v-model="storageVolumesDialogForm.hostPath"
                placeholder="请输入主机路径"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitStorageVolumesForm"
        >{{ storageVolumesFormType==='add'?'添加':'更新' }}</el-button>
        <el-button @click="closeStorageVolumesFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StorageVolumeDialog',
  components: {},
  props: {
    storageVolumesFormVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    storageVolumesFormType: {
      type: String,
      default: ''
    },
    currentStorageVolume: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      storageVolumesDialogForm: {
        name: '',
        type: '',
        persistentVolume: '',
        configureDictionary: '',
        confidentialDictionary: '',
        hostPath: ''
      },
      storageVolumesRules: {
        persistentVolume: [
          { required: true, message: '请选择持久卷声明', trigger: 'change' }
        ],
        configureDictionary: [
          { required: true, message: '请选择配置字典', trigger: 'change' }
        ],
        confidentialDictionary: [
          { required: true, message: '请选择保密字典', trigger: 'change' }
        ],
        hostPath: [
          { required: true, message: '请输入主机路径', trigger: 'blur' }
        ]
      },
      // 持久卷声明 下拉数据
      persistentVolumeOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
      // 配置字典 下拉数据
      configureDictionaryOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
      // 保密字典 下拉数据
      confidentialDictionaryOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ]
    }
  },
  computed: {},
  watch: {
    currentStorageVolume: {
      handler(newVal, oldVal) {
        this.storageVolumesDialogForm = { ...this.storageVolumesDialogForm, ...this.currentStorageVolume }
      }
    }
  },
  created() {
    this.storageVolumesDialogForm = { ...this.storageVolumesDialogForm, ...this.currentStorageVolume }
  },
  mounted() {},
  methods: {
    changeType() {
      this.$refs.storageVolumesDialogForm.clearValidate()
      this.storageVolumesDialogForm.confidentialDictionary = ''
      this.storageVolumesDialogForm.configureDictionary = ''
      this.storageVolumesDialogForm.hostPath = ''
      this.storageVolumesDialogForm.persistentVolume = ''
    },
    // 容器组 存储卷 关闭弹窗
    closeStorageVolumesFormDialog() {
      this.$emit('closeStorageVolumesFormDialog')
    },
    // 容器组 存储卷 弹窗确定按钮
    submitStorageVolumesForm() {
      this.$refs['storageVolumesDialogForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitStorageVolumesForm', this.storageVolumesDialogForm)
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

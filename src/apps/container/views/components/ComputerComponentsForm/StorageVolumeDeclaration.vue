<template>
  <el-dialog title="添加卷声明模版" :visible="storageDecVisible" width="800px" @close="onClose">
    <el-form
      ref="storageVolumesDecForm"
      :model="storageVolumesDecForm"
      :rules="storageVolumesDecRules"
      label-width="130px"
      label-suffix=":"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="storageVolumesDecForm.name" />
      </el-form-item>
      <el-form-item label="大小" prop="size">
        <el-input v-model="storageVolumesDecForm.size">
          <template slot="append">Gi</template>
        </el-input>
      </el-form-item>
      <el-form-item label="访问模式" prop="type">
        <el-radio-group v-model="storageVolumesDecForm.type" @change="changeType">
          <el-radio label="读写" value="读写" />
          <el-radio label="只读" value="只读" />
          <el-radio label="共享" value="共享" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="存储类" prop="storageClass">
        <el-select v-model="storageVolumesDecForm.storageClass" placeholder="请选择存储类" style="width: 100%">
          <el-option v-for="pro in storageClassOptions" :key="pro.value" :label="pro.label" :value="pro.value" />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitStorageVolumesDecForm">添 加</el-button>
      <el-button @click="onClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'StorageVolumeDeclaration',
  components: {},
  props: {
    storageDecVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      storageVolumesDecForm: {
        name: '',
        size: '',
        type: '读写',
        storageClass: ''
      },
      storageVolumesDecRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        size: [{ required: true, message: '请输入大小', trigger: 'blur' }]
      },
      // 存储类 下拉数据
      storageClassOptions: [
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
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击X 取消按钮关闭对话框关闭对话框
    onClose() {
      this.$emit('update:storageDecVisible', false)
    },
    changeType() {},
    // 容器组 存储卷声明 弹窗确定按钮
    submitStorageVolumesDecForm() {
      this.$refs['storageVolumesDecForm'].validate(valid => {
        if (valid) {
          this.$emit('submitStorageVolumesDecForm', this.storageVolumesDecForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

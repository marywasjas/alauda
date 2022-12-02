<template>
  <div>
    <el-dialog
      title="添加配置项"
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
          label-width="120px"
          class="margin-top"
        >
          <el-form-item label="配置项" prop="configurationItems">
            <div v-if="ruleForm.configurationItems.length>0">
              <div v-for="(domain, index) in ruleForm.configurationItems" :key="domain.id" class="flex-center margin-bottom10 item-div">
                <div style="flex:1;">
                  <el-form-item
                    label="键"
                    :prop="'configurationItems.' + index + '.key'"
                    :rules="{
                      required: true, message: '键不能为空', trigger: 'blur'
                    }"
                    style="margin-bottom:22px;"
                    label-width="40px"
                  >
                    <el-input v-model="domain.key" />
                  </el-form-item>
                  <el-form-item
                    label="值"
                    :prop="'configurationItems.' + index + '.value'"
                    :rules="{
                      required: false, message: '值不能为空', trigger: 'blur'
                    }"
                    label-width="40px"
                  >
                    <el-input v-model="domain.value" type="textarea" />
                  </el-form-item>
                </div>
                <i class="el-icon-remove-outline cursor-pointer margin-left10" @click="handleDelete('configurationItems',domain,index)" />
              </div>
            </div>
            <div v-else class="empty-div">
              无配置项
            </div>
            <div class="flex-center">
              <div
                class="cursor-pointer text-center hover-div"
                style="flex:1;"
                @click="handleAdd('configurationItems')"
              >
                <i class="el-icon-circle-plus-outline" />
                添加
              </div>
              <div
                class="cursor-pointer text-center hover-div"
                style="flex:1;"
              >
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList"
                  :show-file-list="false"
                >
                  <i class="el-icon-upload2" />
                  导入
                </el-upload>
              </div>
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
export default {
  name: 'AddConfigurationItems',
  components: {},
  props: {
    formVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        configurationItems: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ]
      },
      fileList: [],
      rules: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 删除
    handleDelete(filed, item, index) {
      this.ruleForm[filed].splice(index, 1)
    },
    // 增加
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.ruleForm[filed].push(obj)
    },
    closeFormDialog() {
      this.$emit('closeFormDialog')
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm', this.ruleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item-div{
  background:$background-color;
  border-radius: $border-radius-l;
  padding:10px;
}
</style>

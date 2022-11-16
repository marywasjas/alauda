<template>
  <div class="update-component-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>计算组件</span>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="名称" prop="name">
              {{ ruleForm.name }}
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button
        type="primary"
        class="margin-left10"
        @click="submitCreate"
      >更新</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
    <select-mirror
      :form-visible="formVisible"
      @closeFormDialog="closeFormDialog"
    />
  </div>
</template>

<script>
import SelectMirror from '@/apps/container/views/components/SelectMirror'

export default {
  name: 'UpdateComponent',
  components: { SelectMirror },
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        showName: '',
        version: '',
        forceUpdate: false
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 0,
            max: 40,
            message: '长度在 0 到 40 个字符',
            trigger: 'blur'
          }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      formVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.name = this.$route.query.name
    this.ruleForm.showName = this.$route.query.desc
  },
  mounted() {

  },
  methods: {
    closeFormDialog() {
      this.formVisible = false
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$set(this.ruleForm, 'code', this.inputCode)
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.update-component-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
  }
  section {
    border-top: 1px solid $border-color-two;
    margin-top: 10px;
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

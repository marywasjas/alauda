<template>
  <div class="yaml-create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>原生应用</span>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="以 a-z、0-9 开头结尾，支持使用 a-z、0-9、.、-，最多 40 个字符"
              />
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="yaml-div">
        <div class="editor-toolbar">
          <div class="editor-toolbar__language">YAML (读写)</div>
          <div class="editor-toolbar-wrap">
            <el-button icon="el-icon-download" size="mini">导入</el-button>
            <el-button icon="el-icon-thumb" size="mini">自动</el-button>
            <el-button icon="el-icon-full-screen" size="mini">全屏</el-button>
          </div>
        </div>
        <div class="border-box">
          <monaco-editor :code="currentCode" :read-only="false" />
        </div>
        <div class="tips-div">
          YAML样例:
          <p>
            <i class="el-icon-top" />
            <span>写入</span>
          </p>
          <p>
            <i class="el-icon-view" />
            <span>查看</span>
          </p>
        </div>
      </div>
    </div>
    <div class="fixed-div">
      <el-button type="primary">创建</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor'

export default {
  name: 'YamlCreate',
  components: { MonacoEditor },
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        showName: ''
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
        showName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      currentCode: {},
      defaultCode: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.yaml-create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div{
    padding-bottom: 86px;
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background:#fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div{
      display:flex;
      align-items: center;
      justify-content:flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p{
        color: $color-primary;
        display:flex;
        align-items: center;
        margin-right: 10px;
        i{
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child{
        margin-left: 10px;
      }
      span:hover{
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

<template>
  <div class="yaml-create-container">
    <div class="yaml-div">
      <span>容器组：
        <el-select v-model="value" disabled placeholder="" />
      </span>
      <span
        style="margin-left: 20px"
      >容器：
        <el-select v-model="value" disabled placeholder="" />
      </span>
      <div class="editor-toolbar">
        <div class="editor-toolbar__language" />
        <div class="editor-toolbar-wrap">
          <el-button icon="el-icon-download" size="mini">自动更新</el-button>
          <el-button icon="el-icon-thumb" size="mini">自动</el-button>
          <el-button icon="el-icon-full-screen" size="mini">全屏</el-button>
        </div>
      </div>
      <div class="border-box">
        <div id="monacoEditorContainer" style="height: 400px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Log',
  components: {},
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
      defaultCode: '',
      value: ''
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
  background-color: $background-color;
  min-height: 100%;
  position: relative;

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

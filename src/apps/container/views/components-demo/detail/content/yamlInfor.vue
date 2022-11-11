<template>
  <div>
    <div class="yaml-div">
      <div class="editor-toolbar">
        <div class="editor-toolbar__language">YAML (只读)</div>
        <div class="editor-toolbar-wrap">
          <el-button icon="el-icon-folder-opened" size="mini">导出</el-button>
          <el-button icon="el-icon-search" size="mini">查找</el-button>
          <el-button icon="el-icon-document-copy" size="mini">复制</el-button>
          <el-button icon="el-icon-thumb" size="mini">自动</el-button>
          <el-button icon="el-icon-full-screen" size="mini">全屏</el-button>
        </div>
      </div>
      <div class="border-box">
        <monaco-editor :code="currentCode" :read-only="false" />
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
export default {
  name: 'YamlInfor',
  components: { MonacoEditor },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
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
</style>

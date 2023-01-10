<template>
  <el-dialog title="提示" :visible="dialogVisible" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary">确 定</el-button>
      <el-button>取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ConfigurationDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

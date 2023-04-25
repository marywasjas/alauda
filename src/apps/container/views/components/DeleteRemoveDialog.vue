<template>
  <div>
    <el-dialog
      :visible.sync="formVisible"
      :width="width"
      :before-close="closeFormDialog"
    >
      <span class="titleStyle">
        <i class="el-icon-warning" style="color: orange" />
        {{ titleContext }}
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          {{ deleteOrRemove }}
        </el-button>
        <el-button @click="closeFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteRemoveDialog",
  components: {},
  props: {
    // 可见
    formVisible: {
      type: Boolean,
      default: false,
    },
    // 标题内容
    titleContext: {
      type: String,
      default: "titleContext",
      required: true,
    },
    // 按钮文字
    deleteOrRemove: {
      type: String,
      default: "删除 or 移除",
      required: true,
    },
    // 弹窗的宽度
    width: {
      type: String,
      default: "40%",
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeFormDialog() {
      this.$emit("closeFormDialog");
    },
    submitForm() {
      this.$emit("submitForm");

      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     this.$emit("submitForm", this.ruleForm);
      //   } else {
      //     return false;
      //   }
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.titleStyle {
  text-align: center;
  display: block;
  font-size: 22px;
  line-height: 24px;
  font-weight: bold;
}
</style>

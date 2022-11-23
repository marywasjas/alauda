<template>
  <div class="update-component-container">
    <div class="scroll-div">
      <computer-components-form />
    </div>
    <div class="fixed-div">
      <el-button
        type="primary"
        class="margin-left10"
        @click="submitCreate"
      >更新</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import ComputerComponentsForm from '@/apps/container/views/components/ComputerComponentsForm/ComputerComponentsForm.vue'
export default {
  name: 'UpdateComponent',
  components: { ComputerComponentsForm },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      console.log('submitCreate')
      this.$router.go(-1)
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
    padding-bottom: 106px;
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

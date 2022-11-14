<template>
  <div class="workload-status">
    <div class="workload-status__total">
      <span>{{ number }}</span>
      Pods
    </div>
    <div class="workload-status__scaler">
      <i class="el-icon-minus" @click="minusNumber" />
      <el-progress
        :percentage="percentage"
        :show-text="false"
        :stroke-width="10"
      />
      <i class="el-icon-plus" @click="plusNumber" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkloadStatus',
  components: {},
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    percentage: function() {
      if (this.number > 0) {
        return 100
      } else {
        return 0
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    minusNumber() {
      this.$emit('changeNumber', this.number - 1)
    },
    plusNumber() {
      this.$emit('changeNumber', this.number + 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.workload-status{
  width: 224px;
  .workload-status__total {
    text-align: center;
    margin-bottom: 4px;
    span{
      font-size:$font-size-24;
      font-weight: 600;
    }
  }
  .workload-status__scaler {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-progress{
      flex:1;
      margin: 0 10px;
    }
    i{
      cursor: pointer;
    }
  }
}
</style>

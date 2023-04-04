<template>
  <div class="box-card-component">
    <div v-for="data in chartData" :key="data.name" class="progress-item">
      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content" class="tooltip-div">
          <div>节点</div>
          <div class="sign-div">
            <span />
            正常：{{ data.normal }}
          </div>
          <div class="sign-div">
            <span />
            异常：{{ data.abnormal }}
          </div>
          <div class="sign-div zpe-div">
            <span />
            总数：{{ data.total }}
          </div>
        </div>
        <el-progress
          :percentage="100"
          :show-text="false"
          :stroke-width="10"
          status="success"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "ProgressCard",
  components: {},
  filters: {},
  props: ["chartData"],
  data() {
    return {
      dataList: [],
      percent:"",
    };
  },
  methods: {
    
  },
  computed: {
    // ...mapGetters(["name", "avatar", "roles"]),
    // percent: function () {
    //   return this.chartData.normal / this.chartData.total;
    // },
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.dataList = this.chartData;
      },
      deep: true,
    },
  },
  mounted() {
    this.dataList = this.chartData;
  },
};
</script>

<style lang="scss" scoped>
.box-card-component {
  // margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
  box-sizing: border-box;
  .progress-item {
    margin-bottom: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .el-progress {
      flex: 1;
      // margin: 0 10px;
    }
  }
}
.tooltip-div {
  > div {
    line-height: 1.5;
  }
}
.sign-div {
  span {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $color-primary;
    margin-right: 3px;
  }
}
.zpe-div {
  span {
    background: $icon-color;
  }
}
</style>

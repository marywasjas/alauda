<template>
  <div class="container margin-top">
    <el-tabs v-model="activeName">
      <el-tab-pane label="global" name="1" class="tabStyle">

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: {},
  props: {},
  data() {
    return {
      activeName: "1",

      data: [
        {
          title: "istiod",
          desc: "Istio 控制面组件，负责配置下发等功能。",
          auto: "关闭",
          instance: "1",
          cpu: "0.5",
          memory: "2048",
          status: "运行中",
        },
        {
          title: "asm-controller",
          desc: "平台业务核心组件。",
          auto: "", // 无
          instance: "1",
          cpu: "0.3",
          memory: "600",
          status: "运行中",
        },
        {
          title: "flagger",
          desc: "灰度发布组件。用于执行自动化灰度发布。",
          auto: "", // 无
          instance: "1",
          cpu: "0.5",
          memory: "1024",
          status: "运行中",
        },
        {
          title: "jaeger-prod-collector",
          desc: "调用链组件，负责接收服务上报的调用链数据，并存储到 ES 中。",
          auto: "关闭",
          instance: "1",
          cpu: "0.1",
          memory: "300",
          status: "运行中",
        },
        {
          title: "jaeger-prod-query",
          desc: "调用链组件，负责调用链数据查询。",
          auto: "", // 无
          instance: "1",
          cpu: "0.3",
          memory: "300",
          status: "运行中",
        },
        {
          title: "grafana",
          desc: "服务网格监控组件。",
          auto: "开启",
          instanceMax: "2",
          instanceMin: "4",
          cpu: "0.3",
          memory: "600",
          status: "运行中",
        },
      ],

      updateVisible: false,

      updateForm: {
        // 1
        auto_istiod: false,
        instance_istiod: "1",
        instance_istiod_min: "2",
        instance_istiod_max: "4",

        cpu_istiod: "0.5",
        memory_istiod: "2048",

        // 2
        instance_asm: "1",
        cpu_asm: "0.5",
        memory_asm: "2048",

        // 3
        instance_flagger: "1",
        cpu_flagger: "0.5",
        memory_flagger: "2048",

        // 4
        auto_collector: false,
        instance_collector: "1",
        instance_collector_min: "2",
        instance_collector_max: "4",
        cpu_collector: "0.5",
        memory_collector: "2048",

        // 5
        instance_query: "1",
        cpu_query: "0.5",
        memory_query: "2048",

        // 6
        auto_grafana: false,
        instance_grafana: "1",
        instance_grafana_min: "2",
        instance_grafana_max: "4",
        cpu_grafana: "0.5",
        memory_grafana: "2048",
      },

      updateRules: {
        instance_istiod: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instance_istiod_min: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instance_istiod_max: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_istiod: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_istiod: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_asm: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_asm: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_asm: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_flagger: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_flagger: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_flagger: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_collector: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_collector_min: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instance_collector_max: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        cpu_collector: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_collector: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_query: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_query: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_query: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_grafana: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        instance_grafana_min: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instance_grafana_max: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],

        cpu_grafana: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_grafana: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    handleUpdate() {
      this.updateForm = this.$options.data().updateForm;
      this.updateVisible = true;
    },

    handle_update() {},
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 15px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.container-wrapper {
  background: rgba(247, 249, 252);
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 12px;
  margin-bottom: 12px;
  .item-wrapper {
    margin: 10px 0;
    background: rgba(255, 255, 255);
    display: flex;
    padding: 16px;
  }
}
::v-deep .el-tabs__item {
  font-size: 18px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div {
  margin-top: 16px;
  margin-left: 136px;
  padding: 10px;
  background: rgba(247, 249, 252);
  .container-div {
    background: #fff;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.label-value {
  margin-bottom: 12px;
  margin-top: 12px;
  span {
    font-size: $font-size-14;
    font-weight: bold;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
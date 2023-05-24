<template>
  <div class="container margin-top">
    <el-tabs v-model="activeName">
      <el-tab-pane label="global" name="1" class="tabStyle">
        <div style="display: flex; flex-direction: row-reverse">
          <el-dropdown trigger="click">
            <el-button class="margin-left10" type="primary">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate">
                更新
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="container-wrapper">
          <div class="item-wrapper" v-for="item in data" :key="item.title">
            <div style="flex: 3">
              <div style="font-weight: bold">{{ item.title }}</div>
              <div
                style="
                  color: rgba(150, 152, 155);
                  margin-top: 5px;
                  font-size: 14px;
                "
              >
                {{ item.desc }}
              </div>
            </div>

            <div style="flex: 7; margin-left: 30px; font-size: 14px">
              <div style="display: flex; margin-bottom: 5px">
                <div style="width: 50%" v-if="item.auto">
                  自动扩缩容：{{ item.auto }}
                </div>
                <div v-if="item.title == 'grafana'">
                  实例数：
                  {{ `最小值 ${item.instanceMax}  最大值 ${item.instanceMin}` }}
                </div>

                <div v-else>实例数：{{ item.instance }}</div>
              </div>
              <div style="display: flex">
                <div style="width: 50%">
                  资源配额：
                  <i class="el-icon-cpu primary2-text" />
                  {{ item.cpu }} 核
                  <i class="el-icon-bank-card primary-text" />
                  {{ item.memory }}Mi
                </div>
                <div>
                  状态：
                  <i class="el-icon-success running" />
                  {{ item.status }}
                  <span v-if="item.title == 'grafana'">
                    {{ `${item.instanceMin}/${item.instanceMin}` }}
                  </span>
                  <span v-else>
                    {{ `${item.instance}/${item.instance}` }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="更新组件配置"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
      width="80%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        label-width="135px"
        :rules="updateRules"
      >
        <!-- 1 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">istio</div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                istiod 控制面组件，负责配置下发等功能。
              </div>
            </div>

            <div>
              <el-col :span="18" style="display: flex">
                <!-- 1 -->
                <el-form-item label="自动扩缩容">
                  <el-switch v-model="updateForm.auto_istiod" size="small" />
                </el-form-item>
                <!-- 2 -->
                <el-form-item label="实例数" prop="instance_istiod">
                  <el-input
                    v-model="updateForm.instance_istiod"
                    size="small"
                    style="width: 300px"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <!-- 3 -->
                <el-form-item prop="cpu_istiod" label="资源配额">
                  <el-input
                    v-model="updateForm.cpu_istiod"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>
                <!-- 4 -->
                <el-form-item prop="memory_istiod" style="margin-left: -100px">
                  <el-input
                    v-model="updateForm.memory_istiod"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">
                asm-controller
              </div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                平台业务核心组件。
              </div>
            </div>

            <div>
              <el-col :span="18" style="display: flex">
                <el-form-item label="实例数" prop="instance_asm">
                  <el-input
                    v-model="updateForm.instance_asm"
                    size="small"
                    style="width: 475px"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="资源配额" prop="cpu_asm">
                  <el-input
                    v-model="updateForm.cpu_asm"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_asm" style="margin-left: -100px">
                  <el-input
                    v-model="updateForm.memory_asm"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
        <!-- 3 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">flagger</div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                灰度发布组件,用于执行自动化灰度发布。
              </div>
            </div>
            <div>
              <el-col :span="18" style="display: flex">
                <el-form-item label="实例数" prop="instance_flagger">
                  <el-input
                    v-model="updateForm.instance_flagger"
                    size="small"
                    style="width: 475px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="资源配额" prop="cpu_flagger">
                  <el-input
                    v-model="updateForm.cpu_flagger"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_flagger" style="margin-left: -100px">
                  <el-input
                    v-model="updateForm.memory_flagger"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
        <!-- 4 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">
                jaeger-prod-collector
              </div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                调用链组件,负责接收服务上报的服务链数据,并存储到 ES 中。
              </div>
            </div>

            <div>
              <el-col :span="18" style="display: flex">
                <el-form-item label="自动扩缩容">
                  <el-switch
                    v-model="updateForm.instance_collector"
                    size="small"
                  />
                </el-form-item>

                <el-form-item label="实例数" prop="instance_collector">
                  <el-input
                    v-model="updateForm.instance_collector"
                    size="small"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="资源配额" prop="cpu_collector">
                  <el-input
                    v-model="updateForm.cpu_collector"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item
                  prop="memory_collector"
                  style="margin-left: -100px"
                >
                  <el-input
                    v-model="updateForm.memory_collector"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
        <!-- 5 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">
                jaeger-prod-query
              </div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                调用链组件,负责调用链数据查询。
              </div>
            </div>

            <div>
              <el-col :span="18" style="display: flex">
                <el-form-item label="实例数" prop="instance_query">
                  <el-input
                    v-model="updateForm.instance_query"
                    size="small"
                    style="width: 475px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="资源配额" prop="cpu_query">
                  <el-input
                    v-model="updateForm.cpu_query"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_query" style="margin-left: -100px">
                  <el-input
                    v-model="updateForm.memory_query"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
        <!-- 6 -->
        <div class="component-div" style="margin-left: 0px">
          <div class="container-div" style="padding-top: 20px; display: flex">
            <div style="flex: 3 1 60%; padding-left: 10px">
              <div style="font-size: 16px; font-weight: bold">grafana</div>
              <div style="font-size: 14px; color: rgba(150, 152, 155)">
                服务网格监控组件。
              </div>
            </div>

            <div>
              <el-col :span="18" style="display: flex">
                <el-form-item label="自动扩缩容">
                  <el-switch v-model="updateForm.auto_grafana" size="small" />
                </el-form-item>

                <el-form-item label="实例数" prop="instance_grafana">
                  <el-input
                    v-model="updateForm.instance_grafana"
                    size="small"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="资源配额" prop="cpu_grafana">
                  <el-input
                    v-model="updateForm.cpu_grafana"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_grafana" style="margin-left: -100px">
                  <el-input
                    v-model="updateForm.memory_grafana"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_update">更新</el-button>
        <el-button @click="updateVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
        cpu_collector: "0.5",
        memory_collector: "2048",
        // 5
        instance_query: "1",
        cpu_query: "0.5",
        memory_query: "2048",
        // 6
        auto_grafana: true,
        instance_grafana: "1",
        cpu_grafana: "0.5",
        memory_grafana: "2048",
      },

      updateRules: {
        instance_istiod: [
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
      this.updateVisible = true;
    },
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
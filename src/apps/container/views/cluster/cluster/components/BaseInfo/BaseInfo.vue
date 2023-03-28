<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
          <div style="float: right">
            <el-button @click="updateRatio">更新超售比</el-button>
            <el-button @click="setRegion">设置地域</el-button>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span
            >: &nbsp;&nbsp;
            <span>
              <!-- <i :class="item.beforeIcon" @click="handelLabels(item.label)" /> -->
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <div style="display: flex">
      <BaseCard style="width: 33%; height: 33%; margin-right: 35px">
        <header>
          <div class="card-title left-header">
            <span>节点</span>
          </div>
        </header>
        <section class="component-div">
          <div>
            <span> 总数{{ 12 }} </span>
            <i class="dotClass" style="background-color: springgreen"></i>
            <span> 正常{{ 10 }} </span>
            <span> 异常{{ 0 }} </span>
          </div>
          <progress-card :chartData="progressData" />
        </section>
      </BaseCard>

      <BaseCard style="width: 33%; height: 33%; margin-right: 35px">
        <header>
          <div class="card-title left-header">
            <span>容器组</span>
          </div>
        </header>
        <section class="component-div">
          <div>
            <span> 总数{{ 12 }} </span>
            <i class="dotClass" style="background-color: springgreen"></i>
            <span> 正常{{ 10 }} </span>
            <span> 异常{{ 0 }} </span>
          </div>
          <progress-card :chartData="progressData" />
        </section>
      </BaseCard>

      <BaseCard style="width: 33%; height: 33%">
        <header>
          <!-- <div class="card-title left-header">
            <span> 告警数量</span>
          </div>
        </header>
        <el-divider direction="vertical"></el-divider>
        <header>
          <div class="card-title left-header">
            <span> 命名空间数</span>
          </div> -->
        </header>
        <section style="display: flex">
          <div class="card-title left-header" >
            <span> 告警数量</span>
          </div>
        <el-divider direction="vertical"></el-divider>

          <div class="card-title left-header">
            <span> 命名空间数</span>
          </div>
        </section>
      </BaseCard>
    </div>

    <div style="display: flex">
      <BaseCard style="width: 67.5%; margin-right: 35px">
        <header>
          <div class="card-title left-header">
            <span>计算组件</span>
          </div>
        </header>
        <section class="component-div">
          <el-row :gutter="12">
            <el-col
              v-for="item in configInfoData"
              :key="item.label"
              :span="12"
              class="label-value"
            >
            </el-col>
          </el-row>
        </section>
      </BaseCard>

      <BaseCard style="width: 31.5%">
        <header>
          <div class="card-title left-header">
            <span>应用</span>
          </div>
        </header>
        <section class="component-div">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <el-table-column
              v-for="col in tableColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'name'" class="cursor-pointer">
                  {{ scope.row[col.id] }}
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </BaseCard>
    </div>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>资源统计</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span
            >: &nbsp;&nbsp;
            <span>
              <!-- <i :class="item.beforeIcon" @click="handelLabels(item.label)" /> -->
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>网络负载 Top 5</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span
            >: &nbsp;&nbsp;
            <span>
              <!-- <i :class="item.beforeIcon" @click="handelLabels(item.label)" /> -->
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <!-- 更新标签 -->
    <update-labels-dialog
      :update-labels-visible.sync="updateLabelsVisible"
      :title="dialogTitle"
    />

    <el-dialog
      title="更新超售比"
      @close="cancelUpdateDialog"
      :visible.sync="updateRatioDialog"
      width="60%"
    >
      <el-form
        ref="updateRatioForm"
        :model="updateRatioForm"
        :rules="updateRatioRules"
        label-width="135px"
        :inline="true"
      >
        <el-form-item label="CPU 超售比">
          <el-switch v-model="updateRatioForm.cpu" />
        </el-form-item>
        <el-form-item v-if="updateRatioForm.cpu == true">
          <el-input v-model="updateRatioForm.updateCpuNum" style="100%" />
        </el-form-item>
        <el-from-item v-else> 无超售比 </el-from-item>
        <br />
        <el-form-item label="内存超售比">
          <el-switch v-model="updateRatioForm.memory" />
        </el-form-item>
        <el-form-item v-if="updateRatioForm.memory == true">
          <el-input v-model="updateRatioForm.updateMemoryNum" />
        </el-form-item>
        <el-from-item v-else> 无超售比 </el-from-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateRatio"> 更新 </el-button>
        <el-button @click="updateRatioDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="设置地域"
      @close="cancelSetDialog"
      :visible.sync="setRegionDialog"
      width="60%"
    >
      <el-form
        ref="setRegionForm"
        :model="setRegionForm"
        :rules="setRegionRules"
        label-width="135px"
      >
        <el-form-item label="集群"> region </el-form-item>
        <el-form-item label="所属地域" prop="selected">
          <el-select v-model="setRegionForm.selected">
            <el-option
              v-for="item in setRegionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSetRegion"> 设置 </el-button>
        <el-button @click="setRegionDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UpdateLabelsDialog from "@/apps/container/views/components/UpdateLabelsDialog";
import LineAlert from "@/apps/container/views/components/LineAlert";
import ProgressCard from "./ProgressCard.vue";

import {
  tableData,
  tableColumnList,
  containerLineData,
  containerData,
} from "./constant/index";
import LineChart from "@/apps/container/views/components/LineChart";
import RadiusPieChart from "@/apps/container/views/components/RadiusPieChart";

export default {
  name: "BaseInfo",
  components: {
    UpdateLabelsDialog,
    LineAlert,
    LineChart,
    RadiusPieChart,
    ProgressCard,
  },
  props: {},
  data() {
    return {
      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],

      updateRatioDialog: false,
      setRegionDialog: false,

      updateRatioForm: {
        cpu: true,
        memory: true,
        updateCpuNum: "1",
        updateMemoryNum: "1",
      },
      updateRatioRules: {},

      setRegionForm: {
        selected: "",
      },

      setRegionRules: {
        selected: [
          { required: true, message: "所属地域是必填项", trigger: "change" },
        ],
      },
      setRegionOptions: [],

      baseInfoData: [
        {
          label: "状态",
          value: "正常",
        },
        {
          label: "集群地址",
          value: "25.2.24.200:6443",
        },
      ],
      configInfoData: [
        {
          label: "访问模式",
          value: "期望的群无",
        },
        {
          label: "容量",
          value: "",
        },
        {
          label: "卷模式",
          value: "ewrwer",
        },
        {
          label: "存储类",
          value: "ewrwer",
        },
        {
          label: "关联持久卷",
          value: "",
        },
      ],
      content:
        "用量数据仅供参考，仅支持采集已挂载的持久卷的存储用量数据，未挂载的持久卷无法采集",
      tableData,
      tableColumnList,
      containerLineData,
      containerData,
      updateLabelsVisible: false,
      dialogTitle: "更新标签",
      containerTime: "近 1 小时",
      timeOptions: [
        {
          value: "近 1 小时",
          label: "近 1 小时",
        },
        {
          value: "近 3 小时",
          label: "近 3 小时",
        },
        {
          value: "近 12 小时",
          label: "近 12 小时",
        },
        {
          value: "近 1 天",
          label: "近 1 天",
        },
        {
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelLabels(title) {
      this.updateLabelsVisible = true;
      this.dialogTitle = `更新${title}`;
    },

    updateRatio() {
      this.updateRatioDialog = true;
    },
    cancelUpdateDialog() {
      this.updateRatioDialog = false;
    },

    setRegion() {
      this.setRegionDialog = true;
    },
    cancelSetDialog() {
      this.setRegionDialog = false;
    },
    handleUpdateRatio() {},
    handleSetRegion() {},
    // cpuChange() {},
    // memoryChange() {},
  },
};
</script>
<style lang="scss" scoped>
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }

  .dotClass {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin-left: 10px; //这个用于圆点居中
  }
}
</style>

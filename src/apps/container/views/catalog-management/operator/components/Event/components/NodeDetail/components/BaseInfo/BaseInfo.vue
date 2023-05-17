<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in detailData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;

            <span v-if="item.label == '资源总量'">
              <i class="el-icon-cpu primary2-text" />
              {{ item.value.cpu }}核
              <i class="el-icon-bank-card primary-text" />
              {{ item.value.memory }}Gi
            </span>

            <span v-else-if="item.label == '集群凭证'">
              <a
                style="color: #409eff"
                href="javascript:void(0);"
                @click="viewCert"
              >
                查看
              </a>
            </span>

            <span v-else> {{ item.value }} </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>Kubernetes 信息</span>
        </div>
      </header>
      <section class="component-div-2">
        <el-row :gutter="24">
          <el-col
            v-for="item in detailResData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label == '节点标签'">
              <el-tag size="mini" closable 
                >bate.kubernetes.io/arch:amd64</el-tag
              > 
            </span>
            <span v-else-if="item.label == '注解'">
              <el-tag size="mini" closable
                >bate.kubernetes.io/arch:amd64</el-tag
              >
            </span>
            <span v-else-if="item.label == '污点信息'">
              <el-tag size="mini" closable
                >bate.kubernetes.io/arch:amd64</el-tag
              >
            </span>
            <span v-else> {{ item.value }} </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-dialog
      title="更新显示名称"
      @close="cancelUpdateNameDialog"
      :visible.sync="updateNameDialog"
      width="60%"
    >
      <el-form
        ref="updateNameForm"
        :model="updateNameForm"
        :rules="updateNameRules"
        label-width="135px"
      >
        <el-form-item label="集群"> {{ detailName }} </el-form-item>
        <div style="margin-top: 20px">
          <el-form-item label="显示名称">
            <el-input v-model="updateNameForm.showName"> </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateName"> 更新 </el-button>
        <el-button @click="updateNameDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="查看集群凭证"
      @close="cancelCertDialog"
      :visible.sync="certDialog"
      width="60%"
    >
      <el-form
        ref="setRegionForm"
        :model="certForm"
        :rules="certRules"
        label-width="135px"
      >
        <el-form-item label="令牌">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="CA 证书">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import UpdateLabelsDialog from "@/apps/container/views/components/UpdateLabelsDialog";
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import TransverseBar from "./TransverseBar";
import ProgressCard from "./ProgressCard.vue";
import LineChart from "./LineChart";
import RadiusPieChart from "./RadiusPieChart";

import {
  tableData,
  tableColumnList,
  containerLineData,
  containerData,
  computeData,
  applicationData,
} from "./constant/index";

export default {
  name: "BaseInfo",
  components: {
    UpdateLabelsDialog,
    LineAlert,
    LineChart,
    RadiusPieChart,
    ProgressCard,
    FoldableBlock,
    TransverseBar,
  },
  props: {},
  data() {
    return {
      resourceTime: "近 1 小时",
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
      detailName: "",
      detailData: [
        {
          label: "显示名称",
          value: "",
          afterIcon: "el-icon-edit",
        },
        {
          label: "状态",
          value: "正常",
        },
        {
          label: "节点 IP ",
          value: "25.2.20.182",
        },
        {
          label: "节点类型",
          value: "控制节点",
        },
        {
          label: "GPU 节点",
          value: "否",
        },
        {
          label: "可调度",
          value: "是",
        },
        {
          label: "资源总量",
          value: { cpu: 16, memory: 30.92 },
        },
        {
          label: "操作系统",
          value: "Red Hat Enterprise Linux Server 7.9 (Maipo)",
        },
        {
          label: "硬件架构",
          value: "x86",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
      ],
      detailResData: [
        {
          label: "Docker 版本",
          value: "docker://20.10.7",
        },
        {
          label: "Kubelet 版本",
          value: "v1.12.10",
        },
        {
          label: "KubeProxy 版本",
          value: "v1.21.10",
        },
        {
          label: "容器组 CIDR",
          value: "10.4.0.0/24",
        },
        {
          label: "容器组限制数",
          value: "已分配16 可分配 256",
        },
        {
          label: "节点标签",
          value: "xxxxx",
        },
        {
          label: "注解",
          value: "xxxxx",
        },
        {
          label: "污点信息",
          value: "xxxxx",
        },
      ],

      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],

      updateRatioDialog: false,
      setRegionDialog: false,
      updateNameDialog: false,
      certDialog: false,

      certForm: {},
      certRules: {},

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

      updateNameForm: {
        showName: "",
      },
      updateNameRules: {},

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
      computeData,
      tableData,
      tableColumnList,
      containerLineData,
      containerData,
      applicationData,
      updateLabelsVisible: false,
      dialogTitle: "显示更新名称",
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
  created() {
    this.detailName = this.$route.query.name;
    this.detailData.filter((item) => {
      return item.label == "显示名称";
    })[0].value = this.$route.query.name;
  },
  mounted() {},
  methods: {
    // handelLabels(title) {
    //   this.updateLabelsVisible = true;
    //   this.dialogTitle = `更新${title}`;
    // },
    updateName() {
      this.updateNameForm.showName = this.detailName;
      this.updateNameDialog = true;
    },
    cancelUpdateNameDialog() {
      this.updateNameDialog = false;
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
    viewCert() {
      this.certDialog = true;
    },
    cancelCertDialog() {
      this.certDialog = false;
    },
    handleUpdateRatio() {},
    handleSetRegion() {},
    handleUpdateName() {},
    // cpuChange() {},
    // memoryChange() {},
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
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
.component-div-2 {
  margin-top: 16px;
  padding: 0 10px;
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
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%; //更改竖向分割线长度
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
}
.component-div-computed {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
</style>

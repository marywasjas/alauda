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

      <foldable-block btn-tex="展开">
        <BaseCard>
          <section class="component-div">
            <el-row :gutter="24">
              <el-col
                v-for="item in detailData"
                :key="item.label"
                :span="12"
                class="label-value"
              >
                <span> {{ item.label }} </span>: &nbsp;&nbsp;
                <span v-if="item.label !== '集群凭证'">
                  <!-- {{ item.value ? item.value : "" }} -->
                  {{ item.value }}
                  <i :class="item.afterIcon" @click="updateName" />
                </span>
                <span v-if="item.label == '集群凭证'">
                  <!-- 查看  -->
                  <a
                    style="color: #409eff"
                    href="javascript:void(0);"
                    @click="viewCert"
                    >查看
                  </a>
                </span>
              </el-col>
            </el-row>
          </section>
        </BaseCard>
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>集群资源</span>
            </div>
          </header>
          <section class="component-div">
            <el-row :gutter="24">
              <el-col
                v-for="item in detailResData"
                :key="item.label"
                :span="12"
                class="label-value"
              >
                <span> {{ item.label }} </span>: &nbsp;&nbsp;
                <span v-if="item.label == '资源总量'">
                  <i class="el-icon-cpu primary2-text" />
                  {{ item.value.cpu }}
                  <i class="el-icon-bank-card primary-text" />
                  {{ item.value.memory }}
                </span>
                <span v-else-if="item.label == '超售比'">
                  <i class="el-icon-cpu primary2-text" />
                  {{ item.value.cpu }}
                  <i class="el-icon-bank-card primary-text" />
                  {{ item.value.memory }}
                </span>
                <span v-else> {{ item.value }} </span>
              </el-col>
            </el-row>
          </section>
        </BaseCard>
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>集群网络</span>
            </div>
          </header>
          <section class="component-div">
            <el-row :gutter="24">
              <el-col
                v-for="item in detailNetData"
                :key="item.label"
                :span="12"
                class="label-value"
              >
                <span> {{ item.label }} </span>: &nbsp;&nbsp;
                <span v-if="item.label == '子网'">
                  {{ item.value }}
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 350px">
                        当前容器网络配下，集群最多 256 个节点
                      </div>
                    </template>
                    <i class="el-icon-document margin-left10 question-icon" />
                  </el-tooltip>
                  <el-link style="margin-left: 5px">
                    <i
                      class="
                        el-icon-link el-icon-left
                        margin-left10
                        question-icon
                      "
                    />
                    全部子网
                  </el-link>
                </span>
                <span v-else> {{ item.value }} </span>
              </el-col>
            </el-row>
          </section>
        </BaseCard>
      </foldable-block>
    </BaseCard>

    <div style="display: flex">
      <BaseCard style="width: 33%; height: 130px; margin-right: 35px">
        <header>
          <div class="card-title left-header">
            <span style="color: #409eff">节点</span>
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

      <BaseCard style="width: 33%; height: 130px; margin-right: 35px">
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

      <BaseCard style="width: 33%; height: 125px">
        <header></header>
        <section style="display: flex; flex-direction: row">
          <div class="card-title left-header">
            <i class="el-icon-message-solid" style="color: #409eff"></i>
            <span> 告警数量</span>
            <!-- <br /> -->
            <span style="font-size: 40px; margin-left: 10px">0</span>
          </div>
          <!-- <el-divider direction="vertical"></el-divider> -->
          <div
            style="
              width: 0.5px;
              border: 1px solid gray;
              float: left;
              height: 100px;
              margin-left: 30px;
            "
          />
          <div class="card-title left-header">
            <i style="font-style: normal; color: #409eff">N</i>
            <span> 命名空间数</span>
            <span style="font-size: 40px; margin-left: 10px; margin-top: 90px"
              >33</span
            >
          </div>

          <!-- <div
          style="display:'flex',alignItems:'center',justifyContent: 'space-around'"
        >
          <div
            style="display:'flex',alignItems:'center',flexDirection:'column'"
          >
            <div className="tit">总人数</div>
            <div className="num">10</div>
          </div>

          <div
            style="display:'flex',alignItems:'center',flexDirection:'column'"
          >
            <div className="tit">总营业额</div>
            <div className="num">¥ 0.01</div>
          </div>
        </div> -->
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

        <section class="component-div-computed">
          <transverse-bar :chart-data="computeData" />
        </section>
      </BaseCard>

      <BaseCard style="width: 31.5%">
        <header>
          <div class="card-title left-header">
            <span>应用</span>
          </div>
        </header>
        <section class="component-div-computed">
          <radius-pie-chart :chart-data="applicationData" />
        </section>
      </BaseCard>
    </div>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>资源统计</span>
          <el-select
            v-model="resourceTime"
            filterable
            placeholder="请选择"
            size="small"
            style="margin-left: 800px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </header>
      <section class="component-div">
        <span>CPU 总量: 192.00 核</span>
        <hr />
        <el-row>
          <el-col :span="12">
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />使用率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />请求率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />限制率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>

        <span>内存总量: 371.01 Gi</span>
        <hr />
        <el-row>
          <el-col :span="12">
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />使用率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />请求率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />限制率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>存储空间使用率 (%)</span>
          <span style="margin-left: 700px">
            <el-button size="mini" type="primary" round
              >磁盘空间使用率</el-button
            >
            <el-button size="mini" type="primary" round>inode 使用率</el-button>
          </span>
        </div>
      </header>
      <section >
        <el-row>
          <el-col :span="16" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>系统负载</span>
          <span style="margin-left: 700px">
            <el-button size="mini" type="primary" round>1 分钟平均值</el-button>
            <el-button size="mini" type="primary" round>5 分钟平均值</el-button>
            <el-button size="mini" type="primary" round
              >15 分钟平均值</el-button
            >
          </span>
        </div>
      </header>
      <section class="component-div">
        <el-row>
          <el-col :span="16" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>网络负载 Top 5</span>
          <span style="margin-left: 600px">
            <el-button size="mini" type="primary" round>流入流量</el-button>
            <el-button size="mini" type="primary" round>流出流量</el-button>
            <el-button size="mini" type="primary" round>发送报文量</el-button>
            <el-button size="mini" type="primary" round>接收报文量</el-button>
          </span>
        </div>
      </header>
      <section class="component-div">
        <el-row>
          <el-col :span="11">
            节点
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
          </el-col>

          <el-col :span="11" style="margin-left: 50px">
            容器组
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
            <progress-card :chartData="progressData" />
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
      >
        <div style="display: flex">
          <el-form-item label="CPU 超售比">
            <el-switch v-model="updateRatioForm.cpu" />
          </el-form-item>

          <el-form-item v-if="updateRatioForm.cpu == true">
            <el-input
              v-model="updateRatioForm.updateCpuNum"
              style="width: 500px; margin-left: -120px"
            />
          </el-form-item>
          <el-from-item v-else> 无超售比 </el-from-item>
        </div>

        <div style="display: flex; margin-top: 20px">
          <el-form-item label="内存超售比">
            <el-switch v-model="updateRatioForm.memory" />
          </el-form-item>
          <el-form-item v-if="updateRatioForm.memory == true">
            <el-input
              v-model="updateRatioForm.updateMemoryNum"
              style="width: 500px; margin-left: -120px"
            />
          </el-form-item>
          <el-from-item v-else> 无超售比 </el-from-item>
        </div>
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
        <el-form-item label="集群"> {{ detailName }} </el-form-item>
        <div style="margin-top: 20px">
          <el-form-item label="所属地域" prop="selected">
            <el-select
              v-model="setRegionForm.selected"
              @focus="setMinWidthEmpty"
              style="width: 90%"
            >
              <el-option
                v-for="item in setRegionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 350px">
                  配置集群所属地域后，平台将同时为集群内所有节点设置topology.kubernetes.io/region
                  标签，Value 值将为此处选择的地域
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSetRegion"> 设置 </el-button>
        <el-button @click="setRegionDialog = false">取消</el-button>
      </div>
    </el-dialog>

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
          label: "Kubernetes 版本",
          value: "1.21.10",
        },
        {
          label: "集群凭证",
          value: "",
        },
        {
          label: "类型",
          value: "自建",
        },
        {
          label: "硬件架构",
          value: "x86",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
        {
          label: "自建 VIP",
          value: "关闭",
        },
      ],
      detailResData: [
        {
          label: "资源总量",
          value: { cpu: "192.00核", memory: "371.04Gi" },
        },
        {
          label: "CPU",
          value: "否",
        },
        {
          label: "超售比",
          value: { cpu: 1, memory: 1 },
        },
      ],
      detailNetData: [
        {
          label: "网络模式",
          value: "Calico",
        },
        {
          label: "子网",
          value: "10.4.0.0/16",
        },
        {
          label: "Service 网段",
          value: "10.5.0.0/16",
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

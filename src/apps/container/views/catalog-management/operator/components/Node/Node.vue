<template>
  <div class="container margin-top">
    <el-form :model="selectedForm" label-width="100px" style="margin-top: 15px">
      <el-form-item label="分类目录">
        <el-radio-group v-model="selectedForm.category" size="medium">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="大数据">大数据</el-radio-button>
          <el-radio-button label="中间件">中间件</el-radio-button>
          <el-radio-button label="数据库">数据库</el-radio-button>
          <el-radio-button label="监控">监控</el-radio-button>
          <el-radio-button label="存储">存储</el-radio-button>
          <el-radio-button label="安全">安全</el-radio-button>
          <el-radio-button label="网络">网络</el-radio-button>
          <el-radio-button label="开发者工具">开发者工具</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="能力等级">
        <el-radio-group v-model="selectedForm.level" size="medium">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="基本安装">基本安装</el-radio-button>
          <el-radio-button label="无缝升级">无缝升级</el-radio-button>
          <el-radio-button label="全生命周期">全生命周期</el-radio-button>
          <el-radio-button label="深度可观测">深度可观测</el-radio-button>
          <el-radio-button label="完全自动化">完全自动化</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="供应商类型">
        <el-radio-group v-model="selectedForm.type" size="medium">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="用户自研">用户自研</el-radio-button>
          <el-radio-button label="开源社区">开源社区</el-radio-button>
          <el-radio-button label="平台认证">平台认证</el-radio-button>
          <el-radio-button label="平台自研">平台自研</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <div class="titleStyle">
      <span class="numStyle">共 {{ 16 }} 个 Operator</span>
      <div>
        <el-input
          style="width: 230px; margin: 0 15px"
          prefix-icon="el-icon-search"
          clearable
          placeholder="按名称或描述过滤"
          v-model="nameSearch"
          @keyup.enter.native="handleSearch"
        />
        <el-select v-model="sortSearch" class="selectStyle">
          <span slot="prefix">排序：</span>
          <el-option
            v-for="item in [
              { id: '按时间', name: '按时间' },
              { id: '按名称', name: '按名称' },
            ]"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </div>

    <div class="row-bg">
      <div class="item" v-for="item in appTempData" :key="item.label">
        <div class="buttonClass">
          <div style="display: flex">
            <div style="margin-right: 12px">
              <svg-icon icon-class="skill" style="width: 42px; height: 42px" />
            </div>

            <div
              style="
                flex: 1 1 0%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <span
                :title="item.label"
                style="
                  font-size: 18px;
                  height: 24px;
                  line-height: 24px;
                  text-align: left;
                "
              >
                {{ item.label }}
              </span>
              <div
                style="
                  font-size: 12px;
                  line-height: 16px;
                  margin-top: 2px;
                  color: rgba(150, 152, 155);
                "
              >
                由 <span class="cursor-pointer">平台</span> 提供
              </div>
            </div>

            <div class="rightStyle" :class="{ rightStyleColor: item.color }">
              {{ item.platform }}
            </div>
          </div>

          <div class="descStyle" :title="item.desc">
            {{ item.desc }}
          </div>

          <div style="margin-top: 27px">
            <el-button type="primary" size="small" @click="handleDeploy(item)">
              部署
            </el-button>
            <el-button size="small" @click="handleDetail(item)">详情</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="部署 Operator"
      @close="deployVisible = false"
      :visible.sync="deployVisible"
      width="70%"
    >
      <el-form
        ref="deployForm"
        :model="deployForm"
        :rules="deployRules"
        label-width="135px"
      >
        <el-form-item label="Operator">
          <span>{{ "xxx-xxx-xxx-operator" }}</span>
        </el-form-item>

        <el-form-item label="升级策略">
          <el-radio-group v-model="deployForm.policy">
            <el-radio-button label="手动">手动</el-radio-button>
            <el-radio-button label="自动">自动</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            同一命名空间下仅支持单一升级策略。更改升级策略后，该命名空间所有已安装
            operator 的升级策略将同步修改
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="频道" prop="channel">
          <el-select
            v-model="deployForm.channel"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in [{ value: 'alpha', label: 'alpha' }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="集群">
          <span>{{ "global" }}</span>
        </el-form-item>

        <el-form-item label="安装模式">
          <el-radio-group v-model="deployForm.installMode">
            <el-radio-button label="集群模式">集群模式</el-radio-button>
            <el-radio-button label="命名空间模式">命名空间模式</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="命名空间"
          v-if="deployForm.installMode == '命名空间模式'"
          prop="namespace"
        >
          <el-select
            v-model="deployForm.namespace"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in namespaceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_deploy">部署</el-button>
        <el-button @click="deployVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock },
  props: {},
  data() {
    return {
      selectedForm: {
        category: "all",
        level: "all",
        type: "all",
      },
      nameSearch: "",
      sortSearch: "按名称",

      rowCenter: {
        "max-width": "700px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "123px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      appTempData: [
        {
          label: "Ck Operator",
          desc: "clickhouse 是一个开源的面向专栏的数据库管理系统，能够实时生成分析数据报告。",
          color: true,
          platform: "平台认证",
        },
        {
          label: "DevOps Tools",
          desc: "用于部署可集成在 DevOpts 中使用的外部工具链集合，如：Jenkins、Gitlab 等",
          color: false,
          platform: "平台自研",
        },
        {
          label: "Etcd-Operator",
          desc: "Etcd Operator用于在Kubernetes平台上创建和维护高可用的etcd集群",
          color: false,
          platform: "平台自研",
        },
        {
          label: "Kafka",
          desc: "Kafka 是一种高吞吐量的分布式发布订阅消息系统，可以高效的处理消费者在网站中的所有动作流数据",
          color: false,
          platform: "平台自研",
        },
        {
          label: "Katanomi",
          desc: "Katanomi 是平台自研的 DevOps 核心组件，是使用基于 Tekton 实现的持续构建和持续发布功能的必装组件。",
          color: false,
          platform: "平台自研",
        },
        {
          label: "Knative",
          desc: "Knative 是开源的 serverless 架构方案，此 operator 工具仅引用了 Eventing 模块，用于实现 DevOps 流水线的时间触发机制。",
          color: false,
          platform: "平台自研",
        },
        {
          label: "KubeVirt HyperConverged Cluster Operator",
          desc: "A unified operator deploying and controlling KubeVirt and its supporting operators",
          color: false,
          platform: "平台自研",
        },
        {
          label: "MongoDB",
          desc: "MongoDB 是一个基于分布式文件存储的数据库，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案，具有高性能、可扩展、易部署、易使用等特性，存取数据非常方便",
          color: false,
          platform: "平台自研",
        },
        {
          label: "MySQL Group Replication",
          desc: "MySQL Group Replication 使您可以创建弹性的、高可用的、容错的 MySQL 集群。",
          color: false,
          platform: "平台自研",
        },
        {
          label: "MySQL PXC Cluster",
          desc: "MySQL 是一款响应速度快、可靠性非常高的，全球最受欢迎的关系型数据库之一。",
          color: false,
          platform: "平台自研",
        },
        {
          label: "PostgreSQL",
          desc: 'PostgreSQL 以可靠性、丰富功能和强大性能而著称，被业界誉为"最先进的关系型数据库"。',
          color: true,
          platform: "平台认证",
        },
        {
          label: "Prometheus Operator",
          desc: "Prometheus Operator是Prometheus和Alertmanager的操作器，通过配置与管理Prometheus、Alertmanager等Kubernetes自定义资源，提供对Prometheus和Alertmanager的全生命周期管理。",
          color: false,
          platform: "平台认证",
        },
        {
          label: "RabbitMQ",
          desc: "RabbitMQ 实现了高级消息队列协议，是最受欢迎的消息中间件之一，有成千上万的用户使用。",
          color: false,
          platform: "平台认证",
        },
        {
          label: "Redis",
          desc: "Redis 是一个使用 ANSI C 编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库。",
          color: false,
          platform: "平台认证",
        },
        {
          label: "Rook-Ceph",
          desc: "Install and maintain Ceph Storage cluster",
          color: false,
          platform: "平台认证",
        },
        {
          label: "Tekton",
          desc: "Tekton 是用于创建 DevOps CI/CD 功能的 Kubernetes 原生框架。",
          color: false,
          platform: "平台认证",
        },
      ],

      deployVisible: false,
      deployRules: {
        channel: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        namespace: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
      },
      deployForm: {
        policy: "自动",
        channel: "alpha",
        installMode: "集群模式",
        namespace: "",
      },

      namespaceOptions: [
        { value: "noUnder", label: "-(不在命名空间下)" },
        { value: "baas", label: "baas" },
        { value: "cart-manager", label: "cart-manager" },
        { value: "chaos", label: "chaos" },
        { value: "cpass-dev", label: "cpass-dev" },
        { value: "cpass-system", label: "cpass-system" },
      ],
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
    // 搜索
    handleSearch() {},

    handleDeploy(obj) {
      this.deployForm = this.$options.data().deployForm;
      this.deployVisible = true;
      // this.deployForm.operator = obj.label;
    },

    handle_deploy() {},

    handleDetail(obj) {
      this.$router.push({
        path: "/catalog-management/operator/detail-operatorHub",
        query: { name: obj.label },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.titleStyle {
  // margin: 0 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.numStyle {
  font-size: 14px;
  line-height: 20px;
  color: rgba(150, 152, 155);
}
.selectStyle {
  ::v-deep .el-input__prefix {
    position: absolute;
    height: 100%;
    left: 5px;
    top: 11px;
    text-align: center;
    color: #c0c4cc;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    // margin-right: 15px;
  }
  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 45px;
  }
}
.buttonClass {
  width: 450px;
  height: 200px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.row-bg {
  padding: 30px 30px;
  background-color: #f9fafc;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, calc(67% - 174px));
  grid-gap: 30px;
  -webkit-box-pack: space-evenly;
}
.rightStyle {
  height: 24px;
  font-size: 12px;
  line-height: 20px;
  padding: 2px 8px;
  border-radius: 10px;
  // 默认绿色
  color: rgba(0, 194, 97);
  background: rgba(242, 251, 246);
}
.rightStyleColor {
  color: rgba(245, 163, 0);
  background: rgba(254, 250, 243);
}
.descStyle {
  text-align: left;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  color: rgba(100, 102, 105);
}
</style>
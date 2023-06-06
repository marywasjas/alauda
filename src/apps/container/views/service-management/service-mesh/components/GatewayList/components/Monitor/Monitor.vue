<template>
  <div class="base-info">
    <el-card class="box-card" style="margin-top: 15px">
      <el-row :gutter="24">
        <div class="titleStyle">实例状态</div>
        <div class="titleStyle" style="font-size: 12px">
          <span style="margin-right: 10px">总数{{ 1 }} </span>
          <span style="margin-right: 10px">正常{{ 1 }} </span>
          <span style="margin-right: 10px">异常{{ 0 }} </span>
        </div>
        <el-col :span="24" style="margin-bottom: 20px">
          <el-progress
            style="width: 50%"
            :percentage="100"
            status="success"
            :stroke-width="10"
            :show-text="false"
          />
        </el-col>

        <div class="titleStyle">实时告警</div>

        <!-- <BaseCard> -->
        <div class="container-box">
          <div class="box" v-for="item in baseInfoData" :key="item.title">
            <i style="font-style: normal" v-if="item.title == '节点告警数'">
              N
            </i>
            <i :class="item.icon" v-else />
            <span style="margin-left: 5px">{{ item.title }}</span>
            <div class="numStyle">{{ item.num }}</div>
          </div>
        </div>
        <!-- </BaseCard> -->
      </el-row>
    </el-card>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      :title="title"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";

import {
  tableData,
  tableColumnList,
  tableData2,
  tableColumnList2,
} from "./constant/index";

export default {
  name: "BaseInfo",
  components: { LineAlert, FoldableBlock, MonacoEditorDialog },
  props: {},
  data() {
    return {
      activeName: "1",

      baseInfoData: [
        { title: "集群告警数", icon: "el-icon-document", num: 0 },
        { title: "节点告警数", icon: "", num: 0 },
        { title: "部署告警数", icon: "el-icon-s-data", num: 0 },
        { title: "有状态副本集告警数", icon: "el-icon-coin", num: 0 },
        { title: "守护进程集告警数", icon: "el-icon-coin", num: 0 },
      ],

      detailResData: [
        { label: "显示名称", value: "" },
        { label: "创建人", value: "" },
        { label: "网关类型", value: "出口网关" },
        { label: "更新时间", value: "" },
        { label: "状态", value: "运行中" },
      ],

      detailResData2: [
        { label: "命名空间", value: "istio-system" },
        { label: "实例数", value: "1" },
        { label: "项目", value: "cpass-system" },
        { label: "部署节点", value: "25.2.20.44" },
        { label: "节点反亲和", value: "期望" },
        { label: "固定 IP", value: "" },
        { label: "资源配额", value: { cpu: "0.5", memory: "500" } },
      ],

      detailResData3: [
        { label: "来源", value: "平台提供" },
        { label: "监控系统类型", value: "Prometheus" },
        { label: "URL", value: "http://25.2.2.2:80/cluster/global/prometheus" },
      ],

      detailResData4: [
        { label: "来源", value: "平台提供" },
        { label: "URL", value: "http://25.2.2.2:80/es_proxy" },
      ],

      detailData: [
        {
          label: "ClusterServiceVersion 名称",
          value: "devops-tool-operator.v3.8.22",
        },
        {
          label: "标签",
          // value: "operatorframework.io/arch.amd64:supported",
          value: [
            "operatorframework.io/arch.amd64:supported",
            "operatorframework.io/arch.arm64:supported",
            "operatorframework.io/devops-tool-operator.operat....",
          ],
        },
        {
          label: "集群",
          value: "global",
        },

        {
          label: "命名空间",
          value: "所有命名空间",
        },
        {
          label: "状态",
          value: "部署成功",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
      ],

      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      title: "",
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      spec: {
        apiVersion: "operator.devops.alauda.io/v1alpha",
        kind: "Gitlab",
        metadata: {
          name: "gitlab-sample",
        },
        spec: {
          account: null,
          integratedIntoPlatform: false,
          persistence: {
            type: "LcalPath",
          },
          service: {
            nodePort: {
              httpPort: 30000,
              httpsPort: 30001,
              sshPort: 30002,
            },
            type: "NodePort",
          },
        },
      },

      tableData,
      tableColumnList,
      tableData2,
      tableColumnList2,

      appTempData: [
        {
          label: "Gitea",
          desc: "Gitea 是一个轻量级代码托管解决方案，它可以运行在任何 Go 能够编译的平台。",
        },
        {
          label: "GitlabOfficial",
          desc: "Gitlab 是一个分布式代码管理工具，它可以管理项目原代码并控制代码版本。",
        },

        {
          label: "Gitlab",
          desc: `该工具为 Gitlab 的非官方正式版本，存在一些暂时无法修复的严重漏洞，强烈建议用户使用官方正式版本GitlabOfficial。该工具 Gitlab 会在下一个版本 v3.7 中下线。已经在使用该 Gitlab 用户，请参考运维手册中基础运维部分，根据 DevOps 模块中的《Gitlab 数据迁移至 GitlabOfficial 方案》档案，尽快完成向 GitlabOfficial 工具迁移的工作。`,
        },

        {
          label: "Harbor",
          desc: "Harbor 是一个 Docker 镜像管理工具，它可以提升 Registry 构建和传输镜像的效率。",
        },
        {
          label: "Jenkins",
          desc: "Jenkins 是一个持续集成工具，它可以使开发人员更可靠地构建、测试和部署软件。",
        },
        {
          label: "Nexus",
          desc: "Nexus 是一个强大的仓库管理工具，能够极大地简化内部仓库的维护和外部仓库的访问。",
        },
        {
          label: "Sonarqube",
          desc: "Sonarqube 是一个代码质量管理工具，它可以快速定位代码中潜在或明显的错误。",
        },
        {
          label: "Testlink",
          desc: "Testlink 是一个基于web的测试用例管理工具，主要功能是测试用例的创建、管理和执行。",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.detailName = this.$route.query.name;
    // this.detailData.filter((item) => {
    //   return item.label == "显示名称";
    // })[0].value = this.$route.query.name;
  },
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

    handleView(obj) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.title = obj.label;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    handleCreate(obj) {
      this.$router.push({
        path: "/catalog-management/operator/createInstance",
        query: { name: obj.label },
      });
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
    // color: $color-primary;
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
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}

.titleStyle {
  font-size: 18px;
  font-weight: 500;
  margin: 14px 0;
  margin-left: 15px;
}
.container-box {
  display: grid;
  grid-template-columns: repeat(
    5,
    1fr
  ); /* 将容器分成 5 列，并设置每列的宽度为 1fr */
  grid-gap: 5px; /* 设置元素之间的距离为 10px */
  margin-left: 16px;
}
.box {
  height: 100px;
  // background-color: #ccc;
  position: relative; /* 让伪元素相对于父元素定位 */
}
.box::after {
  content: "";
  border-left: 2px solid #ccc;
  position: absolute; /* 将伪元素设置为绝对定位 */
  top: 0;
  bottom: 0;
  right: 12px; /* 调整伪元素的位置 */
}
.box:last-child::after {
  display: none; /* 去掉第一个 div 元素前面的分割线 */
}
.alarmNote {
  color: rgba(150, 152, 155);
  font-size: 14px;
  width: 560px;
  height: 60px;
  text-align: center;
}
.numStyle {
  font-size: 40px;
  margin-top: 30px;
  color: #67c23a;
}
</style>
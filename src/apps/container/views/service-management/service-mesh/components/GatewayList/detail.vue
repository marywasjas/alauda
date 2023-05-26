<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header
        :name="name"
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
      </tab-header>
    </div>
    <component :is="comName" />

    <delete-remove-dialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      width="50%"
      :titleContext="titleContext"
      :nodeText="nodeText"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />

    <monaco-editor-dialog
      id="eventMonacoEditorDialog"
      v-if="editVisible"
      :visible="editVisible"
      :autoUpdate="autoUpdate"
      :title="title"
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
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Monitor from "./components/Monitor/Monitor.vue";


import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Monitor,

    DeleteRemoveDialog,
    MonacoEditorDialog,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "网关详情",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "网关监控",
          name: "monitor",
          com: "Monitor",
        },
      ],
      activeName: "baseInfo",

      formVisible: false,
      titleContext: "",
      nodeText: "",
      buttonText: "",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      // 事件详情数据
      editVisible: false,
      readOnly: false,
      autoUpdate: false,
      title: "",
      code: "",
      language: "json",
      submitTxt: "确定",
      btnVisible: {
        autoUpdate: true, //自动更新
        import: true,
        export: true,
        reset: true,
        find: true,
        copy: true,
      },
      spec: {
        apiVersion: "operators.coreos.com/vlalpha1",
        kind: "Subscription",
        metadata: {
          cluster_name: "global",
          event: {
            count: 6713,
            eventTime: null,
            firstTimestamp: "2022-10-14T05:33:11Z",
            involvedObject: {
              apiVersion: "v1",
              fieldPath: "spec.containers{ubuntu}",
              kind: "Pod",
              name: "ubuntu-bq84l",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "519516627",
              uid: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
            },
            lastTimestamp: "2022-11-07T01:33:22Z",
            message:
              'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
            metadata: {
              creationTimestamp: "2022-11-07T01:18:15Z",
              name: "ubuntu-bq84l.171dd899b971f3ab",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "603142979",
              uid: "c61582db-0ce2-469d-8606-9854962ffc82",
            },
            reason: "Pulled",
            reportingComponent: "",
            reportingInstance: "",
            source: {
              component: "kubelet",
              host: "172.16.129.51",
            },
            type: "Normal",
          },
          operation: "Pulled",
          operator: "kubelet@172.16.129.51",
          source: "kubernetes",
        },
      },
    };
  },
  computed: {
    comName: function () {
      if (!this.activeName) return "";
      const item = this.tabList.filter((el) => el.name === this.activeName);
      return item[0].com;
    },
  },
  created() {
    this.name = this.$route.query.name;
    // this.desc = this.$route.query.desc;
  },
  methods: {
    changeActive(value) {
      console.log(this.activeName, value);
      this.activeName = value;
    },

    handleUnload() {
      this.formVisible = true;
      this.titleContext = `确定卸载 ${this.name} 吗？`;
      this.nodeText =
        "卸载 Operator 不会删除已创建的资源实例，如果已经创建资源实例，需要手动删除。";
      this.buttonText = "卸载";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleEdit() {
      this.editVisible = true;
      this.title = `编辑订阅 ${this.name}`;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.editVisible = false;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>
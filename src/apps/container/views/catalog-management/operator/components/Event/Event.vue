<template>
  <div class="container margin-top">
    <div class="card__header">
      <div class="flex-left">
        <el-input
          style="width: 250px; margin-right: 20px"
          clearable
          placeholder="按名称搜索"
          v-model="searchName"
          @keyup.enter.native="handleSearch"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
        <el-button icon="el-icon-refresh-right" />
      </div>
    </div>

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
        :sortable="col.sortable"
        :width="col.width"
        :fixed="col.fixed"
      >
        <template slot-scope="scope">
          <div v-if="col.id === 'name'">
            <div style="display: flex; flex: 1 1; align-items: center">
              <div style="margin-right: 10px">
                <i class="el-icon-picture" />
              </div>
              <div class="cursor-pointer" @click="handleDetail(scope.row)">
                {{ scope.row[col.id] }}
              </div>
            </div>
          </div>
          <div v-else-if="col.id === 'status'">
            <i
              :class="
                scope.row.status === '部署成功'
                  ? 'el-icon-success running'
                  : 'el-icon-warning stop'
              "
            />
            <span> {{ scope.row[col.id] }} </span>
          </div>
          <div v-else-if="col.id === 'operation'" class="operation-cell">
            <el-dropdown trigger="click">
              <i class="el-icon-more" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleEdit(scope.row)"
                  >编辑订阅</el-dropdown-item
                >
                <el-dropdown-item @click.native="handleUnload(scope.row)"
                  >卸载 Operator</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <span> {{ scope.row[col.id] }} </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

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
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock, DeleteRemoveDialog, MonacoEditorDialog },
  props: {},
  data() {
    return {
      formVisible: false,
      titleContext: "",
      nodeText: "",
      buttonText: "",

      searchName: "",

      tableData,
      tableColumnList,

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

    handleSearch() {},

    handleUnload(obj) {
      this.formVisible = true;
      this.titleContext = `确定卸载 ${obj.name} 吗？`;
      this.nodeText =
        "卸载 Operator 不会删除已创建的资源实例，如果已经创建资源实例，需要手动删除。";
      this.buttonText = "卸载";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleEdit(obj) {
      this.editVisible = true;
      this.title = `编辑订阅 ${obj.name}`;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.editVisible = false;
    },

    handleDetail(obj) {
      this.$router.push({
        path: "/catalog-management/operator/detail-operatorDeploy",
        query: { name: obj.name },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
  .flex-left {
    padding-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
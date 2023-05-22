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
        <template v-slot:headerRight>
          <el-dropdown trigger="click">
            <el-button type="primary" class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate">
                更新
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete">
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
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
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Yaml from "@/apps/container/views/components/Details/Yaml";

import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Yaml,
    DeleteRemoveDialog,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "详情信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "YAML",
          name: "yaml",
          com: "Yaml",
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
      // console.log(this.activeName, value);
      this.activeName = value;
    },

    handleUpdate() {
      this.$router.push({
        path: "/catalog-management/operator/createInstance",
        query: { name: this.name, type: "update" },
      });
    },

    handleDelete() {
      this.formVisible = true;
      this.titleContext = `删除`;
      this.nodeText = `确定删除资源 ${this.name} 吗？`;
      this.buttonText = "删除";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
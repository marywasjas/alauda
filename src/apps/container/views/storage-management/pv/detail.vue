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
          <el-dropdown>
            <el-button type="primary" class="margin-left10"
              >操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate(scope.row)"
                >更新</el-dropdown-item
              >
              <el-tooltip
                class="item"
                effect="dark"
                content="不可删除已绑定的持久卷"
                placement="left-start"
              >
                <div>
                  <el-dropdown-item :disabled="true"> 删除 </el-dropdown-item>
                </div>
              </el-tooltip>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";

import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Yaml from "./components/Yaml.vue";
// import Event from "./components/Event/Event.vue";

export default {
  name: "PersistentVolumeDetail",
  components: {
    TabHeader,
    BaseInfo,
    Yaml,
    // Event,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "详细信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "YAML",
          name: "yaml",
          com: "Yaml",
        },
        // {
        //   label: "事件",
        //   name: "event",
        //   com: "Event",
        // },
      ],
      activeName: "",
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
    this.desc = this.$route.query.desc;
    this.activeName = this.tabList[0].name;
  },
  methods: {
    changeActive(value) {
      this.activeName = value;
    },
    handleUpdate(row) {
      this.$router.push({
        name: "PersistentVolumeCreateUpdate",
        query: {
          type: "edit",
        },
      });
    },
    handelDelete() {
      const returnMsgList = [
        `确定删除${this.name}持久卷声明吗？删除后持久卷中的数据将被清除。`,
        `请输入${this.name}确定删除`,
      ];
      const newData = [];
      const h = this.$createElement;
      for (const i in returnMsgList) {
        newData.push(h("p", null, returnMsgList[i]));
      }
      this.$prompt(h("div", null, newData), "删除持久卷声明", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "error",
        inputValidator: (val) => {
          if (val === this.name) {
            return true;
          }
          return false;
        },
        inputErrorMessage: "输入不正确",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
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
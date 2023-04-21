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
            <el-button type="primary" class="margin-left10"
              >操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate"
                >更新</el-dropdown-item
              >
              <el-tooltip
                class="item"
                effect="dark"
                content="不可删除已绑定的持久卷"
                placement="left-start"
              >
                <div>
                  <el-dropdown-item @click.native="handleDelete">
                    删除
                  </el-dropdown-item>
                </div>
              </el-tooltip>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>

    <component :is="comName" />

    <el-dialog
      @close="dialogDeleteVisible = false"
      :visible.sync="dialogDeleteVisible"
      width="45%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定删除资源实例 ${name} 吗？` }}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 删除 </el-button>
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";

import BaseInfo from "./components2/BaseInfo/BaseInfo.vue";
import Yaml from "./components2/Yaml.vue";
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
      dialogDeleteVisible: false,
      // instanceName: "",

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
        path: "/cluster-management/crd/create",
        query: { name: this.name, type: "update" },
      });
    },

    handleDelete(obj) {
      this.dialogDeleteVisible = true;
      this.instanceName = obj.name;
    },

    handle_delete() {},
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
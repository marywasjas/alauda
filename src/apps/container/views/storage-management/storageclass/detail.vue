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
              <el-dropdown-item @click.native="handleProject(name)">
                更新项目
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleUpdate(name)">
                更新
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete(name)">
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />

    <!-- 更新项目 -->
    <el-dialog
      title="更新项目"
      @close="projectVisible = false"
      :visible.sync="projectVisible"
      width="60%"
    >
      <el-form
        ref="projectForm"
        :model="projectForm"
        :rules="projectRules"
        label-width="135px"
      >
        <el-form-item label="名称">
          <span>{{ projectForm.name }} </span>
        </el-form-item>

        <el-form-item label="分配项目">
          <el-radio-group v-model="projectForm.project">
            <el-radio-button label="所有项目"></el-radio-button>
            <el-radio-button label="指定项目"></el-radio-button>
            <el-radio-button label="不分配"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="指定项目"
          prop="specProject"
          v-if="projectForm.project == '指定项目'"
        >
          <el-select
            v-model="projectForm.specProject"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_project"> 更新 </el-button>
        <el-button @click="projectVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      @close="deleteVisible = false"
      :visible.sync="deleteVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          {{ `确定删除存储类 "${deleteName}" 吗？` }}
        </span>
      </div>

      <div style="margin-bottom: 10px">
        删除后，用户将无法基于此存储类创建持久卷，而已创建的持久卷将不受影响。
      </div>
      <div style="margin-top: 10px">
        请输入 <span style="color: red">{{ deleteName }}</span> 确定删除。
      </div>
      <div class="inputInfo copy_icon">
        <el-input v-model="command" style="width: 95%"> </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="handle_delete"
          :disabled="command == '' ? true : false"
          >删除</el-button
        >
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Node from "./components/Node/Node.vue";
import clusterNet from "./components/clusterNet/clusterNet.vue";

export default {
  name: "ClusterDetail",
  components: { TabHeader, BaseInfo, Node, clusterNet },
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
          label: "持久卷",
          name: "clusterNet",
          com: "clusterNet",
        },
        {
          label: "YAML",
          name: "node",
          com: "Node",
        },
      ],
      activeName: "",

      deleteName: "",
      command: "",
      projectVisible: false,
      projectForm: {
        name: "",
        project: "不分配",
        specProject: "",
      },
      projectRules: {
        specProject: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      deleteVisible: false,
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
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    changeActive(value) {
      this.activeName = value;
    },

    handleProject(name) {
      this.projectVisible = true;
      this.projectForm.name = name;
    },
    handle_project() {},

    handleDelete(name) {
      this.command = "";
      this.deleteVisible = true;
      this.deleteName = name;
    },
    handle_delete() {},

    handleUpdate(name) {
      this.$router.push({
        path: "/storage-management/storageclass/update",
        query: { name },
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
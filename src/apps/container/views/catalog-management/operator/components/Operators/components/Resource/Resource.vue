<template>
  <div class="calculation-container-group">
    <BaseCard>
      <div class="flex-center">
        <el-button @click="handleCreate" type="primary"> 创建实例 </el-button>

        <div>
          <el-select
            @change="handleSearch"
            v-model="typeSearch"
            placeholder="按实例类型过滤"
            multiple
            clearable
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-input
            style="width: 230px; margin: 0 15px"
            prefix-icon="el-icon-search"
            clearable
            placeholder="按名称过滤"
            v-model="nameSearch"
            @keyup.enter.native="handleSearch"
          >
          </el-input>

          <el-button icon="el-icon-refresh-right" @click="handleRefresh" />
        </div>
      </div>

      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
          empty-text="无实例"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handleDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>

    <delete-remove-dialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      width="40%"
      :titleContext="titleContext"
      :nodeText="nodeText"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />

    <el-dialog
      title="选择实例类型"
      @close="closeInstance"
      :visible.sync="createVisible"
      width="60%"
    >
      <div class="row-bg">
        <div class="item" v-for="item in appTempData" :key="item.label">
          <div class="buttonClass" style="overflow: hidden">
            <div
              style="
                font-size: 18px;
                height: 24px;
                line-height: 24px;
                margin-bottom: 16px;
              "
            >
              {{ item.label }}
            </div>

            <div :title="item.desc" class="wordStyle">
              {{ item.desc }}
            </div>

            <div class="cursor-pointer" style="font-size: 14px">
              <i
                class="el-icon-document"
                style="margin-right: 20px"
                @click="handleView(item)"
              >
                查看样例 YAML
              </i>
              <i
                class="el-icon-circle-plus-outline"
                @click="handleCreateInstance(item)"
              >
                创建实例
              </i>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

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
import { tableColumnList, tableData } from "./constant/index";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";

export default {
  name: "Event",
  components: { DeleteRemoveDialog, MonacoEditorDialog },
  props: {},
  data() {
    return {
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

      createVisible: false,

      formVisible: false,
      titleContext: "",
      nodeText: "",
      buttonText: "",

      tableColumnList,
      tableData,

      nameSearch: "",
      typeSearch: "",
      typeOptions: [{ label: "postgresql", value: "postgresql" }],

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
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSearch() {},

    handleRefresh() {},

    handleDelete(obj) {
      this.formVisible = true;
      this.titleContext = `删除`;
      this.nodeText = `确定删除资源 ${obj.name} 吗？`;
      this.buttonText = "删除";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleCreate() {
      this.createVisible = true;
    },

    handleView(obj) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.title = obj.name;
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    closeInstance() {
      this.createVisible = false;
    },

    handleCreateInstance(obj) {
      this.closeInstance();
      setTimeout(() => {
        this.$router.push({
          path: "/catalog-management/operator/createInstance",
          query: { name: obj.name },
        });
      }, 50);
    },

    handleUpdate(obj) {
      this.$router.push({
        path: "/catalog-management/operator/createInstance",
        query: { name: obj.name, type: "update" },
      });
    },

    handleDetail(obj) {
      this.$router.push({
        path: "/catalog-management/operator/detailInstance",
        query: { name: obj.name},
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  // margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(2, calc(50% - 10px));
  grid-gap: 20px;
}
.buttonClass {
  width: 330px;
  height: 180px;
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
.wordStyle {
  font-size: 14px;
  height: 65px;
  line-height: 21px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

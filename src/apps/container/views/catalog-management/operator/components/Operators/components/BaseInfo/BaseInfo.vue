<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            class="label-value"
            v-for="item in detailData"
            :key="item.label"
            :span="12"
          >
            <span> {{ item.label }} </span>
            : &nbsp;&nbsp;

            <span v-if="item.label == '状态'">
              <i
                :class="
                  item.value === '部署成功'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              {{ item.value }}
            </span>

            <span v-else-if="item.label == '标签'">
              <el-tooltip
                placement="top"
                effect="dark"
                style="margin-right: 10px"
              >
                <div slot="content">{{ item.value[0] }}</div>
                <el-tag size="mini">
                  {{
                    item.value[0].length > 15
                      ? item.value[0].substring(0, 30) + "..."
                      : item.value[0]
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content" v-for="ele in item.value" :key="ele">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ ele }}
                  </el-tag>
                  <br />
                </div>
                <el-tag size="mini" style="cursor: pointer">
                  {{ "..." }}
                </el-tag>
              </el-tooltip>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <el-tabs v-model="activeName">
            <el-tab-pane label="资源" name="1">
              <section class="component-div">
                <div class="row-bg">
                  <div
                    class="item"
                    v-for="item in appTempData"
                    :key="item.label"
                  >
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
                          @click="handleCreate(item)"
                        >
                          创建实例
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </el-tab-pane>

            <el-tab-pane label="介绍" name="2">
              <section class="component-div">
                <div style="padding: 0 ">
                  <!-- v-if="titleName == 'DevOps Tools'" -->
                  <h1 style="margin-bottom: 16px">{{ "DevOps Tools" }}</h1>
                  <h2 style="margin-bottom: 16px">{{ "注意" }}</h2>
                  <p>Gitea: 支持框架为 ARM、x86</p>
                  <p>Gitlab: 支持框架为 x86</p>
                  <p>Jenkins: 支持框架为 ARM、x86</p>
                  <p>Harbor: 支持框架为 ARM、x86</p>
                  <p>Sonarqube: 支持框架为 ARM、x86</p>
                  <p>Nexus: 支持框架为 ARM、x86</p>
                  <p>Testlink: 支持框架为 x86</p>
                  <p>Gitlab-Official: 支持框架为 x86</p>
                  <h2 style="margin-bottom: 16px">{{ "介绍" }}</h2>
                  <p>
                    DevOps Tools 是一个用部署可集成在 DevOps
                    中使用的外部工具链集合，包括
                    Jenkins、Gitlab、Harbor、Sonarqube
                    等，在创建实例时，用户可根据实际用途，选择"自动集成到 DevOps
                    工具链"或"不集成到 DevOps 工具链"两种形式。
                  </p>
                  <p><strong>Gitea</strong></p>
                  <p>
                    Gitea 是一个轻量级代码托管解决方案，它可以运行在任何 Go
                    能够编译的平台。
                  </p>
                  <p><strong>Gitlab</strong></p>
                  <p>
                    Gitlab 是一个开源的版本控制系统，它使用 Git
                    作为代码管理工具，并在此基础上搭建起来的 web 服务。
                  </p>
                  <p>
                    该工具为 Gitlab
                    的非官方正式版本，存在一些暂时无法修复的严重漏洞，强烈建议用户使用官方正式版本
                    GitlabOfficial。该工具 Gitlab 会在下一个版本 v3.7
                    中下线。已经在使用该 Gitlab
                    的用户，请参考运维手册中基础运维的部分，根据 DevOps
                    模块的《Gitlab 数据迁移至 GitlabOfficial
                    方案》文档，尽快完成向 GitlabOfficial 工具迁移的工作。
                  </p>
                  <p><strong>Gitlab-Official</strong></p>
                  <p>
                    Gitlab-Official 是一个开源的版本控制系统，它使用 Git
                    作为代码管理工具，并在此基础上搭建起来的 web 服务。
                  </p>
                  <p><strong>Jenkins</strong></p>
                  <p>
                    Jenkins 是基于 Java
                    开发的一个重要的持续集成工具，它常与版本控制工具、构建工具结合使用。常用的版本控制工具有
                    SVN、GIT，构建工具有 Maven、Ant、Gradle。
                  </p>
                  <p><strong>Harbor</strong></p>
                  <p>
                    Harbor 是构建企业级私有 docker 镜像仓库的开源解决方案，它是
                    Docker Registry 的更高级封装，它具体友好的 Web UI
                    界面，角色和用户权限管理，用户操作审计等功能。
                  </p>
                  <p><strong>Sonarqube</strong></p>
                  <p>
                    Sonarqube
                    是一个代码质量管理工具，它可以迅速定位代码中潜在或明显的错误。
                  </p>
                  <p><strong>Nexus</strong></p>
                  <p>
                    Nexus
                    是一个强大的仓库管理工具，能够极大地简化内部仓库的维护和外部仓库的访问。
                  </p>
                  <p><strong>Testlink</strong></p>
                  <p>
                    Testlink
                    是基于web的测试用例管理工具，主要功能是测试用例的创建、管理和执行。
                  </p>
                </div>
              </section>
            </el-tab-pane>

            <el-tab-pane label="部署 / 运行状态" name="3">
              <section class="component-div">
                <section>
                  <el-table
                    class="margin-top"
                    :data="tableData.data"
                    style="width: 100%"
                    header-row-class-name="headerStyle"
                  >
                    <el-table-column
                      v-for="col in tableColumnList"
                      :key="col.id"
                      :label="col.label"
                      :width="col.width"
                      :show-overflow-tooltip="col['show-overflow-tooltip']"
                    >
                      <template slot-scope="scope">
                        <div v-if="col.id === 'message'">
                          {{
                            scope.row[col.id].length > 20
                              ? scope.row[col.id].substring(0, 20) + "..."
                              : scope.row[col.id]
                          }}
                        </div>
                        <div v-else>
                          {{ scope.row[col.id] }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </section>
              </section>
            </el-tab-pane>
          </el-tabs>
        </BaseCard>
      </el-col>
    </el-row>

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

import { tableData, tableColumnList } from "./constant/index";

export default {
  name: "BaseInfo",
  components: { LineAlert, FoldableBlock, MonacoEditorDialog },
  props: {},
  data() {
    return {
      activeName: "1",

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
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
// .li-link {
//   widows: 100%;
//   padding: 12px 16px;
//   text-align: left;
//   border-bottom: 1px solid #ccc;
//   overflow: hidden;
//   cursor: pointer;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   position: relative;
//   font-size: 16px;
//   color: rgb(50, 52, 55);
// }
// .li-link:hover,
// .isActive {
//   color: $color-primary;
//   background-color: $background-color;
// }
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 290px;
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

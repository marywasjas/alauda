<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div style="display: flex; align-items: center">
          <div style="margin-right: 12px">
            <svg-icon icon-class="skill" style="width: 44px; height: 46px" />
          </div>

          <div style="flex: 1 1 0%">
            <div style="font-size: 20px; line-height: 28px">
              {{ titleName }}
            </div>
            <div
              style="
                font-size: 14px;
                line-height: 20px;
                color: rgba(100, 102, 105);
              "
            >
              {{
                "clickhouse 是一个开源的面向专栏的数据库管理系统，能够实时生成分析数据报告。"
              }}
            </div>
          </div>

          <div style="float: right">
            <el-button type="primary">部署</el-button>
          </div>
        </div>
      </header>
      <el-divider></el-divider>

      <section>
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label == '供应商'">
              <span class="cursor-pointer">
                <i class="el-icon-link">{{ item.value }}</i>
              </span>
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
            <el-tab-pane label="详情信息" name="1">
              <section class="component-div">
                <div style="padding: 0 16px">
                  <h1 style="margin-bottom: 16px">{{ titleName }}</h1>

                  <h3 style="margin: 18px 0">介绍</h3>

                  <p>
                    Kafka是由Apache软件基金会开发的一个开源流处理平台，由Scala和Java编写。Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者在网站中的所有动作流数据。
                    这种动作（网页浏览，搜索和其他用户的行动）是在现代网络上的许多社会功能的一个关键因素。
                    这些数据通常是由于吞吐量的要求而通过处理日志和日志聚合来解决。
                    对于像Hadoop一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka的目的是通过Hadoop的并行加载机制来统一线上和离线的消息处理，也是为了通过集群来提供实时的消息。
                  </p>

                  <h3 style="margin: 18px 0">支持功能</h3>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>管理Kafka集群</strong>
                      部署和管理此复杂引用程序的所有组件
                    </li>
                    <li>
                      <strong>管理Kafka集群</strong>
                      部署和管理此复杂引用程序的所有组件
                    </li>
                    <li>
                      <strong>管理Kafka集群</strong>
                      部署和管理此复杂引用程序的所有组件
                    </li>
                    <li>
                      <strong>管理Kafka集群</strong>
                      部署和管理此复杂引用程序的所有组件
                    </li>
                  </ul>
                </div>
              </section>
            </el-tab-pane>

            <el-tab-pane label="自定义资源" name="2">
              <section class="component-div">
                <div class="row-bg">
                  <div
                    class="item"
                    v-for="item in appTempData"
                    :key="item.label"
                  >
                    <div class="buttonClass">
                      <div
                        style="
                          font-size: 18px;
                          height: 24px;
                          line-height: 24px;
                          margin-bottom: 16px;
                        "
                      >
                        KafkaBridge
                      </div>

                      <div
                        style="
                          font-size: 14px;
                          height: 85px;
                          line-height: 20px;
                          margin-bottom: 16px;
                        "
                      >
                        KafkaBridge集群
                      </div>

                      <div class="cursor-pointer" style="font-size: 14px">
                        <i class="el-icon-document" @click="handleView">
                          查看样例 YAML
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
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
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: { LineAlert, MonacoEditorDialog },
  props: {},
  data() {
    return {
      syncRes: "el-icon-remove",
      syncDisable: true,
      name: "",
      activeName: "1",
      typeValue: "",
      typeValue2: "",

      titleName: "",
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
        detail: {
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
        log_level: 0,
        resource_id: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
        resource_type: "Pod",
        time: "1667783895000000",
      },

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      appTempData: [
        {
          label: "chartmuseum",
          desc: "Host your own Helm Chart Repository",
          version: [
            {
              vers: "2.15.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "docker-registry",
          desc: "A Helm chart for Docker Registry",
          version: [
            {
              vers: "v3.2.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "elasticsearch",
          desc: "Elastic helm chart for Elasticsearch",
          version: [
            {
              vers: "7.8.1",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
            {
              vers: "7.8.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: false,
            },
          ],
        },
        {
          label: "femas",
          desc: "A Helm chart fro Femas",
          version: [
            {
              vers: "v2.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "pmem-redis",
          desc: "Chart for PMEM Redis",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "zookeeper",
          desc: "Zookeeper是一个分布式的应用程序协调服务，可以为分布式程序提供的功能包括：配置维护、域名服务、分布式同步、组服务等",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
      ],

      dataForm: {
        type: "用户名/密码",
        name: "",
        password: "",
      },
      dataRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
      infoForm: {
        secretName: "",
        showName: "",
        toolType: "",
      },
      infoRules: {
        secretName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      baseInfoData: [
        {
          label: "软件版本",
          value: "3.8.11",
        },
        {
          label: "供应商",
          value: "平台",
        },
        {
          label: "分类目录",
          value: "无",
        },
        {
          label: "供应商类型",
          value: "平台认证",
        },
        {
          label: "能力等级",
          value: "基本安装",
        },
        {
          label: "创建时间",
          value: "2023-05-16 08:56:59",
        },
        {
          label: "硬件架构",
          value: "ARM，x86",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.titleName = this.$route.query.name;
  },
  mounted() {},
  methods: {
    getList() {},

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
      this.title = "KafkaBridge";
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .fixed-div {
    width: calc(100% - 250px);
    // width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
  .el-row {
    margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .bg-purple {
    background: #fff;
    padding: 10px;
    margin: 10px;
  }
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
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
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.contentStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: rgba(150, 152, 155);
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 11px;
  height: 40px;
  line-height: 42px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
li {
  line-height: 2em;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 300px;
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
.wordStyle {
  width: 260px;
  height: 29px;
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
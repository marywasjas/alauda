<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px"> YAML 创建存储卷 </span>
        </div>
        <div class="yaml-div">
          <monaco-editor
            ref="monacoEditor"
            :code="currentCode"
            :read-only="false"
            :is-fullscreen="false"
            :language="language"
            @handleBlur="handleBlur"
            :btn-visible="btnVisible"
          />

          <div class="tips-div">
            YAML样例:
            <p @click="quickInput">
              <i class="el-icon-top" />
              <span>写入</span>
            </p>
            <p @click="viewYaml">
              <i class="el-icon-view" />
              <span>查看</span>
            </p>
          </div>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate"> 创建 </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: { MonacoEditor },
  data() {
    return {
      currentCode: "{}",
      inputCode: {},
      defaultCode: {
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
      language: "yaml",

      btnVisible: {
        autoUpdate: false,
        import: true,
        export: false,
        find: false,
        reset: false,
        copy: false,
        full: true,
        exit: true,
      },
      defaultBtnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        find: true,
        reset: false,
        copy: true,
        full: true,
        exit: true,
      },
      detailVisible: false,
      isFullscreen: false,
      readOnly: true,
      bigFull: false,

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

  created() {},

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

    handleBlur(value) {
      this.inputCode = value;
    },

    // 写入
    quickInput() {
      this.currentCode = JSON.stringify(this.defaultCode, null, 2);
      const obj = {
        autoUpdate: false,
        import: true,
        export: true,
        reset: true,
        find: true,
        copy: true,
      };
      this.$set(this, "btnVisible", obj);
    },
    // 查看
    viewYaml() {
      this.detailVisible = true;
      this.readOnly = true;
      this.bigFull = false;
      this.defaultBtnVisible = {
        autoUpdate: false,
        import: false,
        export: true,
        find: true,
        reset: false,
        copy: true,
        full: true,
        exit: true,
      };
      this.defaultCodeStr = JSON.stringify(this.defaultCode, null, 2);
    },

    submitCreate() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
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
    // margin: 20px 0 20px 0;
    // padding: 20px;
    // background: #fff;
    border-radius: $border-radius-m;
    // box-shadow: 0 0 4px 0 $box-shadow;
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
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .row-bg {
    padding: 0;
    background-color: #f9fafc;
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
.event-container {
  .event-list-wrapper {
    margin-top: 10px;
    .event-card {
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border: 1px solid $border-color-one;
      .card-header {
        box-sizing: border-box;
      }
      .text {
        color: $font-color-title;
        font-weight: bold;
      }
      .number,
      .time {
        color: $font-color-text;
        font-size: $font-size-14;
      }
      .circle {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $color-primary;
        margin-right: 8px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 9px;
  height: 40px;
  line-height: 40px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: -5px;
  top: 48%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>
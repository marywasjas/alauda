<template>
  <div class="oam-container">
    <div class="oam-main" style="height: calc(100vh - 124px)">
      <div style="display: flex; flex-direction: column; align-items: center">
        <img
          :src="errGif"
          width="200"
          height="200"
          alt="Girl has dropped her ice cream."
        />
        <h3>未配置本地存储</h3>

        <p
          style="
            color: rgba(150, 152, 155);
            font-size: 14px;
            width: 560px;
            height: 60px;
          "
        >
          本地存储 (NativeStor)
          是一种软件定义的服务器本地存储方案，提供简单、易维护和高性能的本地存储服务能力，可用于数据库、区块链等对性能要求较高的业务系统。若需使用本地存储，请点击下方按钮进行部署
        </p>

        <el-button type="primary" style="margin-top: 12px" @click="config">
          立即配置
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "VolumeSnapshotList",
  components: {},
  data() {
    return {
      errGif: errGif + "?" + +new Date(),

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
    config() {
      // console.log(this.$router);
      this.$router.push({
        path: "/storage-management/local-storage/config",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-content {
    margin: 15px 20px 0px 0px;
    .filter-row {
      display: flex;
      .filter-item {
        flex: 1;
        margin-bottom: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
// ::v-deep .el-table td.el-table__cell {
//   border-bottom: 0px solid #dfe6ec;
// }
::v-deep .el-table--border .el-table__cell {
  border-right: 0px solid #dfe6ec;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px solid #dfe6ec;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #fff !important;
}
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 65px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
</style>
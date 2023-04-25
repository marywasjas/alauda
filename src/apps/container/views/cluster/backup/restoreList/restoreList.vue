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
        <h3>未部署备份恢复组件</h3>

        <p
          style="
            color: rgba(150, 152, 155);
            font-size: 14px;
            width: 560px;
            height: 60px;
            text-align: center;
          "
        >
          您需要在当前集群内部署备份恢复组件，才能使用该功能。
        </p>

        <el-button type="primary" style="margin-top: 12px" @click="deploy">
          立即部署
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "ClusterList",
  components: {},
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
      ewizardClap:
        "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
    };
  },

  created() {},

  methods: {
    deploy() {
      this.$router.push({
        path: "/cluster-management/cluster/detail",
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
<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="integration">集成</el-button>
        </span>

        <div class="flex-center">
          <el-input
            style="width: 250px; margin-left: 20px"
            prefix-icon="el-icon-search"
            clearable
            placeholder="按名称过滤"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
          </el-input>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1">
            <el-row style="height: 400px" class="row-bg">
              <el-col :span="4" style="margin-left: 20px">
                <el-button
                  class="buttonClass"
                  @click="handleDetail('bass-etrust')"
                >
                  bass-etrust
                </el-button>
              </el-col>
              <el-col :span="4" style="margin-left: 20px">
                <el-button class="buttonClass" @click="handleDetail('gitlab')">
                  gitlab
                </el-button>
              </el-col>
              <el-col :span="4" style="margin-left: 20px">
                <el-button class="buttonClass" @click="handleDetail(' harbor')">
                  harbor
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="制品管理" name="2">
            <el-row style="height: 400px" class="row-bg"> </el-row>
          </el-tab-pane>
          <el-tab-pane label="代码质量分析" name="3">
            <el-row style="height: 400px" class="row-bg"> </el-row>
          </el-tab-pane>
          <el-tab-pane label="代码管理" name="4">
            <el-row style="height: 400px" class="row-bg"> </el-row>
          </el-tab-pane>
          <el-tab-pane label="持续集成" name="5">
            <el-row style="height: 400px" class="row-bg"> </el-row>
          </el-tab-pane>
          <el-tab-pane label="测试管理" name="6">
            <el-row style="height: 400px" class="row-bg"> </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "UserList",
  components: {
    LineAlert,
    FoldableBlock,
  },
  data() {
    return {
      activeName: "1",
      typeValue: "",
    };
  },

  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getList() {},

    handleDetail(name) {
      this.$router.push({
        path: "/project-list/toolchain/integrationDetail",
        query: { name },
      });
    },

    integration() {
      this.$router.push({
        path: "/project-list/toolchain/integrate",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.name-cell {
  display: flex;
  justify-content: left;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: $font-size-20;
    padding: 1px;
    border: 1px solid $border-color-one;
    border-radius: $border-radius-l;
    background: $color-primary-rgba1;
    color: $color-primary;
  }
  span {
    display: block;
    margin: 0;
    font-size: $font-size-18;
  }
  span:last-child {
    color: $font-color-text;
    font-size: $font-size-14;
    margin-top: 6px;
  }
}
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple {
  background: #fff;
}

.buttonClass {
  width: 168px;
  height: 188px;
  padding: 0;
}
/*鼠标点击后移开，恢复本身样式*/
.buttonClass,
.buttonClass:focus:not(.buttonClass:hover) {
  margin-right: -40px;
  border: 1px solid #2794f8;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 #f4f4f4;
  color: #2794f8;
  background: white;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  color: #2794f8;
}
/*鼠标按下，没有抬起*/
.buttonClass:active {
  // background: #2794f8;
  color: white;
}
</style>
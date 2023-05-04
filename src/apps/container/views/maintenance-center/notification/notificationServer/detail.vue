<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ titleName }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10" type="primary">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate">
                  更新
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete('删除')">
                  <span style="color: red"> 删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in detailData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
        <span style="font-size: 18px; font-weight: 500; margin-bottom: 14px">
          服务器配置
        </span>
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in detailResData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span> {{ item.label }} </span>: &nbsp;&nbsp;
            <span> {{ item.value }} </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-dialog
      @close="formVisible = false"
      :visible.sync="formVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除通知服务器
        </span>
      </div>

      <div style="margin-top: 10px">
        <div style="margin-bottom: 15px">
          {{
            `确定删除通知服务器"${this.titleName}"吗？删除后，将无法通过该服务器发送通知 `
          }}
        </div>

        请输入 <span style="color: red">{{ this.titleName }}</span> 确定删除。
      </div>

      <el-input v-model="command"> </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_delete">删除</el-button>
        <el-button @click="formVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: {},
  props: {},
  data() {
    return {
      command: "",
      titleName: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      detailData: [
        {
          label: "显示名称",
          value: "msg-server001",
        },
        {
          label: "类型",
          value: "邮箱",
        },
        {
          label: "描述",
          value: "",
        },
        {
          label: "创建时间",
          value: "2023-05-04 16:35:41",
        },
      ],

      detailResData: [
        {
          label: "主机",
          value: "1",
        },
        {
          label: "是否使用 SSL",
          value: "否",
        },
        {
          label: "端口",
          value: "1",
        },
        {
          label: "是否跳过非安全验证",
          value: "否",
        },
      ],

      formVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.titleName = this.$route.query.name;
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

    handleDelete(title) {
      this.formVisible = true;
    },

    handleUpdate() {
      this.$router.push({
        path: "/maintenance-center/notification/create-notification-Server",
        query: { name: this.titleName },
      });
    },
    handle_delete() {},
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
// .container-top-left {
//   width: 32%;
//   height: 250px;
//   border-right: 1px solid $border-color-one;
//   padding-right: 20px;
//   display: flex;
//   align-items: center;
//   .chart {
//     height: 200px !important;
//   }
// }
// .container-top-right {
//   flex: 1;
//   height: 250px;
//   .el-select {
//     margin-bottom: 20px;
//   }
//   .chart {
//     height: 200px !important;
//   }
//   .el-divider--vertical {
//     display: inline-block;
//     width: 1px;
//     height: 100%; //更改竖向分割线长度
//     margin: 0 8px;
//     vertical-align: middle;
//     position: relative;
//   }
// }
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
// .el-icon-document-copy:focus,
.el-icon-document-copy:hover {
  color: #2794f8;
}
</style>
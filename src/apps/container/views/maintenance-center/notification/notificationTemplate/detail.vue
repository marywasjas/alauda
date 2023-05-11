<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ detailTitle }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button type="primary" class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate">
                  更新
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete">
                  删除
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
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>

        <span style="font-size: 18px; font-weight: 500; margin-bottom: 14px">
          模板配置
        </span>

        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col :span="24">
            <el-descriptions
              class="margin-top"
              :column="1"
              :span="2"
              border
              label-width="150px"
            >
              <el-descriptions-item label-class-name="my-label">
                <template slot="label">邮件主题</template>
                {{ datas2 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 通知内容</template>
                {{ datas }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      :width="width"
      :titleContext="titleContext"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "BaseInfo",
  components: { DeleteRemoveDialog },
  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      detailTitle: "",

      datas: `<h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3><h1>富强、民主、文明、和谐</h1><br/>
      <h2><font color="red">自由、平等、公正、法治</font></h2><br/>
      <h3><font color="blue">爱国、敬业、诚信、友善</font></h3>`,

      datas2:
        "【'{{'externalLabels.status+`}}`'】 PAAS 平台告警: '{{'externalLabels.object'}}'的'{{'externalLabels.summary'}}'",

      baseInfoData: [
        {
          label: "显示名称",
          value: "m",
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
          value: "2022-10-24 14:00:00",
        },
      ],

      titleContext: "",
      buttonText: "",
      formVisible: false,
      width: "",
      nodeText: "",
    };
  },

  created() {
    this.detailTitle = this.$route.query.name;
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

    handleUpdate() {
      this.$router.push({
        path: "/maintenance-center/notification/create-notification-Template",
        query: { name: this.detailTitle },
      });
    },

    handleDelete() {
      this.buttonText = "确定";
      this.titleContext = `确定删除通知模板 "${this.detailTitle}" 吗？`;
      this.formVisible = true;
      this.width = "45%";
    },
    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
::v-deep .my-label .el-descriptions-item__label {
  width: 120px; /* 设置较小的宽度 */
}

.el-descriptions .el-descriptions-item__label {
  width: 120px; /* 设置默认的宽度 */
}
</style>


<style scoped>
/* ::v-deep .el-descriptions__body {
  width: "700px";
} */
</style>

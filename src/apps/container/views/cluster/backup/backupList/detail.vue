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
                <el-dropdown-item @click.native="handleAction('立即执行')">
                  执行备份
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleUpdate">
                  更新
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete('删除')">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <span style="font-size: 16px; font-weight: 500; margin-bottom: 14px">
          集群资源
        </span>

        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label === '状态'">
              <i
                :class="
                  item.value === '已就绪'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
                style="color: #67c23a"
              />
              <span> {{ item.value }} </span>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="update(item)" />
            </span>
          </el-col>
        </el-row>

        <foldable-block btn-tex="展开">
          <span style="font-size: 16px; font-weight: 500; margin-bottom: 14px">
            存储配置
          </span>
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
                  {{ item.value }}
                </span>
              </el-col>
            </el-row>
            <span
              style="font-size: 16px; font-weight: 500; margin-bottom: 14px"
            >
              集群资源
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
        </foldable-block>
      </section>

      <section class="component-div" style="margin: 34px 0">
        <span style="font-size: 16px; font-weight: 500; margin-bottom: 14px">
          备份记录
        </span>

        <el-row :gutter="24" style="margin: 0 20px">
          <el-table
            :data="table.tableData"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <el-table-column
              v-for="col in table.cols"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="true"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'result'">
                  <i
                    :class="
                      scope.row.result === '成功'
                        ? 'el-icon-success running'
                        : 'el-icon-warning stop'
                    "
                  />
                  <span> {{ scope.row[col.id] }} </span>
                </div>
                <div v-else-if="col.id === 'name'">
                  <span> {{ scope.row[col.id] }} </span>
                  <el-tooltip
                    effect="dark"
                    class="item"
                    placement="top"
                    :content="scope.row.name"
                  >
                    <i
                      class="el-icon-document-copy"
                      style="cursor: pointer"
                      @click="handleCopy(scope.row.name, $event)"
                    />
                  </el-tooltip>
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
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
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import clip from "@/utils/clipboard";

export default {
  name: "BaseInfo",
  components: { LineAlert, FoldableBlock, DeleteRemoveDialog },
  props: {},
  data() {
    return {
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

      baseInfoData: [
        {
          label: "类型",
          value: "ECTD 备份",
        },
        {
          label: "状态",
          value: "已就绪",
        },
      ],

      detailData: [
        {
          label: "备份节点",
          value: "25.2.20.156",
          // afterIcon: "el-icon-edit",
        },
        {
          label: "备份路径",
          value: "/cpaas-backup",
        },
        {
          label: "外部存储",
          value: "关闭",
        },
      ],

      detailResData: [
        {
          label: "备份方式",
          value: "定时触发",
        },
        {
          label: "备份规则",
          value: "0 0 1 * *",
        },
        {
          label: "备份保留时长",
          value: "90 天",
        },
      ],

      table: {
        tableData: [
          {
            name: "snapshot-etcd-2023-04-01-00-00.db",
            time: "2023-04-01 00:00:01 (UTC)",
            result: "成功",
          },
          {
            name: "snapshot-etcd-2023-04-01-00-00.db",
            time: "2023-04-01 00:00:01 (UTC)",
            result: "成功",
          },
          {
            name: "snapshot-etcd-2023-04-01-00-00.db",
            time: "2023-04-01 00:00:01 (UTC)",
            result: "成功",
          },
        ],
        cols: [
          { label: "备份文件名称", id: "name" },
          { label: "备份时间", id: "time" },
          { label: "备份结果", id: "result", width: 200 },
        ],
      },

      buttonText: "",
      titleContext: "",
      formVisible: false,
      width: "",
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
    handleAction(title) {
      this.buttonText = title;
      this.titleContext = `确定立即执行备份任务吗？`;
      this.formVisible = true;
      this.width = "35%";
    },

    handleDelete(title) {
      this.buttonText = title;
      this.titleContext = `确认删除备份策略 "${this.titleName}" 吗？`;
      this.formVisible = true;
      this.width = "45%";
    },

    handleUpdate() {
      this.$router.push({
        path: "/cluster-management/backup-manage/etcd",
        query: { type: "update", name: this.titleName },
      });
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleCopy(text, event) {
      clip(text, event);
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
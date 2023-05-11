<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ this.name }}</span>
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
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              <span> {{ item.value ? item.value : "-" }} </span>
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">基本信息</span>
      </div>
      <div class="text item event-container">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          empty-text="无通知发送人"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="tableExpand">
                <span style="margin-left: 60px">标签：</span>

                <el-tag
                  size="mini"
                  style="margin-bottom: 10px"
                  v-for="item in props.row.label"
                  :key="item.value"
                >
                  {{ `${item.key}:${item.value}` }}
                </el-tag>

                <span style="margin-left: 260px">注解：</span>
                <el-tag
                  size="mini"
                  style="margin-bottom: 10px"
                  v-for="item in props.row.note"
                  :key="item.value"
                >
                  {{ `${item.key}:${item.value}` }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
            :sortable="col.sortable"
            :width="col.width"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'title'">
                <div style="font-size: 16px">
                  {{ scope.row[col.id] }}
                </div>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-row :gutter="24">
      <el-col>
        <el-card style="margin: 16px 0">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px">策略配置</span>
          </div>
          <section class="component-div">
            <el-row :gutter="24">
              <el-col
                v-for="item in configData"
                :key="item.label"
                :span="24"
                class="label-value"
              >
                <span>{{ item.label }} </span>: &nbsp;&nbsp;
                <span>
                  <span> {{ item.value ? item.value : "-" }} </span>
                </span>
              </el-col>
            </el-row>
          </section>
        </el-card>
      </el-col>
    </el-row>

    <delete-remove-dialog
      :formVisible="formVisible"
      deleteOrRemove="确定"
      width="45%"
      :titleContext="`确定删除告警模板 &quot;${name}&quot; 吗？`"
      :nodeText="`删除后不可恢复`"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: { DeleteRemoveDialog },
  props: {},
  data() {
    return {
      tableData: {
        data: [
          {
            rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
            type: "指标告警",
            level: "严重",
            label: [
              { key: "a", value: "b" },
              { key: "c", value: "d" },
            ],
            note: [{ key: "e", value: "f" }],
          },
        ],
      },
      tableColumnList: [
        { label: "规则", id: "rule", width: "500px" },
        { label: "告警类型", id: "type" },
        { label: "等级", id: "level" },
      ],

      name: "",

      formVisible: false,

      baseInfoData: [
        {
          label: "创建时间",
          value: "2023-05-08 09:05:26",
          // afterIcon: "el-icon-edit",
        },
        {
          label: "资源类型",
          value: "集群",
        },
        {
          label: "更新时间",
          value: "2023-05-08 09:05:26",
        },
        {
          label: "描述",
          value: "",
        },
      ],

      configData: [
        {
          label: "通知策略",
          value: "",
        },
        {
          label: "告警发送间隔",
          value:
            "全局 (灾难告警 5分钟，严重告警 15分钟，警告告警 30分钟，提示告警 1小时)",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.name = this.$route.query.name;
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
        path: "/maintenance-center/alarm/alarmTemplate-create",
        query: { name: this.name },
      });
    },

    handleDelete() {
      this.formVisible = true;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

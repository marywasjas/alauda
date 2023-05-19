<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>订阅信息</span>
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
            <span>
              {{ item.value ? item.value : "-" }}
              <i
                :class="item.afterIcon"
                class="cursor-pointer margin-left10"
                @click="handleEdit(item)"
              />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>订阅状态</span>
            </div>
          </header>
          <section class="component-div">
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
        </BaseCard>
      </el-col>
    </el-row>

    <el-dialog
      :title="title"
      @close="editVisible = false"
      :visible.sync="editVisible"
      width="60%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        :rules="updateRules"
        label-width="135px"
      >
        <el-form-item label="名称">
          <span>{{ "postgres-operator" }}</span>
        </el-form-item>

        <el-form-item label="升级策略" v-if="title == '更新升级策略'">
          <el-radio-group v-model="updateForm.policy">
            <el-radio-button label="手动"></el-radio-button>
            <el-radio-button label="自动"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="升级频道" v-if="title == '更新升级频道'">
          <el-select
            v-model="updateForm.channel"
            @fucos="setMinWidthEmpty"
            style="width: 100%"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">更新</el-button>
        <el-button @click="editVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

import { tableData, tableColumnList } from "./constant/index";

export default {
  name: "BaseInfo",
  components: { LineAlert, FoldableBlock },
  props: {},
  data() {
    return {
      detailData: [
        {
          label: "subscription 名称",
          value: "postgres-operator",
        },
        {
          label: "集群",
          value: "global",
        },
        {
          label: "升级策略",
          value: "自动",
          afterIcon: "el-icon-edit",
        },
        {
          label: "命名空间",
          value: "所有命名空间",
        },
        {
          label: "频道",
          value: "stable",
          afterIcon: "el-icon-edit",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
      ],

      tableData,
      tableColumnList,

      editVisible: false,
      title: "",

      updateForm: {
        policy: "自动",
        channel: "stable",
      },

      updateRules: {},

      channelOptions: [
        { label: "stable", value: "stable" },
        { label: "stable1", value: "stable1" },
        { label: "stable2", value: "stable2" },
        ],
    };
  },
  computed: {},
  watch: {},
  created() {},
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

    handleEdit(obj) {
      console.log(obj.label);
      if (obj.label == "升级策略") {
        this.editVisible = true;
        this.title = `更新${obj.label}`;
      } else {
        this.editVisible = true;
        this.title = `更新升级${obj.label}`;
      }
    },

    handleUpdate() {},
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
    color: $color-primary;
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
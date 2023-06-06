<template>
  <div class="container margin-top">
    <el-tabs v-model="activeName">
      <el-tab-pane label="global" name="1" class="tabStyle">
        <div>
          <span>规则状态</span><i class="el-icon-remove" /> 已启用
          <el-button type="text">规则状态设置</el-button>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 400px">
状态为已启用时,黑白名单规则方可生效
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </div>

        <div>
          <el-button type="primary">添加白名单</el-button>
          <el-button type="primary">添加黑名单</el-button>
          <el-button disabled>批量删除</el-button>
        </div>

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
              <div v-if="col.id === 'gateway'">
                <span class="cursor-pointer" @click="handleDetail(scope.row)">{{
                  scope.row[col.id]
                }}</span>
              </div>

              <div v-else-if="col.id === 'status'">
                <i
                  :class="
                    scope.row.status === '运行中'
                      ? 'el-icon-success running'
                      : 'el-icon-warning stop'
                  "
                />
                {{ scope.row[col.id] + " (1/1)" }}
              </div>

              <div v-else>
                {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>





    <el-dialog
      @close="rulesVisible = false"
      :visible.sync="rulesVisible"
      width="60%"
      title="规则状态设置"
    >
          
  <el-radio v-model="radio" label="1">开启</el-radio>
  <el-radio v-model="radio" label="2">关闭</el-radio>


      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="handle_delete"
          :disabled="deleteDisable"
          >删除</el-button
        >
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: {},
  props: {},
  data() {
    return {
      activeName: "1",

      nameSearch: "",

      updateVisible: false,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      tableColumnList,
      tableData,
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

    handleSearch() {},

    handleDetail(obj) {
      this.$router.push({
        path: "/service-management/service-mesh/detailGateway",
        query: { name: obj.gateway },
      });
    },

    handleClick() {
      this.$router.push({
        path: "/service-management/service-mesh/createGateway",
      });
    },

    // 创建新网关
    openDialog() {
      this.$router.push({
        path: "/service-management/service-mesh/createGateway",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 15px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.container-wrapper {
  background: rgba(247, 249, 252);
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 12px;
  margin-bottom: 12px;
  .item-wrapper {
    margin: 10px 0;
    background: rgba(255, 255, 255);
    display: flex;
    padding: 16px;
  }
}
::v-deep .el-tabs__item {
  font-size: 18px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div {
  margin-top: 16px;
  margin-left: 136px;
  padding: 10px;
  background: rgba(247, 249, 252);
  .container-div {
    background: #fff;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.label-value {
  margin-bottom: 12px;
  margin-top: 12px;
  span {
    font-size: $font-size-14;
    font-weight: bold;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
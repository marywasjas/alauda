<template>
  <div class="container margin-top">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
      "
    >
      <div>
        <div style="font-size: 22px; line-height: 24px">
          {{ "cert-manager" }}
        </div>
        <div style="font-size: 12px; color: rgba(150, 152, 155)">
          {{ "部署" }}
        </div>
      </div>

      <div class="selectStyle">
        <!-- 时间范围： -->
        <el-select
          v-model="filterTime"
          @change="handleTimeChange"
          @focus="setMinWidthEmpty"
          style="width: 100%"
        >
          <span slot="prefix" class="selectStyle">时间范围: </span>
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData.data"
        style="width: 100%"
        header-row-class-name="headerStyle"
        class="margin-top"
        @sort-change="setSort"
        empty-text="无告警历史"
      >
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
            <div>
              <span> {{ scope.row[col.id] }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 15px; margin-left: 55%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="page.count"
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock },
  props: {},
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      sort: { key: "", value: "" },

      filterTime: "近 1 小时",
      timeOptions: [
        {
          value: "近 1 小时",
          label: "近 1 小时",
        },
        {
          value: "近 3 小时",
          label: "近 3 小时",
        },
        {
          value: "近 12 小时",
          label: "近 12 小时",
        },
        {
          value: "近 1 天",
          label: "近 1 天",
        },
        {
          value: "近 3 天",
          label: "近 3 天",
        },
        {
          value: "近 7 天",
          label: "近 7 天",
        },
      ],

      tableData,
      tableColumnList,
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
    // 搜索
    onSearch() {
      console.log("搜索");
    },

    handleTimeChange() {},

    handleSizeChange(val) {
      this.page.size = val;
      this.onSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.onSearch();
    },

    setSort(col) {
      this.sort.key = col.prop;
      this.sort.value = col.order == "ascending" ? "asc" : "desc";
      this.onSearch();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

::v-deep.selectStyle {
  .el-input--prefix .el-input__inner {
    padding-left: 70px;
  }
  .el-input__prefix {
    top: 11px;
  }
}
</style>
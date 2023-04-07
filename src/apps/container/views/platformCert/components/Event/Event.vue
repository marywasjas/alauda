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
      <div style="font-size: 22px; line-height: 24px; font-weight: bold">
        平台组件证书统计
      </div>
      <div>
        <el-select v-model="clusterValue" @change="handleClusterChange">
          <el-option
            v-for="item in clusterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          placeholder="按证书名称过滤"
          style="width: 50%; margin-left: 15px"
          v-model="searchName"
          @keyup.enter.native="onSerach"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
    </div>

    <foldable-block btn-tex="展开" style="margin-top: 30px">
      <div style="display: flex">
        <BaseCard style="width: 33%; height: 120px; margin-right: 50px" @click.native="onSearch()">
          <header>
            <div class="card-title left-header" style="cursor: 'pointer'">
              <i class="status-point" style="background-color: green"></i>
              <span style="margin-left: 10px">正常</span>
            </div>
          </header>
          <header style="margin-top: 20px">
            <div class="card-title left-header">
              <span style="margin-left: 20px; font-size: 30px">105</span>
            </div>
          </header>
        </BaseCard>
        <BaseCard style="width: 33%; height: 120px; margin-right: 50px">
          <header>
            <div class="card-title left-header">
              <i class="status-point" style="background-color: orange"></i>
              <span style="margin-left: 10px">即将到期</span>
            </div>
          </header>
          <header style="margin-top: 20px">
            <div class="card-title left-header">
              <span style="margin-left: 20px; font-size: 30px">0</span>
            </div>
          </header>
        </BaseCard>
        <BaseCard style="width: 33%; height: 120px">
          <header>
            <div class="card-title left-header">
              <i class="status-point" style="background-color: red"></i>
              <span style="margin-left: 10px">已到期</span>
            </div>
          </header>
          <header style="margin-top: 20px">
            <div class="card-title left-header">
              <span style="margin-left: 20px; font-size: 30px">0</span>
            </div>
          </header></BaseCard
        >
      </div>
    </foldable-block>

    <div>
      <el-table
        :data="tableData.data"
        style="width: 100%"
        header-row-class-name="headerStyle"
        class="margin-top"
        @sort-change="setSort"
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
            <div v-if="col.id === 'status'">
              <i
                :class="
                  scope.row.status === '正常'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              <span> {{ scope.row[col.id] }} </span>
            </div>
            <div v-else>
              <span> {{ scope.row[col.id] }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 15px; margin-left: 700px">
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
      clusterOptions: [
        { value: "all", label: "全部集群" },
        { value: "region", label: "region (region)" },
        { value: "global", label: "global (global)" },
      ],
      clusterValue: "all",
      searchName: "",

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
    // 搜索
    onSearch() {
      console.log("搜索");
    },

    handleClusterChange() {
      console.log("搜索");
    },

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
</style>
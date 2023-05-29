<template>
  <div class="container margin-top">
    <el-form :model="tabForm" label-width="75px">
      <el-row>
        <!-- 统计项 -->
        <el-col :span="6">
          <el-form-item label="操作人">
            <el-select
              v-model="tabForm.operator"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
              <el-option
                v-for="con in operatorOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 统计粒度 -->
        <el-col :span="6">
          <el-form-item label="操作">
            <el-select
              v-model="tabForm.operation"
              @focus="setMinWidthEmpty"
              @change="handleChangeTitle"
              style="width: 100%"
            >
              <el-option
                v-for="con in granularityOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 时间范围 -->
        <el-col :span="4">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="tabForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM"
              value-format="yyyyMM"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="">
            <el-select
              multiple
              clearable
              placeholder="可输可选，按回车确定，可添加多个"
              v-model="tabForm.projectSelected"
              @focus="setMinWidthEmpty"
              style="width: 100%"
            >
              <el-option
                v-for="con in namespaceOptions"
                :key="con.value"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item
            style="margin-bottom: 10px; margin-left: 10px"
            label-width="0px"
          >
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>

            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                未配置存储，无法导出<br />
                <el-link>
                  <i
                    class="el-icon-link el-icon-left question-icon"
                    style="color:#409EFF; margin-left10; margin-top:-15px;font-size:10px"
                  >
                    如何配置存储？
                  </i>
                </el-link>
              </div>
              <span style="margin-left: 10px">
                <el-button disabled type="primary">导出结果</el-button>
              </span>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

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

      tabForm: {
        operator: "all",
        operation:"all"
      },

      operatorOptions: [
        { value: "all", label: "全部" },
        { value: "admin", label: "admin" },
      ],

      operationOptions:[
        {value:"all",label:"全部"},
        {value:"绑定",label:"绑定"},
        {value:"清理",label:"绑定"},
        {value:"创建",label:"绑定"},
        {value:"删除",label:"绑定"},
        {value:"删除资源集",label:"绑定"},
        {value:"下载",label:"绑定"},
        {value:"导出",label:"绑定"},
        {value:"导出chart包",label:"绑定"},
        {value:"联邦化",label:"绑定"},
        {value:"导入",label:"绑定"},
        {value:"集成",label:"绑定"},
        {value:"登录",label:"绑定"},
        {value:"登陆失败",label:"绑定"},
        {value:"退出登录",label:"绑定"},
        {value:"退出登录",label:"绑定"},
      ],

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
  padding: 20px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
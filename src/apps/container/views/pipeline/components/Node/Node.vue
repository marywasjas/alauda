<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div class="flex-center" style="float: left; margin-bottom: 13px">
          <el-button @click="importMember" type="primary"> 导入成员 </el-button>
        </div>

        <div class="flex-center" style="float: right">
          <el-input
            style="width: 330px; margin-left: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
          >
            <el-select
              slot="prepend"
              v-model="searchValue"
              style="width: 110px"
              @change="handleSearchChange"
            >
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </div>

        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
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
                <div v-if="col.id === 'name'">
                  <div style="font-size: 16px; font-weight: bold">
                    {{ scope.row[col.id] }}
                  </div>

                  <div style="font-size: 12px; color: gray">
                    {{ scope.row.desc }}
                  </div>
                </div>

                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>

    <el-dialog
      @close="importMemVisible = false"
      :visible.sync="importMemVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 20px; line-height: 20px">
          导入成员
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                当前登陆账号、系统账号、已导入的成员不在当前列表展示
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </span>

        <div style="display: flex">
          <el-select
            v-model="statusValue"
            @change="handleStatusChange"
            size="small"
            style="width: 200px; margin-left: 40%"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-input
            style="width: 200px; margin-left: 20px"
            suffix-icon="el-icon-search"
            clearable
            placeholder="按用户名搜索"
            v-model="typeValue"
            @keyup.enter.native="getList"
            size="small"
          >
          </el-input>
        </div>
      </div>

      <el-table
        :data="tableData2.data"
        style="width: 100%"
        header-row-class-name="headerStyle"
        class="margin-top"
        @selection-change="cacheSelected"
        height="400"
      >
        <el-table-column width="50" type="selection" />
        <el-table-column
          v-for="col in tableColumnList2"
          :key="col.id"
          :label="col.label"
          :show-overflow-tooltip="col['show-overflow-tooltip']"
          :sortable="col.sortable"
          :width="col.width"
          :fixed="col.fixed"
        >
          <template slot-scope="scope">
            <div v-if="col.id === 'name'" class="name-cell">
              <div>
                <span
                  @click="handleRoleDetail(scope.row)"
                  style="font-size: 16px"
                >
                  {{ scope.row[col.id] }}
                </span>
                <div>{{ scope.row.desc }}</div>
              </div>
            </div>
            <div v-else>
              <span> {{ scope.row[col.id] }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex; margin-top: 30px">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-position="left"
          inline
        >
          <el-form-item label="设置角色">
            <el-select
              v-model="ruleForm.setRole"
              @change="handleStatusChange"
              size="small"
              style="width: 100%; margin-right: 20px"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAllMember">
          导入全部
        </el-button>
        <el-button
          type="primary"
          @click="handleSelectedMember"
          :disabled="batchVisible"
        >
          {{ `导入(${selectedDevice.length})` }}
        </el-button>
        <el-button @click="importMemVisible = false">取消</el-button>
      </div>
    </el-dialog>

    
  </div>
</template>

<script>
import {
  tableData,
  tableColumnList,
  tableData2,
  tableColumnList2,
  tableData3,
  tableColumnList3,
} from "./constant";
// import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
// import ProgressCard from "./ProgressCard.vue";

import { nanoid } from "nanoid";

export default {
  name: "Node",
  // components: { FoldableBlock, ProgressCard },

  props: {},
  data() {
    return {
      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
      searchValue: "userName",

      batchVisible: false,
      selectedDevice: [],
      importMemVisible: false,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      tableData,
      tableColumnList,
      tableData2,
      tableColumnList2,
      tableData3,
      tableColumnList3,

      statusOptions: [
        { value: "all", label: "全部" },
        { value: "normal", label: "未分组" },
      ],
      statusValue: "all",
      ruleForm: {
        setRole: "",
        space: "",
      },
      rules: {},
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

    handelDetails(obj) {
      this.$router.push({
        name: "ClusterNodeDetail",
        query: { name: obj.name },
      });
    },
    // 搜索
    onSearch() {
      console.log("搜索");
    },

    importMember() {
      this.importMemVisible = true;
    },
    handleAllMember() {
      this.allMemberVisible = true;
    },
    handleImport() {},
    handleSelectedMember() {},

    cacheSelected(selected) {
      console.log("多选框被选中对象组成的数组", selected);
      this.selectedDevice = selected;
      this.batchVisible = true;
      if (this.selectedDevice.length > 0) this.batchVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
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
</style>
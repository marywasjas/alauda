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
        <el-button type="primary" @click="importMember">导入成员</el-button>
      </div>
      <div>
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
    </div>

    <div>
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
            <div v-if="col.id === 'name'" class="name-cell">
              <div>
                <span
                  @click="handleRoleDetail(scope.row)"
                  style="font-size: 18px"
                >
                  {{ scope.row[col.id] }}
                </span>
                <br />
                <span>{{ scope.row.desc }}</span>
              </div>
            </div>
            <div v-else-if="col.id === 'remove'">
              <el-button type="text" @click="handleRemove(scope.row)">
                移除
              </el-button>
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

    <el-dialog
      @close="removeDisable = false"
      :visible.sync="removeDisable"
      width="40%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ "确定" + "移除" + '角色成员 "' + this.roleName + '" 吗？' }}
        </span>
        <br />
        <span style="text-align: center; display: block">
          移除后，将失去该角色对应的权限
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_remove">移除</el-button>
        <el-button @click="removeDisable = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="importMemVisible = false"
      :visible.sync="importMemVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 20px; line-height: 24px">
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
      </div>

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
                <br />
                <span>{{ scope.row.desc }}</span>
              </div>
            </div>
            <div v-else>
              <span> {{ scope.row[col.id] }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>

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

    <el-dialog
      @close="allMemberVisible = false"
      :visible.sync="allMemberVisible"
      width="40%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定导入当前查询条件下的全部成员吗？` }}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="handleImport">导入</el-button>
        <el-button @click="allMemberVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  tableColumnList,
  tableData,
  tableColumnList2,
  tableData2,
} from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock },
  props: {},
  data() {
    return {
      roleName: "",
      page: {
        count: 1,
        current: 1,
        size: 20,
      },

      batchVisible: true,
      selectedDevice: [],

      searchOptions: [
        { label: "显示名称", value: "showName" },
        { label: "用户名", value: "userName" },
        { label: "用户组", value: "userGroup" },
      ],
      searchValue: "userName",
      typeValue: "",

      statusOptions: [
        { value: "all", label: "全部" },
        { value: "devGroup", label: "未分组" },
      ],
      statusValue: "all",

      tableData,
      tableColumnList,
      tableColumnList2,
      tableData2,

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      importMemVisible: false,
      removeDisable: false,
      allMemberVisible: false,
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

    getList() {},
    handleStatusChange() {},
    handleSearchChange(e) {},

    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },

    importMember() {
      this.importMemVisible = true;
    },

    handleRemove(obj) {
      this.removeDisable = true;
      this.roleName = obj.name;
    },

    handle_remove() {},

    cacheSelected(selected) {
      console.log("多选框被选中对象组成的数组", selected);
      this.selectedDevice = selected;
      this.batchVisible = true;
      if (this.selectedDevice.length > 0) this.batchVisible = false;
    },

    handleSet() {},
    handleAllMember() {
      this.allMemberVisible = true;
    },
    handleImport() {},
    handleSelectedMember() {},
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
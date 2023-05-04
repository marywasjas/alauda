<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">
            创建通知对象
          </el-button>
        </span>

        <div class="flex-center">
          <el-select
            v-model="searchType"
            @focus="setMinWidthEmpty"
            width="100%"
            size="small"
            class="margin-right10"
          >
            <el-option label="对象名称" value="name"> </el-option>
            <el-option label="显示名称" value="showName"> </el-option>
          </el-select>

          <el-input
            size="small"
            class="margin-right10"
            v-model="searchValue"
            @keyup.enter.native="handleSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
          </el-input>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无通知对象"
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
                <div style="font-size: 16px">
                  {{ scope.row[col.id] }}
                </div>

                <div style="font-size: 12px; color: gray">
                  {{ scope.row.showName }}
                </div>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(scope.row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      :title="title"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
      width="60%"
    >
      <el-form
        v-if="title == '更新通知对象'"
        ref="updateForm"
        :model="updateForm"
      >
        <el-form-item style="margin-bottom: 0">
          <table border="0" style="width: 100%">
            <thead>
              <tr class="headerStyle">
                <th>
                  <div class="cell">类型</div>
                </th>
                <th>
                  <div class="cell">显示名称</div>
                </th>
                <th>
                  <div class="cell">对象名称</div>
                </th>
                <!-- <th>
                  <div class="cell">操作</div>
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(domain, index) in updateForm.labels" :key="domain.id">
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.type'"
                    :rules="{
                      required: true,
                      message: '类型不能为空',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      v-model="domain.type"
                      @focus="setMinWidthEmpty"
                      width="100%"
                    >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.showName'"
                    :rules="{
                      required: true,
                      message: '显示名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.showName" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.name'"
                    :rules="{
                      required: true,
                      message: '对象名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.name" />
                  </el-form-item>
                </td>
                <!-- <td class="text-center">
                  <el-button
                    icon="el-icon-remove-outline"
                    class="cursor-pointer margin-left10 margin-right10"
                    type="text"
                    @click="handleDelete('labels', domain, index)"
                  />
                </td> -->
              </tr>
              <!-- <tr>
                <td colspan="5">
                  <div
                    class="cursor-pointer text-center hover-div"
                    @click="handleAdd('labels')"
                  >
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </td>
              </tr> -->
            </tbody>
          </table>
        </el-form-item>
      </el-form>

      <el-form v-else ref="addForm" :model="addForm">
        <el-form-item style="margin-bottom: 0">
          <table border="0" style="width: 100%">
            <thead>
              <tr class="headerStyle">
                <th>
                  <div class="cell">类型</div>
                </th>
                <th>
                  <div class="cell">显示名称</div>
                </th>
                <th>
                  <div class="cell">对象名称</div>
                </th>
                <th>
                  <div class="cell">操作</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(domain, index) in addForm.labels" :key="domain.id">
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.type'"
                    :rules="{
                      required: true,
                      message: '类型不能为空',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      v-model="domain.type"
                      @focus="setMinWidthEmpty"
                      width="100%"
                    >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.showName'"
                    :rules="{
                      required: true,
                      message: '显示名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.showName" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'labels.' + index + '.name'"
                    :rules="{
                      required: true,
                      message: '对象名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.name" />
                  </el-form-item>
                </td>
                <td class="text-center">
                  <el-button
                    icon="el-icon-remove-outline"
                    class="cursor-pointer margin-left10 margin-right10"
                    type="text"
                    @click="handleDeleteItem('labels', domain, index)"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div
                    class="cursor-pointer text-center hover-div"
                    @click="handleAdd('labels')"
                  >
                    <i class="el-icon-circle-plus-outline" />
                    添加通知对象
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" v-if="title == '更新通知对象'">
        <el-button type="primary" @click="handle_update">更新</el-button>
        <el-button @click="cancelUpdate">取消</el-button>
      </div>

      <div slot="footer" class="dialog-footer" v-else>
        <el-button type="primary" @click="handle_add">添加</el-button>
        <el-button @click="cancelAdd">取消</el-button>
      </div>
    </el-dialog>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      :width="width"
      :nodeText="nodeText"
      :titleContext="titleContext"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "ClusterList",
  components: { DeleteRemoveDialog },
  data() {
    return {
      title: "",
      searchValue: "",
      searchType: "name",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableData,
      tableColumnList,

      updateVisible: false,
      updateForm: {
        labels: [],
      },

      addForm: {
        labels: [],
      },

      typeOptions: [
        { label: "邮箱", value: "邮箱" },
        { label: "短信", value: "短信" },
        { label: "webhook", value: "webhook" },
        { label: "钉钉", value: "钉钉" },
        { label: "企业微信", value: "企业微信" },
      ],

      titleContext: "",
      buttonText: "",
      formVisible: false,
      width: "",
      dialogCreateVisible: false,
      nodeText: "",
    };
  },

  created() {},

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

    handelCreate() {
      this.title = "添加通知对象";
      this.updateVisible = true;
      this.addForm.labels = [
        {
          id: nanoid(),
          type: "",
          name: "",
          showName: "",
        },
      ];
    },

    handleUpdate(obj) {
      this.title = "更新通知对象";
      this.updateVisible = true;
      this.updateForm.labels.push({ ...obj, id: nanoid() });
    },

    handle_update() {},
    cancelUpdate() {
      this.updateVisible = false;
      this.updateForm.labels = [];
    },

    handleDelete(obj) {
      this.buttonText = "确定";
      this.titleContext = `确定删除该通知对象吗？`;
      this.formVisible = true;
      this.width = "35%";
      this.nodeText = `${obj.name} (${obj.showName})`;
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handle_add() {},
    cancelAdd() {
      this.updateVisible = false;
      this.addForm.labels = [
        {
          id: nanoid(),
          type: "",
          name: "",
          showName: "",
        },
      ];
    },

    // 添加
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        type: "",
        name: "",
        showName: "",
      };
      this.addForm[filed].push(obj);
    },
    // 删除
    handleDeleteItem(filed, item, index) {
      this.addForm[filed].splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-content {
    margin: 15px 20px 0px 0px;
    .filter-row {
      display: flex;
      .filter-item {
        flex: 1;
        margin-bottom: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
// ::v-deep .el-table td.el-table__cell {
//   border-bottom: 0px solid #dfe6ec;
// }
::v-deep .el-table--border .el-table__cell {
  border-right: 0px solid #dfe6ec;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px solid #dfe6ec;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #fff !important;
}
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 65px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
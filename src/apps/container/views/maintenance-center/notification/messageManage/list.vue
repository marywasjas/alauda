<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handleCreate"> 创建消息 </el-button>
        </span>

        <div class="flex-center selectStyle">
          <el-select
            v-model="searchType"
            @focus="setMinWidthEmpty"
            width="100%"
            size="small"
            class="margin-right10"
          >
            <span slot="prefix" class="selectedStyle">消息类型： </span>
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="searchTime"
            @focus="setMinWidthEmpty"
            width="100%"
            size="small"
            class="margin-right10"
          >
            <span slot="prefix" class="">时间范围： </span>
            <el-option
              v-for="item in timeOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无通知发送人"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="tableExpand">
                {{ props.row.content ? props.row.content : "-" }}
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
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="`过期时间：${scope.row.overdue}`"
                    placement="top-start"
                  >
                    <el-tag v-if="scope.row.resident == true" effect="plain">
                      常驻
                    </el-tag>
                  </el-tooltip>
                </div>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleCancel(scope.row)"
                      v-if="scope.row.resident == true"
                    >
                      取消推送
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
        <div style="margin-top: 15px; margin-left: 55%">
          <el-pagination
            :current-page="page.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <DeleteRemoveDialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      :width="width"
      :nodeText="nodeText"
      :titleContext="titleContext"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />

    <el-dialog
      title="创建消息"
      @close="cancelDialog"
      :visible.sync="msgVisible"
      width="70%"
    >
      <el-form
        ref="createForm"
        :model="createForm"
        :rules="createRules"
        label-width="135px"
      >
        <el-form-item label="消息类型" prop="msgType">
          <el-radio-group v-model="createForm.msgType">
            <el-radio label="abnormal" value="">异常消息</el-radio>
            <el-radio label="system" value="">系统消息</el-radio>
            <el-radio label="product" value="">产品消息</el-radio>
            <el-radio label="notice" value="">平台公告</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="常驻" prop="resident">
          <el-radio-group v-model="createForm.resident">
            <el-radio :label="true" value="">是</el-radio>
            <el-radio :label="false" value="">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            选择"是"，消息将在用户浏览器页面常驻显示；选择"否"，则为推送消息，页面显示
            5 秒后自动小时。
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="常驻过期时间" prop="overdue">
          <el-date-picker
            v-model="createForm.overdue"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            已过期的常驻消息不在用户浏览器页面显示
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="标题" prop="title">
          <el-input v-model="createForm.title" placeholder="最多 38 个字符" />
        </el-form-item>

        <el-form-item label="内容">
          <el-input
            v-model="createForm.content"
            placeholder="最多 100 个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">创建并发送</el-button>
        <el-button @click="msgVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
      searchTime: "all",
      searchType: "all",

      page: {
        total: 10,
        current: 1,
        pageSize: 10,
      },

      rowCenter: {
        "max-width": "550px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableData,
      tableColumnList,

      typeOptions: [
        { label: "全部", id: "all" },
        { label: "异常消息", id: "abnormal" },
        { label: "系统消息", id: "system" },
        { label: "产品消息", id: "product" },
        { label: "平台公告", id: "notice" },
      ],

      timeOptions: [
        { label: "全部", id: "all" },
        { label: "近 10 分钟", id: "近 10 分钟" },
        { label: "近 30 分钟", id: "近 30 分钟" },
        { label: "近 1 小时", id: "近 1 小时" },
        { label: "近 6 小时", id: "近 6 小时" },
        { label: "近 12 小时", id: "近 12 小时" },
        { label: "近 1 天", id: "近 1 天" },
        { label: "近 3 天", id: "近 3 天" },
        { label: "近 7 天", id: "近 7 天" },
      ],

      titleContext: "",
      buttonText: "",
      formVisible: false,
      width: "",
      nodeText: "",

      msgVisible: false,

      createForm: {
        msgType: "notice",
        resident: true,
        overdue: "",
        title: "",
        content: "",
      },
      createRules: {
        msgType: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        resident: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        title: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
      },
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

    handleCreate() {
      this.msgVisible = true;
    },
    cancelDialog() {
      this.createForm = this.$options.data().createForm;
      this.$refs["createForm"].resetFields();
      this.msgVisible = false;
    },

    handleSubmit() {},

    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.current = val;
    },

    handleCancel(obj) {
      this.buttonText = "确定";
      this.titleContext = `确定取消推送吗？`;
      this.formVisible = true;
      this.width = "35%";
      this.nodeText = `取消后，该消息不会在用户浏览器页面显示。`;
    },

    handleDelete(obj) {
      this.buttonText = "删除";
      this.titleContext = `确定删除该消息吗？`;
      this.formVisible = true;
      this.width = "35%";
      this.nodeText = `删除后，无法恢复。`;
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
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
.el-tag {
  border-radius: 13px;
  // border: transparent;
}

::v-deep.selectStyle {
  .el-input--prefix .el-input__inner {
    padding-left: 65px;
  }
  .el-input__prefix {
    top: 10px;
  }
}

.tableExpand {
  margin-left: 20px;
  padding: 16px;
  background: rgba(247, 249, 252);
}
</style>
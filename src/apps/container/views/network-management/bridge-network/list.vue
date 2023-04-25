<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">
            添加桥接网络
          </el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称过滤"
            size="small"
            class="margin-right10"
            v-model="searchValue"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
          </el-input>
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="handleRefresh"
          />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无桥接网络"
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
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handelDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
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
      title="添加桥接网络"
      @close="createVisible = false"
      :visible.sync="createVisible"
      width="60%"
    >
      <el-form
        ref="createForm"
        :model="createForm"
        :rules="createRules"
        label-width="135px"
      >
        <el-form-item label="名称">
          <el-input v-model="createForm.name" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="默认网卡名称">
          <el-input v-model="createForm.showName" style="width: 80%">
          </el-input>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            默认情况下，容器网络会使用次节点网络，来和物理网络互通
          </el-descriptions-item>
        </el-descriptions>

        <el-row type="flex">
          <el-col :span="22">
            <el-form-item label="按节点配置网卡" style="margin-bottom: 10px">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <!-- 1 -->
                  <div>
                    <span style="margin-left: 10px">IP 形式</span>
                    <span style="margin-left: 200px">IP 地址</span>
                  </div>
                  <!-- 2 -->
                  <div class="grid-content bg-purple">
                    <div v-if="createForm.configurationItems.length > 0">
                      <div
                        v-for="(domain, index) in createForm.configurationItems"
                        :key="domain.id"
                        class="margin-bottom10 item-div"
                      >
                        <el-row>
                          <el-col :span="9">
                            <el-form-item>
                              <el-select
                                v-model="domain.selected"
                                @focus="setMinWidthEmpty"
                                style="width: 100%"
                              >
                                <el-option label="IP" value="IP" />
                                <el-option label="IP 段" value="IP 段" />
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col
                            :span="14"
                            style="padding-left: 10px"
                            v-if="domain.selected == 'IP'"
                          >
                            <el-form-item>
                              <el-input
                                v-model="domain.input"
                                placeholder="输入 IP"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col v-else :span="14" style="padding-left: 10px">
                            <el-form-item>
                              <el-input
                                v-model="domain.input1"
                                style="width: 47%"
                              />
                              ~
                              <el-input
                                v-model="domain.input2"
                                placeholder="输入 IP"
                                style="width: 47%"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col :span="1" style="padding-left: 10px">
                            <div>
                              <i
                                class="el-icon-remove-outline cursor-pointer"
                                @click="
                                  handleDelete(
                                    'configurationItems',
                                    domain,
                                    index
                                  )
                                "
                              />
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div v-else>
                      <p style="text-align: center">无节点配置网卡</p>
                    </div>
                    <div class="flex-center">
                      <div
                        class="cursor-pointer text-center hover-div"
                        style="flex: 1"
                        @click="handleAdd('configurationItems')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 450px">
                  针对特定节点指定需要使用的网卡
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </el-col>
        </el-row>

        <el-form-item label="排除节点">
          <el-select
            v-model="createForm.specifiedProject"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in clusterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 无需物理网络支持节点 </el-descriptions-item>
        </el-descriptions>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_create">创建</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "ClusterList",
  components: {},
  data() {
    return {
      searchValue: "",
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
      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],
      createVisible: false,
      createForm: {
        name: "",
        showName: "",
        specifiedProject: "",
        configurationItems: [],
      },
      createRules: {},
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
    handleRefresh() {},

    handelCreate() {
      this.createForm = this.$options.data().createForm;
      this.createVisible = true;
    },
    handle_create() {},

    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        selected: "IP",
        input: "",
        input1: "",
        input2: "",
      };
      this.createForm[filed].push(obj);
    },
    // 删除
    handleDelete(filed, item, index) {
      this.createForm[filed].splice(index, 1);
    },

    handelDetail(obj) {},
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
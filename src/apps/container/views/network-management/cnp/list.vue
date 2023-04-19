<template>
  <div class="oam-container">
    <div class="oam-main" style="height: calc(100vh - 124px)">
      <div style="display: flex; flex-direction: column; align-items: center">
        <h3>未配置集群网络策略</h3>

        <p
          style="
            color: rgba(150, 152, 155);
            font-size: 14px;
            width: 560px;
            height: 60px;
          "
        >
          网络策略 (Network Policy) 是关于如何允许 Pod
          组间、及与其他网络端点间，进行网络通信的规范。可对当前集群进行网络策略配置。若需启用请点击下方按钮
        </p>

        <el-button type="primary" style="margin-top: 12px" @click="config"
          >立即配置</el-button
        >
      </div>
      <!-- <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">添加 VLAN</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称过滤"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
        </div>
      </div> -->

      <!-- <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无 VLAN"
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
                <span @click="handelDetails(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
    </div>

    <!-- <el-dialog
      title="添加 VLAN"
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

        <el-form-item label="VLAN id">
          <el-input v-model="createForm.showName" style="width: 80%">
          </el-input>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            要加入的物理网络 VLAN ID,不需 VLAN 直接输入 0
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="桥接网络">
          <el-select
            v-model="createForm.specifiedProject"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_create">添加</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import { tableData, tableColumnList } from "./constant";
import { nanoid } from "nanoid";

export default {
  name: "ClusterList",
  components: { LineAlert },
  data() {
    return {
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
      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],
      createVisible: false,
      createForm: {
        name: "",
        showName: 0,
        specifiedProject: "",
      },
      createRules: {},
    };
  },

  created() {
    // 获取列表数据
    // this.getList();
  },

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
      console.log(this.formInline);
    },

    handelCreate() {
      this.createVisible = true;
    },
    handle_create() {},

    config() {
      this.$router.push({
        path: "/network-management/cnp/create",
      });
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
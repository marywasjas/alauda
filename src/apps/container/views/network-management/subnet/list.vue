<template>
  <div class="oam-container">
    <line-alert
      content="Kube-OVN 网络模式下，可按需设置子网的传输方式为 Overlay 或 Underlay"
    />

    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary" @click="handelCreate">创建子网</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无证书"
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
                <span @click="handleDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'total'">
                <!-- <p class="margin0"> -->
                <i class="el-icon-cpu primary2-text" />
                {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                <!-- </p>
                <p class="margin0"> -->
                <i class="el-icon-bank-card primary-text" />
                {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                <!-- </p> -->
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleDelete"
                      :disabled="true"
                    >
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
      title="创建子网"
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
          <el-input
            v-model="createForm.name"
            style="width: 80%"
            placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
          ></el-input>
        </el-form-item>

        <el-form-item label="网段">
          <el-input
            v-model="createForm.netSegment"
            style="width: 80%"
            placeholder='输入 cidr 格式字段，例"192.168.0.0/16"'
          >
          </el-input>
        </el-form-item>

        <el-form-item label="传输方式">
          <el-radio-group v-model="createForm.transMethod">
            <el-radio-button label="Overlay"></el-radio-button>
            <el-radio-button label="Underlay"></el-radio-button>
          </el-radio-group>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                Underlay
                传输方式下容器网络需要依赖物理网络支持，请和网络管理员共同规划
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="网关" v-if="createForm.transMethod == 'Underlay'">
          <el-input v-model="createForm.gateway"></el-input>
        </el-form-item>
        <el-descriptions
          size="small"
          :colon="false"
          :contentStyle="rowCenter"
          v-if="createForm.transMethod == 'Underlay'"
        >
          <el-descriptions-item>
            要加入网络的物理网关 IP 地址
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="VLAN" v-if="createForm.transMethod == 'Underlay'">
          <el-select
            v-model="createForm.vlan"
            @focus="setMinWidthEmpty"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-descriptions
          size="small"
          :colon="false"
          :contentStyle="rowCenter"
          v-if="createForm.transMethod == 'Underlay'"
        >
          <el-descriptions-item>
            要加入的物理网络 VLAN 名称
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="保留 IP" style="margin-bottom: 10px">
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
                            placeholder="输入 IP"
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
                              handleDelete('configurationItems', domain, index)
                            "
                          />
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div v-else>
                  <p style="text-align: center">无保留 IP</p>
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
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                需作为固定 IP 分配的 IP，建议设置保留 IP
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item
          label="网关类型"
          v-if="createForm.transMethod == 'Overlay'"
        >
          <el-radio-group v-model="createForm.netSegmentType">
            <el-radio-button label="分布式"></el-radio-button>
            <el-radio-button label="集中式"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="网关节点"
          v-if="
            createForm.netSegmentType == '集中式' &&
            createForm.transMethod == 'Overlay'
          "
        >
          <el-select
            v-model="createForm.netSegmentNode"
            @focus="setMinWidthEmpty"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="子网隔离"
          v-if="createForm.transMethod == 'Overlay'"
        >
          <el-switch v-model="createForm.subnetIsolation"></el-switch>
        </el-form-item>

        <el-form-item
          label="白名单"
          v-if="
            createForm.subnetIsolation == true &&
            createForm.transMethod == 'Overlay'
          "
        >
          <el-input v-model="createForm.whiteList"></el-input>
        </el-form-item>

        <el-form-item
          label="外出流量 NAT"
          v-if="createForm.transMethod == 'Overlay'"
        >
          <el-switch v-model="createForm.nat"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_create">创建</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
        netSegment: "",
        transMethod: "Overlay",
        gateway: "",
        vlan: "",
        configurationItems: [],
        netSegmentType: "分布式",
        netSegmentNode: "",
        subnetIsolation: false,
        whiteList: "",
        nat: false,
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

    handleDetail(row) {
      this.$router.push({
        path: "/network-management/subnet/detail",
        query: { name: row.name },
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
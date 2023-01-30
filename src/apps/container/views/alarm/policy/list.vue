<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header" style="width: 250px">
        <el-input
          v-model="name"
          placeholder="按名称搜索"
          @keyup.native="onSearch"
        >
          <el-button slot="append" icon="el-icon-search" @click="onSearch" />
        </el-input>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <!-- 2.1 表格 -->
        <el-table
          :data="alarmList.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无告警策略"
        >
          <!-- 2.1.1 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex" v-for="col in props.row.item" :key="col.id">
                <el-col :span="24">
                  <el-table
                    :data="[props.row.item.col]"
                    :show-header="false"
                    border
                    style="margin-bottom: 10px"
                  >
                    <el-table-column type="expand" style="background: #f0f8ff">
                      <el-row type="flex" style="background: #f0f8ff">
                        <el-col
                          :span="24"
                          style="margin: 40px 50px; margin-right: 55px"
                        >
                          <el-table :data="expandList.data">
                            <el-table-column
                              prop="monitorItem"
                              label="监控子项"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="alarmPolicy"
                              label="告警策略"
                            >
                            </el-table-column>
                            <el-table-column prop="des" label="说明">
                            </el-table-column>
                            <el-table-column prop="level" label="等级">
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </el-table-column>

                    <el-table-column :label="col.text">
                      <span>{{ col.text }} </span>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <!-- 2.1.2 -->
          <el-table-column
            v-for="col in alarmColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'component'">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'appname'">
                {{ scope.row[col.id] }}
              </div>
              <div v-else>
                <el-tag
                  v-for="tag in scope.row.item"
                  :key="tag.id"
                  effect="plain"
                  color="	#F0F8FF"
                  size="small"
                  style="
                    cursor: pointer;
                    border-radius: 10px;
                    border: transparent;
                    margin-right: 5px;
                  "
                >
                  {{ tag.text }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 2.2 分页器 -->
        <el-pagination
          style="margin-top: 10px; margin-left: 600px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next, sizes, jumper"
          :total="2"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { alarmColumnList, alarmList } from "../const";
// import axios from "axios";
import {
  getAlarmList,
  getExpandList,
} from "../../../../../../mock/alarm/axiosApi";
import SetSilenceDialog from "./components/SetSilenceDialog.vue";

export default {
  name: "AlarmList",
  components: { SetSilenceDialog },
  data() {
    return {
      //  input 的 v-model
      name: "",
      // column
      alarmColumnList: [
        {
          id: "component",
          label: "计算组件",
        },
        {
          id: "appname",
          label: "应用名称",
        },
        {
          id: "item",
          label: "监控项",
        },
      ],
      // table.data
      alarmList: { data: [] },
      // table.data的展开行
      expandList: { data: [] },
    };
  },

  created() {
    // 获取列表数据
    this.getList();
  },

  methods: {
    // 获取列表
    getList() {
      getAlarmList().then((res) => {
        console.log(res);
        this.alarmList.data = res.data.data;
      });
      getExpandList().then((res) => {
        this.expandList.data = res.data.data;
      });
    },

    // 搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
      console.log("搜索");
    },

    onSearch() {
      alert("搜索");
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
    // justify-content: space-between;
    justify-content: flex-end;
    margin-left: auto;
    // align-items: center;
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
</style>

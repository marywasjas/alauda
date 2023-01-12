<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 -->
      <div class="card__header" style="width: 250px">
        <el-input
          v-model="name"
          placeholder="按名称搜索"
          @keyup.native="onSearch"
        >
          <el-button slot="append" icon="el-icon-search" @click="onSearch" />
        </el-input>
      </div>

      <!-- 2 -->
      <div class="card__content">
        <el-table
          :data="alarmList.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无告警策略"
        >
          <!-- 2.1 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex" class="row-bg">
                <el-col :span="24" style="margin: 0 10px">
                  <el-table :data="props.row.item" :show-header="false">
                    <el-table-column type="expand">O(∩_∩)O</el-table-column>
                    <el-table-column
                      v-for="col in props.row.item"
                      :key="col.id"
                      :label="col.text"
                      :prop="col.text"
                    >
                      <!-- <template slot-scope="scope"> -->
                        <span>
                          {{ col.text }}
                        </span>
                      <!-- </template> -->
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <!-- 
            v-for="col in props.row.item" :key="col.id" 
          -->

          <!-- 2.2 -->
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
      </div>
    </div>

    <set-silence-dialog
      :visible="visible"
      :current-obj="currentObj"
      @closeDialog="closeDialog"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
// import { alarmColumnList, alarmList } from "../const";
// import axios from "axios";
import { getAlarmList } from "../../../../../../mock/alarm/axiosApi";
import SetSilenceDialog from "./components/SetSilenceDialog.vue";

export default {
  name: "AlarmList",
  components: { SetSilenceDialog },
  data() {
    return {
      //  input搜索
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

      list: null,

      total: 0,

      listQuery: {
        name: "",
        alarmStatus: "全部",
        silenceStatus: "全部",
        creater: "全部",
        resourceType: "全部",
      },

      visible: false,

      currentObj: {},

      dialogFormVisible: false,
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      getAlarmList().then((res) => {
        console.log(res);
        this.alarmList.data = res.data.data;
      });
    },

    // 搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
      console.log("搜索");
    },

    // 更新
    handleUpdate(row) {
      this.$router.push({
        name: "AlarmCreate",
        query: {
          name: row.name,
        },
      });
    },

    // 删除--index其实是row.id
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: "Success",
    //     message: "Delete Successfully",
    //     type: "success",
    //     duration: 2000,
    //   });
    //   this.list.splice(index, 1);
    // },
    // handleDelete(row) {
    //   // this.$notify({
    //   //   title: "Success",
    //   //   message: "Delete Successfully",
    //   //   type: "success",
    //   //   duration: 2000,
    //   // });
    //   // this.list.splice(index, 1);
    //   console.log('删除alarmList', row)
    //   this.$confirm(`确认删除当前${row.name}?`)
    //     .then(() => {
    //       axios
    //         .post('/api/deleteAlarmlist', row)
    //         .then((res) => {
    //           if (res.data.code === '0') {
    //             this.$message.success('删除成功！')
    //             this.alarmList.data.splice(+row.id, 1)
    //             this.getList()
    //           }
    //           console.log(alarmList.data)
    //         })
    //         .catch((err) => {
    //           console.log(err)
    //         })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })

    // },

    // 设置静默
    handlesSilence(row) {
      this.currentObj = row;
      this.visible = true;
    },

    submitForm(form) {
      console.log(form);
      this.visible = false;
    },

    closeDialog() {
      this.visible = false;
    },

    handelDelete(row) {
      const returnMsgList = [
        `确定删除告警策略${row.name}吗？`,
        `删除后不可恢复。`,
      ];
      const newData = [];
      const h = this.$createElement;
      for (const i in returnMsgList) {
        newData.push(h("p", null, returnMsgList[i]));
      }
      this.$confirm(h("div", null, newData), "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 创建告警策略--跳转路由
    handleCreate() {
      this.$router.push({
        name: "AlarmCreate",
      });
    },

    handleDetail(row) {
      this.$router.push({
        name: "AlarmDetail",
        query: {
          name: row.name,
        },
      });
    },

    handleCreateDialog() {
      this.dialogFormVisible = true;
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
  .row-bg {
    padding: 20px 15px;
    padding-bottom: 10px;
    background-color: #f5f6f9;
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
</style>

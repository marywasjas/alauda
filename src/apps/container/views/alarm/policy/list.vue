<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 -->
      <div class="card__header">
        <el-button type="primary" @click="handleCreate">创建告警策略</el-button>
      </div>
      <!-- 2 -->
      <div class="filter-content">
        <el-form
          ref="ruleForm"
          :model="listQuery"
          label-position="right"
          label-width="90px"
        >
          <div class="filter-row">
            <el-form-item label="告警状态" class="filter-item">
              <el-select v-model="listQuery.alarmStatus" size="small">
                <el-option label="全部" value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="静默状态" class="filter-item" size="small">
              <el-select v-model="listQuery.silenceStatus">
                <el-option label="全部" value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建人" class="filter-item" size="small">
              <el-select v-model="listQuery.creater">
                <el-option label="全部" value="全部" />
              </el-select>
            </el-form-item>
          </div>
          <div class="filter-row">
            <el-form-item label="资源类型" class="filter-item" size="small">
              <el-select v-model="listQuery.resourceType">
                <el-option label="全部" value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="名称" class="filter-item">
              <el-input
                v-model="listQuery.name"
                placeholder="按名称模糊搜索"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label=""
              class="filter-item"
              style="text-align: right"
            >
<<<<<<< HEAD
              <!-- <el-button type="primary">搜索</el-button> -->
              <el-button type="primary" @click="handleFilter">搜索</el-button>
=======
              <el-button type="primary">搜索</el-button>
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
              <el-button>重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 3 -->
      <div class="card__content">
        <el-table
          :data="alarmList.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无告警策略"
        >
          <!-- 3.1 -->
          <el-table-column
            v-for="col in alarmColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer" @click="handleDetail(scope.row)">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'status'" style="text-align: center;">
                <span>1/1</span>
                <el-progress
                  :percentage="100"
                  :show-text="false"
                  :stroke-width="10"
                />
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
<<<<<<< HEAD
          <!-- 3.2 -->
          <el-table-column
            label="操作"
            align="center"
            width="180"
=======
          <el-table-column
            label="操作"
            align="center"
            width="80"
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
<<<<<<< HEAD
                    <!-- <el-dropdown-item @click="handleEdit(row.id)">
                      更新
                    </el-dropdown-item> -->
                    <el-dropdown-item @click.native="handleUpdate(row)">
                      更新
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handleDelete(row, row.id)"
                    >删除
                    </el-dropdown-item>
=======
                    <el-dropdown-item
                      @click.native="handleUpdate(row)"
                    >更新</el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handlesSilence(row)"
                    >设置静默</el-dropdown-item>
                    <el-dropdown-item @click.native="handelDelete(row)">删除</el-dropdown-item>
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
<<<<<<< HEAD
=======
    <set-silence-dialog :visible="visible" :current-obj="currentObj" @closeDialog="closeDialog" @submitForm="submitForm" />
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
  </div>
</template>

<script>
import { alarmColumnList, alarmList } from '../const'
<<<<<<< HEAD
import axios from 'axios'
=======
import SetSilenceDialog from './components/SetSilenceDialog.vue'
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6

export default {
  name: 'AlarmList',
  components: { SetSilenceDialog },
  data() {
    return {
      alarmColumnList, // column
      alarmList, // table.data
      list: null,
      total: 0,
      listQuery: {
        name: '',
        alarmStatus: '全部',
        silenceStatus: '全部',
        creater: '全部',
        resourceType: '全部'
      },
      visible: false,
      currentObj: {}
    }
  },
  created() {
  },
  methods: {
<<<<<<< HEAD
    getList() {
      // "/api/data"为mock/index.js设置的接口
      axios.get('/api/alarmlist').then((res) => {
        console.log(res.data)
        this.alarmList.data = res.data.data
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
      console.log('@')
    },
    // 更新
=======
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
    handleUpdate(row) {
      this.$router.push({
        name: 'AlarmCreate',
        query: {
          name: row.name
        }
      })
    },
<<<<<<< HEAD
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
    handleDelete(row) {
      // this.$notify({
      //   title: "Success",
      //   message: "Delete Successfully",
      //   type: "success",
      //   duration: 2000,
      // });
      // this.list.splice(index, 1);
      console.log('删除alarmList', row)
      this.$confirm(`确认删除当前${row.name}?`)
        .then(() => {
          axios
            .post('/api/deleteAlarmlist', row)
            .then((res) => {
              if (res.data.code === '0') {
                this.$message.success('删除成功！')
                this.alarmList.data.splice(+row.id, 1)
                this.getList()
              }
              console.log(alarmList.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
=======
    // 设置静默
    handlesSilence(row) {
      this.currentObj = row
      this.visible = true
    },
    submitForm(form) {
      console.log(form)
      this.visible = false
    },
    closeDialog() {
      this.visible = false
    },
    handelDelete(row) {
      const returnMsgList = [
        `确定删除告警策略${row.name}吗？`,
        `删除后不可恢复。`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
>>>>>>> c96f9b7f7e5384dadf71bbd3c175132b997bdde6
    },

    handleCreate() {
      this.$router.push({
        name: 'AlarmCreate'
      })
    },

    handleDetail(row) {
      this.$router.push({
        name: 'AlarmDetail',
        query: {
          name: row.name
        }
      })
    }
  }
}
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
}
</style>

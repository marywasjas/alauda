<template>
  <div class="oam-container">
    <div class="line-alert">
      <i class="el-icon-info" />
      <div class="line-alert__body">
        <div class="line-alert__content">
          通过创建网络策略，以白名单的方式，控制项目内计算组件的网络数据访问流量
          <div class="line-alert__attend">注意：网络策略不适用于主机网络命名空间，启用了主机网络的 Pod 不受网络策略规则的影响。</div>
        </div>
      </div>
    </div>
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary" @click="handleCreate">创建网络策略</el-button>
        <div class="flex-center">
          <el-input
            v-model="listQuery.name"
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
          </el-input>
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="handleRefresh"
          />
        </div>
      </div>
      <div class="card__content">
        <el-table
          :data="policyList.data"
          style="width: 100%;"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in policyColumnList"
            :key="col.id"
            :label="col.label"
            :sortable="col.sortable"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'">
                <span class="cursor-pointer" @click="handleDetail(scope.row)">{{ scope.row[col.id] }}</span>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(row)">更新</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { list, create, update } from '@/api/network/service'
import { policyColumnList, policyList } from '../const'
export default {
  name: 'PolicyList',
  data() {
    return {
      policyColumnList,
      policyList,
      list: null,
      total: 0,
      listQuery: {
        name: ''
      },
      temp: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      list(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        console.log(this.list)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.getList()
    },
    handleCreate() {
      this.$router.push({
        name: 'PolicyCreate'
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: 'PolicyDetail',
        query: {
          name: row.name
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          create(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.$notify({
              title: 'Success',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.$router.push({
        name: 'PolicyUpdate',
        query: {
          name: row.name
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.$notify({
              title: 'Success',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .line-alert{
    background-color: $background-color2;
    border:1px solid $color-primary;
    display: flex;
    margin-bottom: 16px;
    padding: 11px 15px;
    border-radius: $border-radius-m;
    box-sizing: border-box;
    i{
      color: $color-primary;
      margin-right: 8px;
    }
    .line-alert__body {
      flex: 1;
      width: 100%;
      overflow: hidden;
      .line-alert__content {
        font-size: $font-size-14;
        line-height:$line-height-20;
        color: $color-main-text;
        .line-alert__attend{
          color: rgb(100, 102, 105)
        }
      }
    }
  }
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell{
    i{
      font-size: $font-size-20;
      color:$color-primary;
      cursor: pointer;
    }
  }
}
</style>


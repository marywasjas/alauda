<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-right: 10px;" type="primary" size="min">
        创建入站规则
      </el-button>
      <el-button icon="el-icon-refresh" style="float:right; margin:0 5px;" @click="handleRefresh" />
      <el-input v-model="listQuery.title" placeholder="按名称搜索" style="width:220px; float:right;">
        <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
      </el-input>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%;"
      header-row-class-name="headerStyle"
    >
      <el-table-column label="名称">
        <template slot-scope="{row}">
          <span class="cursor-pointer">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规则" width="600">
        <template slot-scope="{row}">
          <el-table :data="row.port" size="small">
            <el-table-column prop="request" label="地址" />
            <el-table-column prop="service" label="内部路由" />
            <el-table-column prop="nodePort" label="端口" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="{row}">
          <span>{{ row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini">
            更新
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list } from '@/api/network/service'

export default {
  name: 'Ingress',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
      },
      temp: {
        id: undefined,
        name: '',
        type: '',
        ip: '',
        port: [],
        createtime: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        console.log(this.list)

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

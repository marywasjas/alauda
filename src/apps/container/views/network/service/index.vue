<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/service/edit/0'" class="link-type">
        <el-button class="filter-item" style="margin-right: 10px;" type="primary" icon="el-icon-edit">
          New
        </el-button>
      </router-link>
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="float:right;" @click="handleFilter">
        Search
      </el-button>
      <el-input v-model="listQuery.name" placeholder="按名称搜索" style="width: 200px; float:right;" class="filter-item" @keyup.enter.native="handleFilter" />
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <router-link :to="'/table/service/detail/'+row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="虚拟IP" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口" align="center" width="400">
        <template slot-scope="{row}">
          <el-table :data="row.port" size="small">
            <el-table-column prop="request" label="服务访问" />
            <el-table-column prop="protocol" label="协议" />
            <el-table-column prop="targetPort" label="容器端口" />
            <el-table-column prop="nodePort" label="主机端口" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link :to="'/service/edit/' + row.id" class="link-type">
            <el-button type="primary" size="mini">
              更新
            </el-button>
          </router-link>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list, create, update } from '@/api/network/service'

export default {
  name: 'Service',
  data() {
    return {
      tableKey: 0,
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
        }, 1 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
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
      this.temp = Object.assign({}, row) // copy obj
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

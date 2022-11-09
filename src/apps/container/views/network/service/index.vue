<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary">创建内部路由</el-button>
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
          :data="list"
          style="width: 100%;"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="名称">
            <template slot-scope="{row}">
              <span class="cursor-pointer">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务类型">
            <template slot-scope="{row}">
              <span>{{ row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="虚拟IP">
            <template slot-scope="{row}">
              <span>{{ row.ip }}</span>
            </template>
          </el-table-column>
          <el-table-column label="端口" width="500">
            <template slot-scope="{row}">
              <el-table :data="row.port" size="small">
                <el-table-column prop="request" label="服务访问" />
                <el-table-column prop="protocol" label="协议" />
                <el-table-column prop="targetPort" label="容器端口" />
                <el-table-column prop="nodePort" label="主机端口" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="{row}">
              <span>{{ row.createtime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleEdit(row.id)">更新</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div></template>

<script>
import { list } from '@/api/network/service'

export default {
  name: 'Service',
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        name: ''
      }
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
    handleUpdate(row) {
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

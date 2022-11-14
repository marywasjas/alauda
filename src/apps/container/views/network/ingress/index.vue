<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary">创建入站规则</el-button>
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
  </div>
</template>

<script>
import { list } from '@/api/network/service'
import LineAlert from '@/apps/container/views/components/LineAlert'
export default {
  name: 'Ingress',
  components: { LineAlert },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        name: ''
      },
      content: '入站规则即 Kubernetes Ingress，可以为内部路由提供集群外部访问的 URL、负载均衡、SSL 终止，或 HTTP 路由。部署 Ingress controller 后，它将监听入站规则和内部路由的变化，并根据所配规则负载均衡地提供访问入口。平台的自建集群中会默认部署 Ingress Controller。'
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

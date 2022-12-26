<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary" @click="handleCreate">创建内部路由</el-button>
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
              <span class="cursor-pointer" @click="handleDetail(row)">{{ row.name }}</span>
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
          <el-table-column label="操作" align="center" width="60" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(row)">更新</el-dropdown-item>
                    <el-dropdown-item @click.native="handelDelete(row)">删除</el-dropdown-item>
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
  name: 'ServiceList',
  components: { LineAlert },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        name: ''
      },
      content: '内部路由即 Kubernetes Service, 定义了一组 Pod 的逻辑集合和访问策略'
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
      this.$router.push({
        name: 'ServiceUpdate',
        query: {
          name: row.name
        }
      })
    },
    handelDelete(row) {
      const returnMsgList = [
        `确定删除内部路由${row.name}吗？`
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
    },
    handleCreate() {
      this.$router.push({
        name: 'ServiceCreate'
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: 'ServiceDetail',
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

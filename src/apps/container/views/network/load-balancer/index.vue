<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
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
          :data="balancerList.data"
          style="width: 100%;"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in balancerColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                {{ scope.row[col.id] }}
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert'
import { list, create, update } from '@/api/network/service'
import { balancerColumnList, balancerList } from '../const'
export default {
  name: 'LoadBalancer',
  components: { LineAlert },
  data() {
    return {
      balancerColumnList,
      balancerList,
      list: null,
      total: 0,
      listQuery: {
        name: ''
      },
      temp: {},
      content: '负载均衡器（Load Banalcer）将访问流量按照转发策略分发到对应实例的多个服务上，充当了客户端的单一接入点，从而提高应用程序的可用性。LB可灵活配置多重转发策略，满足复杂场景的转发控制功能。同时支持HTTP/HTTPS/TCP三种协议，增强了应用服务的防护能力。'
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
    .flex-center {
      margin-left: auto;
    }
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


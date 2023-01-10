<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="filter-content">
        <el-form
          ref="ruleForm"
          :model="listQuery"
          label-position="right"
          label-width="90px"
        >
          <el-row class="filter-row">
            <el-col :span="6">
              <el-form-item label="时间范围" class="filter-item">
                <el-select v-model="listQuery.startEndTime" size="small">
                  <el-option label="过去30分钟" value="过去30分钟" />
                  <el-option label="过去1小时" value="过去1小时" />
                  <el-option label="过去6小时" value="过去6小时" />
                  <el-option label="过去1天" value="过去1天" />
                  <el-option label="过去3天" value="过去3天" />
                  <el-option label="过去7天" value="过去7天" />
                  <el-option label="自定义时间" value="自定义时间" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="filter-row">
            <el-col :span="6">
              <el-form-item label="资源类型" class="filter-item" size="small">
                <el-select v-model="listQuery.resourceType">
                  <el-option label="部署" value="部署" />
                  <el-option label="守护进程集" value="守护进程集" />
                  <el-option label="有状态副本集" value="有状态副本集" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="告警策略" class="filter-item" size="small">
                <el-select v-model="listQuery.policy">
                  <el-option label="全部" value="全部" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="filter-row" style="display: flex">
            <el-form-item label="关联资源" class="filter-item" style="flex: 1">
              <el-input
                v-model="listQuery.resource"
                placeholder="请输入部署名称"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label=""
              label-width="10px"
              class="filter-item"
              style="text-align: right"
            >
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="card__content">
        <el-table
          :data="historyList.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
          empty-text="无告警历史"
        >
          <el-table-column
            v-for="col in historyColumnList"
            :key="col.id"
            :label="col.label"
            :sortable="col.sortable"
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
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click="handleEdit(row.id)"
                    >更新</el-dropdown-item>
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
import { historyColumnList, historyList } from '../const'

export default {
  name: 'AlarmList',
  data() {
    return {
      historyColumnList,
      historyList,
      list: null,
      total: 0,
      listQuery: {
        resource: '',
        policy: '全部',
        startEndTime: '过去1小时',
        resourceType: '部署'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {},
    handleFilter() {
      this.listQuery.page = 1
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
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
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
  .filter-item {
    margin-bottom: 10px;
    .el-select {
      width: 100%;
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

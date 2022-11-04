<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <div class="group-pannel">
          <el-form>
            <el-form-item label="">
              <el-select v-model="selectedGroup" placeholder="请选择" style="width: 100%" @change="handleGroupChange">
                <el-option
                  label="全部"
                  value="all"
                />
              </el-select>
              <el-input
                v-model="inputGroup"
                placeholder="按名字过滤"
                prefix-icon="el-icon-search"
                @change="handleGroupFilter"
              />
            </el-form-item>
          </el-form>
          <ul>
            <li v-for="group, index in groupList" :key="index" class="group-link">
              <el-link type="primary" @click="handleGroupChange(group.id)">
                <span class="group-name">{{ group.name }}</span>
                <span class="group-version">{{ group.version[0] }}</span>
              </el-link>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- <el-divider direction="vertical" /> -->
      <el-col :span="20">
        <div class="filter-container">
          <el-button icon="el-icon-refresh" style="float:right; margin:0 5px;" @click="handleRefresh" />
          <el-input v-model="listQuery.title" placeholder="按名称搜索" style="width:220px; float:right;">
            <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
          </el-input>
          <span style="font-size:18px">group1</span>
          <div>
            <el-select v-model="selectedVersion" placeholder="请选择" style="width: fit-content;" @change="handleVersionChange">
              <el-option
                label="v1"
                value="v1"
              />
            </el-select>
          </div>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
          <el-table-column label="title">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="Date">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="Author">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="Status" width="110">
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusFilter">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Actions" width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row.id)">
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'ResourceManagement',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      selectedGroup: 'all',
      selectedVersion: 'v1',
      inputGroup: '',
      groupList: [
        { id: 1, name: 'group1', version: ['v1', 'v2', 'v3'] },
        { id: 2, name: 'group2', version: ['v1', 'v2', 'v3'] },
        { id: 3, name: 'group3', version: ['v1', 'v2', 'v3'] },
        { id: 4, name: 'group4', version: ['v1', 'v2', 'v3'] },
        { id: 5, name: 'group5', version: ['v1', 'v2', 'v3'] }
      ],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleRefresh() {
      console.log(this.groupList)
    },
    handleFilter() {
      console.log(this.listQuery.title)
    },
    handleGroupChange(groupId) {
      console.log(groupId)
    },
    handleGroupFilter(val) {
      console.log(val)
    },
    handleVersionChange() {
      console.log(this.selectedVersion)
    },
    handleEdit(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.group-pannel {
  margin-right: 10px;
}
ul {
  padding: 0;
}
.group-link {
  height: 60px;
  padding: 10px 0px;
  text-align: left;
  list-style-type: none;
  border-bottom: 1px solid #ccc;
    .group-name {
      font-size: 18px;
      display: block;
    }
    .group-version {
      font-size: 10px;
      color: #000;
    }
}
.filter-item {
  float: right;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <div class="group-pannel">
          <el-form>
            <el-form-item label="">
              <el-select v-model="selectedGroup" placeholder="请选择" style="width: 100%; margin-bottom: 5px;" @change="handleGroupChange">
                <el-option
                  label="全部"
                  value="all"
                />
                <el-option
                  v-for="item, index in groupList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-input
                v-model="inputGroup"
                placeholder="按名字过滤"
                prefix-icon="el-icon-search"
                clearable
                @change="handleGroupFilter"
              />
            </el-form-item>
          </el-form>
          <ul>
            <li v-for="group, index in groupList" :key="index" class="group-link">
              <el-link type="primary" @click="handleGroupChange(group.id)">
                <span class="group-name">{{ group.name }}</span>
                <span class="dot" />
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
        <el-table :data="list" style="width: 100%;" header-row-class-name="headerStyle">
          <el-table-column width="180" label="名称">
            <template slot-scope="scope">
              <span class="cursor-pointer">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签">
            <template slot-scope="scope">
              <span>
                <el-tag v-for="item in scope.row.tag" :key="item" type="info" class="tagItem">{{ item }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column width="200" label="命名空间">
            <template slot-scope="scope">
              <span>{{ scope.row.namespace }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createtime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Actions" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">
                更新
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
        { id: 1, name: 'AlaudaFeatureGate', version: ['crd.alauda.io', 'v2', 'v3'] },
        { id: 2, name: 'AlertRule', version: ['alauda.io', 'v2', 'v3'] },
        { id: 3, name: 'EndpointSlice', version: ['oam.alauda.io', 'v2', 'v3'] },
        { id: 4, name: 'Endpoints', version: ['v1', 'v2', 'v3'] },
        { id: 5, name: 'Frontend', version: ['core.oam.dev'] }
      ],
      list: null,
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
      this.list = [{
        name: 'test-memcached',
        tag: ['app.kubernetes.io/instance: test', 'app.kubernetes.io/managed-by: Helm'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-25 16:52:56'
      }, {
        name: 'test-memcached-metric',
        tag: ['app.kubernetes.io/component: metrics', 'app.kubernetes.io/instance: test'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-25 16:52:56'
      }, {
        name: 'toda-kibana-svc',
        tag: ['app.kubernetes.io/component: metrics'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-06 15:06:14'
      }]
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
    },
    handleDelete(id) {
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
  padding-top: 15px;
  text-align: left;
  list-style-type: none;
  border-bottom: 1px solid #ccc;
    .group-name {
      font-size: 16px;
      display: block;
      color: #000;
    }
    .group-version {
      font-size: 10px;
      color: #000;
    }
}
// .group-link :hover{
//   color: rgb(0, 122, 245);
//   background-color: rgb(229, 241, 254);
// }
.filter-item {
  float: right;
}
.tagItem {
  margin-left: 3px;
}
.dot {
  width: 4px;
  height: 4px;
  margin-right: 8px;
  background-color: green;
}
</style>

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <div class="group-pannel">
          <el-form>
            <el-form-item label="">
              <el-select v-model="selectedGroup" style="width: 100%;" size="small" @change="handleGroupChange">
                <el-option
                  label="全部"
                  value="all"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="inputResource"
                placeholder="按名字过滤"
                prefix-icon="el-icon-search"
                clearable
                size="small"
                @input="handleResourceFilter"
                @clear="handleResourceClear"
              />
            </el-form-item>
          </el-form>
          <ul>
            <li
              v-for="item, index in resourceList"
              :key="index"
              class="li-link"
              :class="{'isActive': compare(item.id)}"
              @click="handleResourceChange(item.id)"
            >
              <span>{{ item.name }}</span>
              <div class="li-version">
                <span class="dot" />
                <span>{{ item.version[0] }}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="filter-container">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            style="float:right;"
            @click="handleRefresh"
          />
          <el-input
            v-model="listQuery.title"
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
            style="float:right; width: 240px;"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
          </el-input>
          <span style="font-size:18px">{{ resource.name }}</span>
          <div>
            <el-select v-model="version" size="small" @change="handleVersionChange">
              <el-option
                v-for="v, index in resource.version"
                :key="index"
                :label="v"
                :value="v"
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
          <el-table-column align="center" label="" width="180">
            <template slot-scope="scope">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleEdit(scope.row.id)">更新</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
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
  data() {
    return {
      selectedGroup: 'all',
      version: '',
      inputResource: '',
      resourceList: [],
      resource: {
        id: '',
        name: '',
        version: []
      },
      initResourceList: [
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
    this.resourceList = this.initResourceList
    this.resource = this.resourceList[0]
    this.version = this.resource.version[0]
    this.getList()
  },
  methods: {
    getList() {
      this.list = [{
        id: 1,
        name: 'test-memcached',
        tag: ['app.kubernetes.io/instance: test', 'app.kubernetes.io/managed-by: Helm'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-25 16:52:56'
      }, {
        id: 2,
        name: 'test-memcached-metric',
        tag: ['app.kubernetes.io/component: metrics', 'app.kubernetes.io/instance: test'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-25 16:52:56'
      }, {
        id: 3,
        name: 'toda-kibana-svc',
        tag: ['app.kubernetes.io/component: metrics'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-06 15:06:14'
      }]
    },
    handleRefresh() {
      console.log(this.ResourceList)
    },
    handleFilter() {
      console.log(this.listQuery.title)
    },
    handleGroupChange(val) {
      console.log(val)
    },
    handleResourceChange(currentId) {
      this.resource = this.resourceList.find((item) => {
        return item.id === currentId
      })
      this.version = this.resource.version[0]
    },
    handleResourceFilter(val) {
      if (val) {
        this.resourceList = this.resourceList.filter((item) => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        })
      } else {
        this.resourceList = this.initResourceList
      }
    },
    handleResourceClear() {
      this.resourceList = this.initResourceList
    },
    handleVersionChange(val) {
      console.log(val)
    },
    handleEdit(id) {
      console.log(id)
    },
    handleDelete(id) {
      console.log(id)
    },
    compare(currentId) {
      if (this.resource.id === currentId) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-pannel {
  margin-right: 10px;
}
.el-form-item {
  margin-bottom: 5px;
}
ul {
  overflow: auto;
  list-style: none;
}
ul, li {
  padding: 0;
  margin: 0
}
.li-link {
  widows: 100%;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  font-size: 16px;
  color: rgb(50, 52, 55);
}
.li-link:hover, .isActive{
  color: rgb(0, 122, 245);
  background-color: rgb(229, 241, 254);
}
.li-version {
  font-size: 14px;
  color: rgb(100, 102, 105);
  margin-top: 8px;
  display: flex;
  align-items: center
}
.tagItem {
  margin-left: 3px;
}
.el-select-dropdown__item {
  padding-left: 6px;
}
.dot {
  width: 5px;
  height: 5px;
  margin-right: 8px;
  background-color: green;
}
.operation-cell{
  i{
    font-size: $font-size-20;
    color:$color-primary;
    cursor: pointer;
  }
}
</style>

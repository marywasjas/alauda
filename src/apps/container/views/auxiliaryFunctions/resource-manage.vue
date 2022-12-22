<template>
  <div class="resource-management-container">
    <el-row>
      <el-col :span="5">
        <div class="group-pannel">
          <el-form>
            <el-form-item label="">
              <el-button type="primary" @click="handelAdd">创建资源对象</el-button>
            </el-form-item>
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
      <el-col :span="19">
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
        <el-table :data="list.data" style="width: 100%;" header-row-class-name="headerStyle">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <span class="cursor-pointer" @click="openDetails(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                <el-tag v-for="item in scope.row.tag" :key="item" type="info" class="tagItem" style="margin:5px;10px;">{{ item }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="命名空间">
            <template slot-scope="scope">
              <span>{{ scope.row.namespace }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createtime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="60">
            <template slot-scope="scope">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleEdit(scope.row)">更新</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="详情"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import Mock from 'mockjs'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'
export default {
  name: 'ResourceManagement',
  components: { MonacoEditorDialog },
  data() {
    const list = Mock.mock({
      'data|10': [{
        'id|+1': 1,
        name: '@word(10,30)',
        tag: ['app.kubernetes.io/instance: test', 'app.kubernetes.io/managed-by: Helm'],
        namespace: 'toda-elasticsearch-system',
        createtime: '2022-04-25 16:52:56',
        spec: {
          detail: {
            cluster_name: 'global',
            event: {
              count: 6713,
              eventTime: null,
              firstTimestamp: '2022-10-14T05:33:11Z',
              involvedObject: {
                apiVersion: 'v1',
                fieldPath: 'spec.containers{ubuntu}',
                kind: 'Pod',
                name: 'ubuntu-bq84l',
                namespace: 'toda-elasticsearch-system',
                resourceVersion: '519516627',
                uid: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0'
              },
              lastTimestamp: '2022-11-07T01:33:22Z',
              message:
                'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
              metadata: {
                creationTimestamp: '2022-11-07T01:18:15Z',
                name: 'ubuntu-bq84l.171dd899b971f3ab',
                namespace: 'toda-elasticsearch-system',
                resourceVersion: '603142979',
                uid: 'c61582db-0ce2-469d-8606-9854962ffc82'
              },
              reason: 'Pulled',
              reportingComponent: '',
              reportingInstance: '',
              source: {
                component: 'kubelet',
                host: '172.16.129.51'
              },
              type: 'Normal'
            },
            operation: 'Pulled',
            operator: 'kubelet@172.16.129.51',
            source: 'kubernetes'
          },
          log_level: 0,
          resource_id: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0',
          resource_type: 'Pod',
          time: '1667783895000000'
        }
      }]
    })
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
      list,
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
      },
      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      code: '',
      language: 'json',
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true
      }
    }
  },
  created() {
    this.resourceList = this.initResourceList
    this.resource = this.resourceList[0]
    this.version = this.resource.version[0]
  },
  methods: {
    // 事件详情
    openDetails(row) {
      this.detailVisible = true
      this.readOnly = true
      this.submitTxt = null
      this.code = JSON.stringify(row.spec, null, 2)
    },
    closeDetailsDialog() {
      this.detailVisible = false
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
    handleEdit(row) {
      this.detailVisible = true
      this.readOnly = false
      this.submitTxt = '更新'
      this.code = JSON.stringify(row.spec, null, 2)
    },
    handelAdd() {
      this.detailVisible = true
      this.readOnly = false
      this.submitTxt = '创建'
      this.code = JSON.stringify('', null, 2)
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
.resource-management-container{
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
}
.el-row{
  padding: 20px;
  background:#fff;
  border-radius: $border-radius-l;
  box-shadow: 0 0 4px 0 $box-shadow;
  min-height: 100%;
}
.group-pannel {
  margin-right: 30px;
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
  color: $color-primary;
  background-color: $background-color;
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
  background-color: rgb(0, 194, 97);
}
.operation-cell{
  i{
    font-size: $font-size-20;
    color:$color-primary;
    cursor: pointer;
  }
}
</style>

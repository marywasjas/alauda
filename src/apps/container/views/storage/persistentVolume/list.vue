<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary" @click="handelCreate">创建持久卷声明</el-button>
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item label="">
            <el-input
              v-model="formInline.name"
              placeholder="按名称搜索"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button type="primary" @click="onSearch">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
            :sortable="col.sortable"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handelDetails(scope.row)">{{ scope.row[col.id] }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="update" @click.native="handleUpdate(scope.row)">扩容</el-dropdown-item>
                    <el-dropdown-item command="delete" @click.native="handleUpdate(scope.row)">更新</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
import { tableData, tableColumnList } from './constant/index'
export default {
  name: 'PersistentVolumeList',
  components: { LineAlert },
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        tag: '',
        name: ''
      },
      tagOptions: [
        {
          value: '标签1',
          label: '标签1'
        },
        {
          value: '标签2',
          label: '标签2'
        }
      ],
      content:
        '持久卷声明（PVC） 是用户使用存储资源的声明。平台会根据声明中的大小和访问模式静态匹配或动态创建不同属性的持久卷（PV）。选择动态创建方式时，平台基于管理员提供的存储类（StorageClass）来按需创建持久卷。'
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    handelCreate() {
      this.$router.push({
        name: 'PersistentVolumeCreateUpdate',
        query: {
          type: 'add'
        }
      })
    },
    handelDetails(row) {
      this.$router.push({
        name: 'PersistentVolumeDetail',
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
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .oam-main{
    background:#fff;
    padding:20px
  }
}
</style>

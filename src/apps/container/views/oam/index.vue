<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary">创建应用</el-button>
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item label="">
            <el-select v-model="formInline.tag" placeholder="请选择标签过滤">
              <el-option
                v-for="item in tagOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
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
import { tableData, tableColumnList } from './constant/index'
export default {
  name: 'OAM',
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
        'OAM 应用功能基于 OAM 模型，OAM 模型是对容器和 kubernetes 资源的更高层整合和抽象，一个 OAM 应用下包含多个组件。OAM 应用能使您在更高层级管理应用，尽量屏蔽容器和 kubernetes 层的细节，使您能更关注于应用程序本身的运维。'
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
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

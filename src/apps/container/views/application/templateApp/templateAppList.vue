<template>
  <div class="nativeApp-container">
    <line-alert :content="content" />
    <div class="nativeApp-main">
      <!-- 1 -->
      <div class="card__header">
        <div class="flex-center">
          <el-input
            v-model="formInline.name"
            placeholder="按名称搜索"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" />
        </div>
      </div>
      <!-- 2 -->
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
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="name-cell">
                <i class="el-icon-menu" />
                <div>
                  <span class="cursor-pointer" @click="goDetails(scope.row)">
                    {{ scope.row.name }}
                  </span>
                  <span>{{ scope.row.desc }}</span>
                </div>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i
                  v-if="scope.row.status === 'running'"
                  class="el-icon-video-play running"
                />
                <i
                  v-else-if="scope.row.status === 'stop'"
                  class="el-icon-video-pause stop"
                />
                <span>{{ scope.row.statusText }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      command="update"
                      @click.native="handleUpdate(scope.row)"
                    >更新</el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="handelDelete(scope.row)"
                    >删除</el-dropdown-item>
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
import { tableData, tableColumnList } from './constant/index'
import LineAlert from '@/apps/container/views/components/LineAlert'

export default {
  name: 'TemplateAppList',
  components: { LineAlert },
  data() {
    return {
      tableData: { data: [] },
      // tableData,
      tableColumnList,
      formInline: {
        name: ''
      },
      content: '应用模板是通过 helm chart 资源快速部署的定制化应用实例。您可以查看模板应用的部署情况、将模板应用升级为原生应用或删除模板应用。如您对模板应用有更新需求，请尽快升级成原生应用进行更新操作。',
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.nativeApp-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .nativeApp-main {
    background: #fff;
    padding: 20px;
  }
  .name-cell {
    display: flex;
    justify-content: left;
    align-items: center;
    i {
      margin-right: 10px;
      font-size: $font-size-20;
      padding: 1px;
      border: 1px solid $border-color-one;
      border-radius: $border-radius-l;
      background: $color-primary-rgba1;
      color: $color-primary;
    }
    span {
      display: block;
      margin: 0;
      font-size: $font-size-18;
    }
    span:last-child {
      color: $font-color-text;
      font-size: $font-size-14;
      margin-top: 6px;
    }
  }
}
</style>

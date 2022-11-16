<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="openDialog">
          创建定时任务
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>YAML创建</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称搜索" size="small" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" @click="onSearch" />
        </div>
      </div>
      <div class="card__content">
        <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <a class="link_name" @click="detail(scope.row.name.link_name)">{{ scope.row.name.link_name }}</a>
              <div>{{ scope.row.name.txt }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="run_mode" label="执行方式" />
          <el-table-column prop="next_time" label="下次触发时间" />
          <el-table-column prop="last_execution_time" label="最近执行时间" />
          <el-table-column prop="create_time" label="创建时间" />
          <el-table-column label="" align="center" width="70" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleEdit(row.id)">更新</el-dropdown-item>
                    <el-dropdown-item>立即执行</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <select-mirror :form-visible="formVisible" @closeFormDialog="closeFormDialog" />
  </div>
</template>

<script>
import SelectMirror from '@/apps/container/views/components/SelectMirror'
export default {
  name: 'TimedTask',
  components: { SelectMirror },
  data() {
    return {
      formInline: {
        name: ''
      },
      formVisible: false,
      tableData: [
        {
          name: { txt: '测试', link_name: 'builder-python' },
          run_mode: '手动',
          next_time: '2019-09-08',
          last_execution_time: '2019-09-08',
          create_time: '2016-05-03'
        }
      ]
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    handleClick() {},
    detail(link_name) {
      this.$router.push({
        path: '/detail',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    },
    openDialog() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
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
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }

  .link_name {
    color: #1890ff;
  }
  .el-icon-success {
    color: #1890ff;
  }
  .el-icon-more {
    color: #1890ff;
  }
}
</style>

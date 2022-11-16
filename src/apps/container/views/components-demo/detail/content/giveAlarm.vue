<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="openDialog">
          创建告警策略
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>模版创建告警策略 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称模糊搜索" size="small" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-s-tools" size="small" @click="open" />
          <div />
        </div>
      </div>
      <div class="card__content">
        <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="notificationSchemes" label="通知策略" />
          <el-table-column prop="alarmStatus" label="告警状态" />
          <el-table-column prop="creater" label="创建人" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GiveAlarm',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        name: ''
      },
      formVisible: false,
      tableData: []
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
    open() {},
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

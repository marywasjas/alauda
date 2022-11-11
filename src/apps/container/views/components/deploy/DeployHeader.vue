<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick">
          {{ drop.dropVal }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in drop.dropList" :key="item.id" split-button :command="item.txt">{{
              item.txt
            }}</el-dropdown-item>
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
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <a class="link_name" @click="detail(scope.row.name.link_name)">{{ scope.row.name.link_name }}</a>

              <div class="v_name">{{ scope.row.name.txt }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <i :class="scope.row.status.done === '运行中' ? 'el-icon-success' : 'el-icon-warning'" />
              <span class="v_txt">{{ scope.row.status.done }}{{ scope.row.status.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="application" label="所属应用">
            <template slot-scope="scope">
              <a class="link_name" href="#">{{ scope.row.application }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" />
          <el-table-column label="" align="center" width="70" class-name="small-padding fixed-width">
            <template>
              <i class="el-icon-more" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeployHeaderVue',
  components: {},
  props: {
    drop: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formInline: {
        name: ''
      },
      visible: false
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

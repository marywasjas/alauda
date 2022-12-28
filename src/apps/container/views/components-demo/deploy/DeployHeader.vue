<template>
  <div class="oam-container">
    <div class="oam-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="openDialog">
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
          <el-table-column label="名称">
            <template slot-scope="scope">
              <a class="cursor-pointer" @click="detail(scope.row.name.link_name)">{{ scope.row.name.link_name }}</a>
              <!-- <div class="v_name">{{ scope.row.name.txt }}</div> -->
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <i :class="scope.row.status.done === '运行中' ? 'el-icon-success running' : 'el-icon-warning stop'" />
              <span class="v_txt">{{ scope.row.status.done }}{{ scope.row.status.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="application" label="所属应用">
            <template slot-scope="scope">
              <a class="cursor-pointer" @click="handleApp(scope.row)">{{ scope.row.application }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" />
          <el-table-column label="" align="center" width="70" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleEdit(row.name.link_name)">更新</el-dropdown-item>
                    <el-dropdown-item @click.native="handelDelete(row)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <select-mirror :form-visible="formVisible" @closeFormDialog="closeFormDialog" @submitForm="submitForm" />
  </div>
</template>

<script>
import SelectMirror from '@/apps/container/views/components/SelectMirror'
export default {
  name: 'DeployHeaderVue',
  components: { SelectMirror },
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
      formVisible: false
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    handleClick() {
      this.$router.push({
        path: 'deploy/yamlCreat',
        query: {}
      })
    },
    detail(link_name) {
      this.$router.push({
        path: 'deploy/detail',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    },
    handleApp(row) {
      this.$router.push({
        name: 'NativeDetail',
        query: {
          name: row.name.link_name,
          desc: row.name.txt
        }
      })
    },
    handleEdit(link_name) {
      this.$router.push({
        path: 'deploy/deployUpdate',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    },
    handelDelete(row) {
      const returnMsgList = [`确定删除部署${row.name.link_name}吗？`]
      const newData = []
      const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已删除'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    openDialog() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    submitForm() {
      this.$router.push({
        name: 'CreateDeploy'
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
}
</style>

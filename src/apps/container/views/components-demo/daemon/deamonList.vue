<template>
  <div class="deamon-container">
    <div class="deamon-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="openDialog">
          创建守护进程集
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item split-button>YAML创建</el-dropdown-item>
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
              <a class="link_name">{{ scope.row.application }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" />
          <el-table-column label="" align="center" width="70" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown @command="handleEdit(row.name.link_name)">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleEdit(row.id)">更新</el-dropdown-item>
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
  name: 'DeamonList',
  components: { SelectMirror },
  props: {},
  data() {
    return {
      tableData: [
        {
          name: { txt: '测试', link_name: 'builder-python' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: {
            txt: '测试',
            link_name: 'builder-python'
          },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '已停止', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '已停止', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        }
      ],
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
        name: 'DeamonYamlCreat',
        query: {}
      })
    },
    detail(link_name) {
      this.$router.push({
        name: 'DeamonDetail',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    },
    handleEdit(link_name) {
      this.$router.push({
        name: 'DeamonUpdate',
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
.deamon-container {
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
  .deamon-main {
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

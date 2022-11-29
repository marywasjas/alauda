<template>
  <div class="group-container">
    <LineAlert :content="content" />
    <div class="group-main">
      <div class="card__header">
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
              <div class="v_name">{{ scope.row.name.txt }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <i :class="scope.row.status.done === '运行中' ? 'el-icon-success' : 'el-icon-warning'" />
              <span class="v_txt">{{ scope.row.status.done }}{{ scope.row.status.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="resource_limit" label="资源限额">
            <template slot-scope="scope">
              <a class="link_name">{{ scope.row.application }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="restarts_number" label="重启次数" />
          <el-table-column prop="ip" label="容器组IP" />
          <el-table-column prop="node" label="节点" />
          <el-table-column prop="create_time" label="创建时间" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert/index.vue'

export default {
  name: 'ContainerGroupList',
  components: { LineAlert },
  props: {},
  data() {
    return {
      content: '容器组即 Kubernetes Pod，是在 Kubernetes 中可以创建和管理的最小计算单元。',
      formInline: {
        name: ''
      },
      tableData: [
        {
          name: { txt: '测试', link_name: 'builder-python' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          resource_limit: '',
          restarts_number: '',
          ip: '',
          node: ''
        },
        {
          name: { txt: '测试', link_name: 'builder-python' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          resource_limit: '',
          restarts_number: '',
          ip: '',
          node: ''
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {},
    detail(name) {
      console.log(name)
      this.$router.push({
        name: 'ContainerGroupDetail',
        query: {
          name: name // 传递的参数: 键值对
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .group-main {
    background-color: #fff;
    .card__header {
      display: flex;
      width: 300px;
      padding-top: 20px;
      margin-left: auto;
    }
    .card__content {
      padding: 10px;
    }
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

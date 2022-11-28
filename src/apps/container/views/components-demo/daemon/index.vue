<template>
  <div class="daemon-container">
    <router-view :key="key" />
    <DeployHeader v-if="$route.path === '/components/daemons_set'" :drop="drop" :table-data="tableData" />
  </div>
</template>

<script>
import DeployHeader from '../deploy/DeployHeader.vue'

export default {
  name: 'Daemon',
  components: {
    DeployHeader
  },
  data() {
    return {
      drop: {
        dropVal: '创建守护进程集',
        dropList: [{ id: 0, txt: 'YAML创建' }]
      },
      tableData: [
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
      ]
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
